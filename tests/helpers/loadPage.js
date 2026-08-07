import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { JSDOM } from 'jsdom';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

export const readRepoFile = (name) => readFileSync(join(repoRoot, name), 'utf8');

/**
 * Loads index.html in jsdom with its inline script executed, exposing the
 * page globals (setLang, moveSlider, updateCalc) on the window.
 */
export function loadIndexPage() {
  const dom = new JSDOM(readRepoFile('index.html'), {
    runScripts: 'dangerously',
    pretendToBeVisual: true,
    url: 'https://dental-tripzo.test/',
    beforeParse: polyfillInnerText,
  });
  return { dom, window: dom.window, document: dom.window.document };
}

/** jsdom implements no layout, so innerText is missing; textContent is equivalent here. */
function polyfillInnerText(window) {
  Object.defineProperty(window.HTMLElement.prototype, 'innerText', {
    configurable: true,
    get() {
      return this.textContent;
    },
    set(value) {
      this.textContent = value;
    },
  });
}

export const setRange = (window, id, value) => {
  const input = window.document.getElementById(id);
  input.value = String(value);
  return input;
};
