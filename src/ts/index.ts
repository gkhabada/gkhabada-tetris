import Game from './game';
import View from './view';
import Controller from './controller';

const app = document.getElementById('tetris') as HTMLElement;
const menu = document.getElementById('menu') as HTMLElement;

const game = new Game(20, 10);
const view = new View(app, 320, 640, 20, 10, menu);
new Controller(game, view, menu);