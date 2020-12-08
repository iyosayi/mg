import { get } from "../factory/cache"

const getCachedTransactions = async ({ email }) => {
    const cachedTransactions = await get(email)
    const foundTransactions = JSON.parse(cachedTransactions)
    return foundTransactions;
    
}



export default getCachedTransactions
