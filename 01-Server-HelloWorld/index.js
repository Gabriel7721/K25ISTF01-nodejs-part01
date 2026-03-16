const http = require("http");

const server = http.createServer((request, response) => {
  // Thiết lập headers
  response.writeHead(200, { "content-type": "text/plain" });

  // Trả về dữ liệu cho người dùng
  response.end("Hello World! Welcome to my NodeJS server! This is my first server!");
});

server.listen(9999, () => {
  console.log("Server is running at http://localhost:9999");
});
