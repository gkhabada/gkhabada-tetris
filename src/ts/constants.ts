export enum STATUS {
  active = 1,
  pause = 2,
  game_over = 3,
  new = 4,
}

export const STORAGE_KEY = 'TETRIS_SCORE';

export const BUTTONS : any = { 
  play: 'play',
  resume: 'resume',
  restart: 'restart',
  score: 'score',
  settings: 'settings',

  close: 'close',
};

export const buttonsText : any = {
  [BUTTONS.play]: 'Начать',
  [BUTTONS.resume]: 'Продолжить',
  [BUTTONS.restart]: 'Начать заново',
  [BUTTONS.score]: 'Результаты',
  [BUTTONS.settings]: 'Настройки',
  [BUTTONS.close]: 'Назад',
};