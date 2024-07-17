import showToast from "./showToast";
import { intervalToDuration, format } from 'date-fns';

export function formatCustomDuration(targetDateString: Date) {
  const start = new Date(); // Current date and time
  const end = new Date(targetDateString);

  if (isNaN(end.getTime())) {
    throw new Error('Invalid date string provided');
  }

  const duration = intervalToDuration({ start, end });
  
  const formatPart = (value:number| undefined, unit: string) => {
    if (value === 0) return '';
    return `${value}${unit[0]}`;  // Take first letter of unit as suffix
  };

  const parts = [
    formatPart(duration.days || 0, 'd'),
    formatPart(duration.hours || 0, 'h'),
    formatPart(duration.minutes || 0, 'm')
  ].filter(Boolean);  // Remove empty strings

  return parts.join(' ') || '0m';  // Return '0m' if all parts are zero
}
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
 
 export function dateToISO8601Duration(date: Date): string {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  
  if (diff < 0) {
    throw new Error('Target date must be in the future');
  }

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);  // Approximate
  const years = Math.floor(days / 365);  // Approximate

  let duration = 'P';
  
  if (years > 0) duration += `${years}Y`;
  if (months % 12 > 0) duration += `${months % 12}M`;
  if (days % 30 > 0) duration += `${days % 30}D`;
  
  if (hours % 24 > 0 || minutes % 60 > 0 || seconds % 60 > 0) {
    duration += 'T';
    if (hours % 24 > 0) duration += `${hours % 24}H`;
    if (minutes % 60 > 0) duration += `${minutes % 60}M`;
    if (seconds % 60 > 0) duration += `${seconds % 60}S`;
  }

  return duration === 'P' ? 'PT0S' : duration;
}

export function removeMillisecondsFromISOString(isoString: string): string {
  // Parse the ISO string into a Date object
  const date = new Date(isoString);
  
  // Use toISOString() to get a full ISO string
  const fullISO = date.toISOString();
  
  // Remove the milliseconds part
  return fullISO.split('.')[0] + 'Z';
}

export function formatTimestamp(timestampMs: number): { date: string; time: string } {
  const date = new Date(timestampMs * 1000).toLocaleString();
  
  return {
    date: format(date, 'yyyy-MM-dd'),
    time: format(date, 'HH:mm')
  };
}

export function isValidDate(date: Date | string | number): boolean {
  // If it's not already a Date object, try to create one
  const d = date instanceof Date ? date : new Date(date);

  // Check if the date is valid
  return d instanceof Date && !isNaN(d.getTime());
}
