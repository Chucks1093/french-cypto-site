import { create } from "zustand";

export type Deposit = {
	amount: number;
	contract_address: string;
	status: string;
	timestamp: number;
	transaction_hash: string;
};

export type Trade = {
	amount: number;
	price: number;
	side: "buy" | "sell";
	symbol: string;
	timestamp: string;
	type: "limit" | "market"; // Assuming "market" is another possible type
};

export type HistoryData = {
	deposit: Deposit[];
	trade: Trade[];
	withdrawal: Deposit[];
};

interface CurrentHistoryState {
	tradeHistory: Trade[] | null;
	fetchedTradeHistory: boolean;
	fetchedDepositHistory: boolean;
	depositHistory: Deposit[] | null;
	setTradeHistory: (value: Trade[]) => void;
	addTradeHistory: (value: Trade[]) => void;
	setDepositHistory: (value: Deposit[]) => void;
}

const initialState = {
	tradeHistory: null,
	depositHistory: null,
	fetchedTradeHistory: false,
	fetchedDepositHistory: false,
};
const useAppHistory = create<CurrentHistoryState>((set) => ({
	...initialState,
	setTradeHistory: (grids) =>
		set(() => ({ tradeHistory: grids, fetchedTradeHistory: true })),
	addTradeHistory: (newGrids)=> set((state)=> ({tradeHistory: [...state?.tradeHistory!, ...newGrids]})),
	setDepositHistory: (newGrids) =>
		set(() => ({ depositHistory: newGrids, fetchedDepositHistory: true })),
}));

export default useAppHistory;
