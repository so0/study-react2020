import React, { Component } from 'react';
import ColorContext, { ColorConsumer } from '../contexts/color';

const colors = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'indigo',
  'violet',
  'black',
];
class SelectColors extends Component {
  static contextType = ColorContext;
  handleSetColor = (color) => {
    this.context.actions.setColor(color);
  };
  handleSetSubColor = (subcolor) => {
    this.context.actions.setSubcolor(subcolor);
  };
  render() {
    return (
      <div>
        <h2>색상을 선택하세요.</h2>
        <div style={{ display: 'flex' }}>
          {colors.map((color) => (
            <div
              key={color}
              style={{
                background: color,
                width: '24px',
                height: '24px',
                cursor: 'pointer',
                border:
                  color === this.context.state.color
                    ? '2px solid black'
                    : 'none',
              }}
              onClick={() => this.handleSetColor(color)}
              onContextMenu={(e) => {
                e.preventDefault();
                this.handleSetSubColor(color);
              }}
            />
          ))}
        </div>
        <hr />
      </div>
    );
  }
}

// const Selectcolors = () => {
//   return (
// <div>
//   <h2>색상을 선택하세요.</h2>
//   <ColorConsumer>
//     {({ actions, state }) => (
//       <div style={{ display: 'flex' }}>
//         {colors.map((color) => (
//           <div
//             key={color}
//             style={{
//               background: color,
//               width: '24px',
//               height: '24px',
//               cursor: 'pointer',
//               border: color === state.color ? '2px solid black' : 'none',
//             }}
//             onClick={() => actions.setColor(color)}
//             onContextMenu={(e) => {
//               e.preventDefault();
//               actions.setSubcolor(color);
//             }}
//           />
//         ))}
//       </div>
//     )}
//   </ColorConsumer>
//   <hr />
// </div>
//   );
// };

export default SelectColors;
