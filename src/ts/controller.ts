import { STATUS, STORAGE_KEY, BUTTONS } from './constants';

export default class controller {
  game : any = {};
  view : any = {};
  menu: HTMLElement;

  gameProcess = 0;
  currentSpeed = 0;

  constructor(game : any, view : any, menu: HTMLElement) {
    this.game = game;
    this.view = view;
    this.menu = menu;

    document.addEventListener('keydown', this.setKeydownListeners.bind(this));
    menu.addEventListener('click', this.menuClick.bind(this));

    this.view.changeStatus(this.game.status);
  }

  setKeydownListeners(e: KeyboardEvent) {
    if (this.game.status === STATUS.active) {
      switch(e.key) {
        case 'Escape':
          clearInterval(this.gameProcess);
          this.game.status = STATUS.pause;
          this.view.changeStatus(this.game.status);
          break;
        case 'ArrowLeft':
          this.game.moveItemLeft();
          this.view.render(this.game.getPlaySpace());
          break;
        case 'ArrowRight':
          this.game.moveItemRight();
          this.view.render(this.game.getPlaySpace());
          break;
        case 'ArrowDown':
          this.game.moveItemDown();
          this.view.setScore(this.game.totalPoint, this.game.speed);

          if (this.currentSpeed !== this.game.speed) {
            clearInterval(this.gameProcess);
            this.gameProcess = setInterval(this.playing.bind(this), this.game.speed);
          }

          if (Number(this.game.status) === STATUS.game_over) {
            clearInterval(this.gameProcess);
            this.view.changeStatus(this.game.status);
          } else {
            this.view.render(this.game.getPlaySpace());
          }
          break;
        case 'ArrowUp':
          this.game.rotateItem();
          this.view.render(this.game.getPlaySpace());
          break;
        default:
          return null;
      }
    } else if (e.key === 'Enter') {
      this.startGame();
    }
    return;
  }

  menuClick(e: any) {
    if (e.target.tagName.toLowerCase() === 'button') {
      switch(e.target.dataset.status) {
        case 'play':
        case 'resume': {
          this.startGame();
          break;
        }
        case 'restart': {
          this.game.restart();
          this.startGame();
          break;
        }
        case 'score': {
          const storageScore  = Number(localStorage.getItem(STORAGE_KEY) || 0);
          this.view.showScore(Math.max(storageScore, this.game.totalPoint));
          break;
        }
        case 'settings': {
          this.view.showSettingMenu();
          break;
        }
        case BUTTONS.close: {
          this.view.changeStatus(this.game.status);
          break;
        }
        default: {
          console.log('status', e.target.dataset.status);
        }
      }
    }
  }

  startGame() {
    this.view.render(this.game.getPlaySpace());

    if (this.game.status === STATUS.game_over) {
      this.game.restart();
    }
    
    this.game.status = STATUS.active; 
    this.view.changeStatus(this.game.status);

    this.playing();
    this.currentSpeed = this.game.speed;
    
    this.gameProcess = setInterval(this.playing.bind(this), this.game.speed);
  }

  playing() {
    this.game.moveItemDown();
    this.view.setScore(this.game.totalPoint, this.game.speed);

    if (this.game.status === STATUS.game_over) {
      clearInterval(this.gameProcess);
      this.view.changeStatus(STATUS.game_over);
    } else {
      this.view.render(this.game.getPlaySpace());
    }
  }
} 