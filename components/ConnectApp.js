import React, { useRef } from "react";
import { connect } from "react-redux";
import { updateFoo, updateBar, updateBaz } from "../store";

const ActionsInfo = connect(
  undefined,
  {
    updateFoo,
    updateBar,
    updateBaz
  }
)(actions => {
  const renderCount = useRef(0);
  renderCount.current += 1;
  return (
    <div>
      Received {Object.keys(actions).length} action(s)! ({renderCount.current})
    </div>
  );
});

const FooInfo = connect(state => ({
  foo: state.foo
}))(props => {
  const renderCount = useRef(0);
  renderCount.current += 1;
  return (
    <div>
      {props.foo.status} ({renderCount.current})
    </div>
  );
});

const BarInfo = connect(state => ({
  bar: state.bar
}))(props => {
  const renderCount = useRef(0);
  renderCount.current += 1;
  return (
    <div>
      {props.bar.status} ({renderCount.current})
    </div>
  );
});

const BazInfo = connect(state => ({
  baz: state.baz
}))(props => {
  const renderCount = useRef(0);
  renderCount.current += 1;
  return (
    <div>
      {props.baz.status} ({renderCount.current})
    </div>
  );
});

export default function ConnectApp() {
  return (
    <main>
      <ActionsInfo />
      <ul>
        <li>
          <FooInfo />
          <BarInfo />
          <BazInfo />
        </li>
        <li>
          <FooInfo />
          <BarInfo />
          <BazInfo />
        </li>
        <li>
          <FooInfo />
          <BarInfo />
          <BazInfo />
        </li>
      </ul>
    </main>
  );
}
