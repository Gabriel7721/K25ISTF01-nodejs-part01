const http = require("http");

let users = [
  {
    id: 1,
    name: "Tom",
  },
];
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
      const newUser = {
        id: currentId++,
        name: data.name,
      };
      users.push(newUser);
      response.end(JSON.stringify(newUser));
    });
  } else if (url.startsWith("/users/") && method === "GET") {
    /**
     * Method 03: GET | endpoint: "/users/:id"
     * Truy vấn array lấy ra user theo id tương ứng
     * "http://localhost:9999/users/2"
     * ["localhost:9999", "users", "2"]
     * [0, 1, 2]
     * "2" => parseInt => 2
     */
    const id = parseInt(url.split("/")[2]);

    const user = users.find((u) => {
      u.id === id;
    });

    response.end(JSON.stringify(user));
  }
});

server.listen(9999, () => {
  console.log("Server is running at http://localhost:9999/users");
});
