const http = require('http');
const fs = require('fs');
const path = require('path');
const hostname = '127.0.0.1';
const port = 8080;

const server = http.createServer(function (req, res) {
    let filePath;
    switch(req.url) {
        case '/about':
            filePath = path.join(__dirname, 'about.html');
            break;
        case '/contact-me':
            filePath = path.join(__dirname, 'contact-me.html');
            break;
        case '/':
            filePath = path.join(__dirname, 'index.html');
            break;
        default:
            filePath = path.join(__dirname, '404.html');
            break;
    }
    
    fs.readFile(filePath, function(err, data) {
        if (err) {
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('Internal Server Error');
            return;
        }
        let contentType = 'text/html';
        if (filePath.endsWith('.css')) {
            contentType = 'text/css';
        } else if (filePath.endsWith('.js')) {
            contentType = 'text/javascript';
        }
        res.writeHead(200, {'Content-Type': contentType});
        res.write(data);
        res.end();
    });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
