# [Reddarker](https://reddark.info/)
A website to watch subreddits go dark.

A hard fork and complete rewrite of the [original Reddark](https://github.com/Tanza3D/reddark) by Tanza3D, D4llo, and community members of the [Reddark discord](https://discord.gg/reddark). 

## Subreddits
Reddark pulls the list of participating subreddits from the [threads on r/ModCoord](https://reddit.com/r/ModCoord/comments/1401qw5/incomplete_and_growing_list_of_participating/). If you are the moderator of a sub that is going dark and that is not displayed on Reddark, you can [message the r/ModCoord moderators](https://reddit.com/message/compose?to=/r/ModCoord) to request that the subreddit is added to the relevant thread.

## Technologies
Fullstack Typescript
NodeJS backend, React frontend
Caddy fileserver, Cloudflare CDN

This site use a NodeJS backend server to poll the ModCoord wiki, then iterate through the subreddits on that list. All data is stored to a local Sqlite database. 

The server polls the database for subreddit status and writes a JSON file to disk every 10 seconds. The entire frontend plus the JSON data is served by Caddy as static data. Cloudflare caches everything including the JSON.

Frontend polls the JSON data from the backend/CDN every 15 seconds and appends a query string rounded to the nearest 15 second interval. (/api/subreddits.json?date=2023-06-13T21:22:45.000Z). This ensures that data is served by the CDN by only "busting" the cache every 15 seconds. 


