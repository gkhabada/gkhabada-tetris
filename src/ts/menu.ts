import { STATUS, BUTTONS, buttonsText, STORAGE_KEY_SCORE, STORAGE_KEY_SETTINGS, FIELD_SIZE_NAMES, FIELD_SIZE_VALUES } from './constants';

export default class view {
  menu: HTMLElement
  controller: any
  game: any
  view: any
  settings: { [name: string]: string }

  constructor(
    menu: HTMLElement,
    controller: any,
    game: any,
    view: any,
  ) {
    this.menu = menu;
    this.controller = controller;
    this.game = game;
    this.view = view;
    menu.addEventListener('click', this.menuClick.bind(this));
    this.settings = this.getSettings();

    this.watchGameStatus();
  }

  menuClick(e: any) {
    if (e.target.tagName.toLowerCase() === 'button') {
      switch(e.target.dataset.status) {
        case BUTTONS.play:
        case BUTTONS.resume: {
          this.controller.startGame();
          break;
        }
        case BUTTONS.restart: {
          this.game.restart();
          this.controller.startGame();
          break;
        }
        case BUTTONS.score: {
          const storageScore  = Number(localStorage.getItem(STORAGE_KEY_SCORE) || 0);
          this.showScore(Math.max(storageScore, this.game.totalPoint));
          break;
        }
        case BUTTONS.settings: {
          this.showSettingMenu();
          break;
        }
        case BUTTONS.close: {
          this.changeStatus(this.game.status);
          break;
        }
        case BUTTONS.saveSettings: {
          this.settings.name = (document.querySelector('#name') as HTMLInputElement)?.value;
          this.settings.size = (document.querySelector('#size') as HTMLInputElement)?.value;

          this.game.updateSpaceSize(FIELD_SIZE_VALUES[this.settings.size]);
          this.view.updateSpaceSize(FIELD_SIZE_VALUES[this.settings.size]);

          this.saveSettings();
          this.game.restart();
          this.changeStatus(STATUS.new);
          break;
        }
        default: {
          // eslint-disable-next-line
          console.log('status', e.target.dataset.status);
        }
      }
    }
  }

  setMenuButtons(buttons: Array<string>) {
    const menuList = this.menu.querySelector('.menu__list') as HTMLElement;
    menuList.innerHTML = '';
    buttons.forEach((button: string) => {
      menuList.insertAdjacentHTML('beforeend', `
        <li>
          <button data-status="${button}" class="menu__item">${buttonsText[button]}</button>
        </li>
      `);
    });
  }

  watchGameStatus() {
    let gameStatus : STATUS = this.game.status;
    this.changeStatus(gameStatus);

    setInterval(() => {
      if (gameStatus !== this.game.getStatus) {
        gameStatus = this.game.getStatus;
        this.changeStatus(gameStatus);
      }
    }, 100);
  }

  /**
   * В зависимости от статуса игры, разные пункты в элементе меню.
   * @param status
   */
  changeStatus(status : number) {
    switch (status) {
      case STATUS.pause:
        this.setMenuButtons([BUTTONS.resume, BUTTONS.restart, BUTTONS.score, BUTTONS.settings]);
        this.menu.style.display = 'flex';
        break;
      case STATUS.game_over:
        this.setMenuButtons([BUTTONS.restart, BUTTONS.score, BUTTONS.settings]);
        this.menu.style.display = 'flex';
        break;
      case STATUS.new:
        this.setMenuButtons([BUTTONS.play, BUTTONS.score, BUTTONS.settings]);
        this.menu.style.display = 'flex';
        break;
      default:
        this.menu.style.display = "none";
    }
  }

  showScore(score: number) {
    const menuList = this.menu.querySelector('.menu__list') as HTMLElement;
    this.setMenuButtons([BUTTONS.close]);
    menuList.insertAdjacentHTML('afterbegin', `
      <li>Ваш максимально набранный балл: <b>${score}</b></li>
    `);
  }

  showSettingMenu() {
    const menuList = this.menu.querySelector('.menu__list') as HTMLElement;
    this.setMenuButtons([BUTTONS.saveSettings, BUTTONS.close]);

    menuList.insertAdjacentHTML('afterbegin', `
      <li class="menu__item-setting">
        <label for="name">Имя пользователя</label>
        <input id="name" value="${this.settings.name || 'Пользователь'}">
      </li>
      <li class="menu__item-setting">
        <label for="size">Размер поля</label>
        <select id="size">
          <option
            ${this.settings.size === FIELD_SIZE_NAMES.small ? 'selected' : ''}
            value="${FIELD_SIZE_NAMES.small}"
          >Маленький (7x14)</option>
          <option
            ${!this.settings.size || this.settings.size === FIELD_SIZE_NAMES.middle ? 'selected' : ''}
            value="${FIELD_SIZE_NAMES.middle}"
          >Средний (10x20)</option>
          <option
            ${this.settings.size === FIELD_SIZE_NAMES.large ? 'selected' : ''}
            value="${FIELD_SIZE_NAMES.large}"
          >Большой (15x30)</option>
        </select>
      </li>
    `);
  }

  getSettings() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_SETTINGS) || '{}');
  }

  saveSettings() {
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(this.settings));
  }

}
