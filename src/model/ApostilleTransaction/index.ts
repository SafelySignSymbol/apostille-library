import {
  Account,
  AccountMetadataTransaction,
  AggregateTransaction,
  Convert,
  Deadline,
  InnerTransaction,
  KeyGenerator,
  MultisigAccountModificationTransaction,
  PlainMessage,
  Transaction,
  TransferTransaction
} from 'symbol-sdk'
import { ApostilleAccount } from '../ApostilleAccount'
import { ApostilleOption } from '../ApostilleOption'
import { NetworkInfomation } from '../NetworkInfomation'
import { HashAlgorithm } from '../../hash/HashAlgorithm'
import { defu } from 'defu'

export class ApostilleTransaction {
  public readonly multisigAccount: Account
  private constructor(
    public readonly apostilleAccount: ApostilleAccount,
    private readonly txMsg: string,
    private readonly networkInfo: NetworkInfomation,
    private readonly option: ApostilleOption
  ) {
    this.multisigAccount = Account.generateNewAccount(networkInfo.networkType)
  }

  public static create(
    data: string,
    fileName: string,
    ownerPublicKey: string,
    networkInfo: NetworkInfomation,
    hashAlgorithm: HashAlgorithm,
    option: ApostilleOption
  ) {
    const apostilleAccount = ApostilleAccount.create(
      fileName,
      ownerPublicKey,
      networkInfo
    )
    const signedHash = apostilleAccount.getSignedHash(data)
    const txMsg = hashAlgorithm.checkSum + signedHash

    const defaultOption: ApostilleOption = {
      metadata: {
        filename: fileName
      },
      isOwner: false
    }
    const mergedOption: ApostilleOption = defu(option, defaultOption)

    return new ApostilleTransaction(
      apostilleAccount,
      txMsg,
      networkInfo,
      mergedOption
    )
  }

  public getCosignatories() {
    const cosignatories = [this.apostilleAccount.account]
    if (this.option.isOwner) {
      cosignatories.push(this.multisigAccount)
    }
    return cosignatories
  }

  public createTransaction() {
    const coreTx = this.createCoreTransaction()
    const optionTxs = this.createOptionTransactions()

    const innerTxs = [coreTx, ...optionTxs]
    const aggTx = AggregateTransaction.createComplete(
      Deadline.create(this.networkInfo.epochAdjustment),
      innerTxs,
      this.networkInfo.networkType,
      []
    ).setMaxFeeForAggregate(this.networkInfo.feeMultipilier, 2) // 1 かも ?

    return aggTx
  }

  private createCoreTransaction() {
    return TransferTransaction.create(
      Deadline.create(this.networkInfo.epochAdjustment),
      this.apostilleAccount.account.address,
      [],
      PlainMessage.create(this.txMsg),
      this.networkInfo.networkType
    ).toAggregate(this.apostilleAccount.owner)
  }

  private createOwnerTransaction() {
    return MultisigAccountModificationTransaction.create(
      Deadline.create(this.networkInfo.epochAdjustment),
      1,
      1,
      [this.apostilleAccount.owner.address, this.multisigAccount.address],
      [],
      this.networkInfo.networkType
    ).toAggregate(this.apostilleAccount.account.publicAccount)
  }

  private createMetadataTransaction(key: string, value: string) {
    const metadataValue = Convert.utf8ToUint8(value)
    return AccountMetadataTransaction.create(
      Deadline.create(this.networkInfo.epochAdjustment),
      this.apostilleAccount.account.address,
      KeyGenerator.generateUInt64Key(key),
      metadataValue.length,
      metadataValue,
      this.networkInfo.networkType
    ).toAggregate(this.apostilleAccount.account.publicAccount)
  }

  private createOptionTransactions(): InnerTransaction[] {
    const txs: Transaction[] = []
    if (this.option) {
      if (this.option.metadata) {
        Object.entries(this.option.metadata).forEach(([key, value]) => {
          if (value !== '') {
            const tx = this.createMetadataTransaction(key, value)
            txs.push(tx)
          }
        })
      }
      if (this.option.isOwner) {
        const multisigTx = this.createOwnerTransaction()
        txs.push(multisigTx)
      }
    }

    return txs
  }
}
