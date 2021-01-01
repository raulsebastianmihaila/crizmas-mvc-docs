import React from 'react';

import Code from '../code';

export default () => <div>
  <h2>Webpack</h2>

  <p>If Webpack is used, there are a few things to consider:</p>

  <ul className="simple-list">
    <li>Depending on the browser support, if transcompiling the framework code is needed,
    it can be included in the transcompilation process using a regexp like
    /(crizmas-|smart-mix)/ (or just /crizmas-/ if crizmas-components and smart-mix are not
    used).</li>
    <li>
      Tree-shaking can be enabled for the framework code:
      <Code text={`
        module: {
          rules: [
            {
              include: /(crizmas-|smart-mix)/, // or without smart-mix if crizmas-components
                                               // and smart-mix are not used
              sideEffects: false
            }
          ]
        }
      `} />
    </li>
  </ul>
</div>;
