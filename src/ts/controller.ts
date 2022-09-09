import { STATUS, STORAGE_KEY, BUTTONS } from './constants';

export default class controller {
  game: null
  view: null
  menu: null

  constructor(game : any, view : any, menu: any) {
    this.game = game;
    this.view = view;
    this.menu = menu;

    let gameProcess  = 0;

    const playing = () => {
      game.moveItemDown();
      view.setScore(game.totalPoint);

      if (game.status === STATUS.game_over) {
        clearInterval(gameProcess);
        view.changeStatus(STATUS.game_over);
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
      console.log('game.speed', game.speed);
      
      gameProcess = setInterval(playing, game.speed);
    };

    document.addEventListener('keydown', (e: KeyboardEvent) => {
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

            if (Number(game.status) === STATUS.game_over) {
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

    menu.addEventListener('click', (e: any) => {
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
            view.showScore(Math.max(storageScore, game.totalPoint));
            break;
          }
          case 'settings': {
            view.showSettingMenu();
            break;
          }
          case BUTTONS.close: {
            view.changeStatus(game.status);
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
  }
} 