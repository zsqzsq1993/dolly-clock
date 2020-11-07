const stars = []

export default function (context, options) {
    context.save()

    context.fillStyle = 'black'

    context.fillRect(0, 0, options.width, options.height)

    context.restore()

    context.save()

    if (!stars.length) {
        for (let i = 0; i < 200; i++) {
            const star = new Star(options)

            stars.push(star)

            star.drawStar(context)
        }
    } else {
        stars.forEach(star => {
            star.drawStar(context)
        })
    }

    context.restore()
}

export class Star {
    constructor (options) {
        this.x = Math.random() * options.width

        this.y = Math.random() * options.height

        this.scale = Math.random()

        this.rotate = Math.random() * 360
    }

    drawStar(context) {
        context.save()

        context.scale(this.scale, this.scale)

        context.translate(this.x, this.y)

        context.rotate(this.rotate)

        Star.drawStandardStar(context)

        context.restore()
    }

    static drawStandardStar (context) {
        const degreeTorad = (degree) => degree * 2 * Math.PI / 360

        context.beginPath()

        for (let i = 0; i < 5; i++) {
            const outerDegree = degreeTorad(18 + 72 * i)
            const innerDegree = degreeTorad(54 + 72 * i)

            context.lineTo(20 * Math.cos(outerDegree), - 20 * Math.sin(outerDegree))
            context.lineTo(10 * Math.cos(innerDegree), - 10 * Math.sin(innerDegree))
        }

        context.fillStyle = 'yellow'

        context.fill()

        context.strokeStyle = 'yellow'

        context.stroke()

        context.closePath()
    }
}
