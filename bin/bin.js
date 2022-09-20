#!/usr/bin/env node

require("ts-node/register");
const { init } = require("../src/index");

(async () => {
  await init();
})();
