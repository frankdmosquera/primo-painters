/**
 * Google's relative wording, computed from the exact publish time.
 *
 * Ported from face-and-body lib/relativeTime.ts on 2026-09-27.
 *
 * THE PROBLEM THIS SOLVES. The Places API sends two things per review: the
 * exact `publishTime`, and `relativePublishTimeDescription`, a fixed phrase
 * Google words however it likes. For anything under seven days old that
 * phrase is "in the last week", so a review left two days ago read the same
 * as one left six days ago. The Maps listing itself writes "2 days ago" from
 * the timestamp, and this does the same.
 *
 * WHY NOT Intl.RelativeTimeFormat. It produces "2 years ago" happily, but it
 * has no notion of "a year ago" versus "1 year ago", and Google writes the
 * first. Matching their wording is the point, so the thresholds are spelled
 * out instead.
 *
 * The home page revalidates hourly, so the wording is at most an hour behind.
 * That is why hours are the finest unit here: minutes would be wrong for
 * most of every hour.
 */

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

/**
 * @param iso     the review's publish time, any form `new Date` accepts
 * @param now     injectable so the behaviour can be reasoned about and
 *                tested without waiting a year
 */
export function relativeTime(iso: string, now: Date = new Date()): string {
  const then = new Date(iso);
  if (Number.isNaN(then.getTime())) return "";

  const elapsed = now.getTime() - then.getTime();
  const hours = Math.floor(elapsed / HOUR);
  const days = Math.floor(elapsed / DAY);

  // A clock skew should not print "-3 hours ago". Google would just say it
  // is new.
  if (hours <= 0) return "just now";
  if (hours === 1) return "an hour ago";
  if (days < 1) return `${hours} hours ago`;
  if (days === 1) return "yesterday";
  if (days < 7) return `${days} days ago`;

  const weeks = Math.floor(days / 7);
  if (weeks === 1) return "a week ago";
  if (days < 30) return `${weeks} weeks ago`;

  const months = Math.floor(days / 30);
  if (months === 1) return "a month ago";
  if (days < 365) return `${months} months ago`;

  const years = Math.floor(days / 365);
  if (years === 1) return "a year ago";
  return `${years} years ago`;
}
