import { Account, PublicAccount, Transaction } from 'symbol-sdk'
import { HashAlgorithm } from '../../hash/HashAlgorithm'
import { NetworkInfomation } from '../NetworkInfomation'
import { fixPrivateKey } from '../../util'

export class ApostilleAccount {
  private constructor(
    public readonly account: Account,
    public readonly owner: PublicAccount,
    public readonly hashAlgorithm: HashAlgorithm,
    public readonly networkInfo: NetworkInfomation
  ) {}

  public static create(
    fileName: string,
    publicKey: string,
    networkInfo: NetworkInfomation,
    hashAlgorithm: HashAlgorithm
  ) {
    const seed = `${fileName}-${publicKey}-${Date.now().toString()}`
    const hash = hashAlgorithm.calcHash(seed)
    const privateKey = fixPrivateKey(hash)
    const account = Account.createFromPrivateKey(
      privateKey,
      networkInfo.networkType
    )
    const owner = PublicAccount.createFromPublicKey(
      publicKey,
      networkInfo.networkType
    )
    return new ApostilleAccount(account, owner, hashAlgorithm, networkInfo)
  }

  public sign(tx: Transaction) {
    return this.account.sign(tx, this.networkInfo.generationHash)
  }

  public getSignedHash(payload: string) {
    return this.account.signData(this.hashAlgorithm.calcHash(payload))
  }
}
