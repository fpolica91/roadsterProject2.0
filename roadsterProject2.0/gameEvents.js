
class GameEvent {
    constructor(img, x, y, width, height) {
        this.img = img
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }
    drawGameEvent() {
        const gameEvent = new Image()
        gameEvent.src = this.img
        ctx.drawImage(gameEvent, this.x, this.y, this.width, this.height)
    }
    drawText() {
        ctx.font = "40px Arial"
        ctx.fillStyle = "black"
        ctx.fillText(`Should have ordered extended range!`, canvas.width / 4, canvas.height / 2)
        ctx.font = "40px Arial"
        ctx.fillStyle = "black"
        ctx.fillText(`Your Best Score Was: ${currentGame.score}`, canvas.width / 4, canvas.height / 3)

    }
}

const gameEndingImage = new GameEvent('./images/gameEnd.png', 0, 0, canvas.width, canvas.height)

function renderSound() {
    const crash = new Audio('./sounds/crash.wav')
    crash.play()
}