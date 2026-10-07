/**
 * Contratto fra `vercel.json` e le route dei job interni.
 *
 * Regressione che questo test blocca: i 5 cron erano dichiarati in
 * `vercel.json` mentre le route esportavano solo `POST`. Vercel Cron invoca in
 * `GET`, quindi ogni esecuzione riceveva 405 e nessun job girava mai in
 * produzione.
 */

import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

const PROJECT_ROOT = fileURLToPath(new URL('../..', import.meta.url));

interface VercelConfig {
  crons?: Array<{ path: string; schedule: string }>;
}

async function loadCrons(): Promise<Array<{ path: string; schedule: string }>> {
  const raw = await readFile(join(PROJECT_ROOT, 'vercel.json'), 'utf8');
  return (JSON.parse(raw) as VercelConfig).crons ?? [];
}

function routeFileFor(cronPath: string): string {
  return join(PROJECT_ROOT, 'src/app', cronPath, 'route.ts');
}

function exportsGetHandler(source: string): boolean {
  const declaration = /\\bexport\\s+(?:async\\s+)?function\\s+GET\\b/m;
  const namedExport = /\\bexport\\s*\\{[^}]*\\bGET\\b[^}]*\\}/m;
  return declaration.test(source) || namedExport.test(source);
}

describe('contratto cron Vercel', () => {
  it('dichiara almeno un cron', async () => {
    const crons = await loadCrons();
    expect(crons.length).toBeGreaterThan(0);
  });

  it('ogni path schedulato corrisponde a una route esistente che esporta GET', async () => {
    const crons = await loadCrons();
    const failures: string[] = [];

    for (const cron of crons) {
      const routeFile = routeFileFor(cron.path);

      let source: string;
      try {
        source = await readFile(routeFile, 'utf8');
      } catch {
        failures.push(`${cron.path} → route non trovata`);
        continue;
      }

      if (!exportsGetHandler(source)) {
        failures.push(`${cron.path} → nessun handler GET esportato (Vercel Cron invoca in GET)`);
      }
    }

    expect(failures).toEqual([]);
  });

  it('ogni cron dichiara uno schedule non vuoto', async () => {
    const crons = await loadCrons();

    for (const cron of crons) {
      expect(cron.schedule.trim().length).toBeGreaterThan(0);
    }
  });
});
