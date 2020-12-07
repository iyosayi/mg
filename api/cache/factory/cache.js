import redis from 'redis'

const util = require('util')
const redisPORT = 6379;
const client = redis.createClient(redisPORT);

export const get = util.promisify(client.get);
export const set = util.promisify(client.setex);
export const getList = util.promisify(client.lrange);

export default client
