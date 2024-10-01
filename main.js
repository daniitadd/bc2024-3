const fs = require('fs');
const { program } = require('commander');

// Використання commander для визначення параметрів командного рядка
program
  .option('-i, --input <type>', 'input JSON file')
  .option('-o, --output <type>', 'output JSON file')
  .parse(process.argv);

const options = program.opts();

// Читання вхідного файлу
fs.readFile(options.input, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the input file:', err);
    return;
  }

  // Парсинг JSON даних
  const jsonData = JSON.parse(data);
  
  // Об'єкт для збереження результатів
  const results = {};

  // Ітерація через масив об'єктів
  jsonData.forEach(item => {
    if (item.txt === "Доходи, усього") {
      results["Доходи, усього"] = item.value;
    }
    if (item.txt === "Витрати, усього") {
      results["Витрати, усього"] = item.value;
    }
  });

  // Виведення результатів
  console.log(`Доходи, усього: ${results["Доходи, усього"] || 0}`);
  console.log(`Витрати, усього: ${results["Витрати, усього"] || 0}`);

  // Запис результатів у файл
  if (options.output) {
    fs.writeFile(options.output, JSON.stringify(results, null, 2), 'utf8', (err) => {
      if (err) {
        console.error('Error writing to output file:', err);
      } else {
        console.log(`Results saved to ${options.output}`);
      }
    });
  }
});
