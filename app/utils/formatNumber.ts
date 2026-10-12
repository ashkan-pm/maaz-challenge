// Formats numbers with Farsi numerals; callers pass their own Intl options.
export function formatFarsiNumber(value: number, options?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat('fa-IR', options).format(value)
}
