// Display previews of images, videos, and other supported file types.
// Use a library like react-image-file-resizer for image resizing.
// Handle different file types gracefully.



       // main file starts here 

// import { useState, useEffect } from 'react';
// import { storage } from '@/FireBase/firebase-admin';
// import { useDropzone } from 'react-dropzone';
// import  resizeImage  from 'react-image-file-resizer';

// // Import react-image-file-resizer
// const FilePreview = ({ filePath }: { filePath: string }) => {
//     const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//     const [isLoading, setIsLoading] = useState(false);

//     useEffect(() => {
//         const fetchPreview = async () => {
//             setIsLoading(true);
//             try {
//                 const fileRef = storage.bucket().file(filePath);
//                 const [fileData] = await fileRef.get();

//                 // Determine file type and handle preview
//                 const fileType = fileData.metadata.contentType;
//                 if (fileType.startsWith('image/')) {
//                     // Image preview
//                     const resizedImage = await resizeImage(fileData.data, {
//                         width: 200, // Adjust as needed
//                         height: 200, // Adjust as needed
//                     });
//                     setPreviewUrl(URL.createObjectURL(resizedImage));
//                 } else if (fileType.startsWith('video/')) {
//                     // Video preview (you might need a video player library)
//                     setPreviewUrl(URL.createObjectURL(fileData.data));
//                 } else {
//                     // Default preview (e.g., file icon)
//                     setPreviewUrl(null);
//                 }
//             } catch (error) {
//                 console.error('Error fetching preview:', error);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchPreview();
//     }, [filePath]);

//     return (
//         <div>
//             {isLoading && <p>Loading preview...</p>}
//             {previewUrl ? (
//                 <img src={previewUrl} alt="File Preview" />
//             ) : (
//                 <p>Preview not available</p>
//             )}
//         </div>
//     );
// };

// export default FilePreview;


                          // main file ends here




                          


// with react player 



// import ReactPlayer from 'react-player'; // Import react-player

// // ... (rest of the code)

// const fetchPreview = async () => {
//   // ... (fetch file data)

//   if (fileType.startsWith('video/')) {
//     // Video preview
//     setPreviewUrl(URL.createObjectURL(fileData.data));
//   } else {
//     // ... (other file types)
//   }
// };

// // ... (rest of the code)

// return (
//   <div>
//     {isLoading && <p>Loading preview...</p>}
//     {previewUrl ? (
//       fileType.startsWith('video/') ? (
//         <ReactPlayer url={previewUrl} controls />
//       ) : (
//         <img src={previewUrl
