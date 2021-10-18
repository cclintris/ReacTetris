import React from 'react'
import { StyledStartButton } from './styles/StyledStartButton'

const StartButton = ({ callback }) => {
  return <StyledStartButton onClick={callback}>Battle</StyledStartButton>
}

export default StartButton
