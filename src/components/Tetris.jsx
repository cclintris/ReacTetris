import React from 'react'
import { useState } from 'react'
import Stage from './Stage'
import Display from './Display'
import StartButton from './StartButton'
import { StyledTetris, StyledTetrisWrapper } from './styles/StyledTetris'
import { usePlayer, useStage } from '../hooks'
import { createStage } from '../helpers/game-helper'

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null)
  const [gameOver, setGameOver] = useState(false)

  const [player, updatePlayerPos, resetPlayer] = usePlayer()
  const [stage, setStage] = useStage(player)

  console.log('re-render')

  const startGame = () => {
    // reset everything
    setStage(createStage())
    resetPlayer()
  }

  const movePlayer = (dir) => {
    updatePlayerPos({
      x: dir,
      y: 0,
    })
  }

  const drop = () => {
    updatePlayerPos({
      x: 0,
      y: 1,
      collided: false,
    })
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
