export default async () => {
  const currentDate = new Date()

  const currentDayOfMonth = currentDate.getDate()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  const dateString = currentYear + '-' + (currentMonth + 1) + '-' + currentDayOfMonth
  // "2020-12-31"

  return dateString
}
