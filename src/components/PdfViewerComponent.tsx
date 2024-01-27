/* File: src/components/PdfViewerComponent.tsx */
import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { PDFDocumentProxy } from 'pdfjs-dist';

interface IPdfViewerComponentProps {
  file: string | ArrayBuffer | Uint8Array;
}

const PdfViewerComponent: React.FC<IPdfViewerComponentProps> = ({ file }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const onDocumentLoadSuccess = (pdfDocument: PDFDocumentProxy) => {
    setNumPages(pdfDocument.numPages);
    setPageNumber(1);
  };

  const onDocumentLoadError = (error: any) => {
    console.error('Error loading document:', error);
  };

  const goToPreviousPage = () => {
    setPageNumber(prevPageNumber => prevPageNumber > 1 ? prevPageNumber - 1 : 1);
  };

  const goToNextPage = () => {
    setPageNumber(prevPageNumber => numPages && prevPageNumber < numPages ? prevPageNumber + 1 : prevPageNumber);
  };

  const goToFirstPage = () => {
    setPageNumber(1);
  };

  return (
    <>
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadError}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <div>
        {pageNumber > 1 && (
          <button onClick={goToPreviousPage}>Anterior</button>
        )}
        <span>Página {pageNumber} de {numPages ?? 0}</span>
        {pageNumber < (numPages ?? 0) ? (
          <button onClick={goToNextPage}>Próxima</button>
        ) : (
          <button onClick={goToFirstPage}>Início</button>
        )}
      </div>
    </>
  );
};

export default PdfViewerComponent;