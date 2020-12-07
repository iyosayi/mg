//entity does not rely on any of the other layers
//ID function passed has methods exposed on it to validate id
export default function buildUploadProfilePic({DB}){
    return function uploadProfilePic({
        id,
        image
    } = {}){
        if(!DB.isValid(id)){
            throw new Error('That is not a valid User ID')
        }
        if(!image){
            throw new Error('There must be an image')
        }

        return Object.freeze({
            getId: () => id, //modifications can go in here
            getImage: () => image //object is readonly when used outside this scope
        })
    }
}