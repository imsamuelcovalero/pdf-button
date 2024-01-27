import React from 'react';

const PdfInput = () => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      // Aqui você pode processar o arquivo PDF
      console.log('Arquivo PDF selecionado:', file);
    } else {
      console.log('Por favor, selecione um arquivo PDF.');
    }
  }

  return (
    <div>
      <label htmlFor="pdfInput">Selecione um arquivo PDF:</label>
      <input type="file" id="pdfInput" accept="application/pdf" onChange={handleFileChange} />
    </div>
  );
}

export default PdfInput;
