export default class view {
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

  element: HTMLElement
  width: number
  height: number
  context: CanvasRenderingContext2D
  nextElemCanvas: CanvasRenderingContext2D
  cellWidth: number

  rows: number
  cols: number
  updateSpaceSize({ rows, cols }: { rows: number, cols: number }) {
    this.rows = rows;
    this.cols = cols;
    this.cellWidth = this.width / this.cols;
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

}
