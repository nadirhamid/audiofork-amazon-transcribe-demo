const { TranscribeStreamingClient, StartStreamTranscriptionCommand } = require("@aws-sdk/client-transcribe-streaming");
const { fromUtf8 } = require("@aws-sdk/util-utf8-node");
const { Transform } = require("stream");
const { workerData } = require("worker_threads");
const { createServer } = require("http");
const { parse } = require("url");
const { WebSocketServer } = require("ws");

const PORT = 5001;
let channelID = null;

const server = createServer();
const wss = new WebSocketServer({ noServer: true });

server.on("upgrade", function upgrade(request, socket, head) {
  const { pathname } = parse(request.url);

  if (pathname === "/") {
    wss.handleUpgrade(request, socket, head, function done(ws) {
      wss.emit("connection", ws, request);
    });
  }
});

wss.on("connection", async (ws, req) => {
  const client = new TranscribeStreamingClient({ region: process.env.AWS_REGION });
  const params = {
    LanguageCode: "en-US", // Change language code if necessary
    MediaEncoding: "pcm",
    MediaSampleRateHertz: 8000,
  };

  const transformStream = new Transform({
    transform(chunk, encoding, callback) {
      callback(null, { AudioEvent: { AudioChunk: fromUtf8(chunk.toString("base64")) } });
    },
  });

  const command = new StartStreamTranscriptionCommand(params);
  command.input = transformStream;

  try {
    await client.send(command);
  } catch (error) {
    console.error("Error starting transcription:", error);
    ws.close();
    return;
  }

  ws.on("message", (message) => {
    transformStream.write(message);
  });

  ws.on("close", () => {
    transformStream.end();
  });

  client.on("data", (data) => {
    if (data.TranscriptResultStream) {
      const transcriptEvent = JSON.parse(Buffer.from(data.TranscriptResultStream.TranscriptEvent.Transcript.Results[0].Transcript.Text, "base64").toString("utf-8"));
      console.log("Transcript:", transcriptEvent.Alternatives[0].Transcript);
    }
  });

  client.on("error", (error) => {
    console.error("Transcribe error:", error);
  });

  client.on("close", () => {
    console.log("Transcribe connection closed.");
  });
});

server.listen(PORT);
console.log(`Server is running on port ${PORT}`);