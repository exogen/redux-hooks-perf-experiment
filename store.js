import { createStore } from "redux";

function updateFoo(i) {
  return { type: "UPDATE_FOO", i };
}

function updateBar(i) {
  return { type: "UPDATE_BAR", i };
}

function updateBaz(i) {
  return { type: "UPDATE_BAZ", i };
}

const initialState = {
  foo: { status: "Foo!" },
  bar: { status: "Bar." },
  baz: { status: "Baz?" }
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "UPDATE_FOO": {
      return {
        ...state,
        foo: {
          status:
            action.i % 2
              ? state.foo.status.toUpperCase()
              : state.foo.status.toLowerCase()
        }
      };
    }
    case "UPDATE_BAR": {
      return {
        ...state,
        bar: {
          status:
            action.i % 2
              ? state.bar.status.toUpperCase()
              : state.bar.status.toLowerCase()
        }
      };
    }
    case "UPDATE_BAZ": {
      return {
        ...state,
        baz: {
          status:
            action.i % 2
              ? state.baz.status.toUpperCase()
              : state.baz.status.toLowerCase()
        }
      };
    }
  }
  return state;
}

const store = createStore(reducer);

export { store, updateFoo, updateBar, updateBaz };
