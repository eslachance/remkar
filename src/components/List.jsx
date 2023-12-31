import React, { useContext, useEffect } from "react";
import { ResultStoreContext } from "@/store/results";

export const List = () => {
  const { resultState } = useContext(ResultStoreContext);

  useEffect(() => {
    console.log(resultState);
  }, [resultState]);

  return (
    <>
      <h1>{resultState?.filtered.length} results</h1>
      <ul>
        {resultState?.filtered?.map((item) => (
          <li key={item.id}>{item.artist} - {item.title}</li>
        ))}
      </ul>
    </>
  );
};
