#!/usr/bin/env node
// Checks the savings calculator's language handling (SPEC.md, PR 2):
// the nl translation set mirrors en key for key, nl-be / nl resolve to it,
// numbers and dates use the Dutch format there, and fr / en are unchanged.
// Usage: node scripts/check-calculator-i18n.js
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const src = fs.readFileSync(path.join(__dirname, '../assets/js/savings-calculator.js'), 'utf8');
// Expose the IIFE's private helpers without touching the shipped file.
const exposed = src.replace(/\n\}\)\(\);\s*$/, '\n;globalThis.__sc = { TRANSLATIONS, t, formatNumber, uiLocale, displayLocale };\n})();\n');
if (exposed === src) throw new Error('could not find the end of the IIFE');
const ctx = { document: { readyState: 'loading', addEventListener() {}, querySelector: () => null }, window: {}, Intl, String, Number, Math, Array, Object, JSON, isFinite };
ctx.globalThis = ctx;
vm.runInNewContext(exposed, ctx);
const { TRANSLATIONS, t, formatNumber, uiLocale, displayLocale } = ctx.__sc;

let failed = 0;
const check = (ok, msg) => { console.log(`  ${ok ? 'ok  ' : 'FAIL'}  ${msg}`); if (!ok) failed = 1; };
const keys = (o, p = '') => Object.keys(o).flatMap(k => (o[k] && typeof o[k] === 'object') ? keys(o[k], p + k + '.') : [p + k]).sort();

check(!!TRANSLATIONS.nl, 'TRANSLATIONS.nl exists');
if (TRANSLATIONS.nl) {
  const missing = keys(TRANSLATIONS.en).filter(k => !keys(TRANSLATIONS.nl).includes(k));
  const extra = keys(TRANSLATIONS.nl).filter(k => !keys(TRANSLATIONS.en).includes(k));
  check(!missing.length && !extra.length, `nl keys match en${missing.length ? ' (missing ' + missing.join(', ') + ')' : ''}${extra.length ? ' (extra ' + extra.join(', ') + ')' : ''}`);
}
check(t('nl-be', 'step1.title') === TRANSLATIONS.nl?.step1.title && t('nl', 'step1.title') === TRANSLATIONS.nl?.step1.title, 'nl-be and nl use the nl strings');
check(t('fr', 'step1.title') === 'Votre entreprise' && t('en', 'step1.title') === 'Your company' && t('de', 'step1.title') === 'Your company', 'fr / en unchanged, other languages fall back to en');
check(uiLocale('nl-be') === 'nl-BE' && uiLocale('nl') === 'nl-NL' && uiLocale('fr') === 'fr-FR' && uiLocale('en') === 'en-GB' && uiLocale('de') === 'en-GB', 'number/date locale per language');
check(formatNumber(1234.5, 1, 'nl-be') === (1234.5).toLocaleString('nl-BE', { minimumFractionDigits: 1, maximumFractionDigits: 1 }), 'formatNumber uses nl-BE');
check(displayLocale('nl-be') === 'nl' && displayLocale('nl') === 'nl' && displayLocale('fr') === 'fr' && displayLocale('es') === 'en', 'country-list display locale');
console.log(failed ? 'CHECKS FAILED' : 'ALL CHECKS PASSED');
process.exit(failed);
