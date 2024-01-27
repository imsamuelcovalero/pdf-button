/* File: src/components/PdfViewerComponent.tsx */
import React, { useState, useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import 'pdfjs-dist/build/pdf.worker.entry';

interface PdfViewerComponentProps {
  file: string; // ou outro tipo apropriado se você estiver usando um tipo de dado diferente para o arquivo
}

const PdfViewerComponent: React.FC<PdfViewerComponentProps> = ({ file }) => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [numPages, setNumPages] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const fetchPdf = async () => {
      if (!canvasRef.current) return;

      try {
        // Carregar o documento PDF
        const pdf = await pdfjsLib.getDocument(file).promise;

        // Define o número total de páginas
        setNumPages(pdf.numPages);

        // Obter a página desejada
        const page = await pdf.getPage(pageNumber);

        // Configurar o canvas para renderizar o PDF
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (!context) return;

        const viewport = page.getViewport({ scale: 1.5 });
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Renderizar a página no canvas
        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        await page.render(renderContext).promise;
      } catch (error) {
        console.error('Erro ao carregar o PDF:', error);
      }
    };

    fetchPdf();
  }, [file, pageNumber]);

  const goToPreviousPage = () => setPageNumber(prevPage => prevPage > 1 ? prevPage - 1 : prevPage);
  const goToNextPage = () => setPageNumber(prevPage => prevPage < (numPages ?? 0) ? prevPage + 1 : prevPage);

  return (
    <div>
      <canvas ref={canvasRef} />
      <div>
        {pageNumber > 1 && <button onClick={goToPreviousPage}>Anterior</button>}
        <span>Página {pageNumber} de {numPages ?? 0}</span>
        {pageNumber < (numPages ?? 0) && <button onClick={goToNextPage}>Próxima</button>}
      </div>
    </div>
  );
};

export default PdfViewerComponent;