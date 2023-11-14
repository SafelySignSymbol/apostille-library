export interface HashAlgorithm {
  readonly algorithmName: string
  readonly checkSum: string
  calcHash: (data: string | ArrayBuffer) => string
}
