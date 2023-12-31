import React, { createContext, useReducer } from "react";
import PropTypes from "prop-types";
const baseAPIURL = "https://karaoke-db.evie.workers.dev";

const initialState = {
  filtered: [],
  filter: "",
  count: 0,
  total: 0
};

const ResultStoreContext = createContext({
  resultsState: initialState,
  dispatch: () => {}
});

const ResultsStoreProvider = ({ children }) => {
  const resultsReducer = (state, action) => {
    switch (action.type) {
      case "SET_FILTER": {
        return {
          ...state,
          filter: action.payload
        };
      }
      case "SET_FILTERED": {
        return {
          ...state,
          filtered: action.payload
        };
      }
      default:
        return state;
    }
  };

  const [resultState, dispatch] = useReducer(resultsReducer, initialState);

  // self-refering state logic goes here
  const loadFilteredResults = (filter) => {
    fetch(baseAPIURL + "/search/" + filter)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "SET_FILTERED", payload: data });
      });
  };

  return (
    <ResultStoreContext.Provider
      value={{ resultState, dispatch, loadFilteredResults }}
    >
      {children}
    </ResultStoreContext.Provider>
  );
};

ResultsStoreProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export { ResultStoreContext, ResultsStoreProvider };
