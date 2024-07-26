/// <reference types="vite/client" />

interface Window {
	ethereum: {
		isMetaMask?: boolean;
		request: (...args: any[]) => Promise<any>;
		on?: (...args: any[]) => void;
		removeListener?: (...args: any[]) => void;
		autoRefreshOnNetworkChange?: boolean;
	};
}

// If you're using ethers v6, you might also want to declare BrowserProvider
declare module "ethers" {
	class BrowserProvider extends ethers.Provider {
		constructor(ethereum: Window["ethereum"], network?: ethers.Networkish);
	}
}

declare namespace google {
  namespace translate {
    class TranslateElement {
      constructor(options: {pageLanguage: string}, elementId: string);
    }
  }
}
