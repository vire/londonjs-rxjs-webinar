import http from 'http';
import url from 'url';
import qs from 'qs';

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  const { pathname, query } = parsedUrl;

  req.on('aborted', () => {
    console.log('Client aborted request - yay we can save resources!');
  });

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.writeHead(200, {'Content-Type': 'text/plain'});

  if (pathname === '/simple') {
    const { timeout } = qs.parse(query);
    setTimeout(() => {
      res.end(JSON.stringify([{a:1}, {a:2}, {a:3}]));
    }, timeout);
  } else {
    res.end('No matching route found');
  }
});

server.listen(8000);
