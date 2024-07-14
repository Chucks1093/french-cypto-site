import { Web3OnboardProvider } from "@web3-onboard/react";
import { ReactNode } from "react";
import { web3Onboard } from "./web3Onboard";

type Props = { children: ReactNode };


function OnchainProviders({ children }: Props){
  return (
   <Web3OnboardProvider web3Onboard={web3Onboard}>
      {children}
   </Web3OnboardProvider>
  )
}
export default OnchainProviders