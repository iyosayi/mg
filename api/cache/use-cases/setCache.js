import { set, setAsync } from "../factory/cache"


const setCachedTransactions = async ({ email, transactions } = {}) => {
    const cacheTransactions = await set(email, 1800, JSON.stringify(transactions))
    console.log("success")
    return;
}

export default setCachedTransactions

