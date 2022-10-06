#!/usr/bin/env node

require("ts-node/register");
const { init } = require("../src/prompt");

(async () => {
  await init.next();
})();
