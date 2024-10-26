import { createContext, useReducer } from 'react';
import { cleanString } from '@/utils';
const baseAPIURL = 'https://karaoke-db.evie.workers.dev';

export type SongData = {
  artist: string;
  hash: string;
  title: string;
  id: number;
  language: string;
};

export type ResultsState = {
  filtered: SongData[];
  filter: string;
  count: number;
  total: number;
};

const initialState: ResultsState = {
  filtered: [],
  filter: '',
  count: 0,
  total: 0,
};

type SetFilterAction = {
  type: 'SET_FILTER';
  payload: string;
};

type SetFilteredAction = {
  type: 'SET_FILTERED';
  payload: SongData[];
};

interface ResultsContext {
  resultState: typeof initialState;
  dispatch: React.Dispatch<SetFilterAction | SetFilteredAction>;
  loadFilteredResults: (filter: string) => void;
}

const ResultStoreContext = createContext<ResultsContext>({
  resultState: initialState,
  dispatch: () => {},
  loadFilteredResults: () => {},
});

const ResultsStoreProvider = ({ children }) => {
  const resultsReducer = (state, action) => {
    switch (action.type) {
      case 'SET_FILTER': {
        return {
          ...state,
          filter: action.payload,
        };
      }
      case 'SET_FILTERED': {
        return {
          ...state,
          filtered: action.payload,
        };
      }
      default:
        return state;
    }
  };

  const [resultState, dispatch] = useReducer(resultsReducer, initialState);

  // self-refering state logic goes here
  const loadFilteredResults = (filter: string): void => {
    fetch(baseAPIURL + '/search/' + cleanString(filter))
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: 'SET_FILTERED', payload: data });
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

export { ResultStoreContext, ResultsStoreProvider };
