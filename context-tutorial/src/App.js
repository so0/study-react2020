import React, { useState } from 'react';
import ColorBox from './components/ColorBox';
import { ColorProvider } from './contexts/color';
import SelectColors from './components/Selectcolors';

function App() {
  return (
    <div>
      <ColorProvider value={{}}>
        <div>
          <SelectColors />
          <ColorBox />
        </div>
      </ColorProvider>
    </div>
  );
}

export default App;
