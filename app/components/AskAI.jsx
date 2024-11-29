import { useState } from "react";
import AWS from "aws-sdk";

/**
 * A modal component that pops up when the user clicks on the colorful
 * animated button. It allows the user to ask a question and gets an
 * answer from Whisper API. The answer is displayed in a modal and there
 * is an option to read the answer aloud using AWS Polly.
 */
const RecipeTips = ({ recipe }) => {
  const [isOpen, setIsOpen] = useState(false); // Controls the modal
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [answer, setAnswer] = useState("");
  const [isPlaying, setIsPlaying] = useState(false); // To track if TTS is playing

  const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  // AWS Polly configuration
  AWS.config.update({
    region: process.env.NEXT_PUBLIC_REGION,
    accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
  });

  const synthesizeSpeech = async (text) => {
    const params = {
      Text: text,
      OutputFormat: "mp3",
      VoiceId: "Salli", // You can choose another voice, like Joanna, Matthew, etc.
    };

    const polly = new AWS.Polly();
    try {
      const data = await polly.synthesizeSpeech(params).promise();
      const audioBlob = new Blob([data.AudioStream], { type: "audio/mp3" });
      const audioUrl = URL.createObjectURL(audioBlob);

      const audio = new Audio(audioUrl);
      audio.play();

      setIsPlaying(true);

      audio.onended = () => {
        setIsPlaying(false);
      };
    } catch (error) {
      console.error("Error synthesizing speech:", error);
    }
  };

  const handleAskQuestion = async () => {
    setLoading(true);
    setAnswer("");

    try {
      console.log(recipe);
      const response = await fetch(`${url}/api/whisper`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question, recipe }),
      });

      const data = await response.json();
      if (response.ok) {
        setAnswer(data.answer);
      } else {
        setAnswer("Sorry, I couldn't fetch tips at the moment.");
      }
    } catch (error) {
      setAnswer("An error occurred while fetching the tips.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setQuestion("");
    setAnswer("");
  };

  return (
    <>
      {/* Colorful Animated Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-16 h-16 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full flex items-center justify-center animate-pulse fixed bottom-24 right-8 shadow-lg"
      >
        <span className="w-12 h-12 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-full"></span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-96 p-6 rounded-lg shadow-lg relative">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            <h2 className="text-lg font-bold mb-4">Ask for Tips</h2>

            {/* Textarea */}
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask something like: How can I make this vegan?"
              rows="4"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Buttons */}
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={handleClose}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAskQuestion}
                disabled={loading || !question.trim()}
                className={`px-4 py-2 text-white rounded ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? "Loading..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading Animation */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Response Modal */}
      {answer && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white w-96 p-6 rounded-lg shadow-lg relative">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            <h2 className="text-lg font-bold mb-4">Answer</h2>
            <p>{answer}</p>

            {/* Read Button */}
            <button
              onClick={() => synthesizeSpeech(answer)}
              disabled={isPlaying}
              className={`mt-4 px-4 py-2 bg-green-500 text-white rounded ${
                isPlaying ? "bg-gray-400 cursor-not-allowed" : "hover:bg-green-600"
              }`}
            >
              {isPlaying ? "Reading..." : "Read Aloud"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default RecipeTips;
