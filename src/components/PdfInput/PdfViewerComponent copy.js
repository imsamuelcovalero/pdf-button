import React, { useState, useEffect } from 'react';
import { Document, Page } from 'react-pdf';

// Componente responsável por exibir um documento PDF
const PdfViewerComponent = ({ file }) => {
  // Estado para armazenar o número total de páginas no PDF
  const [numPages, setNumPages] = useState(null);
  // Estado para armazenar a página atual que está sendo exibida
  const [pageNumber, setPageNumber] = useState(1);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    // Resetar o erro ao tentar carregar um novo arquivo
    setLoadError(null);
  }, [file]);

  // Função chamada quando o documento PDF é carregado com sucesso
  const onDocumentLoadSuccess = (pdfDocument) => {
    // Define o número total de páginas do documento
    setNumPages(pdfDocument.numPages);
    // Reseta a visualização para a primeira página
    setPageNumber(1);
  };

  // Função chamada em caso de erro no carregamento do documento
  const onDocumentLoadError = (error) => {
    console.error('Error loading document:', error);
    setLoadError('Falha ao carregar o documento PDF.', error);
  };

  // Função para navegar para a página anterior
  const goToPreviousPage = () => {
    setPageNumber((prevPageNumber) => prevPageNumber > 1 ? prevPageNumber - 1 : 1);
  };

  // Função para navegar para a próxima página
  const goToNextPage = () => {
    setPageNumber((prevPageNumber) => numPages && prevPageNumber < numPages ? prevPageNumber + 1 : prevPageNumber);
  };

  // Função para voltar para a primeira página
  const goToFirstPage = () => {
    setPageNumber(1);
  };

  return (
    <>
      {loadError ? (
        <div style={{ color: 'red' }}>{loadError}</div> // Exibir mensagem de erro, se houver
      ) : (
    <>
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadError}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <div>
        {/* Renderiza botões de navegação e informações sobre a página atual */}
        {pageNumber > 1 && (
          <button onClick={goToPreviousPage}>Anterior</button>
        )}
        <span>Página {pageNumber} de {numPages}</span>
        {pageNumber < numPages ? (
          <button onClick={goToNextPage}>Próxima</button>
        ) : (
          <button onClick={goToFirstPage}>Início</button>
        )}
      </div>
    </>
    )}
  </>
  );
};

export default PdfViewerComponent;