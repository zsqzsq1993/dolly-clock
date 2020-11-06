import defaults from "./defaults.js"

class Ball {
    constructor (options) {
        this.color = options.color
        this.x = options.x
        this.y = options.y
        this.vx = options.vx
        this.vy = options.vy
        this.g = options.g
        this.active = true
    }
}

function createBall (x, y) {
    const colors = defaults.colors

    return new Ball({
        x,
        y,
        color: colors[Math.floor(Math.random() * colors.length)],
        g: Math.random() + 1.5,
        vx: Math.pow(-1, Math.floor(Math.random() * 100)) *  (Math.random() + 1.5),
        vy: -5
    })
}

export default createBall
