import { describe, it, expect, beforeEach } from 'vitest'
import { KECCAK512 } from '.'
import { HashAlgorithm } from '../HashAlgorithm'

describe('KECCAK512', () => {
  let sha256: HashAlgorithm

  beforeEach(() => {
    sha256 = new KECCAK512()
  })

  it('ハッシュアルゴリズムの名前を取得', () => {
    expect(sha256.algorithmName).toBe('keccak_512')
  })

  it('チェックサムを取得', () => {
    expect(sha256.checkSum).toBe('fe4e545989')
  })

  it('ハッシュ値の計算', () => {
    const data = 'APOSTILLE'
    // https://emn178.github.io/online-tools/keccak_512.html?input_type=utf-8&input=APOSTILLE
    const expectedHash =
      '318f90af5fd8a76358c84b0e64429f460cf4200ee05bf70bc677b3d4c6a81161f586e3483e0fbc2ea203f6c844592ae52b7848f295e7fa6a474c02aa883bbe51'
    expect(sha256.calcHash(data)).toBe(expectedHash)
  })
})
