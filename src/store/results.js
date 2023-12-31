import { createContext, useReducer } from "react";

const initialState = {
  filtered: [],
  filter: '',
  count: 0,
  total: 0
};

const ResultStoreContext = createContext({
  resultsState: initialState,
  dispatch
});

const ResultsStoreProvider = ({ children }) => {

  const resultsReducer = (state, action) => {
    switch (action.type) {
      case 'SET_FILTER': {
        return {
          ...state,
          filter: action.payload
        }
      }
      default:
        return state;
    }
  };

  const [resultState, dispatch] = useReducer(resultsReducer, initalState);

  // self-refering state logic goes here
  const loadFilteredResults = (filter) => {
    fetch()
  }

  return (
    <ResultsStoreContext.Provider value={{ resultState, dispatch }}>
      {children}
    </ResultsStoreContext.Provider>
  );
};

export { ResultStoreContext, ResultsStoreProvider };