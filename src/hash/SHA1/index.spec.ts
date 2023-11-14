import { describe, it, expect, beforeEach } from 'vitest'
import { SHA1 } from '.'
import { HashAlgorithm } from '../HashAlgorithm'

describe('MD5', () => {
  let sha256: HashAlgorithm

  beforeEach(() => {
    sha256 = new SHA1()
  })

  it('ハッシュアルゴリズムの名前を取得', () => {
    expect(sha256.algorithmName).toBe('sha1')
  })

  it('チェックサムを取得', () => {
    expect(sha256.checkSum).toBe('fe4e545982')
  })

  it('ハッシュ値の計算', () => {
    const data = 'APOSTILLE'
    // https://emn178.github.io/online-tools/sha1.html?input_type=utf-8&input=APOSTILLE&hmac_input_type=utf-8
    const expectedHash = '5136d6e9df4ec57b60af52ff7ed34be1ae80c6aa'
    expect(sha256.calcHash(data)).toBe(expectedHash)
  })
})
