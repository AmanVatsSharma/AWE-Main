// Provide actions for files:
// Rename: Use storage.bucket().file(oldPath).move(newPath) .
// Delete: Use storage.bucket().file(filePath).delete() .
// Share: Generate a public URL using storage.bucket().file(filePath).getSignedUrl({ action: 'read', expires: '01-01-2025' }) .
// Move: Use storage.bucket().file(oldPath).move(newPath) .
// Copy: Use storage.bucket().file(filePath).copy(newPath) .


import { useState } from 'react';
import { storage } from '@/FireBase/firebase-admin';

const FileActions = ({ filePath, onFileUpdated }: {
    filePath: string;
    onFileUpdated: (updatedFilePath: string) => void;
}) => {
    const [isRenaming, setIsRenaming] = useState(false);
    const [newFileName, setNewFileName] = useState('');
    const [isMoving, setIsMoving] = useState(false);
    const [newFolderPath, setNewFolderPath] = useState('');

    const handleRename = async () => {
        setIsRenaming(true);
        try {
            const oldPath = filePath;
            const newPath = `${oldPath.substring(0, oldPath.lastIndexOf('/'))}/${newFileName}`;
            await storage.bucket().file(oldPath).move(newPath);
            onFileUpdated(newPath);
            setIsRenaming(false);
            setNewFileName('');
        } catch (error) {
            console.error('Error renaming file:', error);
            setIsRenaming(false);
        }
    };

    const handleDelete = async () => {
        try {
            await storage.bucket().file(filePath).delete();
            onFileUpdated(''); // Or handle deletion differently
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    };

    const handleShare = async () => {
        try {
            const url = await storage.bucket().file(filePath).getSignedUrl({
                action: 'read',
                expires: '01-01-2025', // Set expiration date
            });
            // Handle the generated URL (e.g., copy to clipboard)
            console.log('Public URL:', url);
        } catch (error) {
            console.error('Error generating public URL:', error);
        }
    };

    const handleMove = async () => {
        setIsMoving(true);
        try {
            const oldPath = filePath;
            const newPath = `${newFolderPath}/${oldPath.substring(oldPath.lastIndexOf('/') + 1)}`;
            await storage.bucket().file(oldPath).move(newPath);
            onFileUpdated(newPath);
            setIsMoving(false);
            setNewFolderPath('');
        } catch (error) {
            console.error('Error moving file:', error);
            setIsMoving(false);
        }
    };

    const handleCopy = async () => {
        try {
            const oldPath = filePath;
            const newPath = `${oldPath.substring(0, oldPath.lastIndexOf('/'))}/${oldPath.substring(oldPath.lastIndexOf('/') + 1)}`;
            await storage.bucket().file(oldPath).copy(newPath);
            onFileUpdated(newPath);
        } catch (error) {
            console.error('Error copying file:', error);
        }
    };

    return (
        <div>
            <button onClick={handleRename} disabled={isRenaming}>
                Rename
            </button>
            {isRenaming && (
                <div>
                    <input
                        type="text"
                        value={newFileName}
                        onChange={(e) => setNewFileName(e.target.value)}
                    />
                    <button onClick={handleRename}>Confirm</button>
                </div>
            )}
            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleShare}>Share</button>
            <button onClick={handleMove} disabled={isMoving}>
                Move
            </button>
            {isMoving && (
                <div>
                    <input
                        type="text"
                        value={newFolderPath}
                        onChange={(e) => setNewFolderPath(e.target.value)}
                    />
                    <button onClick={handleMove}>Confirm</button>
                </div>
            )}
            <button onClick={handleCopy}>Copy</button>
        </div>
    );
};

export default FileActions;
