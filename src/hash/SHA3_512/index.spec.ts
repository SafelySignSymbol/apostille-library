import { describe, it, expect, beforeEach } from 'vitest'
import { SHA3_512 } from '.'
import { HashAlgorithm } from '../HashAlgorithm'

describe('SHA3_512', () => {
  let sha256: HashAlgorithm

  beforeEach(() => {
    sha256 = new SHA3_512()
  })

  it('ハッシュアルゴリズムの名前を取得', () => {
    expect(sha256.algorithmName).toBe('sha3_512')
  })

  it('チェックサムを取得', () => {
    expect(sha256.checkSum).toBe('fe4e545991')
  })

  it('ハッシュ値の計算', () => {
    const data = 'APOSTILLE'
    // https://emn178.github.io/online-tools/sha3_512.html?input_type=utf-8&input=APOSTILLE
    const expectedHash =
      '65b9d1af7dbeab2cfe3da434f9062321c04e2e9e1a246b970b74b1067aecbfd07c93da2492457ec327c28fef8a3a2e8e251dccbf65634039747736914dfe7223'
    expect(sha256.calcHash(data)).toBe(expectedHash)
  })
})
