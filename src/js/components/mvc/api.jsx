import React from 'react';
import {Link} from 'crizmas-router';

import Api from '../api';
import Ticks from '../ticks';

export default () => <div>
  <h2 id="introduction">API</h2>

  <p>Make sure you check the <Link to="/getting-started">getting started</Link> and <Link
  to="/theory">theory</Link> sections before jumping into API details.</p>

  <Api
    id="Mvc"
    text={`
      import Mvc from 'crizmas-mvc';

      const mvc = new Mvc({
        router: new Router({routes: []}),
        component: ReactComponent, // or element: <ReactComponent />
        domElement: document.querySelector('#app')
      });
    `} />

  <ul className="simple-list">
    <li>Creates a new mvc instance.</li>
    <li>The router is optional, but recommended, because it also takes care of rooting and
    unrooting.</li>
    <li>A layout can be provided as component or element. It receives the router as a prop.
    (Therefore things like react-router are supported.)</li>
    <li>The element and component are also optional, but if the router is not provided,
    one of them must be provided.</li>
    <li>The router is passed on the React context.</li>
  </ul>

  <Api id="mvc.mount" text="mvc.mount()" />

  <ul className="simple-list">
    <li>This is called when the mvc instance is created.</li>
    <li>Mounts the router, if one was passed.</li>
    <li>Can be used to remount an unmounted mvc instance.</li>
  </ul>

  <Api id="mvc.unmount" text="mvc.unmount()" />

  <ul className="simple-list">
    <li>Unmounts an mvc instance that can later be remounted.</li>
    <li>Unmounts the router, if one was passed.</li>
    <li>It calls <Ticks text="ReactDOM.unmountComponentAtNode" /></li>
  </ul>

  <Api id="mvc.isMounted" text="mvc.isMounted" />

  <ul className="simple-list">
    <li>It's true if the mvc instance is mounted.</li>
  </ul>

  <Api
    id="controller"
    text={`
      import {controller} from 'crizmas-mvc';

      const ctrl = controller(value);
    `} />

  <ul className="simple-list">
    <li>The value can be either a non-promise object or a function.</li>
    <li>If the value is a function that is not already observed,
    the resulted function can only be constructed.</li>
    <li>Returns the observed value.</li>
  </ul>

  <Api
    id="observe"
    text={`
      import {observe} from 'crizmas-mvc';

      observe(value, {key, preventApply});
    `} />

  <ul className="simple-list">
    <li>Causes the value to be observed if it's a function or an object (including
    promises and thenables).</li>
    <li>The second argument is optional.</li>
    <li>If the value is a function, the key will become the associated key.</li>
    <li>If the value is already observed, if since the last observation it was
    adorned with new methods or if the function's prototype has new methods, they will
    be observed.</li>
    <li>The associated key of an observed function cannot be changed.</li>
    <li>If preventApply is true and the value is a function that is not already observed,
    the resulted function can only be constructed.</li>
    <li>Returns the observed value or the original value if it cannot be observed.</li>
  </ul>

  <Api id="object.pending" text="observedObject.pending.has(key)" />

  <ul className="simple-list">
    <li>Returns true as long as there is a pending function in relation to the object,
    whose associated key is <Ticks text="key"/>.</li>
    <li>The observed object can be a function.</li>
  </ul>

  <Api id="object.isPending" text="observedObject.isPending" />

  <ul className="simple-list">
    <li>Is true as long as there is a pending function in relation to the object or as long
    as one of the object's child observed objects is pending.</li>
    <li>The observed object can be a function.</li>
    <li>The object must be managed (must be part of an observed tree),
    otherwise <Ticks text="isPending" /> is not managed.</li>
  </ul>

  <Api
    id="ignore"
    text={`
      import {ignore} from 'crizmas-mvc';

      ignore(value);
    `} />

  <ul className="simple-list">
    <li>Ignores the value in order to prevent it from being observed.</li>
    <li>Observed promises are automatically ignored.</li>
    <li>When an ignored promise is returned by a pending method it is still observed
    because the pending state of the object can change.</li>
    <li>When an ignored promise is returned by an observed constructor it is still observed
    for several reasons. For instance, if it's fulfilled with an object, that object must
    be observed, which is a side effect.</li>
    <li>If the value is an already observed non-promise object or function it throws
    an error.</li>
    <li>Returns the value.</li>
  </ul>

  <Api
    id="root"
    text={`
      import {root} from 'crizmas-mvc';

      root(value);
    `} />

  <ul className="simple-list">
    <li>The value can be either a non-promise object or a function.</li>
    <li>If the value is not observed, it's first observed.</li>
    <li>If the value is an object, it's marked as a root.</li>
    <li>If the value is a function, when it's constructed, the resulted object
    is marked as root.</li>
    <li>If the value is a function that is not already observed,
    the resulted function can only be constructed.</li>
    <li>Returns the observed value.</li>
  </ul>

  <Api
    id="unroot"
    text={`
      import {unroot} from 'crizmas-mvc';

      unroot(value);
    `} />

  <ul className="simple-list">
    <li>If the value is a root, it's unmarked.</li>
    <li>If the value is a rooting function, it stops being a rooting function.</li>
    <li>If the object's <Ticks text="isPending" /> prop is true, it's still managed
    until it becomes false, and after that it stops being managed.</li>
  </ul>

  <Api
    id="apply"
    text={`
      import {apply} from 'crizmas-mvc';

      apply(func, thisArg, args, {key});
    `} />

  <ul className="simple-list">
    <li>Useful if we want to observe a function call without creating an observed function,
    or if we want an observed object to be pending in relation to an operation with a custom key.
    </li>
    <li>Only the first argument is required.</li>
    <li>Calls the function with <Ticks text="thisArg" /> as the <Ticks text="this" /> value,
    passing the arguments.</li>
    <li>Behaves as if <Ticks text="func" /> was an observed function, but without actually observing
    the function, meaning that after the call the function is not an observed function
    (assuming that prior to the call it wasn't an observed function).</li>
    <li>If <Ticks text="thisArg" /> is an observed object and the function returns a promise,
    the observed object will be pending in relation to the provided key.</li>
    <li>If the function is an already observed function and has a different key and <Ticks
    text="thisArg" /> is an observed object and the function returns a promise, the object will
    be pending in relation to both the keys.</li>
  </ul>

  <Api
    id="construct"
    text={`
      import {construct} from 'crizmas-mvc';

      const obj = construct(constructor, args, newTarget, {isRoot});
    `} />

  <ul className="simple-list">
    <li>Useful if we want to observe a function construction without creating an observed function.
    </li>
    <li>Only the first argument is required.</li>
    <li>Constructs the function with <Ticks text="newTarget" /> as the <Ticks
    text="new.target" /> value, passing the arguments.</li>
    <li>Behaves as if <Ticks text="constructor" /> was an observed function, but without actually
    observing the function, meaning that after the call the function is not an observed function
    (assuming that prior to the call it wasn't an observed function).</li>
    <li>If <Ticks text="isRoot" /> is true, it behaves as if the constructor was a root constructor.
    </li>
  </ul>

  <Api
    id="addObservedChild"
    text={`
      import {addObservedChild} from 'crizmas-mvc';

      addObservedChild(obj, child);
    `} />

  <ul className="simple-list">
    <li>Adds an observed object as the child of another observed object (in the
    mechanism of state management).</li>
    <li>This doesn't have anything to do with the child being or not the value
    of one of the object's properties. There's no such requirement
    and this API doesn't automatically add it as a property.</li>
  </ul>

  <Api
    id="removeObservedChild"
    text={`
      import {removeObservedChild} from 'crizmas-mvc';

      removeObservedChild(obj, child);
    `} />

  <ul className="simple-list">
    <li>Removes an observed child from an observed object (in the
    mechanism of state management).</li>
    <li>This doesn't have anything to do with the child being or not the value
    of one of the object's properties. There's no such requirement
    and this API doesn't automatically remove the property, if it exists.</li>
  </ul>

  <Api
    id="PromiseQueue"
    text={`
      import {PromiseQueue} from 'crizmas-mvc';

      const promiseQueue = new PromiseQueue({
        done(value) {},

        catch(err) {},

        update(value) {}
      });
    `} />

  <ul className="simple-list">
    <li>Creates a new promiseQueue instance.</li>
    <li>The object argument is optional.</li>
    <li>The promise queue is a queue of promises that allows us to discard previous pending promises
    when we have a new promise that we're interested in.</li>
    <li>If a previous promise is fulfilled before the last promise is settled, the update callback
    is called, unless there was a promise that was added afterwards and was settled before.</li>
    <li>If a previous promise is rejected before the last promise is settled, the catch callback
    is called and the queue promise is rejected.</li>
    <li>If all goes well, when the last promise is settled, the queue promise is settled and matches
    the last promise's state.</li>
    <li>If the queue promise is fulfilled, the done callback is called, otherwise the catch callback
    is called.</li>
    <li>The promise queue can be used for things like searches that discard previous searches
    when a filter value is changed.</li>
  </ul>

  <Api id="promiseQueue.add" text="promiseQueue.add(promise)" />

  <ul className="simple-list">
    <li>The add method receives a promise and returns a promise (the queue promise) that will match
    the state of the last promise that was added.</li>
    <li>If the add method is called again before the queue promise is settled the new promise
    becomes the last promise and the add method returns the same queue promise.</li>
    <li>If the add method is called again after the queue promise was settled a new queue promise
    is created.</li>
  </ul>

  <Api
    id="Cancellation"
    text={`
      import {Cancellation} from 'crizmas-mvc';

      const cancellation = new Cancellation();
    `} />

  <ul className="simple-list">
    <li>Creates a new cancellation instance.</li>
    <li>The cancellation mechanism can be used in case we decide to ignore the result of an async
    operation at some point.</li>
    <li>The same cancellation object can be used with as many async operations as we want.</li>
  </ul>

  <Api
    id="cancellation.signal"
    text={`
      cancellation.signal.onabort = () => {
        console.log('aborted'); // this is called when the cancel method is called
      };
    `} />

  <ul className="simple-list">
    <li>The cancellation object has an <Ticks text="signal" /> field whose value is a
    standard <Ticks text="AbortSignal" /> object.</li>
    <li>This can be used to send a signal to the source of the async operation promise that we are
    not interested in the operation anymore.</li>
    <li>This can be used together with the standard <Ticks text="fetch" /> API to abort requests
    to servers.</li>
    <li>We can check if the cancellation was triggered by adding event handlers on the signal object
    and by checking its <Ticks text="aborted" /> property.</li>
  </ul>

  <Api
    id="cancellation.cancellable"
    text={`
      cancellation.cancellable(asyncOperationThatReturnsAPromise()).catch((reason) => {
        console.log(reason.isCancellation); // true
        console.log(reason.message); // 'testing cancellation'
      });
    `} />

  <ul className="simple-list">
    <li>The <Ticks text="cancellable" /> method is used to mark the async operation as cancellable
    and its resulted promise will be rejected with the cancellation reason, in case the cancellation
    is riggered before the async operation finished.</li>
    <li>If the async operation finishes before the cancellation is triggered, then the cancellable
    promise is settled with the result of the async operation.</li>
  </ul>

  <Api
    id="cancellation.cancel"
    text={`
      const cancellationPromise = cancellation.cancel('testing cancellation');

      cancellationPromise.catch((reason) => {
        console.log(reason.isCancellation); // true
        console.log(reason.message); // 'testing cancellation'
      });
    `} />

  <ul className="simple-list">
    <li>Cancels the async operation and returns the cancellation promise.</li>
    <li>We can also use the cancellation promise to check if the cancellation was triggered.</li>
    <li>The cancellation promise is always rejected with the cancellation reason.</li>
    <li>The cancellation reason is an object with an <Ticks text="isCancellation" /> property whose
    value is true and with a <Ticks text="message" /> property whose value will be whatever was
    passed to the <Ticks text="cancel" /> method.</li>
  </ul>
</div>;
