![Screenshot](/screenshot1.jpeg?raw=true "Screenshot 1")

Tutorials:

Electron and React
- https://www.codementor.io/randyfindley/how-to-build-an-electron-app-using-create-react-app-and-electron-builder-ss1k0sfer
- https://www.freecodecamp.org/news/building-an-electron-application-with-create-react-app-97945861647c/

Customize create-react-app:
- https://auth0.com/blog/how-to-configure-create-react-app/

---
Node v14 and react-scripts-electron-by-alanzhao 4.0.4 are required.

react-scripts-electron-by-alanzhao 4.0.4 has cutomizations in `config/webpack.config.js` for node environment

- Set `minimize: false`
- Add `target: process.env.TARGET_ELECTRON ? 'electron-renderer' : 'web',` after the `node:` block

- To publish react-scripts-electron-by-alanzhao to npm,
checkout latest react-scripts in npm, find out the git head number,
clone the react-scripts, checkout the git head and modify script,
finally go to packages/react-scripts/ directory and do `npm publish`
---

How to use this project?
- Fork and clone
- Edit app info in package.json
- Edit port # in package.json
- Edit app info public/manifest.json
- Edit title in public/index.html
- Update src/images/logo.svg and splash screen design in public/index.html

Prerequisites
- Run `yarn install`

To start development in Electron
- Run `yarn dev`

To start development in browser. This is not possible if you're using modules like `fs` and `mysql`
- Run `yarn start`

To build
- Run `yarn build`

To test
- Run `yarn test`

To generate coverage report
- Run `yarn cover`

To package
- Run `yarn package`

Trouble shooting
If you run into build error, try following:
- Remove `yarn.lock` file
- Remove `node_modules/` directory
- Remove `build/` directory
- Run `yarn build`
- Run `yarn install`

Package
https://www.electron.build/configuration/mac
