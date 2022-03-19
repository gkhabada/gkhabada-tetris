import { STATUS } from './constants';

export default class view {
  element: HTMLElement
  width: number
  height: number
  rows: number
  cols: number
  canvas: HTMLElement
  context: HTMLElement
  cellWidth: number


  constructor(
    element: HTMLElement,
    width: number, 
    height: number,
    rows: number,
    cols: number,
  ) {
    this.element = element;
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
    const info : HTMLElement = document.getElementById('tetris-info');
    info.querySelector('.score').innerHTML = points;
    // elementP.innerHTML = ` ${points}`;
  }

  changeStatus(status : number) {
    let text : string = '';

    switch (status) {
      case STATUS.pause:
        text = 'Game pause, press enter for continue';
        break;
      case STATUS.game_over:
        text = 'Game over, press enter to restart';
        break;
      case STATUS.new:
        text = 'Press enter for game start';
        break;
      default:
        text = '';
    };

    if (text.length) {
      this.context.fillStyle = 'rgba(0, 0, 0, .7)';
      this.context.fillRect(0, 0, this.width, this.height);

      this.context.font = '32px sans';
      this.context.fillStyle = 'white';
      this.context.textAlign = 'center';
      this.context.fillText(text, this.width / 2, this.height / 2, this.width * 0.8);
    }    
  }

}