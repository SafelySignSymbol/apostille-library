export const fixPrivateKey = (privateKey: string) => {
  return `0000000000000000000000000000000000000000000000000000000000000000${privateKey.replace(
    /^00/,
    ''
  )}`.slice(-64)
}
