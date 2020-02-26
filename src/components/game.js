import React from "react";
import Board from "./board";
import findWinner from "../helpers/calculateWinner";
import showText from "../helpers/statusText";

// can import it in a local variable
//
export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
      stepNumber: 0,
      winner: null,
    };
  }

  // when a box is clicked
  //
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const winner = findWinner(squares);

    // pre-filled box, or a winner = no further action
    if (squares[i] || winner) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'; // which player is next?
    // update the state to render view
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
      winner: winner,
    });
  }

  // move in the history
  //
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  // start the game again
  //
  resetGame() {
    this.setState({
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
      winner: null,
    });
  }

  // render the view
  //
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const status = showText(this.state);

    // build "move" elements for view
    //
    const moves = history.map((step, move) => {
      const caption = move ?
        "Go to move #" + move :
        "Beginning! (no moves)";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)} className={this.state.stepNumber === move ? "bold" : ""}>
            {caption}
          </button>
        </li>
      );
    });

    // this gets rendered in view
    //
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
          <div><button onClick={() => { this.resetGame() }}>Reset the game</button></div>
        </div>
        
        <div className="game-info">
          <div>{status}</div>
          <div>Step#: {this.state.stepNumber}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
