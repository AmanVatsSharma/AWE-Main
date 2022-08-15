// // components/ProductImageUploader.tsx

// import { uploadFile } from '@/FireBase/uploadFile';
// import { useState } from 'react';
// import { useDropzone } from 'react-dropzone';
// import { RxCross2 } from "react-icons/rx";

// interface Image {
//     file: File;
//     preview: string;
//     url?: string;
// }

// interface Image {
//     file: File;
//     preview: string;
//     url?: string;
// }

// const ProductImageUploader = ({ onFilesUploaded }: { onFilesUploaded: (files: Image[]) => void }) => {
//     const [images, setImages] = useState<Image[]>([]);
//     const [compress, setCompress] = useState(false);

//     const { getRootProps, getInputProps, isDragActive } = useDropzone({
//         accept: 'image/*',
//         multiple: true,
//         onDrop: (acceptedFiles) => {
//             handleFiles(acceptedFiles);
//         },
//     });

//     const handleFiles = async (files: File[]) => {
//         const newImages = files.map(file => ({
//             file,
//             preview: URL.createObjectURL(file),
//         }));
//         setImages(prevImages => [...prevImages, ...newImages]);

//         const uploadedFiles = await Promise.all(
//             newImages.map(async image => {
//                 const url = await uploadFile(image.file);
//                 return { ...image, url };
//             })
//         );

//         if (onFilesUploaded) {
//             onFilesUploaded(uploadedFiles);
//         }
//     };

//     const removeImage = (file: File) => {
//         setImages(images.filter(image => image.file !== file));
//     };

//     const toggleCompress = () => {
//         setCompress(!compress);
//     };

//     return (
//         <div className="relative border-2 border-dashed border-gray-300 p-4 rounded-lg">
//             <div
//                 {...getRootProps()}
//                 className={`flex flex-col items-center justify-center p-4 rounded-lg cursor-pointer ${isDragActive ? 'bg-gray-100' : 'bg-gray-50'}`}
//             >
//                 <input {...getInputProps()} />
//                 <div className="text-center">
//                     <p className="text-gray-500">Drag & drop images here, or click to select files</p>
//                     <div className="flex items-center mt-2">
//                         <label className="inline-flex items-center">
//                             <input
//                                 type="checkbox"
//                                 checked={compress}
//                                 onChange={toggleCompress}
//                                 className="form-checkbox"
//                             />
//                             <span className="ml-2 text-gray-700">Enable compression</span>
//                         </label>
//                     </div>
//                 </div>
//             </div>
//             <div className="mt-4">
//                 {images.length > 0 && (
//                     <>
//                         <div className="relative mb-4">
//                             <img
//                                 src={images[0].preview}
//                                 alt="Main"
//                                 className="w-full h-64 object-cover rounded-lg"
//                             />
//                             <button
//                                 type="button"
//                                 className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md"
//                                 onClick={() => removeImage(images[0].file)}
//                             >
//                                 <RxCross2 className="w-6 h-6 text-red-500" />
//                             </button>
//                         </div>
//                         <div className="grid grid-cols-3 gap-4">
//                             {images.slice(1).map(image => (
//                                 <div key={image.file.name} className="relative">
//                                     <img
//                                         src={image.preview}
//                                         alt="Preview"
//                                         className="w-full h-32 object-cover rounded-lg"
//                                     />
//                                     <button
//                                         type="button"
//                                         className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md"
//                                         onClick={() => removeImage(image.file)}
//                                     >
//                                         <RxCross2 className="w-6 h-6 text-red-500" />
//                                     </button>
//                                 </div>
//                             ))}
//                         </div>
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ProductImageUploader;


// New Modified Model // New Modified Model // New Modified Model // New Modified Model 


// import { uploadFile } from '@/FireBase/uploadFile';
// import { useState } from 'react';
// import { useDropzone } from 'react-dropzone';
// import { RxCross2 } from "react-icons/rx";

// interface Image {
//     file: File;
//     preview: string;
//     url?: string;
// }

// const ProductImageUploader = ({ onFilesUploaded }: { onFilesUploaded: (files: Image[]) => void }) => {
//     const [images, setImages] = useState<Image[]>([]);
//     const [compress, setCompress] = useState(false);

//     const { getRootProps, getInputProps, isDragActive } = useDropzone({
//         accept: 'image/*',
//         multiple: true,
//         onDrop: (acceptedFiles) => {
//             handleFiles(acceptedFiles);
//         },
//     });

//     const handleFiles = async (files: File[]) => {
//         const newImages = files.map(file => ({
//             file,
//             preview: URL.createObjectURL(file),
//         }));
//         setImages(prevImages => [...prevImages, ...newImages]);

//         const uploadedFiles = await Promise.all(
//             newImages.map(async image => {
//                 const url = await uploadFile(image.file);
//                 return { ...image, url };
//             })
//         );

//         if (onFilesUploaded) {
//             onFilesUploaded(uploadedFiles);
//         }
//     };

//     const removeImage = (file: File) => {
//         setImages(images.filter(image => image.file !== file));
//         // Notify parent of removal (if needed)
//         // onFilesUploaded(images.filter(image => image.file !== file).map(image => image.url!));
//     };

//     const toggleCompress = () => {
//         setCompress(!compress);
//     };

//     return (
//         <div className="relative border-2 border-dashed border-gray-300 p-4 rounded-lg">
//             <div
//                 {...getRootProps()}
//                 className={`flex flex-col items-center justify-center rounded-lg cursor-pointer transition-all duration-300 ${
//                     isDragActive ? 'bg-gray-100 h-60' : 'bg-gray-50 h-44'
//                 }`}
//             >
//                 <input {...getInputProps()} />
//                 <div className="text-center">
//                     <p className="text-gray-500">Drag & drop images here, or click to select files</p>
//                     <div className="flex items-center mt-2">
//                         <label className="inline-flex items-center">
//                             <input
//                                 type="checkbox"
//                                 checked={compress}
//                                 onChange={toggleCompress}
//                                 className="form-checkbox"
//                             />
//                             <span className="ml-2 text-gray-700">Enable compression</span>
//                         </label>
//                     </div>
//                 </div>
//             </div>
//             <div className="mt-4">
//                 {images.length > 0 && (
//                     <>
//                         <div className="relative mb-4">
//                             <img
//                                 src={images[0].preview}
//                                 alt="Main"
//                                 className="w-full h-64 object-contain rounded-lg" // Use object-contain to avoid cropping
//                             />
//                             <button
//                                 type="button"
//                                 className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md"
//                                 onClick={() => removeImage(images[0].file)}
//                             >
//                                 <RxCross2 className="w-6 h-6 text-red-500" />
//                             </button>
//                         </div>
//                         <div className="grid grid-cols-3 gap-4">
//                             {images.slice(1).map(image => (
//                                 <div key={image.file.name} className="relative">
//                                     <img
//                                         src={image.preview}
//                                         alt="Preview"
//                                         className="w-full h-32 object-contain rounded-lg" // Use object-contain to avoid cropping
//                                     />
//                                     <button
//                                         type="button"
//                                         className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md"
//                                         onClick={() => removeImage(image.file)}
//                                     >
//                                         <RxCross2 className="w-6 h-6 text-red-500" />
//                                     </button>
//                                 </div>
//                             ))}
//                         </div>
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ProductImageUploader;



// New Modified Model // New Modified Model // New Modified Model // New Modified Model 


import { uploadFile } from '@/FireBase/uploadFile';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { RxCross2 } from "react-icons/rx";

interface Image {
    file: File;
    preview: string;
    url?: string;
}

const ProductImageUploader = ({ onFilesUploaded }: { onFilesUploaded: (files: Image[]) => void }) => {
    const [images, setImages] = useState<Image[]>([]);
    const [compress, setCompress] = useState(false);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            'image/*': []
        },
        multiple: true,
        onDrop: (acceptedFiles) => {
            handleFiles(acceptedFiles);
        },
    });

    const handleFiles = async (files: File[]) => {
        const newImages = files.map(file => ({
            file,
            preview: URL.createObjectURL(file),
        }));
        setImages(prevImages => [...prevImages, ...newImages]);

        const uploadedFiles = await Promise.all(
            newImages.map(async image => {
                const url = await uploadFile(image.file);
                return { ...image, url };
            })
        );

        if (onFilesUploaded) {
            onFilesUploaded(uploadedFiles);
        }
    };

    const removeImage = (file: File) => {
        setImages(images.filter(image => image.file !== file));
        // Notify parent of removal (if needed)
        // onFilesUploaded(images.filter(image => image.file !== file).map(image => image.url!));
    };

    const toggleCompress = () => {
        setCompress(!compress);
    };

    return (
        <div className="relative border-2 border-dashed border-gray-300 p-4 rounded-lg">
            <div
                {...getRootProps()}
                className={`flex flex-col items-center justify-center rounded-lg cursor-pointer transition-all duration-300 ${
                    isDragActive ? 'bg-gray-100 h-60' : 'bg-gray-50 h-44'
                }`}
            >
                <input {...getInputProps()} />
                <div className="text-center">
                    <p className="text-gray-500">Drag & drop images here, or click to select files</p>
                    <div className="flex items-center mt-2">
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                checked={compress}
                                onChange={toggleCompress}
                                className="form-checkbox"
                            />
                            <span className="ml-2 text-gray-700">Enable compression</span>
                        </label>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                {images.length > 0 && (
                    <>
                        <div className="relative mb-4 flex items-start space-x-2 overflow-x-auto">
                            <img
                                src={images[0].preview}
                                alt="Main"
                                className="w-60 h-60 object-contain rounded-lg" // Use object-contain to avoid cropping
                            />
                            <button
                                type="button"
                                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md"
                                onClick={() => removeImage(images[0].file)}
                            >
                                <RxCross2 className="w-6 h-6 text-red-500" />
                            </button>
                        </div>
                        <div className="flex space-x-2 overflow-x-auto">
                            {images.slice(1).map(image => (
                                <div key={image.file.name} className="relative flex-shrink-0">
                                    <img
                                        src={image.preview}
                                        alt="Preview"
                                        className="w-32 h-32 object-contain rounded-lg" // Use object-contain to avoid cropping
                                    />
                                    <button
                                        type="button"
                                        className="absolute top-1 right-1 p-1 bg-white rounded-full shadow-md"
                                        onClick={() => removeImage(image.file)}
                                    >
                                        <RxCross2 className="w-5 h-5 text-red-500" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductImageUploader;
