function calculateExpirationDate(expiryDuration, expiryPeriod) {
  const secondsInAMinute = 60;
  const secondsInAnHour = secondsInAMinute * 60;
  const secondsInADay = secondsInAnHour * 24;
  const secondsInAWeek = secondsInADay * 7;
  const secondsInAMonth = secondsInADay * 30;
  const secondsInAnYear = secondsInADay * 365;

  switch (expiryPeriod) {
    case "Hours":
      return secondsInAnHour * expiryDuration;
    case "Days":
      return secondsInADay * expiryDuration;
    case "Weeks":
      return secondsInAWeek * expiryDuration;
    case "Months":
      return secondsInAMonth * expiryDuration;
    case "Years":
      return secondsInAnYear * expiryDuration;
    case "Burn After Read":
      return 0;
    default:
      return -1;
  }
}

export default calculateExpirationDate;
