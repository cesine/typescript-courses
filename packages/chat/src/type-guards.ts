import { ITeam } from './types'

export function isTypedArray<T>(arg: unknown[], guard: (toTest: unknown) => toTest is T): arg is T[] {
  return Array.isArray(arg) && arg.every(guard)
}

export function isTeam(arg: unknown): arg is ITeam {
  return (
    arg !== null &&
    typeof arg === 'object' &&
    'iconUrl' in arg &&
    typeof (arg as any).iconUrl === 'string' &&
    'name' in arg &&
    typeof (arg as any).name === 'string' &&
    'id' in arg &&
    typeof (arg as any).id === 'string' &&
    'channels' in arg &&
    typeof (arg as any).channels !== 'undefined' &&
    Array.isArray((arg as any).channels)
  )
}

const teamArray: unknown[] = [];
if (isTypedArray(teamArray, isTeam)) {
  teamArray // $ExpectType ITeam[]
}