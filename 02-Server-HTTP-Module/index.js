const http = require("http");

let users = [];
let currentId = 1;

const server = http.createServer((request, response) => {
  response.setHeader("content-type", "application/json");

  const url = request.url;
  const method = request.method;

  /**
   * Method 01: GET | endpoint: "/users"
   */
  if (url === "/users" && method === "GET") {
    response.end(JSON.stringify(users));
  } else if (url === "/users" && method === "POST") {
    /**
     * Method 02: POST | endpoint: "/users"
     * Tạo ra 1 user
     */
    let body = "";

    request.on("data", (chunk) => {
      body += chunk.toString();
    });

    request.on("end", () => {
      const data = JSON.parse(body);
    });

    const newUser = {
      id: currentId++,
      name: data.name,
    };

    users.push(newUser);
    response.end(JSON.stringify(newUser));
  }
});

server.listen(9999, () => {
  console.log("Server is running at http://localhost:9999/users");
});
