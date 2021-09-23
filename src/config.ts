import querystring from 'querystring'
import { Coords } from './modules/land/types';

type Config = {
  baseParcel: Coords
  parcels: Coords[]
  rootCID: string
  debug: boolean
  estateRegistry?: string
  landRegistry?: string
}

let net: string | undefined
let config: Config | undefined

function parseCoords(query: string | string[]): Coords[] {
  if (!query) return [{ x: 0, y: 0 }]
  const coords = typeof query === 'string' ? [query] : query
  return coords.map(c => {
    const [x, y] = c.split(',');
    return { x: parseInt(x, 10), y: parseInt(y, 10) }
  })
}

function setNetwork() {
  return new Promise((resolve, reject) => {
    if (window.ethereum && 'chainId' in window.ethereum) {
      const chainId: string = (window.ethereum as any).chainId
      net = chainId === '0x1' ? 'mainnet' : 'ropsten'
      resolve('')
    } else {
      reject('No network detected')
    }
  })
}

function setParams(queryParams: string) {
  const params = querystring.parse(queryParams)
  config = {
    baseParcel: parseCoords(params.baseParcels)[0],
    parcels: parseCoords(params.parcels),
    rootCID: params.rootCID as string || 'QmPjpPyibbryTCi75zzcdeuPUBcujtEqj43shwKBAdMojy',
    debug: params.debug === 'true',
    estateRegistry: params.estateRegistry as string,
    landRegistry: params.landRegistry as string,
  }
}

export async function init() {
  await setNetwork()
  setParams(window.location.search)
  console.log(config)
}

export function isDevelopment(): boolean {
  return !!config?.debug
}

export function isRopsten(): boolean {
  return net === 'ropsten'
}

export function getConfig<T extends keyof Config>(key: T) {
  return (config as Config)[key]
}
