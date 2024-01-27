import React, { useState } from 'react';
import PdfViewerComponent from './PdfViewerComponent';

// Define o tamanho máximo do arquivo permitido para upload (10 megabytes)
const MAX_SIZE = 10 * 1024 * 1024;

// Componente que lida com a entrada e visualização de arquivos PDF
const PdfInputComponent = () => {
    // Estado para armazenar o arquivo selecionado pelo usuário
    const [selectedFile, setSelectedFile] = useState(null);
    // Estado para armazenar a URL do objeto do arquivo para visualização
    const [fileURL, setFileURL] = useState(null);
    // Estado para armazenar mensagens de erro
    const [error, setError] = useState('');
    // Estado para controlar a visibilidade do componente PdfViewerComponent
    const [isViewerVisible, setIsViewerVisible] = useState(false);

    // Função chamada quando um arquivo é selecionado no input
    const handleFileChange = (event) => {
        const file = event.target.files ? event.target.files[0] : null;
        setError('');
        setIsViewerVisible(false); // Reseta a visualização do PDF
        // Libera a URL anterior para evitar vazamentos de memória
        if (fileURL) URL.revokeObjectURL(fileURL);

        if (file) {
            // Verifica se o tipo do arquivo é PDF
            if (file.type !== "application/pdf") {
                setError('Por favor, carregue apenas arquivos PDF.');
                return;
            }
            // Verifica se o tamanho do arquivo está dentro do limite permitido
            if (file.size > MAX_SIZE) {
                setError('O arquivo é muito grande. Por favor, carregue arquivos menores que 10MB.');
                return;
            }
            // Atualiza o estado com o arquivo selecionado
            setSelectedFile(file);
            // Cria e armazena a URL do objeto do arquivo para visualização
            setFileURL(URL.createObjectURL(file));
        }
    };

    // Função para alternar a visibilidade do visualizador de PDF
    const toggleViewer = () => {
        setIsViewerVisible(!isViewerVisible);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
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
            {/* Condicionalmente renderiza o visualizador de PDF se um arquivo foi selecionado e a visualização está ativada */}
            {isViewerVisible && fileURL && <PdfViewerComponent file={fileURL} />}
        </div>
    );
};

export default PdfInputComponent;