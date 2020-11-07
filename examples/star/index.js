import {Star} from "../../src/starBackground.js"

const canvas = document.getElementById('star')

canvas.width = 1024

canvas.height = 500

const context = canvas.getContext('2d')

context.fillStyle = 'black'

context.fillRect(0, 0, canvas.width, canvas.height)

const star = new Star({
    width: canvas.width,
    height: canvas.height
})

star.drawStar(context)
