import { describe, it, expect, beforeEach } from 'vitest'
import { ApostilleFacade, HashType } from '.'

const nodeUrl = 'https://sym-test-03.opening-line.jp:3001'
const hash = '952355CC83D1C464F9979FA6AD18CB8FEE21AAF142459017F7292B41B45C0DCC'
const publicKey =
  '1EEFDD16D611A68D033DBDF89C7D07D387D1363D72DBF6B1152D6855B746696B'
const payload =
  'fe4e545983066D4ACFC95696BCA9267ADB5FEA9C23EC241707A60BA736A6EE35769CA16BDB85D984930C5F9FEAAD62851BFE184618F92F32E3CB1576509F466397A9031A09'

describe('ApostilleFacade', () => {
  describe('getAuditData', async () => {
    const info = await ApostilleFacade.getNetworkInfomation(nodeUrl)
    const facade = new ApostilleFacade(HashType.SHA256, info)
    const result = await facade.getAuditData(nodeUrl, hash)
    it('Apostilleアカウントの公開鍵が取得できる', () => {
      expect(result.apostilleAccountPublicKey).toBe(publicKey)
    })
    it('Apostilleのpayloadが取得できる', () => {
      expect(result.payload).toBe(payload)
    })
  })

  describe('auditApostille', async () => {
    const info = await ApostilleFacade.getNetworkInfomation(nodeUrl)
    const facade = new ApostilleFacade(HashType.SHA256, info)

    const failedResult = facade.auditApostille('', payload, publicKey)
    const successResult = facade.auditApostille('APOSTILLE', payload, publicKey)

    it('適切でないデータの場合失敗する', () => {
      expect(failedResult).toBe(false)
    })
    it('適切なデータの場合成功する', () => {
      expect(successResult).toBe(true)
    })
  })
})
