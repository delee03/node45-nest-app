import { diskStorage } from 'multer';
import * as path from 'path';
// const upload = multer({ dest: "images/" });

import * as fs from 'fs';

fs.mkdirSync('images/', { recursive: true });

//cách 2:
const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExt = path.extname(file.originalname);
    const fileName = 'local' + '-' + uniqueSuffix + fileExt;
    // console.log(file.fieldname + "-" + uniqueSuffix);
    // console.log({ fileExt });
    cb(null, fileName);
  },
});

export default storage;
