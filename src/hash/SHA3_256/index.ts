import { sha3_256 } from 'js-sha3'
import { HashAlgorithm } from '../HashAlgorithm'

export class SHA3_256 implements HashAlgorithm {
  algorithmName: string
  checkSum: string

  constructor() {
    this.algorithmName = 'sha3_256'
    this.checkSum = this.calculateCheckSum()
  }

  private calculateCheckSum(): string {
    const prefix = 'fe4e5459'
    const hashType = '90'
    return prefix + hashType
  }

  calcHash(data: string) {
    return sha3_256.update(data).hex()
  }
}
