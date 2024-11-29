import React, { useState, useEffect, useRef } from 'react';
import AWS from 'aws-sdk';

// AWS Polly Configuration for TTS
AWS.config.update({
    region: process.env.NEXT_PUBLIC_REGION,
    accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
  });
  
  

const polly = new AWS.Polly();

/**
 * InstructionReader is a React component that provides a voice-controlled
 * interface for reading instructions aloud. It uses the Web Speech Recognition
 * API to recognize voice commands and control the instruction reading
 * experience.
 *
 * The component accepts an array of strings as a prop, where each string is an
 * instruction to be read aloud. The component also renders a set of action
 * buttons that allow the user to control the instruction reading experience.
 *
 * The component is designed to be used in a recipe or DIY tutorial context,
 * where the user needs to follow a series of instructions to complete a task.
 * 
 * It renders a set of action buttons to read all instructions, stop reading, and
 * toggle listening. It also displays the current instruction and transcription.
 *
 * Voice commands are supported to control the reading flow. The supported commands
 * are:
 *   - 'pause': Pause the current instruction playback.
 *   - 'resume': Resume the current instruction playback.
 *   - 'next step': Go to the next instruction and continue reading.
 *   - 'go back': Go to the previous instruction and continue reading.
 *
 * @param {string[]} instructions - An array of strings, where each string is an
 * instruction to be read aloud.
 *
 * @returns {React.ReactElement/JSX.Element} - A React component that renders the instruction
 * reading interface.
 */
const InstructionReader = ({ instructions }) => {
  const [recognition, setRecognition] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [currentInstructionIndex, setCurrentInstructionIndex] = useState(0);
  const isReadingRef = useRef(false); // Ref to track reading state
  const audioRef = useRef(null);
  const currentInstructionRef = useRef(0); // Ref for immediate access to current index


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

/**
 * Handles errors from the speech recognition process.
 * Logs the error to the console for debugging purposes.
 *
 * @param {SpeechRecognitionErrorEvent} error - The error event emitted by the speech recognition process.
 */
    speechRecognition.onerror = (error) => {
      console.error('Speech Recognition Error:', error);
    };

    setRecognition(speechRecognition);
  }, []);

/**
 * Synthesizes speech using AWS Polly given a text.
 * @param {string} text The text to synthesize into speech.
 * @returns {Promise<Audio>} The audio object containing the synthesized speech.
 */
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
    }
  };


/**
 * Handles voice commands from the user.
 * @param {string} command - The voice command given by the user.
 * @example
 * Currently supports the following commands:
 * - pause: pause the current instruction audio
 * - resume: resume the current instruction audio
 * - next step: stop the current instruction audio and play the next instruction
 * - go back: stop the current instruction audio and play the previous instruction

 */
  const handleVoiceCommand = (command) => {
    console.log(currentInstructionRef.current,'command:',command);
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
        console.log(currentInstructionRef.current);
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
      console.log(currentInstructionRef.current);
      setCurrentInstructionIndex(i); // Sync with state for UI updates
  
      const text = instructions[i];
      console.log(text)
      const audio = await synthesizeSpeech(text);
      audioRef.current = audio;
  
      audio.play();
      // Wait for the current instruction to finish playing
      await new Promise((resolve) => {
        audio.onended = resolve;
      });
    }
    console.log('done')
  stopReading('stop')
  }

  const stopReading = (action = '') => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset the audio to the start
      audioRef.current = null; // Clear the reference to the audio
    }
  
    if (action === 'stop') {
      // Full stop: Reset everything
      isReadingRef.current = false; // Update ref to indicate reading has stopped
      currentInstructionRef.current = 0; // Reset instruction index reference
      setCurrentInstructionIndex(0); // Reset the current instruction state
      setTranscription(''); // Clear the transcription state
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
    {/* Read All Instructions Button */}
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

    {/* Stop Reading Button */}
    <button
  onClick={()=>stopReading('stop')}
  className={`px-4 py-2 rounded-lg font-semibold transition duration-200 ${
    !isReadingRef.current
      ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
      : 'bg-red-600 text-white hover:bg-red-700'
  }`}
  disabled={!isReadingRef.current}
>
  Stop
</button>

    {/* Toggle Listening Button */}
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
