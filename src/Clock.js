import digits from "./digits.js"
import defaults from "./defaults.js"
import TimeLine from "./TimeLine.js"
import createBall from "./Balls.js"

export default class Clock {
    constructor (options) {
        options = Object.assign(defaults, options)

        this.init(options)
    }

    init (options) {
        this.endTime = options.endTime || Clock.getDefaultEndTime()
        this.width = options.width
        this.height = options.height
        this.radius = options.radius
        this.marginLeft = options.marginLeft
        this.marginTop = options.marginTop
        this.color = options.color
        this.selectingName = options.selectingName
        this.maximum = options.maximum
        this.balls = []
        this.lastTime = undefined
        this.context = this.getContext()
        this.timeline = this.countDown()
    }

    countDown () {
        const callback1 = () => {
            this.context.clearRect(0, 0, this.width, this.height)

            const time = this.getTimeDelta()

            this.render(time.slice(), this.marginLeft, this.marginTop)

            this.update()

            if (this.balls.length > 700) this.balls.length = 700

            console.log(this.balls.length)

            this.lastTime = time
        }

        const timeline = new TimeLine(callback1, 50)

        callback1()

        timeline.start()

        return timeline
    }

    getContext () {
        const canvas = document.querySelector(this.selectingName)

        canvas.width = this.width

        canvas.height = this.height

        return canvas.getContext('2d')
    }

    getTimeDelta () {
        let delta = this.endTime.getTime() - +new Date()

        if (delta < 0) return '00:00:00'.split('')

        if (delta > this.maximum) return '99:99:99'.split('')

        delta = Math.floor(delta / 1000)

        const hours = Math.floor(delta / 3600)

        const minutes = Math.floor((delta - 3600 * hours) / 60)

        const seconds = (delta % 60)

        return [hours, minutes, seconds].map(item => Clock.timeFilter(item)).join(':').split('')
    }

    render (times, offsetX, offsetY) {
        if (!times.length) return

        if (!this.lastTime) this.lastTime = times

        const number = times.shift()

        const lastNumber = this.lastTime.shift()

        const digit = digits[number]

        const row = digit.length

        const col = digit[0].length

        this.context.fillStyle = this.color

        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                if (digit[i][j] === 1) {
                    const x = (j * 2 + 1) * (this.radius + 1) + offsetX
                    const y = (i * 2 + 1) * (this.radius + 1) + offsetY

                    this.context.beginPath()
                    this.context.arc(x, y, this.radius, 0, Math.PI * 2)
                    this.context.fill()
                    this.context.closePath()
                }

                if (lastNumber !== number && digits[lastNumber][i][j] === 1) {
                    const x = (j * 2 + 1) * (this.radius + 1) + offsetX
                    const y = (i * 2 + 1) * (this.radius + 1) + offsetY

                    this.balls.unshift(createBall(x, y))
                }
            }
        }

        offsetX += (col * 2 + 1) * (this.radius + 1)

        this.render(times, offsetX, offsetY)
    }

    update () {
        if (!this.balls.length) return

        this.balls.forEach((ball, index) => {
            if (!ball.active) {
                this.balls.splice(index, 1)
                return
            }

            this.context.beginPath()
            this.context.arc(ball.x, ball.y, this.radius, 0, Math.PI * 2)
            this.context.fillStyle = ball.color
            this.context.fill()
            this.context.closePath()

            ball.x += ball.vx
            ball.y += ball.vy
            ball.vy += ball.g

            if (ball.y >= this.height - this.radius) {
                ball.y = this.height - this.radius
                ball.vy = -ball.vy * 0.75
            }

            if (ball.x <= this.radius || ball.x >= this.width - this.radius)
                ball.active = false
        })
    }


    static getDefaultEndTime () {
        const now = new Date()

        let endTime = new Date(now)

        endTime.setDate(now.getDate() + 2)

        return endTime
    }

    static timeFilter (number) {
        const string = number.toString()

        return string.length === 2
            ? string
            : '0' + string
    }
}



