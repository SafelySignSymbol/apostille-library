import { Account, NetworkType, PublicAccount, Transaction } from 'symbol-sdk'
import { HashAlgorithm } from '../../hash/HashAlgorithm'
import { SHA256 } from '../../hash/SHA256'
import { NetworkInfomation } from '../NetworkInfomation'

export class ApostilleAccount {
  readonly account: Account
  readonly owner: PublicAccount
  readonly generationHash: string
  private hashAlgorithm: HashAlgorithm

  private constructor(
    fileName: string,
    ownerPublicKey: string,
    hashAlgorithm: HashAlgorithm,
    networkInfo: NetworkInfomation
  ) {
    const seed = `${fileName}-${ownerPublicKey}-${Date.now().toString()}`
    const hash = hashAlgorithm.calcHash(seed)
    const privateKey = this.fixPrivateKey(hash)
    this.account = Account.createFromPrivateKey(
      privateKey,
      networkInfo.networkType
    )
    this.owner = PublicAccount.createFromPublicKey(
      ownerPublicKey,
      networkInfo.networkType
    )
    this.hashAlgorithm = hashAlgorithm
    this.generationHash = networkInfo.generationHash
  }

  public static create(
    fileName: string,
    publicKey: string,
    networkInfo: NetworkInfomation
  ) {
    const hash = new SHA256()
    return new ApostilleAccount(fileName, publicKey, hash, networkInfo)
  }

  public sign(tx: Transaction) {
    return this.account.sign(tx, '')
  }

  public getSignedHash(payload: string) {
    return this.account.signData(this.hashAlgorithm.calcHash(payload))
  }

  private fixPrivateKey(privateKey: string) {
    return `0000000000000000000000000000000000000000000000000000000000000000${privateKey.replace(
      /^00/,
      ''
    )}`.slice(-64)
  }
}
