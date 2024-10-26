// This component will be recording the audio from the person
// IMPORTS
import { useState, useEffect, useRef } from 'react';

// constant for speed of reading
const readingSpeed = 600; //milliseconds per word

function AudioRecorder({ textLength }) {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');

  const audioChunksRef = useRef([]); // Change: Use useRef to prevent stale closure issues with audioChunks

  useEffect(() => {
    const startRecording = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (event) => {
        // Change: Push data to the ref object to prevent issues with state not updating in time
        audioChunksRef.current.push(event.data);
      };

      recorder.onstop = () => {
        // Change: Move audio chunk handling here to ensure we are working with the most recent data
        const audioBlob = new Blob(audioChunksRef.current, {
          type: 'audio/wav',
        });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);

        // Reset the ref array for the next recording
        audioChunksRef.current = [];
      };

      setMediaRecorder(recorder);
    };

    startRecording();

    // Clean up the stream on unmount
    return () => {
      if (mediaRecorder) {
        mediaRecorder.stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []); // Run once on mount

  useEffect(() => {
    if (isRecording && mediaRecorder) {
      mediaRecorder.start();

      // Automatically stop recording after textLength * readingSpeed milliseconds
      const recordingDuration = textLength * readingSpeed;
      const stopRecordingTimeout = setTimeout(() => {
        mediaRecorder.stop();
        setIsRecording(false);
      }, recordingDuration);

      // Clean up the timeout when the component unmounts or recording stops
      return () => clearTimeout(stopRecordingTimeout);
    }
  }, [isRecording, mediaRecorder, textLength]);

  return (
    <div>
      <button onClick={() => setIsRecording(true)}>Record!</button>
      {audioURL && <audio controls src={audioURL} />}{' '}
      {/* Display the recorded audio */}
    </div>
  );
}

export default AudioRecorder;
