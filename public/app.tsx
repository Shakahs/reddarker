import { createRoot } from 'react-dom/client';
import './tailwind.css'
import { ISubredditList } from '../types';
// const data: ISubredditList = i
import data from './subreddits.json'
import { map } from 'lodash'

const sr: ISubredditList = data
console.log(sr)

function RootLayout() {
    return (
        <div className='h-full w-full bg-gray-800  text-gray-200 flex flex-col items-center'>
            <div className='w-4/6 p-6'>
                <div className='text-sm'>Watch a 24/7 stream of this site at twitch.tv/reddark_247!</div>
                <div className='text-4xl py-6 font-bold'>✊ Reddark</div>
                <div className='text-2xl'>These subreddits are going dark or read-only on June 12th and after. Some already are. Click here to find out why.</div>
                <div>Like the website? Contribute here!</div>
            </div>
            <div className='w-full bg-gray-900'>
                {map(sr, (section, sectionName) => (
                    <div>
                        <div className='text-4xl font-bold border-b'>{sectionName}</div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">                            {map(section, (subreddit) => (
                            <div className='p-4'>
                                <div className='text-lg text-greenText font-bold ' style={{ 'text-shadow': '0px 0px 20px #00ffaa ' }}>{subreddit.name}</div>
                                <div className='text-sm text-greenText font-bold'>{subreddit.status}</div>
                            </div>
                        ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const root = createRoot(document.getElementById('react-root'));
root.render(<RootLayout />);