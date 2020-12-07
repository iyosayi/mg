import { set } from "../factory/cache"


const setCachedTransactions = async ({ id, transactions } = {}) => {
    const cacheTransactions = await set(id, 1800,transactions,)
    console.log("success")
    return;
}

export default setCachedTransactions
