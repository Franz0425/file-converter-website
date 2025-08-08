function convertFile() {
  const file = document.getElementById("fileInput").files[0];
  const format = document.getElementById("formatSelect").value;

  if (!file) {
    alert("Please choose a file to convert.");
    return;
  }

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `<p>Simulated: ${file.name} will be converted to .${format}</p>`;
}
