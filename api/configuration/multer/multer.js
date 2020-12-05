import multer from 'multer'
import { existsSync, mkdir } from 'fs'
import pathf from 'path'

const dir = pathf.resolve(__dirname, '../../uploads')

//directory function using IIFE to check if folder exists
;(function createDirectory(directory){
    if(!existsSync(directory)){
        mkdir(pathf.join(__dirname, '..', 'uploads'), {
            recursive: true
        }, error => {
            if(error) throw err
            return 'created'
        })
    }
})(dir)

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, pathf.join(__dirname, '..', 'uploads'));
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + pathf.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });
export default upload