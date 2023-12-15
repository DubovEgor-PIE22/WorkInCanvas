document.addEventListener('DOMContentLoaded', function () {
  const TicTacToeGame = {
    board: ['', '', '', '', '', '', '', '', ''],
    currentPlayer: 'X',
    gameStatus: 'ongoing',

    makeMove: function (index) {
      if (this.gameStatus !== 'ongoing' || this.board[index] !== '') {
        return;
      }

      this.board[index] = this.currentPlayer;

      if (this.checkWinner()) {
        this.gameStatus = 'winner';
      } else if (this.board.every(cell => cell !== '')) {
        this.gameStatus = 'draw';
      } else {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
      }

      this.updateBoard();
    },

    checkWinner: function () {
      const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]            
      ];

      for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (this.board[a] !== '' && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
          return true;
        }
      }

      return false;
    },

    updateBoard: function () {
      const cells = document.querySelectorAll('.cell');

      this.board.forEach((playerSymbol, index) => {
        cells[index].textContent = playerSymbol;
      });
      const winnerMessage = document.getElementById('winner-message');
      const drawMessage = document.getElementById('draw-message');

      if (this.gameStatus === 'winner') {
        winnerMessage.textContent = `Игрок ${this.currentPlayer} выиграл!`;
        drawMessage.textContent = '';
      } else if (this.gameStatus === 'draw') {
        drawMessage.textContent = 'Ничья!';
        winnerMessage.textContent = '';
      } else {
        winnerMessage.textContent = '';
        drawMessage.textContent = '';
      }
    },
  };
  const cells = document.querySelectorAll('.cell');

  cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
      TicTacToeGame.makeMove(index);
    });
  });

  TicTacToeGame.updateBoard();
});
