import multer from 'multer';
// const upload = multer({ dest: "images/" });
import { v2 as cloudinary } from 'cloudinary';

import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Configuration
cloudinary.config({
  cloud_name: 'fuderrpham',
  api_key: '865592985827542',
  api_secret: process.env.CLOUDIARY_SECRET, // Click 'View API Keys' above to copy your API secret
});
//env: CLOUDINARY_URL=cloudinary://865592985827542:Y4bTq2JKnHagV-lg3-PU5mVt_mc@fuderrpham

const storageCloud = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'images',
  } as any,
});

export default storageCloud;
