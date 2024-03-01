export const formatMonth = (monthNum: number) => {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  return months[monthNum]
}

export const formatDayOfMonth = (dayNum: number) => {
  const dayNumAsString = String(dayNum)

  if (dayNumAsString === "11") {
    return dayNumAsString + "th"
  }

  if (dayNumAsString[dayNumAsString.length - 1] === "1") {
    return dayNumAsString + "st"
  }

  if (dayNumAsString[dayNumAsString.length - 1] === "2") {
    return dayNumAsString + "nd"
  }

  if (dayNumAsString[dayNumAsString.length - 1] === "3") {
    return dayNumAsString + "rd"
  }

  if (Number(dayNumAsString[dayNumAsString.length - 1]) > 3) {
    return dayNumAsString + "th"
  }

  if (dayNumAsString[dayNumAsString.length - 1] === "0") {
    return dayNumAsString + "th"
  }



  return "Incorrect date format"



}