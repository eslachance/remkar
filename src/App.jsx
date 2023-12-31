import React from "react";
import { Search, List } from "@/components";

function App() {
  return (
    <>
      <Search />
      {/* <div className="m-2 p-2 flex items-center gap-2 border-1 border-solid w-fit rounded">
        <span className="i-ic-sharp-edit-note" />
        Edit me!
      </div> */}
      <List />
    </>
  );
}

export default App;
