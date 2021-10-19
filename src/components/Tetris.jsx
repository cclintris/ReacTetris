import React from 'react'
import { useState } from 'react'
import Stage from './Stage'
import Display from './Display'
import StartButton from './StartButton'
import { StyledTetris, StyledTetrisWrapper } from './styles/StyledTetris'
import { usePlayer, useStage } from '../hooks'
import { createStage } from '../helpers/create-stage'
import { detectCollision } from '../helpers/collision-detection'

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null)
  const [gameOver, setGameOver] = useState(false)

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer()
  const [stage, setStage] = useStage(player, resetPlayer)

  // console.log('re-render')

  const startGame = () => {
    // reset everything
    setStage(createStage())
    resetPlayer()
    setGameOver(false)
  }

  // Moving tetromino horizontally
  const movePlayer = (dir) => {
    if (!detectCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({
        x: dir,
        y: 0,
      })
    }
  }

  // Moving tetromino perpendicularly
  const drop = () => {
    if (!detectCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({
        x: 0,
        y: 1,
        collided: false,
      })
    } else {
      // Game over
      if (player.pos.y < 1) {
        alert('GAME OVER!')
        setGameOver(true)
        setDropTime(null)
      }

      updatePlayerPos({
        x: 0,
        y: 0,
        collided: true,
      })
    }
  }

  const dropPlayer = () => {
    drop()
  }

  const move = ({ keyCode }) => {
    if (!gameOver) {
      switch (keyCode) {
        case 37: // left
          movePlayer(-1)
          break
        case 39: // right
          movePlayer(1)
          break
        case 40: // down
          dropPlayer()
          break
        case 38: // rotate clockwise
          playerRotate(stage, true)
          break
        default:
          console.warn('No such command!')
          break
      }
    }
  }

  return (
    <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={(e) => move(e)}>
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <>
              <Display text="Score" />
              <Display text="Row" />
              <Display text="Level" />
            </>
          )}
          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  )
}

export default Tetris
