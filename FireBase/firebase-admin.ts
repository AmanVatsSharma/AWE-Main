import * as admin from 'firebase-admin';

const serviceAccount = require('./path/to/your/serviceAccountKey.json'); // Replace with your actual path

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET, // Replace with your bucket name
});

export const storage = admin.storage();
