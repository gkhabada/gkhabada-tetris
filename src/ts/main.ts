import { STATUS, STORAGE_KEY } from './constants';
import Game from './game';
import View from './view';

const app = document.getElementById('tetris');
const menu = document.getElementById('menu');

const game = new Game(20, 10);
const view = new View(app, 320, 640, 20, 10, menu);

let gameProcess  = 0;

const playing = () => {
  game.moveItemDown();
  view.setScore(game.totalPoint);

  if (game.status === STATUS.game_over) {
    clearInterval(gameProcess);
    view.changeStatus(game.status);
  } else {
    view.render(game.getPlaySpace());
  }
}

const startGame = () => {
  view.render(game.getPlaySpace());

  if (game.status === STATUS.game_over) {
    game.restart();
  }
  
  game.status = STATUS.active; 
  view.changeStatus(game.status);

  playing();
  gameProcess = setInterval(playing, game.speed);
};

document.addEventListener('keydown', (e) => {
  if (game.status === STATUS.active) {
    switch(e.key) {
      case 'Escape':
        clearInterval(gameProcess);
        game.status = STATUS.pause;
        view.changeStatus(game.status);
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
        view.setScore(game.totalPoint);

        if (game.status === STATUS.game_over) {
          clearInterval(gameProcess);
          view.changeStatus(game.status);
        } else {
          view.render(game.getPlaySpace());
        }
        break;
      case 'ArrowUp':
        game.rotateItem();
        view.render(game.getPlaySpace());
        break;
      default:
        return null;
    }
  } else if (e.key === 'Enter') {
    startGame();
  }
  
});

menu.addEventListener('click', (e) => {
  if (e.target.tagName.toLowerCase() === 'button') {
  
    switch(e.target.dataset.status) {
      case 'play':
      case 'resume': {
        startGame();
        break;
      }
      case 'restart': {
        game.restart();
        startGame();
        break;
      }
      case 'score': {
        const storageScore  = Number(localStorage.getItem(STORAGE_KEY) || 0);
        alert(`Максимально набранный балл: ${Math.max(storageScore, game.totalPoint)}`);
        break;
      }
      case 'settings': {
        const storageScore  = Number(localStorage.getItem(STORAGE_KEY) || 0);
        alert(`Максимально набранный балл: ${Math.max(storageScore, game.totalPoint)}`);
        break;
      }
      default: {
        console.log('status', e.target.dataset.status);
      }
    }
  }
});


// view.render(game.getPlaySpace());
view.changeStatus(game.status);