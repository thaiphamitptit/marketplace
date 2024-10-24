export const getInfoData = <T extends object, K extends keyof T>(obj: T, keys: K[]) => {
  return Object.entries(obj)
    .filter(([key]) => keys.includes(key as K))
    .reduce<Partial<T>>((acc, [key, value]) => {
      acc[key as keyof T] = value
      return acc
    }, {})
}

export const unGetInfoData = <T extends object, K extends keyof T>(obj: T, keys: K[]) => {
  return Object.entries(obj)
    .filter(([key]) => !keys.includes(key as K))
    .reduce<Partial<T>>((acc, [key, value]) => {
      acc[key as keyof T] = value
      return acc
    }, {})
}

export const getSelectData = (keys: string[]) => {
  return Object.fromEntries(keys.map((key) => [key, 1]))
}

export const unGetSelectData = (keys: string[]) => {
  return Object.fromEntries(keys.map((key) => [key, 0]))
}

export const isMatchArrays = <T>(a: T[], b: T[]) => {
  if (a.length !== b.length) {
    return false
  }
  const sortedA = [...a].sort()
  const sortedB = [...b].sort()
  return sortedA.every((value, index) => value === sortedB[index])
}
