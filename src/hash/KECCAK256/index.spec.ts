import { describe, it, expect, beforeEach } from 'vitest'
import { KECCAK256 } from '.'
import { HashAlgorithm } from '../HashAlgorithm'

describe('KECCAK256', () => {
  let sha256: HashAlgorithm

  beforeEach(() => {
    sha256 = new KECCAK256()
  })

  it('ハッシュアルゴリズムの名前を取得', () => {
    expect(sha256.algorithmName).toBe('keccak_256')
  })

  it('チェックサムを取得', () => {
    expect(sha256.checkSum).toBe('fe4e545988')
  })

  it('ハッシュ値の計算', () => {
    const data = 'APOSTILLE'
    // https://emn178.github.io/online-tools/keccak_256.html?input_type=utf-8&input=APOSTILLE
    const expectedHash =
      'f279d55d41567375283d7d662448da92e33bf01e087aa8883f5bbd634d3ff9b3'
    expect(sha256.calcHash(data)).toBe(expectedHash)
  })
})
