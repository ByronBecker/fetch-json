//! fetch-json v2.2.0 -- github.com/center-key/fetch-json -- MIT License

const fetch = typeof window === 'object' && window.fetch || require('node-fetch');

const fetchJson = {
   version: '2.2.0',
   request: (method, url, data, options) => {
      const settings = { method: method.toUpperCase(), credentials: 'same-origin' };
      options = Object.assign(settings, options);
      const jsonHeaders = { 'Content-Type': 'application/json', 'Accept': 'application/json' };
      options.headers = Object.assign(jsonHeaders, options.headers);
      const toPair = (key) => key + '=' + encodeURIComponent(data[key]);
      if (options.method === 'GET' && data)
         url = url + (url.includes('?') ? '&' : '?') + Object.keys(data).map(toPair).join('&');
      else if (options.method !== 'GET' && data)
         options.body = JSON.stringify(data);
      const toJson = (response) => {
         const contentType = response.headers.get('content-type');
         const isJson = /json|javascript/.test(contentType);  //match "application/json" or "text/javascript"
         const textToObj = (httpBody) => {
            if (fetchJson.logger)
               fetchJson.logger(new Date().toISOString(), options.method, response.url,
                  response.ok, response.status, response.statusText, contentType);
            response.error =       !response.ok;
            response.contentType = contentType;
            response.bodyText =    httpBody;
            return response;
            };
         return isJson ? response.json() : response.text().then(textToObj);
         };
      if (fetchJson.logger)
         fetchJson.logger(new Date().toISOString(), options.method, url);
      return fetch(url, options).then(toJson);
      },
   get:    (url, params, options) =>   fetchJson.request('GET',    url, params,   options),
   post:   (url, resource, options) => fetchJson.request('POST',   url, resource, options),
   put:    (url, resource, options) => fetchJson.request('PUT',    url, resource, options),
   patch:  (url, resource, options) => fetchJson.request('PATCH',  url, resource, options),
   delete: (url, resource, options) => fetchJson.request('DELETE', url, resource, options),
   logger: null,
   enableLogger: (booleanOrFn) => {
      const isFn = typeof booleanOrFn === 'function';
      fetchJson.logger = isFn ? booleanOrFn : booleanOrFn === false ? null : console.log;
      return fetchJson.logger;
      }
   };

if (typeof module === 'object')
   module.exports = fetchJson;  //node module loading system (CommonJS)
if (typeof window === 'object')
   window.fetchJson = fetchJson;  //support both global and window property