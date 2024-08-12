import { stringifyError } from 'chat-stdlib'
import { HTTPError } from 'http-error'

/**
 *
 * @param input
 * @param [init]
 */
async function getJSON(input: RequestInfo, init?: RequestInit) {
  try {
    const response = await fetch(input, init)
    const responseJSON = await response.json()
    return { response, json: responseJSON }
  } catch (err) {
    throw new Error(
      stringifyError(
        err,
        `Networking/getJSONn: An error was encountered while fetching ${JSON.stringify(
          input,
        )}`,
      ),
    )
  }
}

/**
 *
 * @param path
 * @param [init]
 */
export async function apiCall(path: string, init?: RequestInit) {
  let response
  /** @type {{}} */
  let json
  try {
    const jsonRespInfo = await getJSON(`/api/${path}`, init)
    response = jsonRespInfo.response
    json = jsonRespInfo.json
  } catch (err) {
    if (err instanceof HTTPError) throw err
    throw new Error(
      stringifyError(
        err,
        `Networking/apiCall: An error was encountered while making api call to ${path}`,
      ),
    )
  }
  if (!response.ok) {
    json = null
    throw new HTTPError(response, 'Problem while making API call')
  }
  return json
}
