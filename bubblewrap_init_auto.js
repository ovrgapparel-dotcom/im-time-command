/**
 * Bubblewrap init automation v4 — COMPLETE prompt sequence mapped from full dry-run.
 */
const { spawn } = require('child_process');
const path = require('path');

const TWA_DIR = path.join(__dirname, 'android-twa');

const PROMPT_QUEUE = [
  { match: 'Domain:',                        answer: '' },
  { match: 'URL path:',                      answer: '/' },
  { match: 'Application name:',              answer: '' },
  { match: 'Short name:',                    answer: '' },
  { match: 'Application ID:',               answer: 'imi.imtimecommand.app' },
  { match: 'version code',                   answer: '' },
  { match: 'Display mode:',                  answer: '' },
  { match: 'Orientation:',                   answer: '' },
  { match: 'Status bar color:',              answer: '#C9A84C' },
  { match: 'Splash screen color:',           answer: '' },
  { match: 'Icon URL:',                      answer: '' },
  { match: 'Maskable icon URL:',             answer: '' },
  { match: 'Include app shortcuts?',         answer: 'y' },
  { match: 'Monochrome icon URL:',           answer: '' },
  { match: 'Play Billing',                   answer: 'N' },
  { match: 'geolocation permission',         answer: 'N' },
  { match: 'site-settings shortcut',         answer: 'y' },
  { match: 'ChromeOS',                       answer: 'N' },
  { match: 'Meta Quest',                     answer: 'N' },
  { match: 'key store path',                 answer: './im_time_command.jks' },
  { match: 'key store alias',                answer: 'im_tc' },
  { match: 'Create a new signing key',       answer: 'N' },
  { match: 'key store password',             answer: 'IMtc2026!' },
  { match: 'key password',                   answer: 'IMtc2026!' },
];

let queueIdx = 0;
let buffer = '';
let debounceTimer = null;
let processing = false;

const proc = spawn('npx', ['@bubblewrap/cli@1.24.1', 'init',
  '--manifest', 'https://im-time-command.vercel.app/manifest.json',
  '--directory', '.'], {
  cwd: TWA_DIR,
  stdio: ['pipe', 'pipe', 'pipe'],
  shell: true,
});

process.stdin.on('data', (d) => {
  console.log(`[STDIN FWD] "${d.toString().trim()}"`);
  proc.stdin.write(d);
});

function tryMatch() {
  if (processing || queueIdx >= PROMPT_QUEUE.length) return;
  const entry = PROMPT_QUEUE[queueIdx];
  if (buffer.toLowerCase().includes(entry.match.toLowerCase())) {
    processing = true;
    const ans = entry.answer;
    console.log(`\n[MATCH #${queueIdx+1} "${entry.match}"] → "${ans || '(enter)'}"`);
    queueIdx++;
    buffer = '';
    setTimeout(() => {
      proc.stdin.write(ans + '\n');
      processing = false;
      setTimeout(tryMatch, 500);
    }, 700);
  }
}

function onData(data) {
  const text = data.toString();
  process.stdout.write(text);
  buffer += text;
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(tryMatch, 300);
}

proc.stdout.on('data', onData);
proc.stderr.on('data', onData);

proc.on('close', (code) => {
  console.log(`\n\n[DONE] bubblewrap init exited with code ${code}`);
  process.exit(code ?? 0);
});

proc.on('error', (err) => {
  console.error('Process error:', err.message);
  process.exit(1);
});

console.log('Starting bubblewrap init automation (v4 — complete)...\n');
