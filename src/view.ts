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


}