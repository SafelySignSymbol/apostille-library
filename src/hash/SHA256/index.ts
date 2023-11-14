import { Message, sha256 } from 'js-sha256'
import { HashAlgorithm } from '../HashAlgorithm'

export class SHA256 implements HashAlgorithm {
  algorithmName: string
  checkSum: string

  constructor() {
    this.algorithmName = 'sha256'
    this.checkSum = this.calculateCheckSum()
  }

  private calculateCheckSum(): string {
    const prefix = 'fe4e5459'
    const hashType = '83'
    return prefix + hashType
  }

  calcHash(data: string | ArrayBuffer) {
    return sha256.update(data).hex()
  }
}
