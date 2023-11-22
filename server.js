const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;


const COUNTER_FILE = path.join(__dirname, 'counters.json');

function loadCounter(page) {
  let counters = {};
  try {
    counters = JSON.parse(fs.readFileSync(COUNTER_FILE, 'utf8'));
  } catch (err) {
    console.log("Не удалось прочитать файл счетчика, начинаем с нуля.");
  }
  return counters[page] || 0;
}


function saveCounter(page, count) {
  let counters = {};
  try {
    counters = JSON.parse(fs.readFileSync(COUNTER_FILE, 'utf8'));
  } catch (err) {
    console.log("Не удалось прочитать файл счетчика, начинаем с нуля.");
  }
  counters[page] = count;
  fs.writeFileSync(COUNTER_FILE, JSON.stringify(counters), 'utf8');
}

app.get('/', (req, res) => {
  const page = '/';
  let count = loadCounter(page);
  count++;
  saveCounter(page, count);
  res.send(`<h1>Корневая страница</h1><p>Просмотров: ${count}</p><a href="/about">Ссылка на страницу /about</a>`);
});

app.get('/about', (req, res) => {
  const page = '/about';
  let count = loadCounter(page);
  count++;
  saveCounter(page, count);
  res.send(`<h1>Страница about</h1><p>Просмотров: ${count}</p><a href="/">Ссылка на страницу /</a>`);
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
