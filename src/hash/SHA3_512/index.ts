import { sha3_512 } from 'js-sha3'
import { HashAlgorithm } from '../HashAlgorithm'

export class SHA3_512 implements HashAlgorithm {
  algorithmName: string
  checkSum: string

  constructor() {
    this.algorithmName = 'sha3_512'
    this.checkSum = this.calculateCheckSum()
  }

  private calculateCheckSum(): string {
    const prefix = 'fe4e5459'
    const hashType = '91'
    return prefix + hashType
  }

  calcHash(data: string) {
    return sha3_512.update(data).hex()
  }
}
