export default class view {
  constructor(
    playSpace: Array<Array<number>>, 
    width: number, 
    height: number,
    rows: number,
    cols: number,
  ) {
    this.playSpace = playSpace;
    this.width = width;
    this.height = height;
    this.rows = rows;
    this.cols = cols;

    this.render()
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

  render() {
    const app = document.getElementById('app');
    
    const canvas = document.createElement('canvas');
    
    canvas.width = this.width;
    canvas.height = this.height;
    canvas.style.border = 'black 1px solid';
    
    app.appendChild(canvas);

    const context = canvas.getContext('2d');

    const cellWidth = this.width / this.cols;

    for(let row = 0; row < this.rows; row++) {
      for(let col = 0; col < this.cols; col++) {
        context.fillStyle = view.itemColor[this.playSpace[row][col]] || 'white';
        context.fillRect(col * cellWidth, row * cellWidth, cellWidth, cellWidth);
        context.strokeStyle = '#fafafa';
        context.lineWidth = 1;
        context.strokeRect(col * cellWidth, row * cellWidth, cellWidth, cellWidth);
      }
    }
  }


}