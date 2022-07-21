import { storage } from '@/FireBase/firebase-admin';
import { useState } from 'react';

export const CreateFolder = () => {
    const [folderName, setFolderName] = useState('');

    const handleCreateFolder = async () => {
        try {
            const folderPath = `/${folderName}`; // Assuming you want to create folders at the root level
            await storage.bucket().file(folderPath).save(Buffer.from(''));
            console.log(`Folder ${folderName} created successfully!`);
            setFolderName(''); // Clear the input field
        } catch (error) {
            console.error('Error creating folder:', error);
        }
    };

    return (
        <div>
            <h2>Create Folder</h2>
            <input
                type="text"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
            />
            <button onClick={handleCreateFolder}>Create</button>
        </div>
    );
};



export const RenameFolder = ({ folderPath, onFolderUpdated }: {
  folderPath: string;
  onFolderUpdated: (updatedFolderPath: string) => void;
}) => {
  const [newFolderName, setNewFolderName] = useState('');

  const handleRenameFolder = async () => {
    try {
      const oldPath = folderPath;
      const newPath = `${oldPath.substring(0, oldPath.lastIndexOf('/'))}/${newFolderName}`;
      await storage.bucket().file(oldPath).move(newPath);
      onFolderUpdated(newPath);
      setNewFolderName('');
    } catch (error) {
      console.error('Error renaming folder:', error);
    }
  };

  return (
    <div>
      <h2>Rename Folder</h2>
      <input
        type="text"
        value={newFolderName}
        onChange={(e) => setNewFolderName(e.target.value)}
      />
      <button onClick={handleRenameFolder}>Rename</button>
    </div>
  );
};

export const DeleteFolder = ({ folderPath, onFolderDeleted }: {
  folderPath: string;
  onFolderDeleted: () => void;
}) => {
  const handleDeleteFolder = async () => {
    try {
      await storage.bucket().file(folderPath).delete();
      onFolderDeleted();
    } catch (error) {
      console.error('Error deleting folder:', error);
    }
  };

  return (
    <div>
      <h2>Delete Folder</h2>
      <button onClick={handleDeleteFolder}>Delete</button>
    </div>
  );
};
