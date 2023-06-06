export enum STATUS {
  active = 1,
  pause = 2,
  game_over = 3,
  new = 4,
}

export const BUTTONS : { [name: string]: string } = {
  play: 'play',
  resume: 'resume',
  restart: 'restart',
  score: 'score',
  settings: 'settings',

  close: 'close',
};

export const buttonsText : { [name: string]: string } = {
  [BUTTONS.play]: 'Начать',
  [BUTTONS.resume]: 'Продолжить',
  [BUTTONS.restart]: 'Начать заново',
  [BUTTONS.score]: 'Результаты',
  [BUTTONS.settings]: 'Настройки',
  [BUTTONS.close]: 'Назад',
};

// settings

export const STORAGE_KEY_SCORE = 'TETRIS_SCORE';
export const STORAGE_KEY_SETTINGS = 'TETRIS_SETTINGS';

export const FIELD_SIZE_NAMES : { [name: string]: string } = {
  small: 'small',
  middle: 'middle',
  large: 'large',
}

export const FIELD_SIZE_VALUES : { [name: string]: { cols: number,   rows : number } } = {
  [FIELD_SIZE_NAMES.small]: { cols: 7, rows: 14 },
  [FIELD_SIZE_NAMES.middle]: { cols: 10, rows: 20 },
  [FIELD_SIZE_NAMES.large]: { cols: 15, rows: 30 },
}
