import React from 'react';
import {Link} from 'crizmas-router';

import Logo from '../logo';
import Code from '../code';

export default () => <div>
  <h2><Logo text="crizmas-components" /></h2>

  <Code text={`
    npm i smart-mix # peer dependency
    npm i crizmas-components
  `} />
</div>;
