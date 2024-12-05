import React, { useState, useEffect, useRef } from 'react';
import AWS from 'aws-sdk';

// AWS Polly Configuration for TTS
AWS.config.update({
  region: process.env.NEXT_PUBLIC_REGION,
  accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
});

const polly = new AWS.Polly();

const InstructionReader = ({ instructions }) => {
  const [recognition, setRecognition] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [currentInstructionIndex, setCurrentInstructionIndex] = useState(0);
  const [error, setError] = useState(null); // Track errors
  const isReadingRef = useRef(false);
  const audioRef = useRef(null);
  const currentInstructionRef = useRef(0);

  // Initialize Web Speech Recognition API
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Web Speech Recognition is not supported in this browser.');
      return;
    }

    const speechRecognition = new window.webkitSpeechRecognition();
    speechRecognition.continuous = true;
    speechRecognition.interimResults = false;
    speechRecognition.lang = 'en-US';

    speechRecognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.trim();
      setTranscription(transcript);
      handleVoiceCommand(transcript.toLowerCase());
    };

    speechRecognition.onerror = (error) => {
      console.error('Speech Recognition Error:', error);
      setError(`Speech Recognition Error: ${error.error || 'Unknown error'}`);
    };

    setRecognition(speechRecognition);
  }, []);

  const synthesizeSpeech = async (text) => {
    const params = {
      Text: text,
      OutputFormat: 'mp3',
      VoiceId: 'Salli',
    };

    try {
      const data = await polly.synthesizeSpeech(params).promise();
      const audioBlob = new Blob([data.AudioStream], { type: 'audio/mp3' });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      return audio;
    } catch (err) {
      console.error('Error synthesizing speech:', err);
      setError('Failed to synthesize speech. Please try again.');
      return null; // Return null to signal failure
    }
  };

  const handleVoiceCommand = (command) => {
    if (!command) return;

    console.log(currentInstructionRef.current, 'command:', command);

    if (command.includes('pause')) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    } else if (command.includes('resume')) {
      if (audioRef.current) {
        audioRef.current.play();
      }
    } else if (command.includes('next step')) {
      if (currentInstructionRef.current < instructions.length - 1) {
        stopReading(); // Stop current playback without resetting state
        const newIndex = currentInstructionRef.current + 1;
        currentInstructionRef.current = newIndex; // Update ref
        setCurrentInstructionIndex(newIndex); // Sync with state
        readInstructionAtIndex(newIndex, true); // Play new instruction and continue reading
      }
    } else if (command.includes('go back')) {
      if (currentInstructionRef.current > 0) {
        stopReading(); // Stop current playback without resetting state
        const newIndex = currentInstructionRef.current - 1;
        currentInstructionRef.current = newIndex; // Update ref
        setCurrentInstructionIndex(newIndex); // Sync with state
        readInstructionAtIndex(newIndex, true); // Play new instruction and continue reading
      }
    }
  };

  const readInstructionAtIndex = async (index, continueReading = false) => {
    // Stop any existing playback
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset the audio to the start
      audioRef.current = null; // Clear the reference
    }

    const text = instructions[index];
    const audio = await synthesizeSpeech(text);
    if (!audio) return; // Exit if speech synthesis failed

    audioRef.current = audio;

    // Play the new audio
    audio.play();

    // Wait for the current instruction to finish playing
    await new Promise((resolve) => {
      audio.onended = resolve;
    });

    // Continue reading the next instruction if requested
    if (continueReading && index < instructions.length - 1) {
      readInstructionAtIndex(index + 1, true); // Recursively read the next instruction
    }
  };

  const readAllInstructions = async () => {
    isReadingRef.current = true; // Mark as reading
    for (let i = currentInstructionRef.current; i < instructions.length; i++) {
      if (!isReadingRef.current) break; // Check ref for interruption
      currentInstructionRef.current = i; // Update ref
      setCurrentInstructionIndex(i); // Sync with state for UI updates

      const text = instructions[i];
      const audio = await synthesizeSpeech(text);
      if (!audio) break; // Exit if speech synthesis failed

      audioRef.current = audio;
      audio.play();

      // Wait for the current instruction to finish playing
      await new Promise((resolve) => {
        audio.onended = resolve;
      });
    }
    stopReading('stop');
  };

  const stopReading = (action = '') => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }

    if (action === 'stop') {
      isReadingRef.current = false;
      currentInstructionRef.current = 0;
      setCurrentInstructionIndex(0);
      setTranscription('');
      setError(null); // Clear any errors
      if (isListening) toggleListening(); // Stop listening if active
    }
  };

  const toggleListening = () => {
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
    setIsListening(!isListening);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Voice-Controlled Instruction Reader
      </h1>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 mb-4">
        <button
          onClick={readAllInstructions}
          disabled={isReadingRef.current}
          className={`px-4 py-2 rounded-lg font-semibold transition duration-200 ${
            isReadingRef.current
              ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isReadingRef.current ? 'Reading...' : 'Read All Instructions'}
        </button>
        <button
          onClick={() => stopReading('stop')}
          disabled={!isReadingRef.current}
          className={`px-4 py-2 rounded-lg font-semibold transition duration-200 ${
            !isReadingRef.current
              ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
              : 'bg-red-600 text-white hover:bg-red-700'
          }`}
        >
          Stop
        </button>
        <button
          onClick={toggleListening}
          className={`px-4 py-2 rounded-lg font-semibold transition duration-200 ${
            isListening
              ? 'bg-red-600 text-white hover:bg-red-700'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          {isListening ? 'Stop Listening' : 'Start Listening'}
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="p-4 mb-4 bg-red-100 text-red-600 border border-red-200 rounded">
          {error}
        </div>
      )}

      {/* Current Instruction Display */}
      <div className="p-4 bg-white rounded-lg shadow-inner">
        <p className="text-lg font-semibold text-gray-700 mb-2">
          <strong>Current Instruction:</strong> {instructions[currentInstructionIndex]}
        </p>
        <p className="text-gray-600">
          <strong>Transcription:</strong> {transcription || 'Waiting for voice input...'}
        </p>
      </div>
    </div>
  );
};

export default InstructionReader;
