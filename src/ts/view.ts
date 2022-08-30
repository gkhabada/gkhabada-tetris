import { STATUS } from './constants';

export default class view {
  element: HTMLElement
  menu: HTMLElement
  width: number
  height: number
  rows: number
  cols: number
  canvas: HTMLCanvasElement
  context: any
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

    this.canvas = document.createElement('canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.style.border = 'black 1px solid';
    
    this.element.appendChild(this.canvas);

    this.context = this.canvas.getContext('2d');
    this.cellWidth = this.width / this.cols;
  }

  static readonly itemColor = {
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
        this.context.fillStyle = view.itemColor[playSpace[row][col]] || 'white';
        this.context.fillRect(col * this.cellWidth, row * this.cellWidth, this.cellWidth, this.cellWidth);
        this.context.strokeStyle = '#fafafa';
        this.context.lineWidth = 1;
        this.context.strokeRect(col * this.cellWidth, row * this.cellWidth, this.cellWidth, this.cellWidth);
      }
    }
  }

  setScore(points: number) {
    const info : HTMLElement = document.getElementById('tetris__info');
    info.querySelector('.score').innerHTML = points;
    // elementP.innerHTML = ` ${points}`;
  }

  changeStatus(status : number) {
    switch (status) {
      case STATUS.pause:
        this.menu.style.display = 'flex';
        break;
      case STATUS.game_over:
        this.menu.style.display = 'flex';
        break;
      case STATUS.new:
        this.menu.style.display = 'flex';
        break;
      default:
        this.menu.style.display = "none";
    }    
  }


}