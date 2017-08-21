# swap-io-client

## Development
To get started, clone the repository and run
```
npm start
```

This will start a live development server running at http://localhost:8080

To enable automatic refresh, navigate the browser to http://localhost:8080/webpack-dev-server/

## Production
To make a bundle for production, run
```
npm run build:dist
```

This will create a minified javascript bundle and combine all sass modules into a single css file.
After this process completes, you will find the production build in /dist
