export interface ISubreddit {
    name: string;
    status: string;
}

export interface ISubredditList {
    [key: string]: ISubreddit[];
}