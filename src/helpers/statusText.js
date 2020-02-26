// status text message shown in the view
//
export default function StatusText(state) {
  if (state.winner) {
    return "Winner: " + state.winner;
  } else {
    return 'Next player: ' + (state.xIsNext ? 'X' : 'O');
  }
}