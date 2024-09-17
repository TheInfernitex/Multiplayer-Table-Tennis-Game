export default class Player {
    constructor(x, y, width, height, color) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
        this.score = 0
    }

    draw(ctx) {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)

        // draw score
        ctx.font = "30px Play"
        ctx.fillText(this.score, this.x < 400 ? 370 - ((this.score.toString().length - 1) * 12) : 420, 30)

        ctx.fillRect(this.x < 400 ? 790 : 0, 0, 10, 500)
    }
}