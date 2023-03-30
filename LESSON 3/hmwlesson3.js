const fs = require('fs');
const readline = require('readline');
const ipAdress = ['89.123.1.41', '34.48.240.111'];

// создаем интерфейс для построчного чтения файла
const rl = readline.createInterface({
  input: fs.createReadStream('log_file.txt'),
  crlfDelay: Infinity
});

// создаем объекты для хранения данных по каждому IP-адресу
const ipData = {}; ipAdress.forEach((ip) => {
  ipData[ip] = '';
});

// обрабатываем каждую строку файла
rl.on('line', (line) => {
  // ищем IP-адрес в строке с помощью регулярного выражения
  const match = line.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/);
  if (match && ipAdress.includes(match[0])) {
    // если IP-адрес найден и он совпадает с одним из заданных,
    // добавляем строку в соответствующий объект данных
    ipData[match[0]] += line + '\n';
  }
});

// по завершении чтения файла сохраняем данные в отдельные файлы
rl.on('close', () => {
 ipAdress.forEach((ip) => {
    // создаем имя файла на основе IP-адреса
    const filename = ip + '_requests.log';
    // записываем данные в файл
    fs.writeFileSync(filename, ipData[ip]);
  });
});
