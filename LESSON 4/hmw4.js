const fs = require('fs');
const path = require('path');
const readline = require('readline');

// функция для поиска строк в текстовых файлах
function searchInFile(filePath, searchPattern) {
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: fs.createReadStream(filePath),
      crlfDelay: Infinity
    });

    let lineNumber = 0;
    const matchingLines = [];

    rl.on('line', (line) => {
      lineNumber++;
      if (line.match(searchPattern)) {
        matchingLines.push({ lineNumber, line });
      }
    });

    rl.on('close', () => {
      resolve(matchingLines);
    });

    rl.on('error', (err) => {
      reject(err);
    });
  });
}

// функция для обхода файловой системы и поиска в файле
async function searchFiles(searchDir, searchPattern) {
  const files = fs.readdirSync(searchDir);

  for (const file of files) {
    const filePath = path.join(searchDir, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      await searchFiles(filePath, searchPattern);
    } else if (stats.isFile()) {
      const matchingLines = await searchInFile(filePath, searchPattern);
      if (matchingLines.length > 0) {
        console.log(`Found ${matchingLines.length} match(es) in file ${filePath}:`);
        matchingLines.forEach((line) => {
          console.log(`  line ${line.lineNumber}: ${line.line}`);
        });
      }
    }
  }
}

// считываем аргументы командной строки
const args = process.argv.slice(2);
const searchDir = args[0] || '.';
const searchPattern = args[1] ? new RegExp(args[1], 'g') : undefined;

// запускаем поиск
searchFiles(searchDir, searchPattern)
  .catch((err) => {
    console.error(err);
  });
