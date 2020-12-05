import mongoose from 'mongoose'
import { DatabaseError } from '../../helpers/errors'
import { image } from 'faker'

// const objectId = mongoose.Types.ObjectId
const makeProfileDB = ({ ProfilePic }) => {
    async function insert({ id, ...imageDetails }) {
        try {

        const newProfilePic = new ProfilePic({ ...imageDetails })
        const ProfilePic = await newProfilePic.save()

        }catch(err){
            throw new DatabaseError(error)
        }

        return { ProfilePic }
    }

    // Write update function

    return Object.freeze({
        insert
    })
}

export default makeProfileDB