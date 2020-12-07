import { get } from "../factory/cache"

const getCachedTransactions = async ({ id } = {}) => {
    const foundTransactions = await get(id)
    return foundTransactions;
    
}



export default getCachedTransactions
