import React, { useContext } from "react";
import { ResultStoreContext } from "@/store/results";

export const List = () => {
  const { state } = useContext(ResultStoreContext);

  return (
    <>
      <ul>
        {state?.filtered?.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </>
  );
};
