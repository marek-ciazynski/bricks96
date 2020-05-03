'use strict'
import './brick.css'

export const BrickStyle = {
	Gronostaj: require('./assets/bricks/brick01.png'),
	Waves: require('./assets/bricks/brick02.png'),
	Gray: require('./assets/bricks/brick03.png'),
	Dots: require('./assets/bricks/brick04.png'),
}

export class Brick {
	constructor(gameElement, x, y, style = BrickStyle.Gronostaj) {
		this.gameElement = gameElement
		this.x = x
		this.y = y
		this.style = style

		this.brickElement = this._createBrick(style)
	}

	_createBrick(style) {
		const brick = document.createElement('div')
		brick.className = 'brick'
		brick.style.transform = `translate(${this.x}px, ${this.y}px)`
		brick.style.backgroundImage = `url('${style}')`
		
		this.gameElement.appendChild(brick)
		return brick
	}

	destroy() {
		this.brickElement.remove();
	}

	checkCollision(ball) {
		const ballBox = ball.domElement.getBoundingClientRect()
		const brickBox = this.brickElement.getBoundingClientRect()

		const collides = (a, b) => (
			((a.top + a.height) > (b.top)) &&
			(a.top < (b.top + b.height)) &&
			((a.left + a.width) > b.left) &&
			(a.left < (b.left + b.width))
		)

		return collides(ballBox, brickBox)
	}
}
