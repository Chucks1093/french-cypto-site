import { WalletState } from "@web3-onboard/core";
import { create } from "zustand";

export type WalletDetails = {
	address: string;
	bnbBalance: string;
	usdBalance: number;
	wallets: WalletState[];
	depositBalance: number;
};

interface CurretUserWallet {
	userWallet: Partial<WalletDetails> | null;
	setUserWallet: (details: Partial<WalletDetails>) => void;
}

const initialState = {
	userWallet: null,
};

const useCurrentWallet = create<CurretUserWallet>()((set) => ({
	...initialState,
	setUserWallet: (details) =>
		set((state) => ({ userWallet: { ...state.userWallet, ...details } })),
}));

export default useCurrentWallet;
