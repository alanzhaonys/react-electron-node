![Screenshot](/screenshot1.jpeg?raw=true "Screenshot 1")

Tutorials:

Electron and React
- https://www.codementor.io/randyfindley/how-to-build-an-electron-app-using-create-react-app-and-electron-builder-ss1k0sfer
- https://www.freecodecamp.org/news/building-an-electron-application-with-create-react-app-97945861647c/

Customize create-react-app:
- https://auth0.com/blog/how-to-configure-create-react-app/

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

To start development in browser. This is not possible if you're use modules like `fs` and `mysql`
- Run `yarn start`

To build
- Run `yarn build`

To test
- Run `yarn test`

To generate coverage report
- Run `yarn cover`

To package
- Run `yarn package`


# Convert Model from Keras to Tensorflowjs Format

Run `pip3 install tensorflowjs`

Run Python3 code below
```
from tensorflow import keras
from tensorflow.keras import backend
import tensorflowjs as tfjs
mobileNet = keras.applications.mobilenet.MobileNet()
tfjs.converters.save_keras_model(mobileNet, './models/mobilenet')
```
