import React from "react";

// class component
//
export default class Square extends Component {
  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

// // class only had a "render" menthod, so converted to a function
// // less lines of code with same result
// //
// export default function Square(props) {
//   return (
//     <button className="square" onClick={props.onClick}>
//       {props.value}
//     </button>
//   )
// }