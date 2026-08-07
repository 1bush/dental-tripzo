/* Shared data and DOM helpers for the Dental Tripzo landing page.
   Loaded as a classic script so the page also works over file://. */

var DentalTripzo = (function () {
  var DEFAULT_LANG = 'en';

  // Departure airport per language, used by both the boarding pass and the flight widget.
  var DEPARTURES = {
    en: { code: 'PRG', city: 'Prague' },
    cs: { code: 'PRG', city: 'Prague' },
    sk: { code: 'BTS', city: 'Bratislava' }
  };

  var DESTINATION = { code: 'TIA', city: 'Tirana' };

  // Unit prices in EUR, per treatment, at home clinics vs. in Albania.
  var PRICING = {
    implants: { home: 1400, albania: 450 },
    crowns: { home: 600, albania: 180 }
  };

  var TIMELINE = [
    { day: 1, title: 'Arrival & VIP', text: 'Airport greeting by private driver. Check-in at 4★ hotel in center.' },
    { day: 2, title: 'Consultation', text: '3D CT Scan, digital design, and preparation by surgeons.' },
    { day: 3, title: 'Explore Tirana', text: 'Relax or do sightseeing while our in-house lab crafts your teeth.' },
    { day: 4, title: 'The Fitting', text: 'Permanent placement of crowns/implants and final bite adjustments.' },
    { day: 5, title: 'Fly Home', text: 'VIP transfer back to airport. Return home with a Hollywood smile.' }
  ];

  function byId(id) {
    return document.getElementById(id);
  }

  function setText(id, value) {
    var el = byId(id);
    if (el) el.textContent = value;
  }

  function formatEUR(amount) {
    return '€' + Number(amount).toLocaleString();
  }

  function numberValue(id) {
    var el = byId(id);
    return el ? Number(el.value) : 0;
  }

  function routeLabel(departure) {
    return departure.city + ' (' + departure.code + ') ➔ ' + DESTINATION.city + ' (' + DESTINATION.code + ')';
  }

  function departureFor(lang) {
    return DEPARTURES[lang] || DEPARTURES[DEFAULT_LANG];
  }

  function timelineCard(stop) {
    return (
      '<div class="time-card">' +
      '<div class="time-day">Day ' + stop.day + '</div>' +
      '<h4>' + stop.title + '</h4>' +
      '<p>' + stop.text + '</p>' +
      '</div>'
    );
  }

  function renderTimeline(containerId) {
    var container = byId(containerId);
    if (container) container.innerHTML = TIMELINE.map(timelineCard).join('');
  }

  return {
    DEFAULT_LANG: DEFAULT_LANG,
    PRICING: PRICING,
    byId: byId,
    setText: setText,
    formatEUR: formatEUR,
    numberValue: numberValue,
    routeLabel: routeLabel,
    departureFor: departureFor,
    renderTimeline: renderTimeline
  };
})();
