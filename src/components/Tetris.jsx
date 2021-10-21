import React from 'react'
import { useState } from 'react'
import Stage from './Stage'
import Display from './Display'
import StartButton from './StartButton'
import { StyledTetris, StyledTetrisWrapper } from './styles/StyledTetris'
import { usePlayer, useStage, useInterval, useGameStatus } from '../hooks'
import { createStage } from '../helpers/create-stage'
import { detectCollision } from '../helpers/collision-detection'
import { DEFAULT_GAME_SPEED, DEFAULT_GAME_LEAP } from '../constants'

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null)
  const [gameOver, setGameOver] = useState(false)

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer()
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer)
  const [score, setScore, rows, setRows, level, setLevel] =
    useGameStatus(rowsCleared)

  const startGame = () => {
    // reset everything
    setStage(createStage())
    setDropTime(DEFAULT_GAME_SPEED)
    resetPlayer()
    setGameOver(false)
    setScore(0)
    setRows(0)
    setLevel(0)
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
    // Increase level
    if (rows > (level + 1) * 10) {
      setLevel((prev) => prev + 1)
      // Increase speed
      setDropTime(DEFAULT_GAME_SPEED / (level + 1) + DEFAULT_GAME_LEAP)
    }

    const collided = detectCollision(player, stage, { x: 0, y: 1 })

    // console.log('drop collided', collided)

    if (!collided) {
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

  const restartInterval = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 40) {
        setDropTime(DEFAULT_GAME_SPEED / (level + 1) + DEFAULT_GAME_LEAP)
      }
    }
  }

  const dropPlayer = () => {
    setDropTime(null)
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

  useInterval(() => {
    drop()
  }, dropTime)

  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={(e) => move(e)}
      onKeyUp={(e) => restartInterval(e)}
    >
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <>
              <Display text={`Score : ${score}`} />
              <Display text={`Rows : ${rows}`} />
              <Display text={`Level : ${level}`} />
            </>
          )}
          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  )
}

export default Tetris
