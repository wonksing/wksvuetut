# wksvuetut
vue tutorials

## Install node
macos
brew install node

windows
msi install 

## Install vue
old version
```
npm install vue-cli -g
```

new version
```
npm install @vue/cli -g
```

vue-init
```
npm install @vue/cli-init -g
```

## Create a project
```
vue init webpack vue-project
cd vue-project
npm install
npm run dev
```

1. webcam



## HOW TOs
### Enable tls connections in dev
webpack.dev.conf.js
```
  // these devServer options should be customized in /config/index.js
  devServer: {
    https: true,
    https: {
        key: fs.readFileSync('/Users/wonk/projects/wk/wksvuetut/webcam/certs/server.key'),
        cert: fs.readFileSync('/Users/wonk/projects/wk/wksvuetut/webcam/certs/server.pem'),
        // ca: fs.readFileSync('/etc/letsencrypt/live/webrot360.tk/chain1.pem'),
    },
```

index.js
```
module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},

    // Various Dev Server settings
    host: '0.0.0.0', // change this to the domain
```