/*
 * Simulateur Forfait Mobilité Durable — TeamWheels
 *
 * Vanilla JS, aucune dépendance. Le markup est rendu côté serveur par
 * layouts/partials/tools/fmd-simulator.html ; ce script se contente de
 * l'activer. Sans JS, le tableau statique des plafonds reste affiché et le
 * formulaire est masqué (voir la classe .fmd-sim[hidden] dans le partial).
 */
(function () {
  'use strict';

  /* ------------------------------------------------------------------ *
   * CONSTANTES LÉGALES — point de mise à jour unique.
   *
   * Chaque valeur porte sa source et sa date de vérification. Ne pas
   * disperser ces montants dans le reste du fichier : toute évolution
   * (loi de finances, décret) doit se répercuter ici et nulle part ailleurs.
   *
   * secteur privé
   *   ceilingAlone      : plafond d'exonération du FMD versé seul
   *   ceilingWithTransit: plafond GLOBAL quand le FMD se cumule avec la prise
   *                       en charge de l'abonnement de transport en commun.
   *                       Ce plafond s'apprécie APRÈS déduction de la prise en
   *                       charge de l'abonnement — ce n'est pas 900 € de FMD
   *                       en plus de l'abonnement.
   *   Source : plafonds d'exonération sociale et fiscale du forfait mobilités
   *   durables, secteur privé. Vérifié le 2026-08-25.
   *
   * fonction publique
   *   VOLONTAIREMENT ABSENTE de cette version. Les montants des trois versants
   *   (État, territoriale, hospitalière) sont fixés par décret et n'ont pas pu
   *   être vérifiés contre une source officielle. Le sélecteur de secteur est
   *   désactivé côté markup tant que ces valeurs ne sont pas confirmées ;
   *   ajouter ici un bloc `public` et réactiver l'option le jour venu.
   * ------------------------------------------------------------------ */
  var LEGAL = {
    verifiedOn: '2026-08-25',
    private: {
      ceilingAlone: 600,
      ceilingWithTransit: 900
    },
    /* Hypothèse de charges patronales + salariales utilisée pour comparer le
     * FMD à une prime classique soumise à cotisations. Paramétrable par
     * l'utilisateur via le champ correspondant ; cette valeur n'est qu'un
     * point de départ réaliste, pas une donnée légale. */
    defaultEmployerContributionRate: 0.42,
    defaultEmployeeContributionRate: 0.22
  };

  var euro = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  });

  function byId(id) {
    return document.getElementById(id);
  }

  function toNumber(value, fallback) {
    var n = parseFloat(String(value).replace(',', '.'));
    return isFinite(n) ? n : fallback;
  }

  function init() {
    var root = byId('fmd-sim');
    if (!root) return;

    var els = {
      employees: byId('fmd-employees'),
      amount: byId('fmd-amount'),
      amountOut: byId('fmd-amount-out'),
      transit: byId('fmd-transit'),
      transitAmount: byId('fmd-transit-amount'),
      transitRow: byId('fmd-transit-row'),
      employerRate: byId('fmd-employer-rate'),
      modes: root.querySelectorAll('input[name="fmd-mode"]'),
      ceilingNote: byId('fmd-ceiling-note'),
      outPerEmployee: byId('fmd-out-per-employee'),
      outTotal: byId('fmd-out-total'),
      outSavings: byId('fmd-out-savings'),
      outNet: byId('fmd-out-net'),
      modeWarning: byId('fmd-mode-warning')
    };

    /* The form is inert until JS runs; reveal it and hide the static
       fallback table only once we know we can drive it. */
    root.hidden = false;
    var fallback = byId('fmd-sim-fallback');
    if (fallback) fallback.hidden = true;

    function selectedModeCount() {
      var n = 0;
      for (var i = 0; i < els.modes.length; i++) {
        if (els.modes[i].checked) n++;
      }
      return n;
    }

    function currentCeiling() {
      return els.transit.checked
        ? LEGAL.private.ceilingWithTransit
        : LEGAL.private.ceilingAlone;
    }

    function recompute() {
      var ceiling = currentCeiling();
      var transitCover = els.transit.checked
        ? Math.max(0, toNumber(els.transitAmount.value, 0))
        : 0;

      /* When the FMD is combined with employer-funded transit passes, the
         exemption is assessed on the combined total, so the headroom left for
         the FMD itself is the global ceiling minus what the pass already
         costs. Never let that go negative. */
      var maxFmd = Math.max(0, ceiling - transitCover);

      els.amount.max = String(Math.round(maxFmd));
      var amount = Math.min(toNumber(els.amount.value, 0), maxFmd);
      if (toNumber(els.amount.value, 0) > maxFmd) {
        els.amount.value = String(Math.round(maxFmd));
      }

      var employees = Math.max(0, Math.round(toNumber(els.employees.value, 0)));
      var employerRate = Math.max(0, toNumber(els.employerRate.value, 42)) / 100;
      var employeeRate = LEGAL.defaultEmployeeContributionRate;

      var totalCost = amount * employees;
      /* A taxable bonus of the same net value would carry employer
         contributions on top; the FMD does not. That gap is the saving. */
      var contributionsAvoided = totalCost * employerRate;
      /* For the employee, an exempt euro is a euro; a gross bonus euro is
         worth (1 - employee contributions - income tax). We show the
         contributions part only, and say so in the method note. */
      var employeeGain = amount * employeeRate;

      els.amountOut.textContent = euro.format(amount);
      els.outPerEmployee.textContent = euro.format(amount);
      els.outTotal.textContent = euro.format(totalCost);
      els.outSavings.textContent = euro.format(contributionsAvoided);
      els.outNet.textContent = euro.format(employeeGain);

      els.ceilingNote.textContent = els.transit.checked
        ? 'Plafond global de ' + euro.format(ceiling) +
          ' partagé avec la prise en charge de l’abonnement : ' +
          euro.format(maxFmd) + ' disponibles pour le FMD.'
        : 'Plafond d’exonération : ' + euro.format(ceiling) +
          ' par salarié et par an.';

      els.modeWarning.hidden = selectedModeCount() > 0;
    }

    els.transit.addEventListener('change', function () {
      els.transitRow.hidden = !els.transit.checked;
      recompute();
    });

    ['input', 'change'].forEach(function (evt) {
      root.addEventListener(evt, function (e) {
        if (e.target && e.target.matches('input, select')) recompute();
      });
    });

    els.transitRow.hidden = !els.transit.checked;
    recompute();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
