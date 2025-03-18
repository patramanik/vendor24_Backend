const http = require('http');
const app = require("./app");
const {port}=require("./config/kyes");

//create server

const server = http.createServer(app);

// Start the server
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
