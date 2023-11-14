import { keccak512 } from 'js-sha3'
import { HashAlgorithm } from '../HashAlgorithm'

export class KECCAK512 implements HashAlgorithm {
  algorithmName: string
  checkSum: string

  constructor() {
    this.algorithmName = 'keccak_512'
    this.checkSum = this.calculateCheckSum()
  }

  private calculateCheckSum(): string {
    const prefix = 'fe4e5459'
    const hashType = '89'
    return prefix + hashType
  }

  calcHash(data: string) {
    return keccak512.update(data).hex()
  }
}
