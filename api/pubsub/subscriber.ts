import amqp from 'amqplib'
import AMQP_URI from '../helpers/config'
import { MessageBrokerError } from '../helpers/Errors'

const assertQueueOptions = { durable: true }
const assertExchangeOptions = { durable: true }
const consumeQueueOptions = { noAck: false }
const exchange = 'escrow'

const consumer = async (queue: string, func: string, key: string) => {
  try {
    const conn = await amqp.connect(AMQP_URI)
    const channel = await conn.createChannel()
    await channel.assertExchange(exchange, 'topic', assertExchangeOptions)
    await channel.assertQueue(queue, assertQueueOptions)
    await channel.bindQueue(queue, exchange, key)
    await channel.consume(
      queue,
      (msg: string) => {
        func(msg.content.toString())
        channel.ack(msg)
      },
      consumeQueueOptions
    )
    return channel
  } catch (error) {
    throw new MessageBrokerError(error.message)
  }
}

export default consumer
