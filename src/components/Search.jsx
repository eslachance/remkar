import React, { useContext, useState } from "react";
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
  const [ search ] = useState(() => debounce(getFilteredResults, 500));

  const onHandleFilterChange = (e) => {
    dispatch({ type: "SET_FILTER", payload: e.currentTarget.value });
    search(e.currentTarget.value);
  };

  return (
    <>
      <input type="text" value={resultState?.filter} placeholder="recherche" onChange={onHandleFilterChange}></input>
    </>
  );
};
