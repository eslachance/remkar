import React, { useContext } from "react";
import { ResultStoreContext } from "@/store/results";
import { fetchFromAPI, debounce } from "@/utils";

export const Search = () => {
  const { state, dispatch } = useContext(ResultStoreContext);
  
  const getFilteredResults = (filter) => {
    fetchFromAPI("/search/" + filter).then((data) => {
      dispatch({ type: "SET_FILTERED", payload: data });
    });
  };

  const debouncedGetFilteredResults = debounce(getFilteredResults, 500);

  const onHandleFilterChange = (e) => {
    dispatch({ type: "SET_FILTER", payload: e.currentTarget.value });
    debouncedGetFilteredResults(e.currentTarget.value);
  };

  return (
    <>
      <input type="text" value={state?.filter} placeholder="recherche" onChange={onHandleFilterChange}></input>
    </>
  );
};
