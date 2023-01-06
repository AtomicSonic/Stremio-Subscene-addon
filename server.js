#!/usr/bin/env node

const app = require('./index.js');
const { serveHTTP, publishToCentral } = require("stremio-addon-sdk");
const config = require('./config.js');
const port = config.port || process.env.PORT || 3000;

// create local server
app.listen(port, () => {
  console.log(`Addon active on port ${port}`);
  console.log(`HTTP addon accessible at: ${config.local}/configure`);
});

publishToCentral("https://2ecbbd610840-subscene.baby-beamup.club/manifest.json");

process.on("SIGINT", () => {
  console.log("\nCaught interrupt signal, shutting down gracefully");
  process.exit();
});
