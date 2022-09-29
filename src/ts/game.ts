import { STATUS, STORAGE_KEY } from "./constants";

type tBlock = (string|number)[][];

interface iItem {
  x: number,
  y: number,
  block: tBlock,
}

export default class game {
  rows: number
  cols: number

  constructor(
    rows: number,
    cols: number,
  ) {
    this.rows = rows;
    this.cols = cols;
  }

  private readonly blockTypes : {[name: string]: (string|number)[][]} = {
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

  
  // eslint-disable-next-line
  private readonly pointsCount: {[name: number]: number} = {
    1: 100,
    2: 300,
    3: 700,
    4: 1500,
  };

  get speed() : number {
    const speed = Math.ceil((100 - this.totalPoint / 100)/10) * 70;
    return Math.max(speed, 100);
  }
  
  status: number = STATUS.new;

  space: tBlock = [];
  totalPoint = 0;
  activeItem : iItem = this.createItem();
  nextItem: iItem = this.createItem();

  createSpace(rows: number, cols: number) {
    const space : tBlock = [];

    for (let row = 0; row < rows; row++) {
      space.push([]);
      for (let col = 0; col < cols; col++) {
        space[row].push(0);
      }
    }
    return space;
  }

  // eslint-disable-next-line
  createItem(): iItem {
    const blockNames : Array<string> = Object.keys(this.blockTypes);
    const randomKey : string = blockNames[Math.floor(Math.random() * blockNames.length)];
    const blockValue: tBlock = this.blockTypes[randomKey];
    
    const offsetX : number = Math.floor((10 / 2) - (blockValue .length / 2)); 
    
    return {
      x: offsetX,
      y: -1,
      block: blockValue,
    };
  }

  lockItem() {
    const { x, y, block } : iItem = this.activeItem;

    for (let i = 0; i < block.length; i++) {
      for (let j = 0; j <block[i].length; j++) {
        if (i + y < 0) {
          this.gameOver();
        } else if (block[i][j]) {
          this.space[i + y][j + x] = block[i][j];
        }
      }
    }
  }

  blockIsOffset(): boolean {
    const { x, y, block } : iItem = this.activeItem;

    for (let row = 0; row < block.length; row++) {
      for (let col = 0; col <block[row].length; col++) {
        if (
          block[row][col] 
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

  rotateItem() {
    const { block } = this.activeItem;
    const length = block.length;

    const rotateBlock = this.createSpace(length, length);
    
    for (let y = 0; y < length; y++) {
      for(let x = 0; x < length; x++) {
        rotateBlock[x][y] = block[length - 1 - y][x];        
      }
    }

    this.activeItem.block = rotateBlock;

    if (this.blockIsOffset()) {
      this.activeItem.block = block;
    }
  }

  getPlaySpace() {
    if (!this.space.length) {
      this.space = this.createSpace(this.rows, this.cols);
    }

    const currentSpace = JSON.parse(JSON.stringify(this.space));

    const { x, y, block } = this.activeItem;

    block.forEach((row, rowIndex) => {
      row.forEach((val, colIndex) => {
        if (val && currentSpace[y + rowIndex]) {
          currentSpace[y + rowIndex][x + colIndex] = val;
        }
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

    const newRow : Array<number> = new Array(10).fill(0, 0);

    for(let row = rowsLength - 1; row; row--) {
      const lineItems = space[row].filter((item: [number]) => item).length;
      
      if (lineItems === colsLength) {
        fillLines.push(row);
      }
    }

    fillLines.forEach((line : number, index) => {
      // если 2 и более строк то индекс смещается вниз, по мере удаления строк
      this.space.splice(line + index, 1);
      this.space.unshift([...newRow]);
    });

    this.totalPoint += this.pointsCount[fillLines.length] || 0;

    const storageScore = Number(localStorage.getItem(STORAGE_KEY) || 0);
    localStorage.setItem(STORAGE_KEY, `${Math.max(this.totalPoint, storageScore)}`);

    if (fillLines.length) {
      this.clearLines();
    }
    return true;
  }

  gameOver() {
    this.status = STATUS.game_over;
  }

  restart() {
    this.activeItem = this.createItem();
    this.space = this.createSpace(this.rows, this.cols);
    this.totalPoint = 0;
  }
  
}