import { createRoot } from 'react-dom/client';
import './tailwind.css'
import { ISubredditData, ISubredditList } from '../types';
import { map, keys } from 'lodash'
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from 'react-query'

const queryClient = new QueryClient()

const srKeys = [
    "40+ million:\r",
    "30+ million:\r",
    "20+ million:\r",
    "10+ million:\r",

    "5+ million:\r",
    "1+ million:\r",

    "500k+:\r",
    "250k+:\r",
    "100k+:\r",
    "50k+:\r",

    "5k+:\r",
    "5k and below:\r",
];

function RootLayout() {
    const subredditPollResult = useQuery<ISubredditData>({
        queryKey: 'subreddits',
        queryFn: () => fetch('/api/subreddits.json').then(res => res.json()),
        refetchInterval: 1000 * 5,
        placeholderData: { counts: { total: 0, private: 0 }, subreddits: {} }
    })
    const { data: subredditData } = subredditPollResult

    return (
        <div className='h-full w-full p-3 bg-gray-800  text-gray-200 flex flex-col  '>
            <div className='w-full flex flex-col items-center  '>
                <div className='w-5/6 px-10 flex flex-col   '>
                    <div className='text-sm'>Watch a 24/7 stream of this site at twitch.tv/reddark_247!</div>
                    <div className='text-4xl py-6 font-bold'>✊ Reddark</div>
                    <div className='text-2xl'>These subreddits are going dark or read-only on June 12th and after. Some already are. Click here to find out why.</div>
                    <div>Like the website? Contribute here!</div>
                </div>
            </div>
            <div className='w-full bg-gray-900 flex  flex-row justify-end items-center py-2 my-4'>
                {/* <div>search</div> */}
                <div><span className='text-2xl pr-1'>{subredditData.counts.private}</span> / {subredditData.counts.total} subreddits are currently dark.</div>
            </div>
            {map(srKeys, (sectionName) => {

                const section = subredditData.subreddits[sectionName]

                return (
                    <div key={sectionName}>
                        <div className='text-4xl font-bold border-b'>{sectionName}</div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                            {map(section, (subreddit) => (
                                <div className='p-4' key={subreddit.name}>
                                    <div className='text-lg text-greenText font-bold ' style={{ 'textShadow': '0px 0px 20px #00ffaa ' }}>{subreddit.name}</div>
                                    <div className='text-sm text-greenText font-bold'>{subreddit.status}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            })}

        </div>
    );
}

const root = createRoot(document.getElementById('react-root'));
root.render(<QueryClientProvider client={queryClient}>
    <RootLayout />
</QueryClientProvider>);