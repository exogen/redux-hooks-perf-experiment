import React, { useContext, useRef } from "react";
import { connect } from "react-redux";
import { updateFoo, updateBar, updateBaz } from "../store";

const ActionsContext = React.createContext();
const FooContext = React.createContext();
const BarContext = React.createContext();
const BazContext = React.createContext();

export const HooksProvider = connect(
  state => ({
    foo: state.foo,
    bar: state.bar,
    baz: state.baz
  }),
  { updateFoo, updateBar, updateBaz },
  (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...stateProps,
    actions: dispatchProps
  })
)(({ actions, foo, bar, baz, children }) => {
  return (
    <ActionsContext.Provider value={actions}>
      <FooContext.Provider value={foo}>
        <BarContext.Provider value={bar}>
          <BazContext.Provider value={baz}>{children}</BazContext.Provider>
        </BarContext.Provider>
      </FooContext.Provider>
    </ActionsContext.Provider>
  );
});

function useActions() {
  return useContext(ActionsContext);
}

function useFoo() {
  return useContext(FooContext);
}

function useBar() {
  return useContext(BarContext);
}

function useBaz() {
  return useContext(BazContext);
}

const ActionsInfo = props => {
  const actions = useActions();
  const renderCount = useRef(0);
  renderCount.current += 1;
  return (
    <div>
      Received {Object.keys(actions).length} action(s)! ({renderCount.current})
    </div>
  );
};

const FooInfo = props => {
  const foo = useFoo();
  const renderCount = useRef(0);
  renderCount.current += 1;
  return (
    <div>
      {foo.status} ({renderCount.current})
    </div>
  );
};

const BarInfo = props => {
  const bar = useBar();
  const renderCount = useRef(0);
  renderCount.current += 1;
  return (
    <div>
      {bar.status} ({renderCount.current})
    </div>
  );
};

const BazInfo = props => {
  const baz = useBaz();
  const renderCount = useRef(0);
  renderCount.current += 1;
  return (
    <div>
      {baz.status} ({renderCount.current})
    </div>
  );
};

export default function HooksApp() {
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
