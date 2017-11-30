/*
 *
 *  Air Horner
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */

// Version 0.6.2
let version = '0.6.2.8';
let cacheName = 'airhorner_' + version;

importScripts('./scripts/cache-polyfill.js');

var sw = {
    log: function(...args){ console.log('[ServiceWorker]',...args); }
};

self.addEventListener('install', e => {
  let timeStamp = Date.now();
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        // `./`,
        // `./index.html?timestamp=${timeStamp}`,
        // `./styles/main.css?timestamp=${timeStamp}`,
        // `./scripts/main.min.js?timestamp=${timeStamp}`,
        // `./scripts/comlink.global.js?timestamp=${timeStamp}`,
        // `./scripts/messagechanneladapter.global.js?timestamp=${timeStamp}`,
        // `./sounds/airhorn.mp3?timestamp=${timeStamp}`,
        // `./sounds/wilhelm.mp3?timestamp=${timeStamp}`
        './',
        './index.html',
        './index.html?homescreen=1',
        './?homescreen=1',
        './styles/main.css',
        './scripts/main.min.js',
        './sounds/airhorn.mp3'
      ])
      .then(() => self.skipWaiting());
    })
  )
});

//clean up older cache, from project 5
self.addEventListener('activate', function(e){
    sw.log('Activate');
    e.waitUntil(
        //update old airhorner cache whenever any of the app shell files change
        //increment/change cache name to make it work
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map((key) => {
                if(key.indexOf('airhorner') > -1 && key !== cacheName){
                    sw.log('Removing old airhorner cache',key);
                    return caches.delete(key);
                }
            }));
        }).then(() => {
            return self.clients.claim();      
        })
    );
});


// self.addEventListener('activate',  event => {
//   event.waitUntil(self.clients.claim());
// });

self.addEventListener('fetch', event => {
  // console.log(event.request);
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(response => {
      return response || fetch(event.request);
    })
  );
});
