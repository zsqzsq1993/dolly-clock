const requestAnimationFrame = (() => {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        function (callback) {
            return window.setTimeout(callback, 17)
        }
})()

const cancelAnimationFrame = (() => {
    return window.cancelAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        function (id) {
            return window.clearTimeout(id)
        }
})()

export default class TimeLine {
    constructor(callback, interval) {
        this.interval = interval
        this.callback = callback
        this.lastTime = undefined
    }

    start() {
        const step = (timestamp) => {
            if (!this.lastTime) this.lastTime = timestamp

            if (timestamp - this.lastTime >= this.interval) {
                this.lastTime = timestamp
                this.callback()
            }

            this.timer = requestAnimationFrame(step)
        }

        this.timer = requestAnimationFrame(step)
    }

    end() {
        cancelAnimationFrame(this.timer)
    }
}
