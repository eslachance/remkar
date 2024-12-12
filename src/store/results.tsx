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
  songs: {
    results: SongData[];
    total: number;
    page: number;
  },
  filter: string;
  count: number;
  total: number;
};

const initialState: ResultsState = {
  songs: {
    results: [],
    total: 0,
    page: 1,
  },
  filter: '',
  count: 0,
  total: 0,
};

type SetFilterAction = {
  type: 'SET_FILTER';
  payload: string;
};

type SetFilteredAction = {
  type: 'SET_RESULTS';
  payload: SongData[];
};

interface ResultsContext {
  resultState: typeof initialState;
  dispatch: React.Dispatch<SetFilterAction | SetFilteredAction>;
  loadFilteredResults?: (filter: string, page?: number) => void;
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
      case 'SET_RESULTS': {
        return {
          ...state,
          songs: action.payload,
        };
      }
      default:
        return state;
    }
  };

  const [resultState, dispatch] = useReducer(resultsReducer, initialState);

  // self-refering state logic goes here
  const loadFilteredResults = (filter: string, page = 1): void => {
    fetchFromAPI(`/search/${cleanString(filter)}?page=${page}`).then((data) => {
      dispatch({ type: 'SET_RESULTS', payload: data });
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
