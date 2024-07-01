import {
  Address,
  AggregateTransaction,
  Convert,
  Deadline,
  MultisigAccountModificationTransaction,
  NetworkType,
  PublicAccount
} from 'symbol-sdk'
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
    data: string,
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

  public auditApostille(
    data: string,
    payload: string,
    apostilleAccountPulicKey: string
  ) {
    const hashedData = this.hashAlgolthm.calcHash(data)
    const message = this.parseMessage(payload)
    const apostilleAccount = PublicAccount.createFromPublicKey(
      apostilleAccountPulicKey,
      this.networkInfo.networkType
    )
    return apostilleAccount.verifySignature(hashedData, message.signedHash)
  }

  public async getAuditData(nodeUrl: string, hash: string) {
    const result = await fetch(
      `${nodeUrl}/transactions/confirmed/${hash}`
    ).then((data) => data.json())
    const apostilleAccountPublicKey = result.transaction.cosignatures[0]
      .signerPublicKey as string
    const rowMessage = result.transaction.transactions[0].transaction
      .message as string
    const payload = Convert.decodeHex(rowMessage.substring(2))

    return {
      apostilleAccountPublicKey,
      payload
    }
  }

  public static releaseApostille(
    apostilleAccountPulicKey: string,
    ownerAddress: string,
    networkInfo: NetworkInfomation
  ) {
    const apostilleAccount = PublicAccount.createFromPublicKey(
      apostilleAccountPulicKey,
      networkInfo.networkType
    )
    const owner = Address.createFromRawAddress(ownerAddress)
    const multisigTx = MultisigAccountModificationTransaction.create(
      Deadline.create(networkInfo.epochAdjustment),
      0,
      0,
      [],
      [owner],
      networkInfo.networkType
    ).toAggregate(apostilleAccount)
    const aggTx = AggregateTransaction.createComplete(
      Deadline.create(networkInfo.epochAdjustment),
      [multisigTx],
      networkInfo.networkType,
      []
    ).setMaxFeeForAggregate(networkInfo.feeMultipilier, 0)
    return aggTx
  }

  private parseMessage(payload: string) {
    const regex = /^fe4e5459(\d{2})(\w+)/
    const result = payload.match(regex)
    if (result) {
      const parsedMessage = {
        hashingTypeStr: result[1],
        signedHash: result[2]
      }

      if (this.hashAlgolthm.checkSum.endsWith(result[1])) {
        return parsedMessage
      } else {
        throw new Error('Hash algorithm does not match')
      }
    }
    throw new Error('It is not apostille message')
  }
}
