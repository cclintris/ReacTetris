import React from 'react'
import Stage from './Stage'
import Display from './Display'
import StartButton from './StartButton'
import { createStage } from '../helpers/game-helper'
import { StyledTetris, StyledTetrisWrapper } from './styles/StyledTetris'

const Tetris = () => {
  return (
    <StyledTetrisWrapper>
      <StyledTetris>
        <Stage stage={createStage()} />
        <aside>
          <>
            <Display text="Score" />
            <Display text="Row" />
            <Display text="Level" />
          </>
          <StartButton />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  )
}

export default Tetris
