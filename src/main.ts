import Game from './game';
import View from './view';

const app = document.getElementById('app');

const game = new Game();
const view = new View(app, 320, 640, 20, 10);

window.game = game;
window.view = view;

let gameProcess;

document.addEventListener('keydown', (e) => {  
  switch(e.key) {
    case 'Enter':
      console.log('start');
      gameProcess = setInterval(() => {
        game.moveItemDown();
        view.render(game.getPlaySpace());
        view.setScore(game.totalPoint);
      }, game.speed);
      break;
    case 'Escape':
      console.log('payse');
      clearInterval(gameProcess);
      break;
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
      view.setScore(game.totalPoint);
      break;
    case 'ArrowUp':
      game.rotateItem();
      view.render(game.getPlaySpace());
      break;
    default:
      return null;
  };
});

view.render(game.getPlaySpace());