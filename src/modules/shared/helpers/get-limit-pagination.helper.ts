export const getLimitPaginationHelper = (): number => {
  const width = window.innerWidth

  if (width > 1280) return 16

  if (width > 768) return 12

  return 6
}
