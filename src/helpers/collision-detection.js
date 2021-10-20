export const detectCollision = (player, stage, { x: move_X, y: move_Y }) => {
  for (let y = 0; y < player.tetromino.length; y++) {
    for (let x = 0; x < player.tetromino[y].length; x++) {
      // 1. Check if it is an actual tetromino rendered
      if (player.tetromino[y][x] !== 0) {
        if (
          // 2. Check player's move within stage height or not(y)
          !stage[y + player.pos.y + move_Y] ||
          // 3. Check player's move within stage width or not(x)
          !stage[y + player.pos.y + move_Y][x + player.pos.x + move_X] ||
          // 4. Check whether the cell player intends to move to isn't set to [clear, ?])
          stage[y + player.pos.y + move_Y][x + player.pos.x + move_X][1] !==
            'clear'
        ) {
          return true
        }
      }
    }
  }
}
