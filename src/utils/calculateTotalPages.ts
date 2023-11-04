export default function calculateTotalPages(totalItems: number, itemsPerPage: number): number {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  return totalPages;
}
