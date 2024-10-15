const fs = require('fs');
const { program } = require('commander');

program
  .option('-i, --input <type>', 'input JSON file')
  .option('-o, --output <type>', 'output JSON file')
  .option('-d, --display', 'display results')
  .parse(process.argv);

const options = program.opts();

if (!options.input) {
  console.error("Please, specify input file");
  process.exit(1);
}

let data;
try {
  data = fs.readFileSync(options.input, 'utf8');
} catch (err) {
  console.error("Cannot find input file");
  process.exit(1);
}

const results = processResults(JSON.parse(data));

if (options.display) {
  console.log(results);
}

if (options.output) {
  fs.writeFileSync(options.output, JSON.stringify(results, null, 2));
  console.log(`Results saved to ${options.output}`);
}

function processResults(jsonData) {
  const results = {};

  jsonData.forEach(item => {
    if (item.txt === "Доходи, усього") {
      results["Доходи, усього"] = item.value;
    }
    if (item.txt === "Витрати, усього") {
      results["Витрати, усього"] = item.value;
    }
  });

  return results;
}

