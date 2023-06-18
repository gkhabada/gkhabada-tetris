import { STATUS } from './constants';

export default class controller {
  game : any = {};
  view : any = {};

  gameProcess = 0;
  currentSpeed = 0;

  constructor(game : any, view : any) {
    this.game = game;
    this.view = view;

    document.addEventListener('keydown', this.setKeydownListeners.bind(this));
  }

  setKeydownListeners(e: KeyboardEvent) {
    if (this.game.status === STATUS.active) {
      switch(e.key) {
        case 'Escape':
          clearInterval(this.gameProcess);
          this.game.status = STATUS.pause;
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
          this.game.setScore();

          if (this.currentSpeed !== this.game.speed) {
            clearInterval(this.gameProcess);
            this.gameProcess = setInterval(this.playing.bind(this), this.game.speed);
          }

          if (Number(this.game.status) === STATUS.game_over) {
            clearInterval(this.gameProcess);
          } else {
            this.view.render(this.game.getPlaySpace());
            this.view.renderNextItem(this.game.nextItem.block);
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

  startGame() {
    this.view.render(this.game.getPlaySpace());
    this.view.renderNextItem(this.game.nextItem.block);

    if (this.game.status === STATUS.game_over) {
      this.game.restart();
    }

    this.game.status = STATUS.active;

    this.playing();
    this.currentSpeed = this.game.speed;

    this.gameProcess = setInterval(this.playing.bind(this), this.game.speed);
  }

  playing() {
    this.game.moveItemDown();
    this.game.setScore();

    if (this.game.status === STATUS.game_over) {
      clearInterval(this.gameProcess);
    } else {
      this.view.render(this.game.getPlaySpace());
      this.view.renderNextItem(this.game.nextItem.block);
    }
  }
}
