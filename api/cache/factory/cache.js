import redis from 'redis'

const { promisify } = require('util')

const redisPORT = 6379;
const client = redis.createClient(redisPORT);

export const get = promisify(client.get).bind(client);
export const set = promisify(client.setex).bind(client);
export const getList = promisify(client.lrange).bind(client);

export default client
