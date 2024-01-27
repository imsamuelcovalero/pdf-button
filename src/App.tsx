/* File: src/App.tsx */
import PdfInputComponent from './components/PdfInputComponent';
// import PdfInputComponent from './components/PdfInput/PdfInputComponent';
import React, { useState } from 'react'

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fatherFunction = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setSelectedFile(file);
    }
  }
  return (
    <>
      <p>Hello</p>
      <PdfInputComponent fatherFunction={fatherFunction} />
    </>
  )
}

export default App
