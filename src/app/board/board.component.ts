import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  squares!: any[];
  xIsNext: boolean | undefined;
  winner: string | null | undefined;

  constructor() {}

  ngOnInit(): void {
    this.newGame();
  }

  newGame(): void{
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xIsNext = true;
  }

  get player(){
    return this.xIsNext ? 'X' : 'O'
  }

  makeMove(index: number): void{
    if(!this.squares[index]){
      this.squares.splice(index, 1, this.player);
      this.xIsNext = !this.xIsNext;
      this.winner = this.calculateWinner();
      if(this.winner === null && this.calculateFull()){
        alert("Match ended in draw!");
        this.newGame();
      }
      return;
    }
    alert('You are clicking on an already taken square!')
  }

  calculateFull(): boolean{
    for(let i=0;i<this.squares.length;i++){
      if(this.squares[i] === null)
        return false;
    }
    return true;
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a];
      }
    }
    return null;
  }
}
