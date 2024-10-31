import { createContext, useReducer } from 'react';
import { cleanString, fetchFromAPI } from '@/utils';

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
  loadFilteredResults?: (filter: string) => void;
  getSongDataByID?: (id: string) => SongData | undefined;
}

const ResultStoreContext = createContext<ResultsContext>({
  resultState: initialState,
  dispatch: () => {},
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
    fetchFromAPI(`/search/${cleanString(filter)}`).then((data) => {
      dispatch({ type: 'SET_FILTERED', payload: data });
    });
  };

  const getSongDataByID = (id: string): SongData => {
    console.log(id, resultState);
    return resultState.filtered.find((song) => song.id === Number(id));
  };

  return (
    <ResultStoreContext.Provider
      value={{ resultState, dispatch, loadFilteredResults, getSongDataByID }}>
      {children}
    </ResultStoreContext.Provider>
  );
};

export { ResultStoreContext, ResultsStoreProvider };
