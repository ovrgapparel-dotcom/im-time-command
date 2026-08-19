/**
 * Automates bubblewrap build by piping keystore password and key password.
 */
const { spawn } = require('child_process');
const path = require('path');

const TWA_DIR = path.join(__dirname, 'android-twa');

const proc = spawn('npx', ['@bubblewrap/cli@1.24.1', 'build', '--skipPwaValidation'], {
  cwd: TWA_DIR,
  stdio: ['pipe', 'pipe', 'pipe'],
  shell: true
});

proc.stdout.on('data', (d) => {
  const text = d.toString();
  process.stdout.write(text);
  if (text.includes('Would you like to apply them')) {
    setTimeout(() => {
      proc.stdin.write('Y\n');
      console.log('\n[MANIFEST CONFIRMED]');
    }, 400);
  }
  if (text.includes('Password for the Key Store') || text.includes('Password for the Key')) {
    setTimeout(() => {
      proc.stdin.write('IMtc2026!\n');
      console.log('\n[PASS SENT]');
    }, 400);
  }
});

proc.stderr.on('data', (d) => {
  const text = d.toString();
  process.stderr.write(text);
  if (text.includes('Would you like to apply them')) {
    setTimeout(() => {
      proc.stdin.write('Y\n');
      console.log('\n[MANIFEST CONFIRMED]');
    }, 400);
  }
  if (text.includes('Password for the Key Store') || text.includes('Password for the Key')) {
    setTimeout(() => {
      proc.stdin.write('IMtc2026!\n');
      console.log('\n[PASS SENT]');
    }, 400);
  }
});

proc.on('close', (code) => {
  console.log(`\n[BUILD EXIT] Code ${code}`);
  process.exit(code ?? 0);
});
