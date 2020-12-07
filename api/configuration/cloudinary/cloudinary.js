const cloudinary = require('cloudinary').v2
import { authKeys } from '../../helpers/config'

const url = authKeys.CLOUDINARY_URL
cloudinary.config({
    url
})

const uploader = async (file) => {
    const result = await cloudinary.upload(file, {
        folder: 'profile-pic',
        transformation: [
            {
                width: 450,
                height: 450,
                quality: 'auto',
                fetch_format: 'auto',
                radius: 'max',
                gravity: 'face',
                crop: 'crop'
            },
            { width: 300, crop: 'scale' }
        ]
    })
    return result
}

export default uploader