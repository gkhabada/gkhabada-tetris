import Game from './ts/game';
import View from './ts/view';
import Menu from './ts/menu';
import Controller from './ts/controller';

import { STORAGE_KEY_SETTINGS, FIELD_SIZE_VALUES, FIELD_SIZE_NAMES } from './ts/constants';

const app = document.getElementById('tetris') as HTMLElement;
const menuElem = document.getElementById('menu') as HTMLElement;

const settings = JSON.parse(localStorage.getItem(STORAGE_KEY_SETTINGS) || '{}');
const sizeValues : { cols: number, rows: number } = FIELD_SIZE_VALUES[settings.size] || FIELD_SIZE_VALUES[FIELD_SIZE_NAMES.middle];

const game = new Game(sizeValues.rows, sizeValues.cols);
const view = new View(app, 320, 640, sizeValues.rows, sizeValues.cols);
const controller = new Controller(game, view);
new Menu(menuElem, controller, game, view);
