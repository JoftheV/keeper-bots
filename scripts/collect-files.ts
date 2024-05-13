import yargs from 'yargs/yargs';
import glob from 'glob';
import fs from 'fs';
import path from 'path';

const GREEN = '\x1b[32m%s\x1b[0m';

async function collectFiles({ pattern, target }: { pattern: string, target: string }) {
  if (!pattern || !target) throw new Error('Missing either pattern or target params');
  console.log(GREEN, `Collecting files... into ${target}`);
  
  glob(pattern, {}, (err, files) => {
    if (err) throw err;
    files.forEach((file, index) => {
      console.log(file, target)
      fs.copyFileSync(file, path.resolve(target, `${index}-${path.basename(file)}`));
    });
  });

  console.log(GREEN, `Done.`);
}

const args = yargs(process.argv.slice(2)).argv as unknown as { pattern: string, target: string };

collectFiles(args);