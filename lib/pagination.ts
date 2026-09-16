export const ELLIPSIS = "ellipsis" as const;

export type PaginationItemValue = number | typeof ELLIPSIS;

/**
 * Builds a truncated page list: always shows the first and last page,
 * a window of `siblingCount` pages on either side of the current page,
 * and collapses any gaps into an "ellipsis" marker.
 *
 * e.g. getPaginationRange(7, 25, 1) -> [1, "ellipsis", 6, 7, 8, "ellipsis", 25]
 */
export function getPaginationRange(
  currentPage: number,
  pageCount: number,
  siblingCount = 1
): PaginationItemValue[] {
  const totalVisible = siblingCount * 2 + 5; // first, last, current, 2 ellipses

  if (pageCount <= totalVisible) {
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  const leftSibling = Math.max(currentPage - siblingCount, 1);
  const rightSibling = Math.min(currentPage + siblingCount, pageCount);

  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < pageCount - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftRange = Array.from(
      { length: 3 + siblingCount * 2 },
      (_, i) => i + 1
    );
    return [...leftRange, ELLIPSIS, pageCount];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const rightRangeLength = 3 + siblingCount * 2;
    const rightRange = Array.from(
      { length: rightRangeLength },
      (_, i) => pageCount - rightRangeLength + i + 1
    );
    return [1, ELLIPSIS, ...rightRange];
  }

  const middleRange = Array.from(
    { length: rightSibling - leftSibling + 1 },
    (_, i) => leftSibling + i
  );
  return [1, ELLIPSIS, ...middleRange, ELLIPSIS, pageCount];
}
