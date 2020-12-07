import wrapAsync from '../../helpers/try-catch-handler'
import apiResponse from '../../helpers/http-response'
import getCache from '../../cache/use-cases/getCache'
import setCache from '../../cache/use-cases/setCache'


const makeGetTransactions = ({ listTransactions}) => {
  return wrapAsync(async (httpRequest) => {
    const { id } = httpRequest.user;
    
    // get cached data    
    const cachedTransactions = await getCache({ id })

    // return cached data if it exists and set cached data if cached data doesnt exist 
    // const transactions = cachedTransactions ? cachedTransactions : (await listTransactions({ id }), await setCache({ id, transactions }));
    let transactions;
    if (cachedTransactions) {
      transactions = cachedTransactions
    } else {
      transactions = await listTransactions({ id })
      // set cached data if cached data doesnt exist
      const setTransactions = await setCache({ id , transactions})
    }

    return apiResponse({
      status: true,
      message: 'Transactions',
      data: [transactions],
      statusCode: 200
    })
  })
}

export default makeGetTransactions
