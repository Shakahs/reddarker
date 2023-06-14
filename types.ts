export interface ISubreddit {
    name: string;
    status: string;
    subscriber_count?: number;
    protest_message?: string
    last_checked?: string;
}

export interface ISubredditList {
    [key: string]: ISubreddit[];
}

export interface ISubredditData {
    subreddits: ISubredditList;
    counts: {
        total: number;
        private: number;
    }
}