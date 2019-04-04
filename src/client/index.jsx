import React from 'react';
import { render } from 'react-dom';

import Test from './components/test';

const App = () => (
  <div>
            hej hej hej react
    <Test world="nämen" />
  </div>
);

render(<App />, document.getElementById('root'));
