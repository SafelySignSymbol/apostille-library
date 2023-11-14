import { describe, it, expect, beforeEach } from 'vitest'
import { SHA3_256 } from '.'
import { HashAlgorithm } from '../HashAlgorithm'

describe('SHA3_256', () => {
  let sha256: HashAlgorithm

  beforeEach(() => {
    sha256 = new SHA3_256()
  })

  it('ハッシュアルゴリズムの名前を取得', () => {
    expect(sha256.algorithmName).toBe('sha3_256')
  })

  it('チェックサムを取得', () => {
    expect(sha256.checkSum).toBe('fe4e545990')
  })

  it('ハッシュ値の計算', () => {
    const data = 'APOSTILLE'
    // https://emn178.github.io/online-tools/sha3_256.html?input_type=utf-8&input=APOSTILLE
    const expectedHash =
      '528a289a7e787ef35e1fa9e1deee068d54ad82cb57be220e346a451baf7f088c'
    expect(sha256.calcHash(data)).toBe(expectedHash)
  })
})
