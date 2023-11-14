import { NetworkType } from 'symbol-sdk'

export interface NetworkInfomation {
  networkType: NetworkType
  generationHash: string
  epochAdjustment: number
  feeMultipilier: number
}
