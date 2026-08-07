import { describe, it, expect, beforeEach } from 'vitest';
import { loadIndexPage } from './helpers/loadPage.js';

describe('moveSlider', () => {
  let window;
  let document;
  let layer;

  beforeEach(() => {
    ({ window, document } = loadIndexPage());
    layer = document.getElementById('before-after-layer');
  });

  it.each([0, 25, 50, 100])('sets the after-layer width to %s%%', (value) => {
    window.moveSlider(value);
    expect(layer.style.width).toBe(`${value}%`);
  });

  it('accepts the string values an input event delivers', () => {
    window.moveSlider('37');
    expect(layer.style.width).toBe('37%');
  });

  it('resizes the after-layer when the range input is moved', () => {
    const input = document.querySelector('.slider-input');
    input.value = '80';
    input.dispatchEvent(new window.Event('input', { bubbles: true }));

    expect(layer.style.width).toBe('80%');
  });

  it('exposes a range input bounded to 0-100 and centred by default', () => {
    const input = document.querySelector('.slider-input');
    expect(input.type).toBe('range');
    expect([input.min, input.max, input.value]).toEqual(['0', '100', '50']);
  });
});
