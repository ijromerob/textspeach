// This component will be recording the audio from the person
// IMPORTS
import { useState, useEffect, useRef } from "react";

// constant for speed of reading
const readingSpeed = 600; //milliseconds per word

function AudioRecorder({ textLength }) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("SpeechRecognition is not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setTranscript(speechResult);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error detected" + event.error);
    };

    if (isRecording) {
      recognition.start();
    } else {
      recognition.stop();
    }

    return () => {
      recognition.stop();
    };
  }, [isRecording]); // Run once on mount whe is Recording Changes

  return (
    <div>
      <button onClick={() => setIsRecording((prev) => !prev)}>
        {isRecording ? "Stop Recording" : "Record!"}
      </button>
      {transcript && <p>Transcript: {transcript}</p>}
    </div>
  );
}

export default AudioRecorder;
