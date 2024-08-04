import { WalletState } from "@web3-onboard/core";
import { create } from "zustand";

export type CryptoPrices = {
	binancecoin: {
		usd: number;
	};
	bitcoin: {
		usd: number;
	};
	ethereum: {
		usd: number;
	};
};

export type WalletInfo = {
	paper_balance: string;
	wallet_address: `0x${string}`;
}

export type WalletDetails = {
	address: string;
	bnbBalance: string;
	usdBalance: number;
	wallets: WalletState[];
	depositBalance: number;
};

interface CurretUserWallet {
	userWallet: Partial<WalletDetails> | null;
	rate: CryptoPrices | null;
	setUserWallet: (details: Partial<WalletDetails>) => void;
	setRate: (newRate: CryptoPrices) => void;
}

const initialState = {
	userWallet: null,
	rate: null,
};

const useCurrentWallet = create<CurretUserWallet>()((set) => ({
	...initialState,
	setRate: (newRate) =>
		set((state) => ({ rate: { ...state.rate, ...newRate } })),
	setUserWallet: (details) =>
		set((state) => ({ userWallet: { ...state.userWallet, ...details } })),
}));

export default useCurrentWallet;
