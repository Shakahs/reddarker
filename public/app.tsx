import { createRoot } from 'react-dom/client';
import './tailwind.css'
import { ISubreddit, ISubredditData, ISubredditList } from '../types';
import { map, keys } from 'lodash'
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from 'react-query'
import classNames from 'classnames';
import { useState } from 'react';
import { useHover } from "@uidotdev/usehooks";
import { DateTime } from "luxon";

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

const linkDecor = 'text-blue-300 underline'

function createRoundedDateString(): string {
    var date = new Date();
    date.setMilliseconds(0); // Zero out the milliseconds
    var seconds = date.getSeconds();
    var roundedSeconds = Math.round(seconds / 15) * 15;
    date.setSeconds(roundedSeconds);
    return date.toISOString();
}

function RootLayout() {
    const subredditPollResult = useQuery<ISubredditData>({
        queryKey: 'subreddits',
        queryFn: () => fetch(`/api/subreddits.json?date=${createRoundedDateString()}`).then(res => res.json()),
        refetchInterval: 1000 * 5,
        placeholderData: { counts: { total: 0, private: 0 }, subreddits: {} }
    })
    const { data: subredditData, isLoading, error } = subredditPollResult

    // Will be true if request never succeeds, and false if we have stale data to use
    const isLoadingOrError = subredditData?.counts == undefined || subredditData?.counts?.total == 0

    return (
        <div className='h-full w-full p-3 bg-gray-800  text-gray-200 flex flex-col items-center  '>
            <div className='w-full flex flex-col items-center  '>
                <div className='w-5/6 px-10 flex flex-col   '>
                    <div className='text-sm'>Watch a 24/7 stream of this site at <a href='https://twitch.tv/reddark_247' className={linkDecor}>twitch.tv/reddark_247!</a></div>
                    <div className='text-4xl py-6 font-bold'>✊ Reddark</div>
                    <div className='text-2xl'>These subreddits are going dark or read-only on June 12th and after. Some already are. Click <a href='https://www.theverge.com/2023/6/5/23749188/reddit-subreddit-private-protest-api-changes-apollo-charges' className={linkDecor}>here</a> to find out why.</div>
                    <div>Like the website? Contribute <a className={linkDecor} href='https://github.com/Shakahs/reddarker' target='_blank' >here!</a></div>
                </div>
            </div>
            <div className='w-full bg-gray-900 flex  flex-row justify-end items-center py-2 my-4'>
                {/* <div>search</div> */}
                <div><span className='text-2xl pr-1'>{subredditData?.counts.private ?? 0}</span> / {subredditData?.counts.total ?? 0} subreddits are currently dark.</div>
            </div>
            <div className='w-5/6'>
                {isLoadingOrError ? <div className='text-2xl'>Loading...</div> :

                    map(srKeys, (sectionName) => {

                        const section = subredditData.subreddits[sectionName]

                        return (
                            <div key={sectionName}>
                                <div className='text-4xl font-bold border-b'>{sectionName}</div>
                                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                                    {map(section, (subreddit: ISubreddit) => <SubredditDisplay subreddit={subreddit} key={subreddit.name} />)}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}


const getElapsedTime = (isoDateString: string): string => {
    const now = DateTime.now();
    const past = DateTime.fromISO(isoDateString);
    const diff = now.diff(past, ['hours', 'minutes']);

    const hours = Math.floor(diff.hours);
    const minutes = Math.floor(diff.minutes - hours * 60);

    if (hours == 1) {
        return `${hours} hour ago`;
    }
    else if (hours > 0) {
        return `${hours} hours ago`;
    } else if (minutes > 0) {
        return `${minutes} minutes ago`;
    } else {
        return `Just now`;
    }
};


const SubredditDisplay = ({ subreddit }: { subreddit: ISubreddit }) => {
    const [ref, hovering] = useHover();

    const subRedditLink = `https://www.reddit.com/${subreddit.name}`
    let subredditColor: null | string = null
    if (subreddit.status == 'private') {
        subredditColor = 'greenText'
    } else if (subreddit.status == 'restricted') {
        subredditColor = 'blueText'
    }

    const cleandProtestMessage = subreddit?.protest_message?.replace(/<\/?[^a][^>]*>/gi, '');
    const style = {
        a: {
            'textDecoration': 'underline'
        }
    }

    const lastChecked = subreddit.last_checked ? getElapsedTime(subreddit.last_checked) : 'Never'

    return (
        <div ref={ref} className='p-6  hover:col-span-2  flex flex-col ' key={subreddit.name}>
            <div className='h-full w-full hover:border-4 border-greenText rounded-lg p-2'>
                {/* //First row  */}
                <div className='flex flex-row justify-between'>
                    {/* left item */}
                    <div>
                        <div className={classNames('text-lg  font-bold', {
                            'text-greenText': subreddit.status == 'private',
                            'text-blueText': subreddit.status == 'restricted',
                        })} style={{ 'textShadow': '0px 0px 20px #00ffaa ' }}><a href={subRedditLink} target='blank'>{subreddit.name}</a></div>
                        <div className={classNames('text-sm font-bold', {
                            'text-greenText': subreddit.status == 'private',
                            'text-blueText': subreddit.status == 'restricted',
                        })}><a href={subRedditLink} target='blank'>{subreddit.status} {subreddit.status == 'public' && ':('} {subreddit.status == null && 'Not checked yet'}</a>
                        </div>
                    </div>
                    {subreddit?.subscriber_count > 0 && <div className={classNames(' underline text-md font-bold pr-2 flex flex-col justify-center', {
                        [`text-${subredditColor}`]: subredditColor,
                        'hidden': !hovering,
                    })}>{subreddit?.subscriber_count.toLocaleString()} subscribers</div>}
                </div>
                {/* second row */}
                <div>
                    {subreddit?.protest_message && <div className='p-2 '>
                        <div className={classNames('font-light protestContainer pl-2 border-l-2', {
                            'hidden': !hovering,
                            [`text-${subredditColor}`]: subredditColor,
                            [`border-${subredditColor}`]: subredditColor,
                        })} dangerouslySetInnerHTML={{ __html: cleandProtestMessage }} /></div>}
                </div>
                <div className={classNames('text-xs', {
                    'hidden': !hovering,
                    [`text-${subredditColor}`]: subredditColor,
                })}>
                    <div>Last checked: {lastChecked}</div>
                </div>
            </div>
        </div>
    )
}

const root = createRoot(document.getElementById('react-root'));
root.render(<QueryClientProvider client={queryClient}>
    <RootLayout />
</QueryClientProvider>);