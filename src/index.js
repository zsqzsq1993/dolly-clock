import Clock from "./Clock.js"

export default function (endTime, options) {
    if (options) options.endTime = endTime

    else options = endTime

    return new Clock(options)
}
