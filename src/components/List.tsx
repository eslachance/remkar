import { useContext } from 'react';

import { ResultStoreContext } from '@/store/results';
import { Link, Outlet } from 'react-router-dom';

const List = () => {
  const { resultState } = useContext(ResultStoreContext);

  return (
    <>
      {resultState.filter === '' ? (
        <h1 className="mt-0 flex justify-center">Entrer une recherche ci-haut</h1>
      ) : (
        <h1 className="pt-0">{resultState?.filtered.length} resultats</h1>
      )}
      <div className="flex flex-col gap-2 overflow-auto">
        {resultState?.filtered?.map((item) => (
          <div className="border-1 border-solid border-black rounded p2" key={item.id}>
            <Link to={`/karaoke/${item.id}`}>
              {item.artist} - {item.title}
            </Link>
          </div>
        ))}
      </div>
      <Outlet />
    </>
  );
};

export default List;
