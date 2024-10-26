// import NavBar from './NavBar';
import './App.css';
import TextRender from './TextRender';
import AudioRecorder from './AudioRecorder';

function App() {
  return (
    <>
      {/* <NavBar /> */}
      <TextRender />
      <AudioRecorder textLength={25} />
    </>
  );
}

export default App;
