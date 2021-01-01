import React from 'react';

import Code from '../code';

export default () => <div>
  <h2>V1</h2>

  <p>This is the documentation for v2. The documentation for v1 can be found <a
  href="https://raulsebastianmihaila.github.io/crizmas-mvc-docs-v1/" target="_blank">here</a>.</p>

  <p>The transition from v1 to v2 includes some breaking changes (as well as some non-breaking
  updates, which we specify in the rest of the documentation):</p>

  <ul className="simple-list">
    <li>crizmas-utils, crizmas-async-utils and crizmas-promise-queue were merged into the
    crizmas-mvc package. This is particularly important when using PromiseQueue or
    Cancellation, which can now be imported from crizmas-mvc:
      <Code text="import {PromiseQueue, Cancellation} from crizmas-mvc;" />
    </li>
    <li>Old non-module script tags are not supported anymore.</li>
    <li>We moved from commonjs modules to standard ES modules, which means that the exports
    structure changed for some of the packages:
      <ul className="simple-list">
        <li>controller, observe, root, unroot, ignore, apply, construct, addObservedChild and
        removeObservedChild are not properties of Mvc anymore. Instead they can only be imported:
          <Code text={`
            import {controller, observe, root, unroot, ignore, apply, construct,
              addObservedChild and removeObservedChild} from 'crizmas-mvc';
          `} />
        </li>
        <li>Link is not a property of Router anymore. Instead it can only be imported:
          <Code text="import {Link} from 'crizmas-router';" />
        </li>
        <li>Input and validation are not properties of Form anymore and validate, required, min,
        max, minLength, maxLength and async are not properties of validation anymore.
        Instead they can only be imported.
          <Code text={`
            import {Input, validation, validate, required, min, max, minLength, maxLength, async}
              from 'crizmas-form';
          `} />
        </li>
      </ul>
    </li>
    <li>messageFunc was renamed for all the validation functions that accepted it to 'message'.</li>
    <li>The default event for the validate validator is now 'blur' instead the list made of 'change'
    and 'blur'.</li>
    <li>The validate validator now calls the validation function with an object containing
    the input, event as target instead of passing the value.</li>
    <li>min, max, minLength and maxLength are now based on validate as required is so their default
    event will now be 'blur'.</li>
    <li>min and max now also check that the type of the value is 'number' before doing
    further validation.</li>
    <li>The validation function passed to async can now return a falsy value in which case async
    behaves as if the validation was skipped (for instance if the event didn't match).</li>
  </ul>
</div>;
