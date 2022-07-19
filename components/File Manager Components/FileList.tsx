// Fetch files from Firebase Storage using storage.bucket().getFiles() .
// Display files in a list or grid view.
// Include file name, size, last modified date, and icons.
// Implement pagination for large file lists.

                                // main code here 

// import { useState, useEffect } from 'react';
// import { storage } from '@/FireBase/firebase-admin'; // Assuming you have your Firebase setup

// const FileList = () => {
//     const [files, setFiles] = useState<any[]>([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);
//     const [isLoading, setIsLoading] = useState(false);

//     const fetchFiles = async (page: number) => {
//         setIsLoading(true);
//         try {
//             const [files] = await storage.bucket().getFiles({
//                 // Pagination parameters
//                 maxResults: 10, // Adjust as needed
//                 pageToken: page > 1 ? files[files.length - 1].metadata.generation : undefined,
//             });
//             setFiles(files);
//             setTotalPages(Math.ceil(files[0].metadata.bucket.metageneration / 10)); // Calculate total pages
//         } catch (error) {
//             console.error('Error fetching files:', error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchFiles(currentPage);
//     }, [currentPage]);

//     const handlePageChange = (page: number) => {
//         setCurrentPage(page);
//     };

//     return (
//         <div>
//             <h2>Files</h2>
//             {isLoading && <p>Loading files...</p>}
//             <ul>
//                 {files.map((file) => (
//                     <li key={file.id}>
//                         <a href={file.metadata.mediaLink} target="_blank" rel="noopener noreferrer">
//                             {file.name}
//                         </a>
//                         <span> - {file.metadata.size} bytes</span>
//                         <span> - {new Date(file.metadata.updated).toLocaleDateString()}</span>
//                     </li>
//                 ))}
//             </ul>
//             <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
//         </div>
//     );
// };

// export default FileList;


                                    // main code ended       
                                    
                                    



                                    

// import { useState, useEffect } from 'react';
// import { storage } from '../utils/firebase-admin';

// const FileList = () => {
//   const [files, setFiles] = useState<any[]>([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortBy, setSortBy] = useState('name'); // Default sort by name

//   const fetchFiles = async () => {
//     try {
//       let files = await storage.bucket().getFiles({
//         prefix: searchTerm, // Filter by search term
//       });

//       // Metadata filtering (example: filter by tag)
//       if (searchTerm && searchTerm.startsWith('tag:')) {
//         const tag = searchTerm.substring(4).trim();
//         files = files.filter((file) => {
//           return file.metadata.tags && file.metadata.tags.includes(tag);
//         });
//       }

//       setFiles(files.sort((a, b) => {
//         if (sortBy === 'name') {
//           return a.name.localeCompare(b.name);
//         } else if (sortBy === 'size') {
//           return a.metadata.size - b.metadata.size;
//         } else if (sortBy === 'date') {
//           return new Date(a.metadata.updated).getTime() - new Date(b.metadata.updated).getTime();
//         }
//         return 0;
//       }));
//     } catch (error) {
//       console.error('Error fetching files:', error);
//     }
//   };

//   useEffect(() => {
//     fetchFiles();
//   }, [searchTerm, sortBy]);

//   return (
//     <div>
//       <h2>Files</h2>
//       <div>
//         <input
//           type="text"
//           placeholder="Search files..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         {/* Add sorting options here */}
//       </div>
//       <ul>
//         {files.map((file) => (
//           <li key={file.id}>
//             {/* ... (display file information) */}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default FileList;



        // import Autocomplete from 'react-autocomplete';

        // const FileList = () => {
        //   // ... (other state variables)
        //   const [suggestions, setSuggestions] = useState<string[]>([]);

        //   const fetchSuggestions = async (searchTerm: string) => {
        //     try {
        //       const [files] = await storage.bucket().getFiles({
        //         prefix: searchTerm,
        //       });
        //       setSuggestions(files.map((file) => file.name));
        //     } catch (error) {
        //       console.error('Error fetching suggestions:', error);
        //     }
        //   };

        //   const handleSearchTermChange = (searchTerm: string) => {
        //     setSearchTerm(searchTerm);
        //     fetchSuggestions(searchTerm);
        //   };

        //   return (
        //     <div>
        //       <h2>Files</h2>
        //       <div>
        //         <Autocomplete
        //           getItemValue={(item) => item}
        //           items={suggestions}
        //           renderItem={(item, isHighlighted) => (
        //             <div
        //               style={{ backgroundColor: isHighlighted ? 'lightgray' : 'white' }}
        //             >
        //               {item}
        //             </div>
        //           )}
        //           value={searchTerm}
        //           onChange={handleSearchTermChange}
        //           onSelect={(value, item) => {
        //             setSearchTerm(value);
        //             fetchFiles(); // Fetch files after selecting a suggestion
        //           }}
        //         />
        //         {/* Add sorting options here */}
        //       </div>
        //       {/* ... (rest of the component) */}
        //     </div>
        //   );
        // };

// ... (inside the FileList component)

// return (
//     <div>
//       <h2>Files</h2>
//       <div>
//         <input
//           type="text"
//           placeholder="Search files..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <button onClick={() => {
//           setSearchTerm('');
//           fetchFiles();
//         }}>Clear</button>
//         {/* Add sorting options here */}
//       </div>
//       {/* ... (rest of the component) */}
//     </div>
//   );
  
// 3. Visual Feedback (Highlighting Matching Terms)
// Highlighting Logic: You'll need to add logic to highlight the matching parts of the search term within the file names.
// Regular Expressions: You can use regular expressions to find the matching parts.
// Example:

// ... (inside the FileList component)

// <ul>
//   {files.map((file) => (
//     <li key={file.id}>
//       <span
//         dangerouslySetInnerHTML={{
//           __html: file.name.replace(
//             new RegExp(`(${searchTerm})`, 'gi'),
//             '<span class="highlight">$1</span>'
//           ),
//         }}
//       />
//       {/* ... (display other file information) */}
//     </li>
//   ))}
// </ul>

// // Add CSS for highlighting
// <style jsx>{`
//   .highlight {
//     background-color: yellow;
//   }
// `}</style>








// sorting Logics   


// import { useState, useEffect } from 'react';
// import { storage } from '../utils/firebase-admin';

// const FileList = () => {
//   const [files, setFiles] = useState<any[]>([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortBy, setSortBy] = useState('name'); // Default sort by name

//   const fetchFiles = async () => {
//     try {
//       let files = await storage.bucket().getFiles({
//         prefix: searchTerm, // Filter by search term
//       });

//       // Metadata filtering (example: filter by tag)
//       if (searchTerm && searchTerm.startsWith('tag:')) {
//         const tag = searchTerm.substring(4).trim();
//         files = files.filter((file) => {
//           return file.metadata.tags && file.metadata.tags.includes(tag);
//         });
//       }

//       setFiles(files.sort((a, b) => {
//         if (sortBy === 'name') {
//           return a.name.localeCompare(b.name);
//         } else if (sortBy === 'size') {
//           return a.metadata.size - b.metadata.size;
//         } else if (sortBy === 'date') {
//           return new Date(a.metadata.updated).getTime() - new Date(b.metadata.updated).getTime();
//         }
//         return 0;
//       }));
//     } catch (error) {
//       console.error('Error fetching files:', error);
//     }
//   };

//   useEffect(() => {
//     fetchFiles();
//   }, [searchTerm, sortBy]);

//   return (
//     <div>
//       <h2>Files</h2>
//       <div>
//         <input
//           type="text"
//           placeholder="Search files..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
//           <option value="name">Name</option>
//           <option value="size">Size</option>
//           <option value="date">Date</option>
//         </select>
//       </div>
//       <ul>
//         {files.map((file) => (
//           <li key={file.id}>
//             {/* ... (display file information) */}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default FileList;


// Explanation:
// Sorting Options:
// A select element is added to provide sorting options: "Name", "Size", and "Date".
// The sortBy state is used to track the currently selected sorting option.
// Sorting Logic:
// Inside the fetchFiles function, after fetching the files, the sort method is used to sort the files array.
// The sorting logic uses conditional statements to determine the sorting criteria based on the value of sortBy :
// name : Sorts alphabetically using localeCompare .
// size : Sorts numerically by comparing file sizes.
// date : Sorts chronologically by comparing the last modified dates.
// useEffect Hook:
// The useEffect hook ensures that the files are fetched and sorted whenever searchTerm or sortBy changes.





// Retrive MetaData 

// import { useState, useEffect } from 'react';
// import { storage } from '../utils/firebase-admin';

// const FileList = () => {
//   // ... (other state variables)

//   const fetchFiles = async () => {
//     try {
//       const [files] = await storage.bucket().getFiles({
//         // ... (filtering and sorting logic)
//       });

//       setFiles(files);
//     } catch (error) {
//       console.error('Error fetching files:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Files</h2>
//       {/* ... (search and sorting elements) */}
//       <ul>
//         {files.map((file) => (
//           <li key={file.id}>
//             <span>{file.name}</span>
//             {file.metadata.tags && (
//               <span>Tags: {file.metadata.tags.join(', ')}</span>
//             )}
//             {file.metadata.description && (
//               <span>Description: {file.metadata.description}</span>
//             )}
//             {/* ... (other file information) */}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default FileList;


// Explanation:
// fetchFiles : The fetchFiles function remains the same, fetching files from Firebase Storage.
// Display Metadata:
// Inside the files.map loop, the file.metadata object is used to access the stored metadata.
// The tags and description are displayed if they exist.
