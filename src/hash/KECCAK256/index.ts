import { keccak256 } from 'js-sha3'
import { HashAlgorithm } from '../HashAlgorithm'

export class KECCAK256 implements HashAlgorithm {
  algorithmName: string
  checkSum: string

  constructor() {
    this.algorithmName = 'keccak_256'
    this.checkSum = this.calculateCheckSum()
  }

  private calculateCheckSum(): string {
    const prefix = 'fe4e5459'
    const hashType = '88'
    return prefix + hashType
  }

  calcHash(data: string) {
    return keccak256.update(data).hex()
  }
}
