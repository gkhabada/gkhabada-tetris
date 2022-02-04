import Game from './game';
import View from './view';

const app = document.getElementById('app');

const game = new Game();
const view = new View(app, 320, 640, 20, 10);

window.game = game;
window.view = view;


document.addEventListener('keydown', (e) => {
  switch(e.key) {
    case 'ArrowLeft':
      game.moveItemLeft();
      view.render(game.getPlaySpace());
      break;
    case 'ArrowRight':
      game.moveItemRight();
      view.render(game.getPlaySpace());
      break;
    case 'ArrowDown':
      game.moveItemDown();
      view.render(game.getPlaySpace());
      break;
    case 'ArrowUp':
      game.rotateItemRight();
      view.render(game.getPlaySpace());
      break;
    default:
      return null;
  };
});

view.render(game.getPlaySpace());