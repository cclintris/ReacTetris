import { useState, useEffect } from 'react'
import { createStage } from '../helpers/create-stage'
import { STAGE_W } from '../constants'

export const useStage = (player, resetPlayer) => {
  const [stage, setStage] = useState(createStage())
  const [rowsCleared, setRowsCleared] = useState(0)

  useEffect(() => {
    setRowsCleared(0)

    const sweepRows = (stage) =>
      stage.reduce((newStage, row) => {
        if (row.findIndex((cell) => cell[0] === 0) === -1) {
          setRowsCleared((prev) => prev++)
          newStage.unshift(new Array(STAGE_W).fill([0, 'clear']))
          return newStage
        }
        newStage.push(row)
        return newStage
      }, [])

    const updateStage = (prevStage) => {
      // First flush the current stage
      const newStage = prevStage.map((row) =>
        row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell))
      )

      // Then draw the tetromino
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newStage[y + player.pos.y][x + player.pos.x] = [
              value,
              `${player.collided ? 'merged' : 'clear'}`,
            ]
          }
        })
      })

      // Then check if collision occured
      if (player.collided) {
        resetPlayer()
        return sweepRows(newStage)
      }

      return newStage
    }
    setStage((prev) => updateStage(prev))
  }, [player, resetPlayer])

  return [stage, setStage, rowsCleared]
}
