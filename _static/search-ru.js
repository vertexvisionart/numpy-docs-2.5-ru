/* Offline search for the translated NumPy 2.5 documentation. No fetch required. */
(() => {
  'use strict';
  const form = document.querySelector('.bd-search-container form');
  const input = form && form.querySelector('input[name=q]');
  const output = document.getElementById('search-results');
  if (!form || !input || !output) return;
  const docs = window.NUMPY_RU_SEARCH || [];
  const fold = value => value.toLocaleLowerCase('ru').replace(/ё/g, 'е');
  function render(query) {
    output.replaceChildren();
    const words = fold(query).match(/[\p{L}\p{N}_.]+/gu) || [];
    if (!words.length) { output.textContent = 'Введите название функции или слова на русском языке.'; return; }
    const results = [];
    for (const doc of docs) {
      const title = fold(doc[0]); const text = fold(doc[2]);
      const terms = words.map(word => word.length > 6 && /[а-я]/.test(word) ? word.slice(0, -2) : word);
      if (!terms.every(word => text.includes(word) || title.includes(word))) continue;
      const score = (title === fold(query) ? 1000 : 0) + terms.reduce((sum, word) => sum + (title.includes(word) ? 100 : 0), 0) - text.length / 1000000;
      results.push({doc, text, terms, score});
    }
    results.sort((a, b) => b.score - a.score);
    const status = document.createElement('p');
    status.textContent = `Найдено страниц: ${results.length}. Показаны первые ${Math.min(60, results.length)}.`;
    output.append(status);
    const list = document.createElement('ol');
    for (const {doc, text, terms} of results.slice(0, 60)) {
      const item = document.createElement('li'); item.style.marginBottom = '1.25rem';
      const link = document.createElement('a'); link.href = doc[1]; link.textContent = doc[0];
      const snippet = document.createElement('p');
      const positions = terms.map(word => text.indexOf(word)).filter(pos => pos >= 0);
      const start = Math.max(0, (positions.length ? Math.min(...positions) : 0) - 90);
      snippet.textContent = (start ? '…' : '') + doc[2].slice(start, start + 320) + (start + 320 < doc[2].length ? '…' : '');
      item.append(link, snippet); list.append(item);
    }
    output.append(list);
  }
  input.value = new URLSearchParams(window.location.search).get('q') || '';
  form.addEventListener('submit', event => {
    event.preventDefault();
    const url = new URL(window.location.href); url.searchParams.set('q', input.value);
    history.replaceState(null, '', url); render(input.value);
  });
  let timer;
  input.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(() => render(input.value), 180); });
  render(input.value);
})();
