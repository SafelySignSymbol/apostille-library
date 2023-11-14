# Install

```
npm install @sss-symbol/apostille
```

# Usage

## Create Apostille

Prepare

```ts
import { ApostilleFacade, HashType } from '@sss-symbol/apostille'
import {
  getActivePublicKey,
  requestSignWithCosignatories,
  setTransaction
} from 'sss-module'

const NODE = 'https://sym-test-03.opening-line.jp:3001'
const info = await ApostilleFacade.getNetworkInfomation(NODE)

const option = {
  metadata: {
    description: 'test apostille'
  },
  isOwner: true
}
const userPublicKey = getActivePublicKey()
const facade = new ApostilleFacade(HashType.SHA256, info)
const data = 'APOSTILLE'
const fileName = 'APOSTILLE.txt'
```

Create

```ts
const apostilleTransaction = facade.createApostille(
  data,
  fileName,
  userPublicKey,
  option
)
const transaction = apostilleTransaction.createTransaction()
const cosignatories = apostilleTransaction.getCosignatories()

setTransaction(transaction)
const signedTx = await requestSignWithCosignatories(cosignatories)
// announce signed transaction...
```

## Audit Apostille

Prepare

```ts
const payload = '' // transaction message
const apostilleAccountPublicKey = ''

const info = await ApostilleFacade.getNetworkInfomation(NODE)
const facade = new ApostilleFacade(HashType.SHA256, info)
```

Audit

```ts
const isvalid = facade.auditApostille(data, payload, userPublicKey)
```

ex: https://testnet.symbol.fyi/transactions/952355CC83D1C464F9979FA6AD18CB8FEE21AAF142459017F7292B41B45C0DCC

```ts
const data = 'APOSTILLE'

const payload =
  'fe4e545983066D4ACFC95696BCA9267ADB5FEA9C23EC241707A60BA736A6EE35769CA16BDB85D984930C5F9FEAAD62851BFE184618F92F32E3CB1576509F466397A9031A09'
const apostilleAccountPublicKey =
  '1EEFDD16D611A68D033DBDF89C7D07D387D1363D72DBF6B1152D6855B746696B'

const NODE = 'https://sym-test-03.opening-line.jp:3001'
const info = await ApostilleFacade.getNetworkInfomation(NODE)
const facade = new ApostilleFacade(HashType.SHA256, info)

const isvalid = facade.auditApostille(data, payload, userPublicKey)
console.log('isValid', isvalid)
```

## Release Apostille

Prepare

```ts
const NODE = 'https://sym-test-03.opening-line.jp:3001'
const info = await ApostilleFacade.getNetworkInfomation(NODE)
```

Release

```ts
const tx = ApostilleFacade.releaseApostille(
  apostilleAccountPublicKey,
  owner,
  info
)
const apostilleAccountPublicKey =
  '1EEFDD16D611A68D033DBDF89C7D07D387D1363D72DBF6B1152D6855B746696B'
const owner = getActiveAddress()
setTransaction(tx)
const signedTx = await requestSignWithCosignatories([])
```

# License

Apache-2.0
