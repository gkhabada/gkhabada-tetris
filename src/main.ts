import Game from './game';
import View from './view';

const game = new Game();
const view = new View(game.getPlaySpace(), 320, 640, 20, 10);
game.init();

window.game = game;
window.view = view;
