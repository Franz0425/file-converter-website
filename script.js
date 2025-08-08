function convertFile() {
  const fileInput = document.getElementById('fileInput');
  const formatSelect = document.getElementById('formatSelect');
  const resultDiv = document.getElementById('result');

  if (!fileInput.files.length) {
    resultDiv.innerText = 'Please upload a file first.';
    return;
  }

  const file = fileInput.files[0];
  const reader = new FileReader();
  const targetFormat = formatSelect.value;

  reader.onload = function (e) {
    let content = e.target.result;
    let blob;

    switch (targetFormat) {
      case 'txt':
        blob = new Blob([content], { type: 'text/plain' });
        break;
      case 'docx':
        blob = new Blob([content], {
          type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        });
        break;
      case 'pdf':
        blob = new Blob([content], { type: 'application/pdf' });
        break;
      case 'jpg':
      case 'png':
        resultDiv.innerText = "❌ Image conversion not supported in-browser.";
        return;
      default:
        resultDiv.innerText = "❌ Unsupported format.";
        return;
    }

    const downloadUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = `converted.${targetFormat}`;
    a.textContent = "⬇️ Download Converted File";
    resultDiv.innerHTML = '';
    resultDiv.appendChild(a);
  };

  reader.onerror = function () {
    resultDiv.innerText = "❌ Error reading the file.";
  };

  reader.readAsText(file);
}
