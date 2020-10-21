# Get IP Address

A server that serves a api that shows you your ip address.


## Your Project

On the back-end,

- App starts at `server.js`
- Safely store app secrets in `.env` (nobody can see this but you and people you invite)

## How to use 
 ```js
let req = await fetch("https://peerip.glitch.me")
let data = await req.json()
let ip = data.ip //you device ip address
```
