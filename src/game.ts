export default class game {
  static readonly blockTypes = {
    'I': [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    'J': [
      [2, 0, 0],
      [2, 2, 2],
      [0, 0, 0],
    ],
    'L': [
      [0, 0, 3],
      [3, 3, 3],
      [0, 0, 0],
    ],
    'O': [
      [4, 4],
      [4, 4],
    ],
    'S': [
      [0, 5, 5],
      [5, 5, 0],
      [0, 0, 0],
    ],
    'T': [
      [0, 6, 0],
      [6, 6, 6],
      [0, 0, 0],
    ],
    'Z': [
      [7, 7, 0],
      [0, 7, 7],
      [0, 0, 0],
    ],
  };

  space: Array<Array<number>> = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  activeItem : Object = { ...this.createItem()};
  nextItem: Object = this.createItem();

  lockItem() {
    const { x, y, block } = this.activeItem;

    for (let i = 0; i < block.length; i++) {
      for (let j = 0; j <block[i].length; j++) {
        if (block[i][j]) {
          this.space[i + y][j + x] = block[i][j];
        }
      }
    }
  }

  blockIsOffset(): boolean {
    const { x, y, block } = this.activeItem;

    for (let i = 0; i < block.length; i++) {
      for (let j = 0; j <block[i].length; j++) {
        if (block[i][j] 
          && ((this.space[y + i] === undefined || this.space[y + i][x + j] === undefined) 
          || this.space[y + i][x + j])
        ) {
          return true;
        }
      }
    }
    return false; 
  }

  init() {
    this.drawGame();
    document.addEventListener('keydown', (e) => {
      switch(e.key) {
        case 'ArrowLeft':
          this.moveItemLeft();
          break;
        case 'ArrowRight':
          this.moveItemRight();
          break;
        case 'ArrowDown':
          this.moveItemDown();
          break;
        case 'ArrowUp':
          this.rotateItemRight();
          break;
        default:
          return null;
      };
    });
  }

  createItem(): Object {
    console.log(123);
    
    const blockNames : Array<string> = Object.keys(game.blockTypes);
    const randomKey : string = blockNames[Math.floor(Math.random() * blockNames.length)];
    const blockValue: Array<Array<number>> = game.blockTypes[randomKey];
    
    // const randomIndex;
    return {
      x: 0,
      y: 0,
      block: blockValue,
    };
  }

  moveItemLeft() {
    this.activeItem.x -= 1;

    if (this.blockIsOffset()) {
      this.activeItem.x += 1;
    }

    this.drawGame();
  }

  moveItemRight() {
    this.activeItem.x += 1;

    console.log(this.activeItem);

    if (this.blockIsOffset()) {
      this.activeItem.x -= 1;
    }

    this.drawGame();
  }

  moveItemDown() {
    this.activeItem.y += 1;

    if (this.blockIsOffset()) {
      this.activeItem.y -= 1;
      this.lockItem();
    }

    this.drawGame();
  }

  rotateItemRight() {
    this.rotateItem();

    if (this.blockIsOffset()) {
      this.rotateItem(false);
    }
    
    this.drawGame();
  }

  rotateItem(clockwise : boolean = true) {
    let { block } = this.activeItem;

    const rotateBlock = block[0].map((_: number, colIndex : number) => {
      const newRow = block.map((row : Array<number>) => row[colIndex]);
      if (clockwise) return newRow.reverse();
      return newRow;
    });

    this.activeItem.block = rotateBlock;
  }

  getPlaySpace() {
    const currentSpace = [...this.space];

    const { x, y, block } = this.activeItem;

    block.forEach((row, rowIndex) => {
      row.forEach((val, colIndex) => {
        currentSpace[y + colIndex][x + rowIndex] = val;
        console.log(y, x, y + colIndex, x + rowIndex);
      })
    });

    return currentSpace;
  }

  // TODO temporarily
  drawGame() {
    const app = document.getElementById('app');
    app.innerHTML = '';

    const gameSpace = document.createElement('div');
    this.getPlaySpace().forEach((row) => {
      const rowItem = document.createElement('div');
      rowItem.innerText = row;
      gameSpace.appendChild(rowItem);
    });
    app.appendChild(gameSpace);

    const activeItem = `
      <p>x: <b>${this.activeItem.x}</b>, y: <b>${this.activeItem.y}</b></p>
      <div>${this.activeItem.block[0]}</div>
      <div>${this.activeItem.block[1]}</div>
      <div>${this.activeItem.block[2]}</div>
    `;

    app.insertAdjacentHTML('beforeend', activeItem);
  }

}