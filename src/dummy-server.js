import http from 'http';
import url from 'url';
import qs from 'qs';

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  const { pathname, query } = parsedUrl;

  req.on('aborted', () => {
    console.log('Client aborted request - yay we can save resources!');
  });

  res.setHeader('Access-Control-Allow-Origin', '*');

  if (pathname === '/simple') {
    const { timeout } = qs.parse(query);
    setTimeout(() => {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify([
          { data: 'Imagine some large structured object1 here' },
          { data: 'Imagine some large structured object2 here' },
          { data: 'Imagine some large structured object3 here' }
        ]));
    }, timeout);
  } else {
    res.end('No matching route found');
  }

});

server.listen(8000);
