import { HashAlgorithm } from '.'

import { describe, it, expect, beforeEach, vi } from 'vitest'

describe('HashAlgorithm', () => {
  let hashAlgorithm: HashAlgorithm

  beforeEach(() => {
    hashAlgorithm = {
      algorithmName: 'HASH',
      checkSum: '123456789',
      calcHash: vi.fn((data) => `HASHED ${data}`)
    }
  })

  it('ハッシュアルゴリズムの名前を取得', () => {
    expect(hashAlgorithm.algorithmName).toBe('HASH')
  })

  it('チェックサムを取得', () => {
    expect(hashAlgorithm.checkSum).toBe('123456789')
  })

  it('ハッシュ値の計算', () => {
    const data = 'APOSTILLE'
    const expectedHash = `HASHED APOSTILLE`
    expect(hashAlgorithm.calcHash(data)).toBe(expectedHash)
  })
})
