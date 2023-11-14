import { NetworkType } from 'symbol-sdk'
import { HashAlgorithm } from './hash/HashAlgorithm'
import { ApostilleOption } from './model/ApostilleOption'
import { ApostilleTransaction } from './model/ApostilleTransaction'
import { NetworkInfomation } from './model/NetworkInfomation'

export class ApostilleFacade {
  constructor(
    private hashAlgolthm: HashAlgorithm,
    private networkInfo: NetworkInfomation
  ) {}

  static async getNetworkInfomation(
    nodeUrl: string
  ): Promise<NetworkInfomation> {
    return fetch(`${nodeUrl}/network/properties`, {
      headers: {
        Accept: 'application/json'
      }
    })
      .then((data) => data.json())
      .then((data) => {
        console.log({ data })
        const epoch = data.network.epochAdjustment
        return {
          networkType:
            data.network.identifier === 'testnet'
              ? NetworkType.TEST_NET
              : NetworkType.MAIN_NET,
          generationHash: data.network.generationHashSeed,
          epochAdjustment: Number(epoch.substring(0, epoch.length - 1)),
          feeMultipilier: Number(data.chain.defaultDynamicFeeMultiplier)
        }
      })
  }

  public createApostille(
    data: ArrayBuffer,
    fileName: string,
    ownerPublicKey: string,
    option: ApostilleOption
  ) {
    return ApostilleTransaction.create(
      data,
      fileName,
      ownerPublicKey,
      this.networkInfo,
      this.hashAlgolthm,
      option
    )
  }
}
