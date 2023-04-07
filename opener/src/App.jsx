import { useState } from "react"
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'

// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const App = () => {
  const [file, setFile] = useState('');
  const plugin = defaultLayoutPlugin({ renderToolbar: false });
  const handleChange = (e) => {
    const uploadFile = e.target.files[0];
    if (uploadFile.type !== "application/pdf") {
      e.target.value = '';
      setFile('');
      alert("Upload a pdf file!");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setFile(reader.result);
    }
    reader.readAsDataURL(uploadFile);
  }
  return (
    <div>
      <input type="file" onChange={handleChange} required />


      {
        file && <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <Viewer fileUrl={file} plugins={[plugin]} />;
        </Worker>
      }
    </div>
  )
}

export default App