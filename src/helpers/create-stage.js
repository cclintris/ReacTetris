import { STAGE_W, STAGE_H } from '../constants'

export const createStage = () =>
  Array.from(Array(STAGE_H), () => new Array(STAGE_W).fill([0, 'clear']))
