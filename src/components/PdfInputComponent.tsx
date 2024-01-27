/* File: src/components/PdfInputComponent.tsx */
import React, { useState } from 'react';
import PdfViewerComponent from './PdfViewerComponent';

const MAX_SIZE = 10 * 1024 * 1024; // 10MB

const PdfInputComponent = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    console.log('selectedFile:', selectedFile);
    const [fileURL, setFileURL] = useState<string | null>(null);
    console.log('fileURL:', fileURL);

    const [error, setError] = useState<string>('');
    const [isViewerVisible, setIsViewerVisible] = useState<boolean>(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        setError('');
        setIsViewerVisible(false); // Reseta a visualização do PDF
        if (fileURL) URL.revokeObjectURL(fileURL); // Limpa a URL do arquivo anterior

        if (file) {
            if (file.type !== "application/pdf") {
                setError('Por favor, carregue apenas arquivos PDF.');
                return;
            }
            if (file.size > MAX_SIZE) {
                setError('O arquivo é muito grande. Por favor, carregue arquivos menores que 10MB.');
                return;
            }
            setSelectedFile(file);
            // Cria uma URL do objeto do arquivo e atualiza o estado
            setFileURL(URL.createObjectURL(file));
        }
    };

    const toggleViewer = () => {
        setIsViewerVisible(!isViewerVisible);
    };

    return (
        <div className="upload-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <input
                style={{ marginBottom: '5px', padding: '5px' }}
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
            />
            {fileURL && (
                <button
                    style={{ padding: '5px', border: '1px solid #000', cursor: 'pointer', marginBottom: '5px' }}
                    onClick={toggleViewer}
                >
                    {isViewerVisible ? 'Ocultar arquivo' : 'Visualizar arquivo'}
                </button>
            )}
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {isViewerVisible && fileURL && <PdfViewerComponent file={fileURL} />}
        </div>
    );
};

export default PdfInputComponent;