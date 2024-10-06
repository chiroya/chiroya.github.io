fetch('https://m.site.naver.com/18ns6')

  .then(response => response.text())

  .then(html => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const results = doc.querySelectorAll('div.item');
    const resultsDiv = document.getElementById('results');
    
    results.forEach(result => {
      const resultElement = document.createElement('div');
      resultElement.textContent = result.textContent;
      resultsDiv.appendChild(resultElement);
    });
  })

  .catch(error => console.error(error));