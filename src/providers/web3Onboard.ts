import {  init } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'
import infinityWalletModule from '@web3-onboard/infinity-wallet'
import safeModule from '@web3-onboard/gnosis'
import keepkeyModule from '@web3-onboard/keepkey'
import keystoneModule from '@web3-onboard/keystone'
import ledgerModule from '@web3-onboard/ledger'
import coinbaseModule from '@web3-onboard/coinbase'
import dcentModule from '@web3-onboard/dcent'
import sequenceModule from '@web3-onboard/sequence'
import tahoModule from '@web3-onboard/taho'
import trustModule from '@web3-onboard/trust'
import okxModule from '@web3-onboard/okx'
import frontierModule from '@web3-onboard/frontier';

const infinityWallet = infinityWalletModule()
const ledger = ledgerModule()
const keystone = keystoneModule()
const keepkey = keepkeyModule()
const safe = safeModule()
const sequence = sequenceModule()
const taho = tahoModule() // Previously named Tally Ho wallet
const trust = trustModule()
const okx = okxModule()
const frontier = frontierModule()


const injected = injectedModule()
const coinbase = coinbaseModule()
const dcent = dcentModule();

const wallets = [
   infinityWallet,
   keepkey,
   sequence,
   injected,
   trust,
   okx,
   frontier,
   taho,
   ledger,
   coinbase,
   dcent,
   safe,
   keystone,
 ]


 const chains = [
   {
     id: 11155111,
     token: 'ETH',
     label: 'Sepolia',
     rpcUrl: 'https://rpc.sepolia.org/'
   },
   {
     id: '0x13881',
     token: 'MATIC',
     label: 'Polygon - Mumbai',
     rpcUrl: 'https://matic-mumbai.chainstacklabs.com'
   },
   {
     id: '0x38',
     token: 'BNB',
     label: 'Binance',
     rpcUrl: 'https://bsc-dataseed.binance.org/'
   },
   {
     id: '0xA',
     token: 'OETH',
     label: 'OP Mainnet',
     rpcUrl: 'https://mainnet.optimism.io'
   },
   {
     id: '0xA4B1',
     token: 'ARB-ETH',
     label: 'Arbitrum',
     rpcUrl: 'https://rpc.ankr.com/arbitrum'
   },
   {
     id: '0xa4ec',
     token: 'ETH',
     label: 'Celo',
     rpcUrl: 'https://1rpc.io/celo'
   },
   {
     id: 666666666,
     token: 'DEGEN',
     label: 'Degen',
     rpcUrl: 'https://rpc.degen.tips'
   }
 ]
 
 const appMetadata = {
   name: 'Connect Wallet Example',
   icon: '<svg>My App Icon</svg>',
   description: 'Example showcasing how to connect a wallet.',
   recommendedInjectedWallets: [
     { name: 'MetaMask', url: 'https://metamask.io' },
     { name: 'Coinbase', url: 'https://wallet.coinbase.com/' }
   ]
 }
 
 export const web3Onboard = init({
   wallets,
   chains,
   appMetadata
 })
 
 