# Audiofork Integration with Amazon Transcribe

## Project Overview
This project demonstrates a basic integration of the Audiofork module with Amazon Transcribe services. Audiofork is an open-source module within the Asterisk framework for audio manipulation, while Amazon Transcribe provides cloud-based speech recognition capabilities. By combining these technologies, developers can create applications that transcribe audio from telephony systems or other sources in real-time using Amazon's powerful speech recognition capabilities.

## Demo Application
The demo application in this project is built using Node.js. It utilizes the Audiofork module to capture audio from a telephony source (e.g., SIP call) within an Asterisk environment. This audio is then streamed to Amazon Transcribe service for transcription. Once transcribed, the text output is logged or displayed for further processing.

## Getting Started
To use this demo application, follow these steps:

1. **Prerequisites:**
   - Node.js installed on your machine.
   - Access to an Asterisk server with Audiofork module installed and configured.
   - An AWS account with Amazon Transcribe service provisioned.

2. **Clone the Repository:**
   ```
   git clone <repository_url>
   ```

3. **Install Dependencies:**
   ```
   cd <project_directory>
   npm install
   ```

4. **Configure AWS Credentials:**
   - Ensure you have AWS credentials set up on your machine, either through environment variables or AWS credentials file. Learn more about setting up AWS credentials [here](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/loading-node-credentials-shared.html).
   
5. **Create Environment Variables File:**
   - Create a `.env` file in the root directory of the project.
   - Add your AWS credentials and other configuration variables to the `.env` file:
     ```
     AWS_ACCESS_KEY_ID=your_access_key_id
     AWS_SECRET_ACCESS_KEY=your_secret_access_key
     AWS_REGION=your_aws_region
     ```

6. **Run the Application:**
   ```
   node app.js
   ```

7. **Test the Application:**
   - Initiate a call to your Asterisk server or simulate audio input through another source.
   - Check the console output for transcription results from Amazon Transcribe.

## Additional Notes
- Ensure proper network connectivity and firewall settings to allow communication between the Asterisk server and Amazon Transcribe service.
- This demo application provides a basic integration example. Developers can extend it further to incorporate additional features or enhance error handling as per their requirements.
- [dotenv](https://www.npmjs.com/package/dotenv) package is used to manage environment variables. Make sure to add your AWS credentials and other configuration variables to the `.env` file for proper configuration.