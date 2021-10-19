import { useState, useCallback } from 'react'
import { randomTetromino } from '../helpers/tetrominos'
import { STAGE_W } from '../constants'
import { Tetrominos } from '../helpers/tetrominos'
import { detectCollision } from '../helpers/collision-detection'

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: {
      x: 0,
      y: 0,
    },
    tetromino: Tetrominos[0].shape,
    collided: false,
  })

  const rotate = (matrix, clockwise) => {
    // Make all rows -> cols
    const rotatedMatrix = matrix.map((_, index) =>
      matrix.map((col) => col[index])
    )
    // reverse every 1d matrix if clockwise
    if (clockwise) return rotatedMatrix.map((row) => row.reverse())
    // or else reverse 2d matrix (counterclockwise)
    return rotatedMatrix.reverse()
  }

  const playerRotate = (stage, clockwise) => {
    const clonedPlayer = JSON.parse(JSON.stringify(player))
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, clockwise)

    const old_pos_X = clonedPlayer.pos.x
    let offset = 1
    // shake probing
    while (detectCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
      clonedPlayer.pos.x += offset
      offset = -(offset + (offset > 0 ? 1 : -1))
      if (offset > clonedPlayer.tetromino[0].length) {
        rotate(clonedPlayer.tetromino, false)
        clonedPlayer.pos.x = old_pos_X
        return
      }
    }

    setPlayer(clonedPlayer)
  }

  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer((prev) => ({
      ...prev,
      pos: {
        x: prev.pos.x + x,
        y: prev.pos.y + y,
      },
      collided,
    }))
  }

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: {
        x: STAGE_W / 2 - 2,
        y: 0,
      },
      tetromino: randomTetromino().shape,
      collided: false,
    })
  }, [])

  return [player, updatePlayerPos, resetPlayer, playerRotate]
}
