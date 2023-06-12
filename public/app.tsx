import { createRoot } from 'react-dom/client';
import './tailwind.css'

function HelloMessage({ name }) {
    return (
        <div className='h-full w-full bg-gray-800  text-gray-200 flex flex-col items-center'>
            <div className='w-4/6 p-6'>
                <div className='text-sm'>Watch a 24/7 stream of this site at twitch.tv/reddark_247!</div>
                <div className='text-4xl py-6 font-bold'>✊ Reddark</div>
                <div className='text-2xl'>These subreddits are going dark or read-only on June 12th and after. Some already are. Click here to find out why.</div>
                <div>Like the website? Contribute here!</div>
            </div>
            <div className='w-full bg-gray-900'>
                asdad
            </div>
        </div>
    );
}

const root = createRoot(document.getElementById('react-root'));
root.render(<HelloMessage name="Taylor" />);