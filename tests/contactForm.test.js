import { describe, it, expect, beforeEach, vi } from 'vitest';
import { loadIndexPage } from './helpers/loadPage.js';

describe('contact form', () => {
  let window;
  let document;
  let form;

  beforeEach(() => {
    ({ window, document } = loadIndexPage());
    form = document.querySelector('.contact-form');
  });

  it('requires a name and an email address', () => {
    const [name, email] = form.querySelectorAll('input[type=text], input[type=email]');
    expect(name.required).toBe(true);
    expect(email.required).toBe(true);
    expect(email.type).toBe('email');
  });

  it('keeps the x-ray upload optional and hidden behind the drop zone', () => {
    const fileInput = document.getElementById('file-input');
    expect(fileInput.type).toBe('file');
    expect(fileInput.required).toBe(false);
    expect(fileInput.style.display).toBe('none');
  });

  it('confirms submission without navigating away', () => {
    const alert = vi.fn();
    window.alert = alert;

    const event = new window.Event('submit', { bubbles: true, cancelable: true });
    form.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(true);
    expect(alert).toHaveBeenCalledWith('Application & X-Ray Sent Successfully!');
  });

  it('shows the chosen file name in the upload zone', () => {
    const fileInput = document.getElementById('file-input');
    Object.defineProperty(fileInput, 'files', {
      value: [{ name: 'panoramic-xray.png' }],
    });

    fileInput.dispatchEvent(new window.Event('change', { bubbles: true }));

    expect(document.querySelector('.file-upload span').textContent).toBe('panoramic-xray.png');
  });

  it('opens the file picker when the drop zone is clicked', () => {
    const fileInput = document.getElementById('file-input');
    const click = vi.spyOn(fileInput, 'click').mockImplementation(() => {});

    document.querySelector('.file-upload').click();

    expect(click).toHaveBeenCalledTimes(1);
  });
});
