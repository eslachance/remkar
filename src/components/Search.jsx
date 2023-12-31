import React, { useContext } from "react";
import { ResultStoreContext } from "@/store/results";
import { fetchFromAPI, debounce } from "@/utils";
const baseAPIURL = "https://karaoke-db.evie.workers.dev";

export const Search = () => {
  const { resultState, dispatch } = useContext(ResultStoreContext);
  
  const getFilteredResults = (filter) => {
    fetchFromAPI(baseAPIURL + "/search/" + filter).then((data) => {
      dispatch({ type: "SET_FILTERED", payload: data });
    });
  };

  const debouncedGetFilteredResults = debounce(getFilteredResults, 1000);

  const onHandleFilterChange = (e) => {
    dispatch({ type: "SET_FILTER", payload: e.currentTarget.value });
    debouncedGetFilteredResults(e.currentTarget.value);
  };

  return (
    <>
      <input type="text" value={resultState?.filter} placeholder="recherche" onChange={onHandleFilterChange}></input>
    </>
  );
};
