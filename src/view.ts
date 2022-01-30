export declare class view {
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
  }

  render() {
    const app = document.getElementById('app');
    app.innerHTML = '';
  }
}