
import { create } from "zustand";

export type TradeGrid = {
   username: string;
   email: string;
   type: string;
   password: string;
   _id: string;
   createdAt: string;
   updatedAt: string;
   __v: number;
};
type MarketPlace = {
   id: number;
   min_investment: number;
   pnl: number;
   roi: number;
   runtime: string;
   trading_pair: string;
   user_count: number;
};

interface CurrentGridState {
   userGrids: TradeGrid[] | null;
   marketPlace: MarketPlace[] | null;
   setUserGrids: (grids: TradeGrid[]) => void;
   addTradeGrids: (value: TradeGrid[]) => void;
   setMarketPlace: (value: MarketPlace[]) => void;
   resetMarketPlace: () => void;
   fetchedMarketPlace: boolean;
   fetchedUserGrids: boolean;

}

const initialState = {
   userGrids: [],
   marketPlace: [],
   fetchedMarketPlace: false,
   fetchedUserGrids: false,
}

const useTradeGrids = create<CurrentGridState>((set) => ({
   ...initialState,
   setUserGrids: (grids) => set(() => ({ userGrids: grids, fetchedUserGrids: true })),
   resetMarketPlace: () => set(() => ({ fetchedMarketPlace: false })),
   addTradeGrids: (newGrids) => set((state) => ({ userGrids: [...state.userGrids!, ...newGrids] })),
   setMarketPlace: (marketData) => set(() => ({ marketPlace: marketData, fetchedMarketPlace: true })),
}));

export default useTradeGrids;