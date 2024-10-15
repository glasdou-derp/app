export class Formatter {
  /**
   * Formats a given date into the format 'DD/MM/YYYY'.
   *
   * @param {string | Date} date - The date to format. Can be either a string or a Date object.
   * @returns {string} The formatted date string in 'DD/MM/YYYY' format.
   */
  public static getDate(date: string | Date | null | undefined): string {
    if (!date) return ''

    //? format into 'DD/MM/YYYY HH:mm:ss'
    const dateStr = typeof date === 'string' ? date : date.toISOString()
    const [datePart] = dateStr.split('T')
    const [year, month, day] = datePart.split('-')
    return `${day}/${month}/${year}`
  }

  public static getTime(date: string | Date): string {
    //? format into 'HH:mm:ss'
    const dateStr = typeof date === 'string' ? date : date.toISOString()
    const [, timePart] = dateStr.split('T')
    const [hour, minute] = timePart.split(':')
    return `${hour}:${minute}`
  }

  public static getCurrency(value: number | string): string {
    value = typeof value === 'string' ? parseFloat(value) : value

    const formattedValue = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value)

    return `Q. ${formattedValue}`
  }
}
