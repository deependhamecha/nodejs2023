const http = require('http');
const fs = require('fs');

function rqListener(req, res) {

    // console.log(req);
    console.log("Dude");

    if(req.url == '/') {
        res.write('<html>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message" /><button>Save</button></form></body>');
        res.write('</html>');
        return res.end();
    }

    if(req.url == '/message' && req.method == 'POST') {

        const body = [];

        // When data is streamed
        // To take Form Data
        // For consuming Form Data Payload
        req.on('data', (chunk) => {
            body.push(chunk);
        });

        // You can convert it to String 
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log("parsedBody: ", parsedBody);
            fs.writeFileSync('message.txt', parsedBody.split('=')[1]);

            res.statusCode = 302;
            res.setHeader('Location', '/');
            return res.end();
        });

    }

    // To exit the process
    // process.exit();
    
    res.write('<html>');
    res.write('<body><h1>Hello World</h1></body>');
    res.write('</html>');
    res.end();

    // You can also do this
    // return res.end();
}

const server = http.createServer(rqListener);

server.listen(3000);