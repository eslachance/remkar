import Search from '@/components/Search';
import List from '@/components/List';

function App() {
  return (
    <div className="p-2 flex flex-col gap-2">
      <Search />
      {/* <div className="m-2 p-2 flex items-center gap-2 border-1 border-solid w-fit rounded">
        <span className="i-ic-sharp-edit-note" />
        Edit me!
      </div> */}
      <List />
    </div>
  );
}

export default App;
