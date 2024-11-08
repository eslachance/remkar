import Search from '@/components/Search';
import List from '@/components/List';

const SearchPage = () => {
  return (
    <>
      <div className="m-2 flex flex-col gap-2 w-screen">
        <Search />
        <List />
      </div>
    </>
  );
};

export default SearchPage;
