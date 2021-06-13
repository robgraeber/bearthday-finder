import { formatToTimeZone } from 'date-fns-timezone';
import { UTC_TIMEZONE } from 'src/constants/DateConstants';

/**
 * Gets the most recent past birthday date,
 * e.g. if today is 2020-06-01: 2000-05-01 => 2020-05-01
 * e.g. if today is 2020-06-01: 2000-10-01 => 2019-10-01
 * e.g. if today is 2020-06-01: 2000-06-01 => 2020-06-01
 * @param dateStr Birthday date in YYYY-MM-DD format.
 * @returns The most recent past birthday date in YYYY-MM-DD format.
 */
export function getMostRecentPastBirthDate(dateStr: string) {
  const mostRecentBirthDate = new Date(dateStr);
  mostRecentBirthDate.setUTCFullYear(new Date().getUTCFullYear());

  const currentDate = new Date();
  currentDate.setUTCHours(0, 0, 0, 0);

  // Check if current year birthday is in the future,
  // if so then show previous year's photo.
  if (mostRecentBirthDate > currentDate) {
    mostRecentBirthDate.setUTCFullYear(mostRecentBirthDate.getUTCFullYear() - 1);
  }

  return formatToTimeZone(mostRecentBirthDate, 'YYYY-MM-DD', { timeZone: UTC_TIMEZONE });
}
