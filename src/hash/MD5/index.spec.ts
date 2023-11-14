import { describe, it, expect, beforeEach } from 'vitest'
import { MD5 } from '.'
import { HashAlgorithm } from '../HashAlgorithm'

describe('MD5', () => {
  let sha256: HashAlgorithm

  beforeEach(() => {
    sha256 = new MD5()
  })

  it('ハッシュアルゴリズムの名前を取得', () => {
    expect(sha256.algorithmName).toBe('md5')
  })

  it('チェックサムを取得', () => {
    expect(sha256.checkSum).toBe('fe4e545981')
  })

  it('ハッシュ値の計算', () => {
    const data = 'APOSTILLE'
    // https://emn178.github.io/online-tools/md5.html?input_type=utf-8&input=APOSTILLE&hmac_input_type=utf-8
    const expectedHash = '7c55f20f999af8e37a344dbda583016b'
    expect(sha256.calcHash(data)).toBe(expectedHash)
  })
})
