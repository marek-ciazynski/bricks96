'use strict';
import './style.css'

import { Brick, BrickStyle } from './brick';

const BALL_SPEED = 5
const GAME_SIZE = { x: 1000, y: 800 }

const _game = {
	domElement: null,
	score: 0,
	bricks: [],
}

const _ball = {
	SIZE: 40,

	domElement: null,
	position: { x: 5, y: 100 },
	velocity: { x: 1, y: BALL_SPEED },
}

const _animation = {
	handler: null,
	lastTimestamp: 0,
}


function checkBoundaryHit(ball) {
	if (ball.position.x <= 0 || ball.position.x + ball.SIZE > GAME_SIZE.x)
		return 'x'
	if (ball.position.y <= 0 || ball.position.y + ball.SIZE > GAME_SIZE.y)
		return 'y'
	return false
}

function animate(timestamp) {	
	const timeDelta = timestamp - _animation.lastTimestamp
	const moveFactor = (timeDelta / 16/*ms*/) // requestanimationframe is 60 FPS

	// movement
	_ball.position.x += _ball.velocity.x * moveFactor
	_ball.position.y += _ball.velocity.y * moveFactor

	let boundary
	if (boundary = checkBoundaryHit(_ball)) {
		_ball.velocity[boundary] *= -1;
	}
	_ball.domElement.style.transform = `translate(${_ball.position.x}px, ${_ball.position.y}px)`

	// collision
	_game.bricks.forEach(b => {
		if (b.checkCollision(_ball)) {
			b.destroy()
		}
	})
	
	_animation.lastTimestamp = timestamp
	_animation.handler = requestAnimationFrame(animate)
}

function addBrick(x, y, style) {
	const brick = new Brick(_game.domElement, x, y, style);
	_game.bricks.push(brick)
	return brick;
}


// Main
document.addEventListener("DOMContentLoaded", function (event) {
	console.log('Bricks96')
	_game.domElement = document.getElementById('game')
	_game.domElement.style.width = GAME_SIZE.x
	_game.domElement.style.height = GAME_SIZE.y
	_ball.domElement = document.querySelector('.ball')

	_game.domElement.addEventListener('mousemove', (event) => {
		const paddle = document.querySelector('.paddle')
		paddle.style.left = `${event.offsetX}px`
	})

	addBrick(10, 10, BrickStyle.Gronostaj)
	addBrick(200, 100, BrickStyle.Waves)
	addBrick(260, 10, BrickStyle.Dots)
	addBrick(10, 100, BrickStyle.Gray)

	_animation.handler = requestAnimationFrame(animate)
});
