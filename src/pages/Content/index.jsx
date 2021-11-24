import React from 'react';
import { render } from 'react-dom';

import Content from './Content';

render(<Content />, window.document.querySelector('#script-container'));

if (module.hot) module.hot.accept();
