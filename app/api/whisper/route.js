import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

// Replace with your OpenAI API key
const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY';

// Directory where files will be stored
const uploadDir = './uploads';

// Ensure the uploads directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Save files to the uploads directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Middleware to handle file upload
const fileMiddleware = (req, res) =>
  new Promise((resolve, reject) => {
    upload.single('file')(req, res, (err) => {
      if (err) return reject(err);
      resolve(req);
    });
  });

export const config = {
  api: {
    bodyParser: false, // Disable body parsing for file uploads
  },
};

export async function POST(req) {
  try {
    // Parse the incoming request with Multer
    const res = {}; // Mock response object for Multer
    await fileMiddleware(req, res);

    if (!req.file) {
      console.error('Multer did not attach a file to req.file');
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const audioFilePath = req.file.path; // Path to the uploaded file

    // Prepare the file for the OpenAI Whisper API
    const formData = new FormData();
    formData.append('file', fs.createReadStream(audioFilePath));
    formData.append('model', 'whisper-1'); // Specify the Whisper model

    // Make a request to OpenAI's Whisper API
    const openAIResponse = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: formData,
    });

    if (!openAIResponse.ok) {
      console.error('Error from OpenAI API:', await openAIResponse.text());
      throw new Error('Failed to communicate with OpenAI API');
    }

    const responseData = await openAIResponse.json();
    const transcribedText = responseData.text;

    // Clean up the temporary file
    fs.unlinkSync(audioFilePath);

    // Respond with the transcription result
    return NextResponse.json({ text: transcribedText });
  } catch (error) {
    console.error('Error during transcription:', error);
    return NextResponse.json(
      { error: 'Failed to transcribe audio' },
      { status: 500 }
    );
  }
}
