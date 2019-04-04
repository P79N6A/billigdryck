# Billigdryck

Compare the prices and products of Systembolaget every N hour, and highlight products that are (temporarily) cheaper!

This project aims to do 3 things;

* Provide cron jobs to keep up-to-date lists of products - prices, images, names, etc
* Provide an API to easily work against and with the data provided from the cron jobs
* A sweet, sweet, sweeeeet looking UI to view the discounted alcoholic beverages!

To get started, run:

```console
npm i
npm start:dev
````

## TODO
- [x] Add nodemon for hotswapping server code
- [x] Add concurrently to run all server processes concurrently

- [ ] Add eslint
- [ ] Add tests
- [ ] Add endpoints for `getAllProducts`, `getProductById`, `getLatestDelta`, `getProductHistory`, and much more...
- [ ] Create a "sweet, sweet, sweeeeet looking UI"