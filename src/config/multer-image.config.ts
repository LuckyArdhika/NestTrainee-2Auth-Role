import * as dotenv from 'dotenv';
dotenv.config();
import { extname } from 'path';

// Multer configuration
export const fileFilter = (req, file, callback) => {
    if (!file) {
        return callback(new Error('No file uploaded'), false);
    }
    if (!file.originalname.match(/\.(png|jpg|jpeg|gif|pdf|PNG|JPG|JPEG|GIF|PDF)$/)) {
        return callback(new Error('Only jpg, jpeg, png, gif or pdf files are allowed!'), false);
    }
    callback(null, true);
};

export const editFileName = (req, file, callback) => {
    const name = (file.originalname.split('.')[0]).replace(/ /g, "_");
    const fileExtName = extname(file.originalname);
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
};