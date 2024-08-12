import { apiCall } from '../utils/networking'
import { IChannel } from '../types'

const cachedChannelRecords: {
  [key: string]: Promise<IChannel>
} = {}

type ChannelNameAndId = Pick<IChannel, 'name'| 'id'>

export async function getChannelById(id: string): Promise<IChannel> {
  let cached = cachedChannelRecords[id]
  if (typeof cached !== 'undefined') return await cached
  cached = cachedChannelRecords[id] = apiCall(`Channels/${id}`)

  return await cached
}
