import { cp, mkdir } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const standaloneDir = path.join(root, '.next', 'standalone');
const staticSource = path.join(root, '.next', 'static');
const staticDestination = path.join(standaloneDir, '.next', 'static');
const publicSource = path.join(root, 'public');
const publicDestination = path.join(standaloneDir, 'public');

await mkdir(path.dirname(staticDestination), { recursive: true });
await cp(staticSource, staticDestination, { recursive: true, force: true });

try {
  await cp(publicSource, publicDestination, { recursive: true, force: true });
} catch (error) {
  if (error?.code !== 'ENOENT') {
    throw error;
  }
}

console.log('Standalone assets prepared.');
