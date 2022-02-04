export default class game {
  static readonly blockTypes = {
    'I': [
      [0, 0, 0, 0],
      ['I', 'I', 'I', 'I'],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    'J': [
      ['J', 0, 0],
      ['J', 'J', 'J'],
      [0, 0, 0],
    ],
    'L': [
      [0, 0, 'L'],
      ['L', 'L', 'L'],
      [0, 0, 0],
    ],
    'O': [
      ['O', 'O'],
      ['O', 'O'],
    ],
    'S': [
      [0, 'S', 'S'],
      ['S', 'S', 0],
      [0, 0, 0],
    ],
    'T': [
      [0, 'T', 0],
      ['T', 'T', 'T'],
      [0, 0, 0],
    ],
    'Z': [
      ['Z', 'Z', 0],
      [0, 'Z', 'Z'],
      [0, 0, 0],
    ],
  };

  static readonly pointsCount: Object = {
    1: 100,
    2: 300,
    3: 700,
    4: 1500,
  };

  space: Array<Array<number>> = this.createSpace();
  totalPoint: number = 0;
  activeItem : Object = this.createItem();
  nextItem: Object = this.createItem();

  createSpace() {
    const space : Array<Array<number>> = [];

    for (let row = 0; row < 20; row++) {
      space.push([]);
      for (let col = 0; col < 10; col++) {
        space[row].push(0);
      }
    }
    return space;
  }

  createItem(): Object {
    const blockNames : Array<string> = Object.keys(game.blockTypes);
    const randomKey : string = blockNames[Math.floor(Math.random() * blockNames.length)];
    const blockValue: Array<Array<number>> = game.blockTypes[randomKey];
    
    const offsetX = Math.floor((10 / 2) - (blockValue .length / 2)); 
    
    return {
      x: offsetX,
      y: -1,
      block: blockValue,
    };
  }

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

    for (let row = 0; row < block.length; row++) {
      for (let col = 0; col <block[row].length; col++) {
        if (block[row][col] 
          && ((this.space[y + row] === undefined || this.space[y + row][x + col] === undefined) 
          || this.space[y + row][x + col])
        ) {
          return true;
        }
      }
    }
    return false; 
  }


  moveItemLeft() {
    this.activeItem.x -= 1;

    if (this.blockIsOffset()) {
      this.activeItem.x += 1;
    }
  }

  moveItemRight() {
    this.activeItem.x += 1;

    if (this.blockIsOffset()) {
      this.activeItem.x -= 1;
    }
  }

  moveItemDown() {
    this.activeItem.y += 1;

    if (this.blockIsOffset()) {
      this.activeItem.y -= 1;
      this.lockItem();
      this.updateSpaceBlock();
      this.clearLines();
    }
  }

  rotateItemRight() {
    this.rotateItem();

    if (this.blockIsOffset()) {
      this.rotateItem(false);
    }
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
    const currentSpace = JSON.parse(JSON.stringify(this.space));

    const { x, y, block } = this.activeItem;

    block.forEach((row, rowIndex) => {
      row.forEach((val, colIndex) => {
        if (val && currentSpace[y + rowIndex]) currentSpace[y + rowIndex][x + colIndex] = val;
      })
    });

    return currentSpace;
  }

  updateSpaceBlock() {
    this.activeItem = this.nextItem;
    this.nextItem = this.createItem();
  }

  clearLines() {
    const space = this.getPlaySpace();
    const rowsLength = space.length;
    const colsLength = space[0].length;
    const fillLines = [];
    const newRow : Array<number> = [];
    for (let col = 0; col < 10; col++) {
      newRow.push(0);
    }

    for(let row = rowsLength - 1; row; row--) {
      const lineItems = space[row].filter((item: any) => item).length;
      
      if (lineItems === colsLength) {
        fillLines.push(row);
      }
    }

    fillLines.forEach(line => {
      this.space.splice(line, 1);
      this.space.unshift([...newRow]);
    });

    this.totalPoint += game.pointsCount[fillLines.length] || 0;
  }

}