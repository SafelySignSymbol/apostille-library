import { createHash } from 'crypto'
import { HashAlgorithm } from '../HashAlgorithm'

export class SHA1 implements HashAlgorithm {
  algorithmName: string
  checkSum: string

  constructor() {
    this.algorithmName = 'sha1'
    this.checkSum = this.calculateCheckSum()
  }

  private calculateCheckSum(): string {
    const prefix = 'fe4e5459'
    const hashType = '82'
    return prefix + hashType
  }

  calcHash(data: string) {
    return createHash('sha1').update(data).digest('hex')
  }
}
