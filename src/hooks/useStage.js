import { useState, useEffect } from 'react'
import { createStage } from '../helpers/create-stage'

export const useStage = (player, resetPlayer) => {
  const [stage, setStage] = useState(createStage())

  useEffect(() => {
    const updateStage = (prevStage) => {
      // First flush the current stage
      const newStage = prevStage.map((row) =>
        row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell))
      )
      // Then draw the tetromino
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            // console.log('row', row)
            // console.log('x', x)
            // console.log('y', y)
            // console.log('player x', player.pos.x)
            // console.log('player y', player.pos.y)
            newStage[y + player.pos.y][x + player.pos.x] = [
              value,
              `${player.collided ? 'merged' : 'clear'}`,
            ]
          }
        })
      })
      return newStage
    }
    setStage((prev) => updateStage(prev))
  }, [player])

  return [stage, setStage]
}
