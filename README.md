# Node rippled Backup API Server (V1)

API server to serve requests for past transactions from backup ripple database. This server replaces ripple's [account_tx](https://ripple.com/build/rippled-apis/#account-tx) and DataAPI [get-account-transaction-history](https://ripple.com/build/data-api-v2/#get-account-transaction-history)

Database is imported from project https://github.com/inmyth/akka-mre-tx-exporter

For complete list of the API, run the server and open  
```
http://host/v1
```

### Instructions

**Install dependencies**
```
npm install
```

**Configure Database endpoint**
- edit `env` (use env-template)
- edit 'config/config.js' (use config.js.template)

**Swagger Setup**

*This part is needed only when documentation path is changed. It is now set to `host/v1`.*

Swagger is API documentation tool. To make sure it is set correctly, open `public/documentation/dist/index.html` and set the `url` field under `SwaggerUIBundle`.

**Run**
```
npm start
```
