document.querySelector('#convertButton').addEventListener('click', () => {
  const input = document.querySelector('#csvOrJsonInput').value;
  let output = '';

  if(isJson(input)) {
    const jsonObj = JSON.parse(input);
    output = jsonToCsv(jsonObj);
  } else if(isCsv(input)) {
    output = JSON.stringify(csvToJson(input), null, 2);
  } else {
    output = '正しい入力値を入力してください。'
  }

  document.querySelector('#jsonOrCsvOutput').value = output;
})

document.querySelector('#clearButton').addEventListener('click', () => {
  document.querySelector('#csvOrJsonInput').value = '';
  document.querySelector('#jsonOrCsvOutput').value = '';
});

function isJson(str) {
    try {
      JSON.parse(str);
    } catch(e) {
      return false;
    }
    return true;
}

function isCsv(str) {
  const lines = str.trim().split('\n');
  if(lines.length < 2) return false;

  const headerFields = lines[0].split(',');
  const numFields = headerFields.length;

  for(let i = 1; i < lines.length; i++) {
    const fields = lines[i].split(',');
    if(fields.length !== numFields) return false;
  }
  return true;
}

function csvToJson(csv) {
  const lines = csv.split('\n');
  const result = [];
  const headers = lines[0].split(',');

  for(let i = 1; i < lines.length; i++) {
    const obj = {};
    const currentLine = lines[i].split(",");
    for(let j = 0; j < headers.length; j++) {
      let value = currentLine[j].trim();
      if(value.startsWith('"') && value.endsWith('"')) {
        value = value.substring(1, value.length - 1);
      }
      obj[headers[j]] = value;
    }
    result.push(obj);
  }
  return result;
}

function jsonToCsv(json) {
  const header = Object.keys(json[0]);
  const headerString = header.join(',');

  const replacer = (key, value) => value ?? '';
  const rowItems = json.map((row) => 
    header.map((fieldName) => JSON.stringify(row[fieldName], replacer)).join(',')
  );
  const csv = [headerString, ...rowItems].join('\r\n');

  return csv;
}

document.querySelector('#downloadButton').addEventListener('click', () => {
  const output = document.querySelector('#jsonOrCsvOutput').value;
  downloadAsFile(output, "output.txt");
});

function downloadAsFile(text, filename) {
  const blob = new Blob([text], { type: "text/plain"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}