#!/usr/bin/env node

import { checkForUpdate } from './check-update.mjs';

// The parent can be busy in synchronous renderer work. Enforce its original
// deadline here, in a separate event loop, so cache work cannot continue late.
const deadlineAt = Number(process.argv[2]);
if (!Number.isSafeInteger(deadlineAt)) process.exit(1);
const remainingMs = deadlineAt - Date.now();
if (remainingMs <= 0) process.exit(1);
const deadlineTimer = setTimeout(() => process.kill(process.pid, 'SIGKILL'), remainingMs);
deadlineTimer.unref();

const result = await checkForUpdate({
  repeatNotice: true,
  ...(process.env.ARCHIFY_UPDATE_RELEASE_PATH
    ? { releasePath: process.env.ARCHIFY_UPDATE_RELEASE_PATH } : {}),
  ...(process.env.ARCHIFY_UPDATE_CACHE_DIRECTORY
    ? { cacheDirectory: process.env.ARCHIFY_UPDATE_CACHE_DIRECTORY } : {}),
  timeoutMs: 850,
});
process.stdout.write(`${JSON.stringify(result)}\n`);
