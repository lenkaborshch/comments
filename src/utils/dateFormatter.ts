//@ts-nocheck
export const dateFormatter = (datee: string) => {
    let date = new Date(datee)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let dt = date.getDate()
    let hours = date.getHours()
    let minutes = date.getMinutes()

    if (hours < 10) {
        hours = '0' + hours
    }
    if (minutes < 10) {
        minutes = '0' + minutes
    }
    if (dt < 10) {
        dt = '0' + dt
    }
    if (month < 10) {
        month = '0' + month
    }

    return `${hours}:${minutes} ${dt}.${month}.${year}`
}