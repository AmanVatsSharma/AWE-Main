// Use a file input element to allow users to select files.
// Implement drag-and-drop functionality for a better user experience.
// Use storage.bucket().file(filePath).save(fileData) to upload files to Firebase Storage.
// Display progress indicators during uploads.



                            //main file starts here 

// import { useState } from 'react';
// import { storage } from '@/FireBase/firebase-admin'; // Assuming you have your Firebase setup

// const FileUpload = () => {
//     const [selectedFile, setSelectedFile] = useState<File | null>(null);
//     const [uploadProgress, setUploadProgress] = useState(0);

//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         if (event.target.files && event.target.files[0]) {
//             setSelectedFile(event.target.files[0]);
//         }
//     };

//     const handleFileUpload = async () => {
//         if (!selectedFile) return;

//         const fileRef = storage.bucket().file(selectedFile.name);
//         const uploadTask = fileRef.save(selectedFile);

//         uploadTask.on(
//             'state_changed',
//             (snapshot) => {
//                 const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//                 setUploadProgress(progress);
//             },
//             (error) => {
//                 console.error('Error uploading file:', error);
//             },
//             () => {
//                 console.log('File uploaded successfully!');
//                 setUploadProgress(0);
//                 setSelectedFile(null);
//             }
//         );
//     };

//     return (
//         <div>
//             <h2>Upload File</h2>
//             <input type="file" onChange={handleFileChange} />
//             {selectedFile && (
//                 <div>
//                     <p>Selected file: {selectedFile.name}</p>
//                     <button onClick={handleFileUpload}>Upload</button>
//                     <progress value={uploadProgress} max="100" />
//                 </div>
//             )}
//         </div>
//     );
// };

// export default FileUpload;



                           //main file ends here 






//  important drag and drop functionality below




// import { useState } from 'react';
// import { storage } from '../utils/firebase-admin';
// import { useDropzone } from 'react-dropzone';

// const FileUpload = () => {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [uploadProgress, setUploadProgress] = useState(0);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop: (acceptedFiles) => {
//       setSelectedFile(acceptedFiles[0]);
//     },
//   });

//   // ... (rest of the code is the same as before)

//   return (
//     <div {...getRootProps()}>
//       <input {...getInputProps()} />
//       {isDragActive ? (
//         <p>Drop the files here...</p>
//       ) : (
//         <p>Drag 'n' drop some files here, or click to select files</p>
//       )}
//       {/* ... (rest of the UI) */}
//     </div>
//   );
// };

// export default FileUpload;









// import { useState } from 'react';
// import { storage } from '../utils/firebase-admin';

// const FileUpload = () => {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [tags, setTags] = useState<string[]>([]);
//   const [description, setDescription] = useState('');

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files[0]) {
//       setSelectedFile(event.target.files[0]);
//     }
//   };

//   const handleFileUpload = async () => {
//     if (!selectedFile) return;

//     const fileRef = storage.bucket().file(selectedFile.name);
//     const uploadTask = fileRef.save(selectedFile, {
//       metadata: {
//         tags,
//         description,
//       },
//     });

//     // ... (rest of the upload logic)
//   };

//   return (
//     <div>
//       <h2>Upload File</h2>
//       <input type="file" onChange={handleFileChange} />
//       {selectedFile && (
//         <div>
//           <p>Selected file: {selectedFile.name}</p>
//           <div>
//             <label htmlFor="tags">Tags:</label>
//             <input
//               type="text"
//               id="tags"
//               value={tags.join(', ')}
//               onChange={(e) => setTags(e.target.value.split(',').map((tag) => tag.trim()))}
//             />
//           </div>
//           <div>
//             <label htmlFor="description">Description:</label>
//             <textarea
//               id="description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//             />
//           </div>
//           <button onClick={handleFileUpload}>Upload</button>
//           <progress value={uploadProgress} max="100" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default FileUpload;
