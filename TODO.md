# Performance Optimizations TODO

## 1. Update db.js ✅
- Add explicit pool configuration: max=20, idleTimeoutMillis=30000, add error handling.

## 2. Update server.js ✅
- Install and add compression middleware for gzip.
- Implement in-memory caching for shipping rates (1-hour TTL by zip code).

## 3. Update routes/products.js ✅
- Add pagination to GET route (page, limit params, default limit=20).
- Optimize GET query: Use single JOIN for products and variations.
- Make image saving asynchronous (fs.promises.writeFile).
- Batch variation inserts in POST and PUT routes.

## 4. Install Dependencies ✅
- Check and install 'compression' if not present.

## 5. Test Optimizations ✅
- Run server, test /api/products with pagination.
- Simulate concurrent requests.
- Test shipping API caching.
- Monitor DB query performance.
