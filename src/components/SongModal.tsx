import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchFromAPI } from '@/utils';
import type { SongData } from '@/store/results';

type SongFile = {
  id: number;
  songid: number;
  path: string;
  company: string;
  count: number;
  dateAdded: string;
  lastModified: string;
  isBroken: number;
  rating: number;
};

type SongModalData = {
  song: SongData;
  files: SongFile[];
};

const flagMap: Record<string, string> = {
  french: 'FR',
  english: 'EN',
  spanish: 'ES',
  german: 'DE',
  italian: 'IT',
  portuguese: 'PT',
  japanese: 'JP',
  korean: 'KR',
};

// type CompanyData = {
//   keyname: string;
//   name: string;
//   logo?: string;
// };

// const companyMap: Record<string, CompanyData> = {
//   SS: {
//     keyname: 'SS',
//     name: `Singer's Solution`,
//   },
//   L: {
//     keyname: 'L',
//     name: 'Legends -SeRIES-',
//   },
//   NU: {
//     keyname: 'NU',
//     name: 'NUTECH',
//   },
//   KB: {
//     keyname: 'KB',
//     name: 'KaraokeBay.com',
//   },
//   P: {
//     keyname: 'P',
//     name: 'Pioneer',
//   },
//   CB: {
//     keyname: 'CB',
//     name: 'Chartbuster Karaoke',
//   },
//   ME: {
//     keyname: 'ME',
//     name: 'Mr. Entertainer',
//   },
//   MH: {
//     keyname: 'MH',
//     name: 'Monster Hits',
//   },
//   SC: {
//     keyname: 'SC',
//     name: 'Sound Choice',
//   },
//   RB: {
//     keyname: 'RB',
//     name: 'Rox Box',
//   },
//   PS: {
//     keyname: 'PS',
//     name: 'Pocket Songs',
//   },
// };

const SongDataModal = () => {
  const navigate = useNavigate();
  const { id } = useParams<'id'>();

  const { data: songData } = useQuery<SongModalData>({
    queryKey: ['songData', id],
    queryFn: () => fetchFromAPI(`/song/${id}`),
  });

  if (!songData) return null;

  function onDismiss() {
    navigate(-1);
  }

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative my-6 mx-auto max-w-3xl min-w-sm">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex flex-col items-start justify-between p-2 border-b border-solid border-blueGray-200 rounded-t relative">
              <span className="text-lg">{songData.song.id}</span>
              <button
                type="button"
                className="p-1 bg-transparent border-0 absolute top-1 right-1 cursor-pointer"
                onClick={onDismiss}>
                <span
                  className="iconify i-ri-close-circle-line opacity-50 h-6 w-6 outline-none focus:outline-none"
                  data-inline="false"
                />
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <span className="font-bold w-16 block">Artiste:</span> {songData.song.artist}
                </div>
                <div className="flex gap-2">
                  <span className="font-bold w-16 block">Titre:</span> {songData.song.title}
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <span className="iconify i-ri-flag-line" /> :{' '}
                <span className="">{flagMap[songData.song.language.toLowerCase()]}</span>
              </div>
              {/* <div className="flex gap-2 items-center">
                <span className="iconify i-ri-record-circle-fill" /> :{' '}
                {songData.files.map((file) => (
                  <span className="flex gap-2 items-center" key={file.company}>
                    {file.company}
                  </span>
                ))}
              </div> */}
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 cursor-pointer"
                type="button"
                onClick={onDismiss}>
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black" />
    </>
  );
};

export default SongDataModal;
