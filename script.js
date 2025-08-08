function convertFile() {
  const fileInput = document.getElementById('fileInput');
  const formatSelect = document.getElementById('formatSelect');
  const resultDiv = document.getElementById('result');

  if (!fileInput.files.length) {
    resultDiv.innerHTML = "<p>⚠️ Please upload a file first.</p>";
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
        resultDiv.innerHTML = "<p>❌ Image conversion is not supported in-browser.</p>";
        return;
      default:
        resultDiv.innerHTML = "<p>❌ Unsupported format selected.</p>";
        return;
    }

    const downloadUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = `converted.${targetFormat}`;
    a.textContent = "⬇️ Download Converted File";
    resultDiv.innerHTML = '';
    resultDiv.appendChild(a);

    const tip = document.createElement('p');
    tip.textContent = "📱 Tip: On mobile, long-press the link and choose 'Download' or 'Save to Files'.";
    resultDiv.appendChild(tip);
  };

  reader.onerror = function () {
    resultDiv.innerHTML = "<p>❌ Error reading the file.</p>";
  };

  reader.readAsText(file);
}
