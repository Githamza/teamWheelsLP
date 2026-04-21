(function () {
  'use strict';

  var TRANSLATIONS = {
    fr: {
      currencies: { EUR: 'Euro (€)', GBP: 'Livre sterling (£)', USD: 'Dollar US ($)' },
      step1: { title: 'Votre entreprise', subtitle: "Quelques infos sur votre organisation." },
      step2: { title: 'Mobilité actuelle', subtitle: 'Comment vos salariés se déplacent aujourd\u2019hui.' },
      step3: { title: 'Vos économies potentielles', subtitle: 'Résultats estimés avec TeamWheels.' },
      step4: { title: 'Votre rapport personnalisé', subtitle: 'Téléchargez votre analyse complète.' },
      fields: {
        currency: 'Devise',
        employees: 'Nombre de salariés',
        distance: 'Distance domicile-travail (aller-retour)',
        workDays: 'Jours travaillés / an',
        soloPercent: '% de salariés en voiture solo',
        targetPercent: 'Objectif de covoiturage',
        fuelPrice: 'Prix du carburant',
        consumption: 'Consommation moyenne du véhicule'
      },
      results: {
        co2: { label: 'CO\u2082 évité', unit: 't/an' },
        savings: { label: 'Économies par covoitureur', unit: '/an' },
        fmd: { labelFR: 'Gain employeur (FMD)', labelINT: 'Gain employeur estimé', unit: '/an' },
        parking: { label: 'Places de parking libérées', unit: 'places' },
        rse: { label: 'Score RSE Mobilité', unit: '/ 100' },
        chartBarTitle: 'Émissions CO\u2082 : avant vs après',
        chartRseTitle: 'Score RSE Mobilité',
        co2DescEq: 'Équivalent à {x} allers Paris\u2013New York',
        chartBarBefore: 'Avant',
        chartBarAfter: 'Après'
      },
      leadForm: {
        firstName: 'Prénom',
        email: 'Email professionnel',
        company: 'Entreprise',
        country: 'Pays',
        countryPlaceholder: 'Commencez à taper un pays…',
        countryInvalid: 'Choisissez un pays dans la liste.',
        optin: "J'accepte de recevoir des informations de TeamWheels."
      },
      cta: {
        download: 'Télécharger mon rapport PDF',
        demo: 'Voir une démo TeamWheels',
        shareLabel: 'Ou partagez :'
      },
      nav: { prev: '\u2190 Précédent', next: 'Suivant \u2192', finish: 'Voir les résultats \u2192' },
      disclaimer: "Estimations indicatives basées sur facteurs ADEME (France) / EPA (international). Les résultats réels varient selon le contexte de votre entreprise.",
      share: 'Découvrez combien votre entreprise peut économiser avec le covoiturage TeamWheels.',
      pdf: {
        cover: "Rapport d'impact covoiturage",
        preparedFor: 'Préparé pour',
        date: 'Date',
        summary: 'Synthèse exécutive',
        assumptions: 'Hypothèses retenues',
        methodology: 'Méthodologie : facteurs ADEME (voiture 0,193 kgCO\u2082/km) pour la France, EPA pour le Royaume-Uni et les États-Unis.',
        nextSteps: 'Prochaines étapes',
        nextStepsBody: 'TeamWheels transforme Microsoft Teams en plateforme de covoiturage. Déploiement en 5 minutes, adoption immédiate par vos équipes, suivi Scope 3 intégré.',
        contact: 'Contact : contact@teamwheelsapp.com',
        footer: 'teamwheelsapp.com — Covoiturage d\u2019entreprise'
      }
    },
    en: {
      currencies: { EUR: 'Euro (€)', GBP: 'Pound sterling (£)', USD: 'US dollar ($)' },
      step1: { title: 'Your company', subtitle: 'A few details about your organisation.' },
      step2: { title: 'Current mobility', subtitle: 'How your employees commute today.' },
      step3: { title: 'Your potential savings', subtitle: 'Estimated results with TeamWheels.' },
      step4: { title: 'Your personalised report', subtitle: 'Download your full analysis.' },
      fields: {
        currency: 'Currency',
        employees: 'Number of employees',
        distance: 'Home-to-work distance (round trip)',
        workDays: 'Working days / year',
        soloPercent: '% of employees driving alone',
        targetPercent: 'Carpooling target',
        fuelPrice: 'Fuel price',
        consumption: 'Average vehicle consumption'
      },
      results: {
        co2: { label: 'CO\u2082 avoided', unit: 't/yr' },
        savings: { label: 'Savings per carpooler', unit: '/yr' },
        fmd: { labelFR: 'Employer FMD benefit', labelINT: 'Estimated employer benefit', unit: '/yr' },
        parking: { label: 'Parking spots freed', unit: 'spots' },
        rse: { label: 'Mobility ESG Score', unit: '/ 100' },
        chartBarTitle: 'CO\u2082 emissions: before vs after',
        chartRseTitle: 'Mobility ESG Score',
        co2DescEq: 'Equivalent to {x} Paris\u2013New York flights',
        chartBarBefore: 'Before',
        chartBarAfter: 'After'
      },
      leadForm: {
        firstName: 'First name',
        email: 'Work email',
        company: 'Company',
        country: 'Country',
        countryPlaceholder: 'Start typing a country…',
        countryInvalid: 'Please pick a country from the list.',
        optin: 'I agree to receive updates from TeamWheels.'
      },
      cta: {
        download: 'Download my PDF report',
        demo: 'See a TeamWheels demo',
        shareLabel: 'Or share:'
      },
      nav: { prev: '\u2190 Back', next: 'Next \u2192', finish: 'See results \u2192' },
      disclaimer: 'Indicative estimates based on ADEME (France) / EPA (international) emission factors. Actual results vary by company context.',
      share: 'See how much your company could save with TeamWheels corporate carpooling.',
      pdf: {
        cover: 'Carpooling Impact Report',
        preparedFor: 'Prepared for',
        date: 'Date',
        summary: 'Executive summary',
        assumptions: 'Assumptions',
        methodology: 'Methodology: ADEME factors (0.193 kgCO\u2082/km average car) for France, EPA factors for UK/US.',
        nextSteps: 'Next steps',
        nextStepsBody: 'TeamWheels turns Microsoft Teams into a carpooling platform. 5-minute deployment, immediate adoption, Scope 3 tracking built in.',
        contact: 'Contact: contact@teamwheelsapp.com',
        footer: 'teamwheelsapp.com \u2014 Corporate carpooling'
      }
    }
  };

  var DEFAULTS = {
    EUR: { fuelPrice: 1.85, currency: 'EUR', currencySymbol: '\u20AC', fuelPriceUnit: '\u20AC/L', distUnit: 'km', consumptionUnit: 'L/100km' },
    GBP: { fuelPrice: 1.55, currency: 'GBP', currencySymbol: '\u00A3', fuelPriceUnit: '\u00A3/L', distUnit: 'miles', consumptionUnit: 'MPG' },
    USD: { fuelPrice: 3.50, currency: 'USD', currencySymbol: '$', fuelPriceUnit: '$/gal', distUnit: 'miles', consumptionUnit: 'MPG' }
  };

  var COUNTRY_CODES = [
    'AF','AL','DZ','AS','AD','AO','AI','AQ','AG','AR','AM','AW','AU','AT','AZ',
    'BS','BH','BD','BB','BY','BE','BZ','BJ','BM','BT','BO','BA','BW','BR','IO',
    'BN','BG','BF','BI','CV','KH','CM','CA','KY','CF','TD','CL','CN','CX','CC',
    'CO','KM','CG','CD','CK','CR','CI','HR','CU','CW','CY','CZ','DK','DJ','DM',
    'DO','EC','EG','SV','GQ','ER','EE','SZ','ET','FK','FO','FJ','FI','FR','GF',
    'PF','GA','GM','GE','DE','GH','GI','GR','GL','GD','GP','GU','GT','GG','GN',
    'GW','GY','HT','HN','HK','HU','IS','IN','ID','IR','IQ','IE','IM','IL','IT',
    'JM','JP','JE','JO','KZ','KE','KI','KP','KR','KW','KG','LA','LV','LB','LS',
    'LR','LY','LI','LT','LU','MO','MG','MW','MY','MV','ML','MT','MH','MQ','MR',
    'MU','YT','MX','FM','MD','MC','MN','ME','MS','MA','MZ','MM','NA','NR','NP',
    'NL','NC','NZ','NI','NE','NG','NU','NF','MK','MP','NO','OM','PK','PW','PS',
    'PA','PG','PY','PE','PH','PN','PL','PT','PR','QA','RE','RO','RU','RW','BL',
    'SH','KN','LC','MF','PM','VC','WS','SM','ST','SA','SN','RS','SC','SL','SG',
    'SX','SK','SI','SB','SO','ZA','GS','SS','ES','LK','SD','SR','SJ','SE','CH',
    'SY','TW','TJ','TZ','TH','TL','TG','TK','TO','TT','TN','TR','TM','TC','TV',
    'UG','UA','AE','GB','US','UY','UZ','VU','VA','VE','VN','VG','VI','WF','EH',
    'YE','ZM','ZW'
  ];

  var KM_PER_MILE = 1.609344;
  var LITERS_PER_GALLON = 3.78541;
  var PARIS_NYC_FLIGHT_TONS = 1.8;

  function t(lang, path) {
    var parts = path.split('.');
    var node = TRANSLATIONS[lang] || TRANSLATIONS.en;
    for (var i = 0; i < parts.length; i++) {
      if (node == null) return '';
      node = node[parts[i]];
    }
    return node == null ? '' : String(node);
  }

  function getCurrencyDefaults(currency) {
    return DEFAULTS[currency] || DEFAULTS.EUR;
  }

  function computeSavings(state) {
    var cd = getCurrencyDefaults(state.currency);
    var employees = Math.max(1, Number(state.employees) || 0);
    var distanceKm = (cd.distUnit === 'miles') ? (Number(state.distanceRaw) || 0) * KM_PER_MILE : (Number(state.distanceRaw) || 0);
    var workDays = Math.max(1, Number(state.workDays) || 220);
    var soloPct = Math.min(100, Math.max(0, Number(state.soloCarsPercent) || 0));
    var targetPct = Math.min(100, Math.max(0, Number(state.carpoolTargetPct) || 0));
    var consumptionL100;
    if (cd.consumptionUnit === 'MPG') {
      var mpg = Math.max(1, Number(state.fuelConsumptionRaw) || 25);
      consumptionL100 = 235.215 / mpg;
    } else {
      consumptionL100 = Math.max(1, Number(state.fuelConsumptionRaw) || 7);
    }
    var fuelPricePerLiter;
    if (cd.fuelPriceUnit === '$/gal') {
      fuelPricePerLiter = (Number(state.fuelPrice) || 0) / LITERS_PER_GALLON;
    } else {
      fuelPricePerLiter = Number(state.fuelPrice) || 0;
    }

    var soloCars = Math.round(employees * soloPct / 100);
    var carpoolConverted = Math.round(soloCars * targetPct / 100);

    var kmSavedTotal = carpoolConverted * distanceKm * workDays;
    var co2Saved = (kmSavedTotal * 0.193) / 1000;

    var fuelSavedPerDriver = (distanceKm / 2) * workDays * (consumptionL100 / 100) * fuelPricePerLiter;
    var totalEmployeeSavings = carpoolConverted * fuelSavedPerDriver;

    var fmdGain;
    if (state.country === 'FR') {
      var FMD_CAP = 700;
      fmdGain = carpoolConverted * Math.min(fuelSavedPerDriver * 0.5, FMD_CAP) * 0.45;
    } else {
      fmdGain = totalEmployeeSavings * 0.12;
    }

    var parkingReduced = Math.round(carpoolConverted * 0.7);

    var rseA = targetPct * 0.4;
    var rseB = Math.min((employees > 0 ? (co2Saved / employees) * 10 : 0), 40);
    var rseC = Math.min((employees > 0 ? (parkingReduced / employees) * 100 * 0.2 : 0), 20);
    var rseScore = Math.max(0, Math.min(100, Math.round(rseA + rseB + rseC)));

    var co2FlightEquiv = co2Saved > 0 ? (co2Saved / PARIS_NYC_FLIGHT_TONS) : 0;

    return {
      country: state.country,
      currency: cd.currency,
      currencySymbol: cd.currencySymbol,
      employees: employees,
      carpoolConverted: carpoolConverted,
      co2Saved: co2Saved,
      co2SavedKg: co2Saved * 1000,
      co2Before: (employees * distanceKm * workDays * 0.193) / 1000,
      savingsPerDriver: fuelSavedPerDriver,
      totalEmployeeSavings: totalEmployeeSavings,
      fmdGain: fmdGain,
      parkingReduced: parkingReduced,
      rseScore: rseScore,
      co2FlightEquiv: co2FlightEquiv
    };
  }

  function formatNumber(n, decimals, lang) {
    var locale = lang === 'fr' ? 'fr-FR' : 'en-GB';
    var value = isFinite(n) ? n : 0;
    try {
      return value.toLocaleString(locale, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      });
    } catch (e) {
      return value.toFixed(decimals);
    }
  }

  function animateCounter(el, to, decimals, lang) {
    var from = Number(el.getAttribute('data-current')) || 0;
    var duration = 700;
    var start = performance.now();
    function tick(now) {
      var p = Math.min(1, (now - start) / duration);
      var eased = 1 - Math.pow(1 - p, 3);
      var v = from + (to - from) * eased;
      el.textContent = formatNumber(v, decimals, lang);
      if (p < 1) requestAnimationFrame(tick);
      else el.setAttribute('data-current', String(to));
    }
    requestAnimationFrame(tick);
  }

  function applyI18n(root, lang) {
    root.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var text = t(lang, key);
      if (text) el.textContent = text;
    });
  }

  function populateCountrySelect(lang) {
    var input = document.getElementById('sc-lead-country');
    var list = document.getElementById('sc-country-list');
    if (!input || !list) return;

    input.placeholder = t(lang, 'leadForm.countryPlaceholder');

    var displayLocale = lang === 'fr' ? 'fr' : 'en';
    var displayNames = null;
    try {
      if (typeof Intl !== 'undefined' && Intl.DisplayNames) {
        displayNames = new Intl.DisplayNames([displayLocale], { type: 'region' });
      }
    } catch (e) {}

    var items = COUNTRY_CODES.map(function (code) {
      var name = code;
      if (displayNames) {
        try {
          var n = displayNames.of(code);
          if (n) name = n;
        } catch (e) {}
      }
      return { code: code, name: name };
    });
    var collator = (typeof Intl !== 'undefined' && Intl.Collator) ? new Intl.Collator(displayLocale) : null;
    items.sort(function (a, b) {
      return collator ? collator.compare(a.name, b.name) : (a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
    });

    var nameToCode = {};
    var frag = document.createDocumentFragment();
    items.forEach(function (item) {
      nameToCode[item.name.toLowerCase()] = item.code;
      var opt = document.createElement('option');
      opt.value = item.name;
      opt.setAttribute('data-code', item.code);
      frag.appendChild(opt);
    });
    list.innerHTML = '';
    list.appendChild(frag);

    input._countryNameToCode = nameToCode;
    input.addEventListener('input', function () { input.setCustomValidity(''); });
  }

  function init() {
    var root = document.querySelector('.savings-calculator');
    if (!root) return;

    var lang = (root.getAttribute('data-lang') || 'fr').toLowerCase();
    if (!TRANSLATIONS[lang]) lang = 'en';

    var initialCurrency = root.getAttribute('data-currency') || 'EUR';
    if (!DEFAULTS[initialCurrency]) initialCurrency = 'EUR';
    var cd = getCurrencyDefaults(initialCurrency);

    var state = {
      lang: lang,
      currency: initialCurrency,
      country: '',
      employees: 500,
      distanceRaw: cd.distUnit === 'miles' ? 20 : 30,
      workDays: 220,
      soloCarsPercent: 75,
      carpoolTargetPct: 30,
      fuelConsumptionRaw: cd.consumptionUnit === 'MPG' ? 30 : 7,
      fuelPrice: cd.fuelPrice
    };

    var step = 1;
    var barChart = null;
    var gaugeChart = null;
    var lastResult = null;

    applyI18n(root, lang);
    populateCountrySelect(lang);

    root.querySelectorAll('[data-bind]').forEach(function (input) {
      var key = input.getAttribute('data-bind');
      if (state[key] != null) input.value = state[key];
      var evt = input.type === 'range' || input.tagName === 'SELECT' ? 'input' : 'input';
      input.addEventListener(evt, function () {
        var val = input.tagName === 'SELECT' ? input.value : (input.type === 'number' || input.type === 'range' ? Number(input.value) : input.value);
        state[key] = val;
        if (key === 'currency') {
          var d = getCurrencyDefaults(state.currency);
          state.fuelPrice = d.fuelPrice;
          state.distanceRaw = d.distUnit === 'miles' ? 20 : 30;
          state.fuelConsumptionRaw = d.consumptionUnit === 'MPG' ? 30 : 7;
          var fpIn = root.querySelector('[data-bind="fuelPrice"]');
          var drIn = root.querySelector('[data-bind="distanceRaw"]');
          var fcIn = root.querySelector('[data-bind="fuelConsumptionRaw"]');
          if (fpIn) fpIn.value = state.fuelPrice;
          if (drIn) drIn.value = state.distanceRaw;
          if (fcIn) fcIn.value = state.fuelConsumptionRaw;
        }
        refreshDynamicText();
        if (step === 3) renderResults();
      });
    });

    function refreshDynamicText() {
      var cd2 = getCurrencyDefaults(state.currency);
      root.querySelectorAll('[data-bind-text="unitDistance"]').forEach(function (el) { el.textContent = cd2.distUnit; });
      root.querySelectorAll('[data-bind-text="unitConsumption"]').forEach(function (el) { el.textContent = cd2.consumptionUnit; });
      root.querySelectorAll('[data-bind-text="unitFuelPrice"]').forEach(function (el) { el.textContent = cd2.fuelPriceUnit; });
      root.querySelectorAll('[data-bind-text="unitSavings"]').forEach(function (el) { el.textContent = cd2.currencySymbol + t(lang, 'results.savings.unit'); });
      root.querySelectorAll('[data-bind-text="soloCarsPercent"]').forEach(function (el) { el.textContent = state.soloCarsPercent; });
      root.querySelectorAll('[data-bind-text="carpoolTargetPct"]').forEach(function (el) { el.textContent = state.carpoolTargetPct; });
      root.querySelectorAll('[data-bind-text="fmdLabel"]').forEach(function (el) {
        el.textContent = state.country === 'FR' ? t(lang, 'results.fmd.labelFR') : t(lang, 'results.fmd.labelINT');
      });
    }

    function showStep(n) {
      step = n;
      root.querySelectorAll('.sc-step').forEach(function (s) {
        var isActive = Number(s.getAttribute('data-step')) === n;
        s.hidden = !isActive;
        s.setAttribute('aria-hidden', isActive ? 'false' : 'true');
      });
      root.querySelectorAll('.sc-stepper li').forEach(function (li) {
        var v = Number(li.getAttribute('data-step'));
        li.classList.toggle('is-active', v === n);
        li.classList.toggle('is-done', v < n);
      });
      var prev = root.querySelector('[data-sc-prev]');
      var next = root.querySelector('[data-sc-next]');
      if (prev) prev.hidden = n === 1;
      if (next) {
        next.hidden = n === 4;
        if (n === 2) next.textContent = t(lang, 'nav.finish');
        else next.textContent = t(lang, 'nav.next');
      }
      if (n === 3) renderResults();
      if (n === 4) prepareShare();
      try {
        if (window.dataLayer) window.dataLayer.push({ event: 'calculator_step_complete', step: n });
      } catch (e) {}
    }

    function renderResults() {
      var res = computeSavings(state);
      lastResult = res;
      refreshDynamicText();

      root.querySelectorAll('[data-counter]').forEach(function (el) {
        var key = el.getAttribute('data-counter');
        var decimals = Number(el.getAttribute('data-decimals') || 0);
        animateCounter(el, Number(res[key]) || 0, decimals, lang);
      });

      var descEl = root.querySelector('[data-bind-text="co2Desc"]');
      if (descEl) {
        var x = res.co2FlightEquiv;
        descEl.textContent = t(lang, 'results.co2DescEq').replace('{x}', formatNumber(x, x < 10 ? 1 : 0, lang));
      }

      if (typeof Chart !== 'undefined') {
        renderBarChart(res);
        renderGauge(res);
      } else {
        setTimeout(function () {
          if (typeof Chart !== 'undefined') { renderBarChart(res); renderGauge(res); }
        }, 400);
      }
    }

    function renderBarChart(res) {
      var ctx = document.getElementById('sc-chart-bar');
      if (!ctx) return;
      var data = {
        labels: [t(lang, 'results.chartBarBefore'), t(lang, 'results.chartBarAfter')],
        datasets: [{
          label: 'CO\u2082 (t/yr)',
          data: [Number(res.co2Before.toFixed(1)), Number((res.co2Before - res.co2Saved).toFixed(1))],
          backgroundColor: ['#ED6F78', '#10B981'],
          borderRadius: 8
        }]
      };
      var options = {
        responsive: true,
        maintainAspectRatio: false,
        resizeDelay: 150,
        animation: barChart ? false : { duration: 400 },
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true, ticks: { precision: 0 } } }
      };
      if (barChart) {
        barChart.data = data;
        barChart.update('none');
        return;
      }
      barChart = new Chart(ctx, { type: 'bar', data: data, options: options });
    }

    function renderGauge(res) {
      var ctx = document.getElementById('sc-chart-rse');
      if (!ctx) return;
      var score = Math.max(0, Math.min(100, res.rseScore));
      var color = score > 70 ? '#10B981' : score > 40 ? '#FFD02F' : '#ED6F78';
      var data = {
        datasets: [{
          data: [score, 100 - score],
          backgroundColor: [color, '#E2E8F0'],
          borderWidth: 0
        }]
      };
      var options = {
        responsive: true,
        maintainAspectRatio: false,
        resizeDelay: 150,
        animation: gaugeChart ? false : { duration: 400 },
        cutout: '72%',
        rotation: -90,
        circumference: 180,
        plugins: { legend: { display: false }, tooltip: { enabled: false } }
      };
      if (gaugeChart) {
        gaugeChart.data = data;
        gaugeChart.update('none');
        return;
      }
      gaugeChart = new Chart(ctx, { type: 'doughnut', data: data, options: options });
    }

    function prepareShare() {
      var rawText = t(lang, 'share');
      var pageUrl = window.location.href;
      var shareText = encodeURIComponent(rawText);
      var url = encodeURIComponent(pageUrl);
      var liText = encodeURIComponent(rawText + ' ' + pageUrl);
      var li = document.getElementById('sc-share-linkedin');
      var tw = document.getElementById('sc-share-twitter');
      if (li) li.href = 'https://www.linkedin.com/feed/?shareActive=true&text=' + liText;
      if (tw) tw.href = 'https://twitter.com/intent/tweet?text=' + shareText + '&url=' + url;
    }

    var nextBtn = root.querySelector('[data-sc-next]');
    var prevBtn = root.querySelector('[data-sc-prev]');
    if (nextBtn) nextBtn.addEventListener('click', function () { if (step < 4) showStep(step + 1); });
    if (prevBtn) prevBtn.addEventListener('click', function () { if (step > 1) showStep(step - 1); });

    root.querySelectorAll('.sc-stepper li').forEach(function (li) {
      li.addEventListener('click', function () {
        var target = Number(li.getAttribute('data-step'));
        if (!isNaN(target) && target >= 1 && target <= 4) showStep(target);
      });
    });

    var form = document.getElementById('sc-lead-form');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var fd = new FormData(form);
        var countryInput = document.getElementById('sc-lead-country');
        var typedCountry = (fd.get('country') || '').trim();
        var nameMap = (countryInput && countryInput._countryNameToCode) || {};
        var countryCode = nameMap[typedCountry.toLowerCase()] || '';
        if (countryInput) {
          if (typedCountry && !countryCode) {
            countryInput.setCustomValidity(t(lang, 'leadForm.countryInvalid') || 'Please pick a country from the list');
          } else {
            countryInput.setCustomValidity('');
          }
        }
        var userInfo = {
          firstName: fd.get('firstName') || '',
          email: fd.get('email') || '',
          company: fd.get('company') || '',
          country: countryCode,
          countryName: typedCountry,
          optin: !!fd.get('optin')
        };
        if (!userInfo.email || !userInfo.firstName || !userInfo.company || !userInfo.country) {
          form.reportValidity();
          return;
        }
        state.country = userInfo.country;
        var result = computeSavings(state);
        lastResult = result;
        generatePDF(result, state, userInfo);
        sendLead(userInfo, state, result);
        try {
          if (window.dataLayer) window.dataLayer.push({ event: 'calculator_pdf_downloaded', lang: lang, country: state.country });
        } catch (e2) {}
      });
    }

    function sendLead(userInfo, st, res) {
      try {
        var cd2 = getCurrencyDefaults(st.currency);
        var sym = cd2.currencySymbol;
        var payload = {
          _subject: '[Savings Calculator] ' + (userInfo.company || '') + ' - ' + (userInfo.firstName || ''),
          source: 'savings-calculator',
          language: lang,
          currency: st.currency,
          country: st.country,
          firstName: userInfo.firstName,
          email: userInfo.email,
          company: userInfo.company,
          optin: userInfo.optin ? 'yes' : 'no',
          inputs_employees: st.employees,
          inputs_distance: st.distanceRaw + ' ' + cd2.distUnit,
          inputs_workDays: st.workDays,
          inputs_soloPercent: st.soloCarsPercent + '%',
          inputs_carpoolTarget: st.carpoolTargetPct + '%',
          inputs_consumption: st.fuelConsumptionRaw + ' ' + cd2.consumptionUnit,
          inputs_fuelPrice: st.fuelPrice + ' ' + cd2.fuelPriceUnit,
          result_co2Saved_tons: Number(res.co2Saved).toFixed(2),
          result_savingsPerDriver: sym + Math.round(res.savingsPerDriver),
          result_fmdGain: sym + Math.round(res.fmdGain),
          result_parkingFreed: res.parkingReduced,
          result_rseScore: res.rseScore + '/100',
          submittedAt: new Date().toISOString(),
          pageUrl: window.location.href
        };
        fetch('https://formspree.io/f/mnqepday', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(payload)
        }).catch(function () {});
      } catch (e) {}
    }

    function pdfSafe(s) {
      if (s == null) return '';
      return String(s)
        .replace(/\u2082/g, '2')
        .replace(/[\u2080-\u2089]/g, function (c) { return String(c.charCodeAt(0) - 0x2080); })
        .replace(/[\u2070\u00B9\u00B2\u00B3\u2074-\u2079]/g, function (c) {
          var map = { '\u2070': '0', '\u00B9': '1', '\u00B2': '2', '\u00B3': '3', '\u2074': '4', '\u2075': '5', '\u2076': '6', '\u2077': '7', '\u2078': '8', '\u2079': '9' };
          return map[c] || c;
        })
        .replace(/\u2013|\u2014/g, '-')
        .replace(/\u00A0/g, ' ');
    }

    function generatePDF(res, st, userInfo) {
      if (!window.jspdf || !window.jspdf.jsPDF) {
        alert('PDF library still loading. Please try again in a moment.');
        return;
      }
      var jsPDF = window.jspdf.jsPDF;
      var doc = new jsPDF({ unit: 'pt', format: 'a4' });
      var pageW = doc.internal.pageSize.getWidth();
      var margin = 48;
      var y = margin;
      var cd2 = getCurrencyDefaults(st.currency);
      var sym = cd2.currencySymbol;

      doc.setFillColor(37, 99, 235);
      doc.rect(0, 0, pageW, 140, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(22);
      doc.text(pdfSafe('TeamWheels'), margin, 62);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'normal');
      doc.text(pdfSafe(t(lang, 'pdf.cover')), margin, 92);
      doc.setFontSize(11);
      doc.text(pdfSafe((userInfo.company || '') + '  -  ' + new Date().toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-GB')), margin, 115);

      doc.setTextColor(15, 23, 42);
      y = 180;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text(pdfSafe(t(lang, 'pdf.summary')), margin, y);
      y += 24;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      var rows = [
        [t(lang, 'results.co2.label'), formatNumber(res.co2Saved, 1, lang) + ' ' + t(lang, 'results.co2.unit')],
        [t(lang, 'results.savings.label'), sym + formatNumber(res.savingsPerDriver, 0, lang) + t(lang, 'results.savings.unit')],
        [st.country === 'FR' ? t(lang, 'results.fmd.labelFR') : t(lang, 'results.fmd.labelINT'), sym + formatNumber(res.fmdGain, 0, lang) + t(lang, 'results.fmd.unit')],
        [t(lang, 'results.parking.label'), formatNumber(res.parkingReduced, 0, lang) + ' ' + t(lang, 'results.parking.unit')],
        [t(lang, 'results.rse.label'), formatNumber(res.rseScore, 0, lang) + ' ' + t(lang, 'results.rse.unit')]
      ];
      rows.forEach(function (r) {
        doc.setDrawColor(226, 232, 240);
        doc.line(margin, y + 4, pageW - margin, y + 4);
        doc.text(pdfSafe(r[0]), margin, y);
        doc.setFont('helvetica', 'bold');
        doc.text(pdfSafe(r[1]), pageW - margin, y, { align: 'right' });
        doc.setFont('helvetica', 'normal');
        y += 26;
      });

      y += 16;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.text(pdfSafe(t(lang, 'pdf.assumptions')), margin, y);
      y += 20;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10.5);
      var assumptions = [
        t(lang, 'fields.employees') + ': ' + st.employees,
        t(lang, 'fields.distance') + ': ' + st.distanceRaw + ' ' + cd2.distUnit,
        t(lang, 'fields.workDays') + ': ' + st.workDays,
        t(lang, 'fields.soloPercent') + ': ' + st.soloCarsPercent + ' %',
        t(lang, 'fields.targetPercent') + ': ' + st.carpoolTargetPct + ' %',
        t(lang, 'fields.consumption') + ': ' + st.fuelConsumptionRaw + ' ' + cd2.consumptionUnit,
        t(lang, 'fields.fuelPrice') + ': ' + st.fuelPrice + ' ' + cd2.fuelPriceUnit
      ];
      assumptions.forEach(function (line) { doc.text(pdfSafe('- ' + line), margin, y); y += 16; });

      y += 10;
      doc.setFontSize(9);
      doc.setTextColor(100, 116, 139);
      var methodology = doc.splitTextToSize(pdfSafe(t(lang, 'pdf.methodology')), pageW - margin * 2);
      doc.text(methodology, margin, y);
      y += methodology.length * 12 + 20;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(15, 23, 42);
      doc.text(pdfSafe(t(lang, 'pdf.nextSteps')), margin, y);
      y += 20;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10.5);
      var next = doc.splitTextToSize(pdfSafe(t(lang, 'pdf.nextStepsBody')), pageW - margin * 2);
      doc.text(next, margin, y);
      y += next.length * 14 + 18;

      doc.setFontSize(10);
      doc.setTextColor(37, 99, 235);
      doc.text(pdfSafe(t(lang, 'pdf.contact')), margin, y);
      y += 14;

      doc.setFontSize(9);
      doc.setTextColor(148, 163, 184);
      doc.text(pdfSafe(t(lang, 'pdf.footer')), margin, doc.internal.pageSize.getHeight() - 24);

      var fname = 'teamwheels-savings-' + (userInfo.company || 'report').replace(/[^a-z0-9]+/gi, '-').toLowerCase() + '.pdf';
      doc.save(fname);
    }

    refreshDynamicText();
    showStep(1);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
