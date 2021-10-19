import { useState, useCallback } from 'react'
import { randomTetromino } from '../helpers/tetrominos'
import { STAGE_W } from '../constants'
import { Tetrominos } from '../helpers/tetrominos'

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: {
      x: 0,
      y: 0,
    },
    tetromino: Tetrominos[0].shape,
    collided: false,
  })

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

  return [player, updatePlayerPos, resetPlayer]
}
