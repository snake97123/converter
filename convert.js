document.querySelector('#convertButton').addEventListener('click', () => {
  const csv = document.querySelector('#csvInput').value;
  const json = csvToJson(csv);
  document.querySelector('#jsonOutput').value = JSON.stringify(json, null, 2);
});

document.querySelector('#clearButton').addEventListener('click', () => {
  document.querySelector('#csvInput').value = '';
  document.querySelector('#jsonOutput').value = '';
});

function csvToJson(csv) {
  const lines = csv.split('\n');
  const result = [];
  const headers = lines[0].split(',');

  for(let i = 1; i < lines.length - 1; i++) {
    const obj = {};
    const currentline = lines[i].split(",");
    for(let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }
    result.push(obj);
  }
  return result;
}