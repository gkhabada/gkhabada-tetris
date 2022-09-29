import { STATUS, BUTTONS, buttonsText, STORAGE_KEY } from './constants';

export default class view {
  element: HTMLElement
  menu: HTMLElement
  width: number
  height: number
  rows: number
  cols: number
  context: CanvasRenderingContext2D
  nextElemCanvas: CanvasRenderingContext2D
  cellWidth: number


  constructor(
    element: HTMLElement,
    width: number, 
    height: number,
    rows: number,
    cols: number,
    menu: HTMLElement,
  ) {
    this.element = element;
    this.menu = menu;
    this.width = width;
    this.height = height;
    this.rows = rows;
    this.cols = cols;

    const canvas = document.createElement('canvas');
    canvas.width = this.width;
    canvas.height = this.height;
    
    this.element.appendChild(canvas);

    this.context = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.cellWidth = this.width / this.cols;

    const canvasForNextElem = document.createElement('canvas');
    canvasForNextElem.width = 60;
    canvasForNextElem.height = 60;
    canvasForNextElem.setAttribute('id', 'canvas-next');
    this.element.appendChild(canvasForNextElem);

    this.nextElemCanvas = canvasForNextElem.getContext('2d') as CanvasRenderingContext2D;
  }

  readonly itemColor : {[name: string]: string} = {
    'I': 'cyan',
    'J': 'blue',
    'L': 'orange',
    'O': 'yellow',
    'S': 'green',
    'T': 'purple',
    'Z': 'red',
  }

  render(playSpace: Array<Array<number>>) {
    this.clearPlaySpace();
    this.renderGameSpace(playSpace);
  }

  clearPlaySpace() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  renderGameSpace(playSpace: Array<Array<number>>) { 
    for(let row = 0; row < this.rows; row++) {
      for(let col = 0; col < this.cols; col++) {
        this.context.fillStyle = this.itemColor[playSpace[row][col]] || 'white';
        this.context.fillRect(col * this.cellWidth, row * this.cellWidth, this.cellWidth, this.cellWidth);
        this.context.strokeStyle = '#fafafa';
        this.context.lineWidth = 1;
        this.context.strokeRect(col * this.cellWidth, row * this.cellWidth, this.cellWidth, this.cellWidth);
      }
    }
  }

  renderNextItem(item : (number|string)[][]) {
    for(let row = 0; row < this.rows; row++) {
      for(let col = 0; col < this.cols; col++) {
        this.nextElemCanvas.fillStyle = this.itemColor[item?.[row]?.[col]] || 'white';
        this.nextElemCanvas.fillRect(col * this.cellWidth / 2, row * this.cellWidth / 2, this.cellWidth / 2, this.cellWidth / 2);
        this.nextElemCanvas.strokeStyle = '#fafafa';
        this.nextElemCanvas.lineWidth = 1;
        this.nextElemCanvas.strokeRect(col * this.cellWidth / 2, row * this.cellWidth / 2, this.cellWidth / 2, this.cellWidth / 2);
      }
    }
  }

  setScore(points: number) {
    const infoElem = document.getElementById('tetris__info') as HTMLElement;
    const scoreElem = infoElem.querySelector('.score') as HTMLElement;
    scoreElem.innerHTML = `${points}`;

    const recordScore = localStorage.getItem(STORAGE_KEY);
    const recordElem = infoElem.querySelector('.record') as HTMLElement;
    recordElem.innerHTML = ` ${recordScore || 0}`;
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
      <li>Ваш максимально набранный балл: ${score}</li>
    `);
  }

  showSettingMenu() {
    const menuList = this.menu.querySelector('.menu__list') as HTMLElement;
    this.setMenuButtons([BUTTONS.close]);

    menuList.insertAdjacentHTML('afterbegin', `
      <li class="menu__item-setting">
        <label for="name">Имя пользователя</label>
        <input id="name" value="User">
      </li>
      <li class="menu__item-setting">
        <label for="size">Размер поля</label>
        <select id="size">
          <option>Маленький (7x14)</option>
          <option>Средний (10x20)</option>
          <option>Большой (15x30)</option>
        </select>
      </li>
      <li>
        <button class="menu__item">Сохранить</button>
      </li>
    `);
  }
}