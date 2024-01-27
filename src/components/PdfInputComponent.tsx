/* File: src/components/PdfInputComponent.tsx */
import React, { useState } from 'react';
import PdfViewerComponent from './PdfViewerComponent';

const MAX_SIZE = 10 * 1024 * 1024; // 10MB
interface PdfInputComponentProps {
    fatherFunction: (files: File[]) => void;
}

const PdfInputComponent: React.FC<PdfInputComponentProps> = ({ fatherFunction }) => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [fileURLs, setFileURLs] = useState<string[]>([]);
    const [currentViewingFile, setCurrentViewingFile] = useState<number | null>(null);
    const [error, setError] = useState<string>('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError('');
        const files = event.target.files;
        if (files) {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (file.type !== "application/pdf") {
                    setError('Por favor, carregue apenas arquivos PDF.');
                    return;
                }
                if (file.size > MAX_SIZE) {
                    setError('O arquivo é muito grande. Por favor, carregue arquivos menores que 10MB.');
                    return;
                }
                setSelectedFiles(prevFiles => [...prevFiles, file]);
                setFileURLs(prevURLs => [...prevURLs, URL.createObjectURL(file)]);
            }
        }
    };

    // Função para limpar a URL de um arquivo específico
    const clearFileURL = (index: number) => {
        setFileURLs(prevURLs => {
            URL.revokeObjectURL(prevURLs[index]);
            return prevURLs.filter((_, i) => i !== index);
        });
        setSelectedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    };

    return (
        <div className="upload-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <input
                style={{ marginBottom: '5px', padding: '5px' }}
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                multiple
            />
            {fileURLs.map((url, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                        {currentViewingFile === index ? (
                            <>
                                <button
                                    style={{ padding: '5px', border: '1px solid #000', cursor: 'pointer', marginRight: '5px' }}
                                    onClick={() => setCurrentViewingFile(null)}
                                >
                                    Ocultar arquivo
                                </button>
                                <button
                                    style={{ padding: '5px', border: '1px solid #000', cursor: 'pointer' }}
                                    onClick={() => clearFileURL(index)}
                                >
                                    Remover arquivo {index + 1}
                                </button>
                            </>
                        ) : (
                            <button
                                style={{ padding: '5px', border: '1px solid #000', cursor: 'pointer', marginRight: '5px' }}
                                onClick={() => setCurrentViewingFile(index)}
                            >
                                Arquivo {index + 1}
                            </button>
                        )}
                    </div>
                    {currentViewingFile === index && <PdfViewerComponent file={url} />}
                </div>
            ))}
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
};

export default PdfInputComponent;