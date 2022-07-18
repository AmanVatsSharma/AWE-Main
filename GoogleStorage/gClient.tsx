// // lib/storage.ts
// import { Storage } from '@google-cloud/storage';
// import { ReadStream } from 'fs';
// import { v4 as uuidv4 } from 'uuid';

// const storage = new Storage({
//     keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
// });
// const bucket = storage.bucket(process.env.GOOGLE_CLOUD_BUCKET_NAME!);

// export const uploadFile = async (file: Express.Multer.File): Promise<string> => {
//     const { buffer, originalname, mimetype } = file;

//     const fileName = `${uuidv4()}-${originalname}`;
//     const fileUpload = bucket.file(fileName);

//     const stream = fileUpload.createWriteStream({
//         metadata: {
//             contentType: mimetype,
//         },
//     });

//     return new Promise((resolve, reject) => {
//         stream.on('error', (error) => reject(error));
//         stream.on('finish', () => {
//             fileUpload.makePublic().then(() => {
//                 resolve(`https://storage.googleapis.com/${process.env.GOOGLE_CLOUD_BUCKET_NAME}/${fileName}`);
//             });
//         });
//         stream.end(buffer);
//     });
// };
