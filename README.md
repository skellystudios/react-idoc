
## Running

You must have [npm](https://www.npmjs.org/) installed on your computer.
From the root project directory run these commands from the command line:

    npm install

This will install all dependencies.

To build the project, first run this command:

    npm start

This will perform an initial build and start a watcher process that will update bundle.js with any changes you wish to make.  This watcher is based on [Browserify](http://browserify.org/) and [Watchify](https://github.com/substack/watchify), and it transforms React's JSX syntax into standard JavaScript with [Reactify](https://github.com/andreypopp/reactify).


## To Do

- [ ] Do the clock thing correctly to avoid February 30th
- [ ] Set up the "next item" nicely
- [ ] Add a front page
- [ ] Support zooming into the future from a "next item"
- [ ] Different colours for different paths
- [ ] Different markers for different streams
- [ ] End state
- [ ] Reset time / clip select option

