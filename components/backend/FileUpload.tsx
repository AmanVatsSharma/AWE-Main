"use client";
import { uploadFile } from '@/FireBase/uploadFile';
import { useState } from 'react';

type FileUploadProps = {
    size?: 'small' | 'medium' | 'large';
    onFilesUploaded: (urls: string[]) => void;
};

const sizeClasses = {
    small: 'w-48 h-48',
    medium: 'w-72 h-72',
    large: 'w-96 h-96',
};

const FileUpload: React.FC<FileUploadProps> = ({ size = 'medium', onFilesUploaded }) => {
    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(event.target.files || []);
        setFiles([...files, ...selectedFiles]);

        const selectedPreviews = selectedFiles.map(file => URL.createObjectURL(file));
        setPreviews([...previews, ...selectedPreviews]);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const droppedFiles = Array.from(event.dataTransfer.files);
        setFiles([...files, ...droppedFiles]);

        const droppedPreviews = droppedFiles.map(file => URL.createObjectURL(file));
        setPreviews([...previews, ...droppedPreviews]);
    };

    const handleUpload = async () => {
        setUploading(true);
        setError(null);
        const urls: string[] = [];

        try {
            for (const file of files) {
                const url = await uploadFile(file);
                if (url) {
                    urls.push(url);
                } else {
                    throw new Error("Failed to get a valid URL for one of the files.");
                }
            }
            onFilesUploaded(urls);
        } catch (error) {
            setError("Failed to upload files. Please try again.");
        } finally {
            setUploading(false);
            setFiles([]);
            setPreviews([]);
        }
    };

    return (
        <div className={`border m-3 p-3 rounded-sm ${sizeClasses[size]} ${uploading && 'opacity-50'}`}>
            <div
                className="relative border-dashed border-2 border-gray-300 p-4 rounded-lg cursor-pointer hover:bg-gray-100"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    multiple
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                />
                <p className="text-center text-gray-500">Drag and drop files here or click to select</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
                {previews.map((preview, index) => (
                    <div key={index} className="relative">
                        <img src={preview} alt="Preview" className="object-cover rounded-lg w-full h-full" />
                    </div>
                ))}
            </div>

            {error && <p className="text-red-500 mt-2">{error}</p>}

            <button
                onClick={handleUpload}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-600 disabled:opacity-50"
                disabled={uploading || files.length === 0}
            >
                {uploading ? 'Uploading...' : 'Upload'}
            </button>
        </div>
    );
};

export default FileUpload;
