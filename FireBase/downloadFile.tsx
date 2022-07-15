import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase.config';

const downloadFile = async (fileName: string) => {
    try {
        const storageRef = ref(storage, `uploads/${fileName}`);
        const downloadURL = await getDownloadURL(storageRef);
        console.log('File download URL:', downloadURL);
        return downloadURL;
    } catch (error) {
        console.error('Error downloading file:', error);
    }
};
