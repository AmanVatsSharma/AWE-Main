import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase.config'; // Import your storage instance

export const uploadFile = async (file: File) => {
    try {
        const storageRef = ref(storage, `uploads/${file.name}`); // Create a reference to the file in your bucket
        const snapshot = await uploadBytes(storageRef, file); // Upload the file
        const downloadURL = await getDownloadURL(snapshot.ref); // Get the download URL
        console.log('Uploaded file:', downloadURL);
        return downloadURL; // Return the download URL for use in your app
    } catch (error) {
        console.error('Error uploading file:', error);
    }
};
