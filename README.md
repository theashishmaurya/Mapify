# Mapify

#### Making node-based content made simple.

Mapify is a simple node-based editor to create your flow-charts and Roadmaps balzing fast. :zap:

## Motivation

Roadmaps and flows makes understanding easy but the whole problem with them is there are not enough services which provide simple UI and is developer friendly. Here, comes Mapify

#### Features

- Fully drag and add option to simple create new Node.
- Style your Nodes with tailwind CSS or predefined styles.
- Download the node in PNG format directly to your local
- Find other people's post about new Roadmaps or flow-apps
- Create your Embeddable link and embed them to your new blog post or your own site.

### Previews

## Tech/frameworks used

##### Built with

- This App Uses [Nextjs](https://nextjs.org/) as frontend Framework and uses [Firebase](https://firebase.google.com/) as backend.
- It also uses [React-flow](https://reactflow.dev/) for node editor.
- Right now its using Auth0 as IAAS.

## How to Install in your local.

Clone this repository.

```
git pull https://github.com/Ashumaurya/Mapify

```

Create a new file and set up your api key for Auth0 and firebase firestore.

```
AUTH0_SECRET='use [openssl rand -hex 32] to generate a 32 bytes value'
AUTH0_BASE_URL='http://localhost:[YOUR PORT]'
AUTH0_ISSUER_BASE_URL= [YOUR BASE URL]
AUTH0_CLIENT_ID=[YOUR CLIENT ID]
AUTH0_CLIENT_SECRET=[YOUR CLIENT SECRET]

NEXT_PUBLIC_FIREBASE_APIKEY = [YOUR KEY]
NEXT_PUBLIC_FIREBASE_AUTHDOMAIN  = [YOUR KEY]
NEXT_PUBLIC_FIREBASE_PROJECTID = [YOUR FIREBASE PROJECT ID]
NEXT_PUBLIC_FIREBASE_STORAGEBUCKET = [YOUR STORAGE BUCKET]
NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID  = [YOUR KEY]
NEXT_PUBLIC_FIREBASE_MEASUREMENTID =[YOUR KEY]

```

for more information about setting up [Auth0](https://auth0.com) read this [article](https://auth0.com/docs/quickstart/webapp/nextjs/01-login).
for more information about settin up your [firebase](https://firebase.google.com) read this [article](https://firebase.google.com/docs/web/setup).

## Liscense

MIT License

Copyright (c) 2021 Ashish maurya
