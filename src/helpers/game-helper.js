export const STAGE_W = 12
export const STAGE_H = 20

export const createStage = () =>
  Array.from(Array(STAGE_H), () => new Array(STAGE_W).fill([0, 'clear']))
