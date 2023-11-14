import { createHash } from 'crypto'
import { HashAlgorithm } from '../HashAlgorithm'

export class MD5 implements HashAlgorithm {
  algorithmName: string
  checkSum: string

  constructor() {
    this.algorithmName = 'md5'
    this.checkSum = this.calculateCheckSum()
  }

  private calculateCheckSum(): string {
    const prefix = 'fe4e5459'
    const hashType = '81'
    return prefix + hashType
  }

  calcHash(data: string) {
    return createHash('md5').update(data).digest('hex')
  }
}
