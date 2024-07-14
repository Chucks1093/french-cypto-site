import axios from "axios";
import showToast from "./showToast";

export const fetchBnbToUsdRate = async () => {
   const maxRetries = 3;
   let attempts = 0;
   let success = false;
   let rate = 0;

   while (attempts < maxRetries && !success) {
      try {
         const response = await axios.get(
            "https://api.coingecko.com/api/v3/simple/price",
            {
               params: { ids: "binancecoin", vs_currencies: "usd" },
            }
         );
         rate = response.data.binancecoin.usd as number;
         success = true;
         return rate;
      } catch (error) {
         if (error instanceof Error) {
            console.error(
               `Attempt ${attempts} - Error fetching BNB to USD conversion rate:`,
               error.message
            );
            attempts++;
         }
         if (attempts >= maxRetries) {
            showToast.error(
               "Network error: Unable to fetch BNB to USD conversion rate. Please try again later."
            );
         }
      }
   }

   return rate;
};