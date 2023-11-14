import { KECCAK256 } from './KECCAK256'
import { KECCAK512 } from './KECCAK512'
import { MD5 } from './MD5'
import { SHA1 } from './SHA1'
import { SHA256 } from './SHA256'
import { SHA3_256 } from './SHA3_256'
import { SHA3_512 } from './SHA3_512'

export const HashType = {
  MD5: new MD5(),
  SHA1: new SHA1(),
  SHA256: new SHA256(),
  KECCAK256: new KECCAK256(),
  KECCAK512: new KECCAK512(),
  SHA3_256: new SHA3_256(),
  SHA3_512: new SHA3_512()
}
