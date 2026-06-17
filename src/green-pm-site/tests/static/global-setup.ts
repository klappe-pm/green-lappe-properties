import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';

/**
 * Builds the site once before the static-HTML test suite so the tests can
 * assert over real generated output in dist/.
 */
export default function setup() {
  const dist = path.resolve(__dirname, '../../dist');
  // Always rebuild so tests reflect the current source.
  execFileSync('npm', ['run', 'build'], {
    cwd: path.resolve(__dirname, '../..'),
    stdio: 'inherit',
  });
  if (!existsSync(dist)) {
    throw new Error('build did not produce dist/');
  }
}
