// Use storage.bucket().file(filePath).createReadStream() to download files.
// Provide a download button or link.
// Handle file download progress.
// // 


                     // main file starts here


// import { useState } from 'react';
// import { storage } from '@/FireBase/firebase-admin'; // Assuming you have your Firebase setup

// const FileDownload = ({ filePath }: { filePath: string }) => {
//     const [downloadProgress, setDownloadProgress] = useState(0);

//     const handleDownload = async () => {
//         const fileRef = storage.bucket().file(filePath);
//         const downloadStream = fileRef.createReadStream();

//         downloadStream.on('data', (chunk) => {
//             // Calculate download progress
//             const progress = (downloadStream.bytesRead / downloadStream.size) * 100;
//             setDownloadProgress(progress);
//         });

//         downloadStream.on('error', (error) => {
//             console.error('Error downloading file:', error);
//         });

//         downloadStream.on('finish', () => {
//             console.log('File downloaded successfully!');
//             setDownloadProgress(0);
//         });

        // You can use a library like 'file-saver' to save the downloaded file
        // to the user's device.
        // Example:
        // import { saveAs } from 'file-saver';
        // saveAs(downloadStream, filePath);


            //         import { useState } from 'react';
            // import { storage } from '../utils/firebase-admin';
            // import { saveAs } from 'file-saver'; // Import file-saver

            // const FileDownload = ({ filePath }: { filePath: string }) => {
            // // ... (rest of the code is the same)

            // const handleDownload = async () => {
            //     // ... (download logic)

            //     // Save the downloaded file using file-saver
            //     saveAs(downloadStream, filePath);
            // };

            // // ... (rest of the code)
            // };

            // export default FileDownload;

 //   };

//     return (
//         <div>
//             <button onClick={handleDownload}>Download</button>
//             {downloadProgress > 0 && (
//                 <progress value={downloadProgress} max="100" />
//             )}
//         </div>
//     );
// };

// export default FileDownload;
