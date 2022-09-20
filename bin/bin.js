#!/usr/bin/env node

require("ts-node/register");
const { init } = require("../src/utils/prompt");

(async () => {
  await init.next();
})();
