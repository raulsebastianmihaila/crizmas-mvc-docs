import React from 'react';
import {Link} from 'crizmas-router';

import Code from '../code';
import Ticks from '../ticks';
import Logo from '../logo';

export default () => <div>
  <h2>Getting started</h2>

  <p>The simplest way to get started is to use the <Ticks text="create-crizmas" /> command to
  create a <Logo text="crizmas-mvc" /> project based on <a
  href="https://www.npmjs.com/package/webpack" target="_blank">webpack</a>. In a new directory
  that you create you can either run the command without any prior package installation:</p>

  <Code text="npx create-crizmas -A" />

  <p>or you can install the <Ticks text="create-crizmas" /> package globally:</p>

  <Code text="npm i -g create-crizmas" />

  <p>And after the installation you can run the command:</p>

  <Code text="create-crizmas -A" />

  <p>You can pass the following options (with space between them):</p>

  <ul className="simple-list">
    <li>-R or --router: adds crizmas-router and its dependencies;</li>
    <li>-F or --form: adds crizmas-form and its dependencies;</li>
    <li>-C or --components: adds crizmas-components and its dependencies;</li>
    <li>-JSX or --jsx: adds jsx support;</li>
    <li>-L or --layout: adds a root layout component that renders a spinner during router
    transitions and passes it to the Mvc instance. Requires the -R option;</li>
    <li>-A or --all: equivalent to -R -F -C -L -JSX;</li>
    <li>-GA or --github-app: adds support for deploying as a github page;</li>
    <li>-H or --help: displays helpful information about the command.</li>
  </ul>

  <p>After running the command, you can run:</p>

  <Code text={`
    npm i # to install the dependencies
    npm start # to run the application locally
    npm run build # to build the application for production
  `} />

  <p>Alternatively, you can install the framework packages individually in your own project
  structure.</p>

  <Code text={`
    npm i react
    npm i react-dom
    npm i crizmas-mvc
  `} />

  <h4>Complementary tools</h4>

  <Code text={`
    npm i prop-types
    npm i crizmas-router
    npm i crizmas-form
    npm i smart-mix # peer dependency of components
    npm i crizmas-components
  `} />

  <h4>Example</h4>

  <p>The model manages the domain logic.</p>

  <div>
    js/models/flowers-model.js
    <Code text={`
      export class Flower {
        static validateName(name) {
          if (!name.endsWith('flower')) {
            return 'The name must end with flower';
          }
        }

        constructor(name, daysLeft = 50) {
          this.name = name;
          this.daysLeft = daysLeft;
        }

        get isAlive() {
          return this.daysLeft > 0;
        }

        randomizeAge() {
          if (this.isAlive) {
            this.daysLeft -= Math.ceil(Math.random() * this.daysLeft);
          }
        }
      }

      export default {
        items: [
          new Flower('Red flower'),
          new Flower('Blue flower'),
          new Flower('Pink flower')
        ],

        addFlower(name, daysLeft) {
          this.items.push(new Flower(name, daysLeft));
        },

        randomizeAges() {
          this.items.forEach(flower => flower.randomizeAge());
        }
      };
    `} />

    <p>The controller stands between the view and the model, as the UI shouldn't try
    to modify the state of the model through direct interaction. The controller asks the model
    to update itself based on certain input or actions. The controller can also provide
    instructions to the view (preferably in a reactive fashion) and can create the connection
    between the current context of the application and other parts of the application,
    for instance by initiating route transitioning.</p>

    js/controllers/flowers-controller.js
    <Code text={`
      import {controller} from 'crizmas-mvc';
      import Form, {validation, required, minLength, min} from 'crizmas-form';

      import flowers, {Flower} from 'js/models/flowers-model';

      export default controller(class {
        constructor() {
          this.flowers = flowers;

          this.form = new Form({
            children: [
              {
                name: 'name',
                validate: validation(
                  required(),
                  minLength(5),
                  ({input}) => {
                    const value = input.getValue();

                    if (value) {
                      return Flower.validateName(value);
                    }
                  }
                )
              },

              {
                name: 'daysLeft',
                validate: validation(required(), min(10))
              }
            ],

            actions: {
              submit: () => {
                const formResult = this.form.getResult();

                this.addFlower(formResult.name, formResult.daysLeft);
                this.form.clear();
              }
            }
          });
        }

        addFlower(name, daysLeft) {
          this.flowers.addFlower(name, daysLeft);
        }

        randomizeAges() {
          this.flowers.randomizeAges();
        }
      });
    `} />

    <p>The view handles the rendering process. It can reflect the state of the model. It also asks
    the controller to handle the user's input and actions.</p>

    js/components/flowers-page.jsx
    <Code text={`
      import React, {Component} from 'react';
      import PropTypes from 'prop-types';
      import {Input} from 'crizmas-components';

      export default class FlowersPage extends Component {
        constructor() {
          super();

          this.onAdd = (e) => {
            e.preventDefault();
            this.props.controller.form.submit();
          };

          this.onRandomizeAges = () => {
            this.props.controller.randomizeAges();
          };
        }

        render() {
          const {flowers, form} = this.props.controller;

          return <div>
            <button onClick={this.onRandomizeAges}>randomize ages</button>

            {flowers.items.map((flower, i) => {
              return <div key={i}
                style={flower.isAlive ? null : {textDecoration: 'line-through'}}>
                {flower.name}, {flower.daysLeft} days left
              </div>;
            })}

            <div>
              Add a new flower
              <div>
                <form>
                  <label>name:</label>
                  <Input {...form.get('name')} />
                  <label>days left:</label>
                  <Input {...form.get('daysLeft')} type="integer" />
                  <button onClick={this.onAdd}
                    disabled={form.isBlocked}>add</button>
                </form>
              </div>
            </div>
          </div>;
        }
      }

      FlowersPage.propTypes = {
        controller: PropTypes.object.isRequired
      };
    `} />

    <p>Here we're creating our application. We must provide a dom element. We must also provide
    at least a component, an element or a router. So each of these is optional as long as we
    provide one of them.</p>

    js/main.js
    <Code text={`
      import Mvc from 'crizmas-mvc';
      import Router from 'crizmas-router';

      import Layout from 'js/components/layout';
      import HomePage from 'js/components/home-page';
      import FlowersPage from 'js/components/flowers-page';
      import FlowersController from 'js/controllers/flowers-controller';

      new Mvc({
        domElement: document.querySelector('#app'),
        component: Layout,
        router: new Router({
          routes: [
            {
              component: HomePage
            },
            {
              path: 'flowers',
              component: FlowersPage,
              controller: FlowersController
            }
          ]
        })
      });
    `} />

    <p>Head over to the <Link to="/introduction">introduction</Link>, <Link
    to="/theory">theory</Link>, <Link to="/router">router</Link> and <Link
    to="/form">form</Link> sections for more details.</p>
  </div>
</div>;
