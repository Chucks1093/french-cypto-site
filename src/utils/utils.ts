import showToast from "./showToast";

export function copyTextToClipboard(text: string) {
   navigator.clipboard.writeText(text)
     .then(() => {
      showToast.success("Text copied to clipboard")
       console.log('Text copied to clipboard');
     })
     .catch((error) => {
       console.error('Error copying text: ', error);
     });
 }

 export const abbreviateAddress = (address: string) => {
   return `${address.slice(0, 6)}...${address.slice(-4)}`;
 };
 