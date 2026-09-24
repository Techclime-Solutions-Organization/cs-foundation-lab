/**
 * Parse CLI flags of the form --key value or --key=value.
 * @param {string[]} argv
 * @returns {Record<string, string>}
 */
export function parseArgs(argv) {
  /** @type {Record<string, string>} */
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const token = argv[i];
    if (!token.startsWith('--')) continue;
    const body = token.slice(2);
    const eq = body.indexOf('=');
    if (eq !== -1) {
      out[body.slice(0, eq)] = body.slice(eq + 1);
    } else {
      const next = argv[i + 1];
      if (next && !next.startsWith('--')) {
        out[body] = next;
        i++;
      } else {
        out[body] = 'true';
      }
    }
  }
  return out;
}
