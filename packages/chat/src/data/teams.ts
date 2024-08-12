import { ITeam } from '../types'
import { apiCall } from '../utils/networking'
import { isTypedArray, isTeam } from '../type-guards'

let cachedAllTeamsList: Promise<ITeam[]>
export async function getAllTeams(): Promise<ITeam[]> {
  if (typeof cachedAllTeamsList === 'undefined')
    cachedAllTeamsList = apiCall('teams')
  .then((responseData) => {
    if (isTypedArray(responseData, isTeam)) {
      return responseData
    }
    throw new Error('Invalid response')
   })

  return await cachedAllTeamsList
}

const cachedTeamRecords: {
  [key: string]: Promise<ITeam>
} = {}

export async function getTeamById(id: string): Promise<ITeam> {
  let cached = cachedTeamRecords[id]
  if (typeof cached === 'undefined')
    cached = cachedTeamRecords[id] = apiCall(`teams/${id}`)
  return await cached
}
