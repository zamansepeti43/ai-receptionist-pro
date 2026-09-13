import { spawn } from 'node:child_process';
import { cp, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const standaloneRoot = path.join(root, '.next', 'standalone');
const standaloneNextRoot = path.join(standaloneRoot, '.next');

await rm(path.join(standaloneNextRoot, 'static'), { recursive: true, force: true });
await mkdir(standaloneNextRoot, { recursive: true });
await cp(path.join(root, '.next', 'static'), path.join(standaloneNextRoot, 'static'), {
  recursive: true,
});

await rm(path.join(standaloneRoot, 'public'), { recursive: true, force: true });
await cp(path.join(root, 'public'), path.join(standaloneRoot, 'public'), {
  recursive: true,
});

const child = spawn(process.execPath, ['server.js'], {
  cwd: standaloneRoot,
  env: {
    ...process.env,
    NODE_ENV: 'production',
  },
  stdio: 'inherit',
});

const forwardSignal = (signal) => {
  if (!child.killed) child.kill(signal);
};

process.on('SIGINT', () => forwardSignal('SIGINT'));
process.on('SIGTERM', () => forwardSignal('SIGTERM'));

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 1);
});

child.on('error', (error) => {
  console.error(error);
  process.exit(1);
});
