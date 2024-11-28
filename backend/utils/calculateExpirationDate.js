function calculateExpirationDate(interval) {
    let seconds;
    switch (interval) {
        case "1 Hour":
            seconds = 1 * 60 * 60
            break
        case "1 Day":
            seconds = 24 * 60 * 60
            break
        case "1 Week":
            seconds = 7 * 24 * 60 * 60
            break
        case "1 Month":
            seconds = 30 * 24 * 60 * 60
            break
        case "6 Months":
            seconds = 180 * 24 * 60 * 60
            break
        case "1 Year":
            seconds = 365 * 24 * 60 * 60
            break
        default:
            seconds = -1
            break
    }
    return seconds
}

export default calculateExpirationDate