export interface TestValueState {
  counter: number;
}

export interface State {
  testValue: TestValueState;
}

const initialTestValueState: TestValueState = {
  counter: 0,
};

const initialState: State = {
  testValue: initialTestValueState,
};

export default initialState;
