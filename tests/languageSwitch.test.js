import { describe, it, expect, beforeEach } from 'vitest';
import { loadIndexPage } from './helpers/loadPage.js';

const activeLangButtons = (document) =>
  [...document.querySelectorAll('.lang-btn.active')].map((btn) => btn.textContent.trim());

const boardingPass = (document) => ({
  code: document.getElementById('bp-dep-code').textContent,
  city: document.getElementById('bp-dep-city').textContent,
  route: document.getElementById('flight-route').textContent,
});

describe('setLang', () => {
  let window;
  let document;

  beforeEach(() => {
    ({ window, document } = loadIndexPage());
  });

  it('starts in English with the EN button active', () => {
    expect(document.body.className).toBe('lang-en');
    expect(activeLangButtons(document)).toEqual(['EN']);
  });

  it.each([
    ['en', 'EN'],
    ['cs', 'CZ'],
    ['sk', 'SK'],
  ])('sets the body class for %s', (lang, label) => {
    window.setLang(lang);
    expect(document.body.className).toBe(`lang-${lang}`);
    expect(label).toBeTruthy();
  });

  it('marks only the matching button active and clears the previous one', () => {
    window.setLang('sk');
    expect(activeLangButtons(document)).toEqual(['SK']);

    window.setLang('en');
    expect(activeLangButtons(document)).toEqual(['EN']);
  });

  it('leaves no button active for a language without a switch button', () => {
    window.setLang('cs');
    expect(activeLangButtons(document)).toEqual([]);
  });

  it('switches the boarding pass to Bratislava for Slovak', () => {
    window.setLang('sk');
    expect(boardingPass(document)).toEqual({
      code: 'BTS',
      city: 'Bratislava',
      route: 'Bratislava (BTS) ➔ Tirana (TIA)',
    });
  });

  it.each(['en', 'cs'])('keeps the Prague departure for %s', (lang) => {
    window.setLang('sk');
    window.setLang(lang);
    expect(boardingPass(document)).toEqual({
      code: 'PRG',
      city: 'Prague',
      route: 'Prague (PRG) ➔ Tirana (TIA)',
    });
  });

  it('falls back to the Prague departure for an unknown language', () => {
    window.setLang('sk');
    window.setLang('de');

    expect(document.body.className).toBe('lang-de');
    expect(boardingPass(document)).toEqual({
      code: 'PRG',
      city: 'Prague',
      route: 'Prague (PRG) ➔ Tirana (TIA)',
    });
  });

  it('switches language when a lang button is clicked', () => {
    const skButton = [...document.querySelectorAll('.lang-btn')].find(
      (btn) => btn.textContent.trim() === 'SK',
    );
    skButton.click();

    expect(document.body.className).toBe('lang-sk');
    expect(activeLangButtons(document)).toEqual(['SK']);
    expect(boardingPass(document).code).toBe('BTS');
  });

  it('provides a translated headline and description for every switchable language', () => {
    for (const lang of ['en', 'cs', 'sk']) {
      expect(document.querySelector(`h1[data-lang="${lang}"]`)).not.toBeNull();
      expect(document.querySelector(`.hero-desc[data-lang="${lang}"]`)).not.toBeNull();
    }
  });
});
