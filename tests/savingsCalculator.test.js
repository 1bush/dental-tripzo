import { describe, it, expect, beforeEach } from 'vitest';
import { loadIndexPage, setRange } from './helpers/loadPage.js';

const IMPLANT_HOME = 1400;
const IMPLANT_ALBANIA = 450;
const CROWN_HOME = 600;
const CROWN_ALBANIA = 180;

/** Reads a "€1,234" result cell back as a number. */
const amount = (document, id) =>
  Number(document.getElementById(id).textContent.replace(/[^0-9]/g, ''));

const results = (document) => ({
  home: amount(document, 'res-home'),
  albania: amount(document, 'res-albania'),
  savings: amount(document, 'res-savings'),
});

describe('updateCalc', () => {
  let window;
  let document;

  beforeEach(() => {
    ({ window, document } = loadIndexPage());
  });

  it('renders totals for the default slider values on load', () => {
    expect(results(document)).toEqual({
      home: 2 * IMPLANT_HOME + 6 * CROWN_HOME,
      albania: 2 * IMPLANT_ALBANIA + 6 * CROWN_ALBANIA,
      savings: 2 * (IMPLANT_HOME - IMPLANT_ALBANIA) + 6 * (CROWN_HOME - CROWN_ALBANIA),
    });
  });

  it('mirrors the slider values into their labels', () => {
    setRange(window, 'input-implants', 5);
    setRange(window, 'input-crowns', 12);
    window.updateCalc();

    expect(document.getElementById('lbl-implants').textContent).toBe('5');
    expect(document.getElementById('lbl-crowns').textContent).toBe('12');
  });

  it('prices implants and crowns independently', () => {
    setRange(window, 'input-implants', 4);
    setRange(window, 'input-crowns', 0);
    window.updateCalc();
    expect(results(document)).toEqual({
      home: 4 * IMPLANT_HOME,
      albania: 4 * IMPLANT_ALBANIA,
      savings: 4 * (IMPLANT_HOME - IMPLANT_ALBANIA),
    });

    setRange(window, 'input-implants', 0);
    setRange(window, 'input-crowns', 10);
    window.updateCalc();
    expect(results(document)).toEqual({
      home: 10 * CROWN_HOME,
      albania: 10 * CROWN_ALBANIA,
      savings: 10 * (CROWN_HOME - CROWN_ALBANIA),
    });
  });

  it('zeroes out every row when nothing is selected', () => {
    setRange(window, 'input-implants', 0);
    setRange(window, 'input-crowns', 0);
    window.updateCalc();

    expect(results(document)).toEqual({ home: 0, albania: 0, savings: 0 });
    expect(document.getElementById('res-savings').textContent).toBe('€0');
  });

  it('keeps savings equal to the difference of both totals at the slider maximums', () => {
    const implants = Number(document.getElementById('input-implants').max);
    const crowns = Number(document.getElementById('input-crowns').max);
    setRange(window, 'input-implants', implants);
    setRange(window, 'input-crowns', crowns);
    window.updateCalc();

    const { home, albania, savings } = results(document);
    expect(home).toBe(implants * IMPLANT_HOME + crowns * CROWN_HOME);
    expect(albania).toBe(implants * IMPLANT_ALBANIA + crowns * CROWN_ALBANIA);
    expect(savings).toBe(home - albania);
  });

  it('formats amounts above a thousand with a group separator and euro sign', () => {
    setRange(window, 'input-implants', 12);
    setRange(window, 'input-crowns', 28);
    window.updateCalc();

    for (const id of ['res-home', 'res-albania', 'res-savings']) {
      expect(document.getElementById(id).textContent).toMatch(/^€\d{1,3}([.,\u202f\u00a0\s]\d{3})+$/);
    }
  });

  it('recomputes when the implant slider fires its input event', () => {
    const input = setRange(window, 'input-implants', 3);
    input.dispatchEvent(new window.Event('input', { bubbles: true }));

    expect(document.getElementById('lbl-implants').textContent).toBe('3');
    expect(results(document).home).toBe(3 * IMPLANT_HOME + 6 * CROWN_HOME);
  });

  it('recomputes when the crown slider fires its input event', () => {
    const input = setRange(window, 'input-crowns', 20);
    input.dispatchEvent(new window.Event('input', { bubbles: true }));

    expect(document.getElementById('lbl-crowns').textContent).toBe('20');
    expect(results(document).albania).toBe(2 * IMPLANT_ALBANIA + 20 * CROWN_ALBANIA);
  });
});
