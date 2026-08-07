import { describe, it, expect, beforeAll } from 'vitest';
import { JSDOM } from 'jsdom';
import { loadIndexPage, readRepoFile } from './helpers/loadPage.js';

describe('index.html structure', () => {
  let document;

  beforeAll(() => {
    ({ document } = loadIndexPage());
  });

  it('renders a five day itinerary numbered day 1 to day 5', () => {
    const days = [...document.querySelectorAll('.timeline .time-day')].map((el) => el.textContent);
    expect(days).toEqual(['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5']);
  });

  it('gives every timeline card a title and a description', () => {
    const cards = [...document.querySelectorAll('.timeline .time-card')];
    expect(cards).toHaveLength(5);
    for (const card of cards) {
      expect(card.querySelector('h4').textContent.trim()).not.toBe('');
      expect(card.querySelector('p').textContent.trim()).not.toBe('');
    }
  });

  it('points the hero call to action at the contact section', () => {
    const cta = document.querySelector('.hero-ctas a');
    expect(cta.getAttribute('href')).toBe('#contact');
    expect(document.getElementById('contact')).not.toBeNull();
  });

  it('offers exactly the three supported languages in the switch', () => {
    const labels = [...document.querySelectorAll('.lang-btn')].map((b) => b.textContent.trim());
    expect(labels).toEqual(['EN', 'CZ', 'SK']);
  });

  it('declares a responsive viewport and a page title', () => {
    expect(document.querySelector('meta[name=viewport]').content).toContain('width=device-width');
    expect(document.title).toContain('Dental Tripzo');
  });
});

describe('App.jsx markup', () => {
  let document;

  beforeAll(() => {
    document = new JSDOM(`<body>${readRepoFile('App.jsx')}</body>`).window.document;
  });

  it('prices all three packages', () => {
    const prices = [...document.querySelectorAll('.grid > div .text-3xl')].map((el) =>
      el.textContent.trim(),
    );
    expect(prices).toEqual(['€3,900', '€4,500', '€650']);
  });

  it('gives every package a heading, feature list and a call to action', () => {
    const cards = [...document.querySelectorAll('.grid.md\\:grid-cols-3 > div')];
    expect(cards).toHaveLength(3);
    for (const card of cards) {
      expect(card.querySelector('h3').textContent.trim()).not.toBe('');
      expect(card.querySelectorAll('ul li')).toHaveLength(3);
      expect(card.querySelector('button').textContent.trim()).toBe('Zgjidh Paketën');
    }
  });

  it('lists the five itinerary days in order', () => {
    const days = [...document.querySelectorAll('.grid.lg\\:grid-cols-5 span.tracking-widest')].map(
      (el) => el.textContent.trim(),
    );
    expect(days).toEqual(['DITA 01', 'DITA 02', 'DITA 03', 'DITA 04', 'DITA 05']);
  });

  it('renders each faq as a collapsed details block with an answer', () => {
    const faqs = [...document.querySelectorAll('details')];
    expect(faqs).toHaveLength(3);
    for (const faq of faqs) {
      expect(faq.open).toBe(false);
      expect(faq.querySelector('summary').textContent.trim()).not.toBe('');
      expect(faq.querySelector('div').textContent.trim().length).toBeGreaterThan(20);
    }
  });
});
