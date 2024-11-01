import Search from '@/components/Search';
import List from '@/components/List';

const SearchPage = () => {
  return <>
    <div className="p-2 flex flex-col gap-2">
      <Search />
      <List />
    </div>
  </>;
};

export default SearchPage;