import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchFromAPI } from '@/utils';
import { useLanguage } from '@/i18n/LanguageContext';
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
  french: '🇫🇷 FR',
  english: '🇬🇧 EN',
  spanish: '🇪🇸 ES',
  german: '🇩🇪 DE',
  italian: '🇮🇹 IT',
  portuguese: '🇵🇹 PT',
  japanese: '🇯🇵 JP',
  korean: '🇰🇷 KR',
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
  const { t } = useLanguage();

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
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none px-4">
        <div className="relative my-6 mx-auto max-w-2xl w-full">
          {/*content*/}
          <div className="border border-dive-border rounded-lg shadow-2xl relative flex flex-col w-full bg-dive-bg-lighter outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-center justify-between p-4 border-b border-solid border-dive-border rounded-t">
              <div className="flex items-center gap-2">
                <span className="iconify i-ri-music-2-fill text-2xl text-dive-accent" />
                <span className="text-dive-text-muted text-sm">#{songData.song.id}</span>
              </div>
              <button
                type="button"
                className="p-1 bg-transparent border-0 cursor-pointer hover:scale-110 transition-transform"
                onClick={onDismiss}>
                <span
                  className="iconify i-ri-close-circle-line text-dive-accent hover:text-dive-accent-light h-7 w-7 outline-none focus:outline-none"
                  data-inline="false"
                />
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto flex flex-col gap-6">
              <div className="space-y-4">
                <div className="bg-dive-bg border border-dive-border rounded-lg p-4">
                  <div className="text-dive-text-muted text-sm mb-1 uppercase tracking-wide font-medium">
                    {t('artist')}
                  </div>
                  <div className="text-dive-text text-xl font-display">
                    {songData.song.artist}
                  </div>
                </div>
                <div className="bg-dive-bg border border-dive-border rounded-lg p-4">
                  <div className="text-dive-text-muted text-sm mb-1 uppercase tracking-wide font-medium">
                    {t('title')}
                  </div>
                  <div className="text-dive-text text-xl font-display">
                    {songData.song.title}
                  </div>
                </div>
              </div>
              <div className="flex gap-3 items-center bg-dive-bg border border-dive-border rounded-lg p-4">
                <span className="iconify i-ri-flag-line text-dive-accent text-xl" />
                <div className="flex-1">
                  <div className="text-dive-text-muted text-sm uppercase tracking-wide font-medium">
                    {t('language_label')}
                  </div>
                  <div className="text-dive-text text-lg">
                    {flagMap[songData.song.language.toLowerCase()] || songData.song.language}
                  </div>
                </div>
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-4 border-t border-solid border-dive-border rounded-b">
              <button
                className="bg-dive-accent hover:bg-dive-accent-light text-white font-medium px-6 py-2.5 rounded-md transition-colors"
                type="button"
                onClick={onDismiss}>
                {t('close')}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm" onClick={onDismiss} />
    </>
  );
};

export default SongDataModal;
