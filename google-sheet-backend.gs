/**
 * Donia Spa — Réservations vers Google Sheets
 * ===========================================
 * Ce script reçoit les réservations du site et les enregistre
 * dans votre Google Sheet. Il répond aussi aux demandes de
 * disponibilité et au tableau de bord.
 *
 * -----------------------------------------------------
 * MISE EN PLACE
 * -----------------------------------------------------
 * 1. Ouvrez votre Google Sheet : Extensions → Apps Script →
 *    collez ce fichier → Enregistrer (Ctrl+S).
 * 2. Mettez à jour SHEET_ID avec l'ID de votre Google Sheet.
 * 3. Déployer → Nouveau déploiement → Application Web :
 *      - Exécuter en tant que « Moi »
 *      - Qui peut accéder « Toute personne »
 *    → Déployer → copiez l'URL « Web App » (…/exec).
 * 4. Collez cette URL dans Reservation.jsx :
 *      const SCRIPT_URL = 'https://script.google.com/macros/s/.../exec';
 *
 * Tableau de bord : ?action=bookings&key=donia2026
 * Dashboard: ?action=stats&key=donia2026 (stats agrégées)
 * ===========================================
 */

const SHEET_ID = '1mOG3mHQ1TQGlij-11kvgH9MzjZICyUNLjIH75_BbdZc';
const SHEET_NAME = 'Réservations';
const HEADERS = ['Référence', 'Date création', 'Service', 'Durée (min)', 'Prix',
  'Date RDV', 'Heure', 'Nom', 'Téléphone', 'Email', 'Notes', 'Statut'];

const DASH_KEY = 'donia2026';

function getSheet_() {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) sh = ss.insertSheet(SHEET_NAME);
  if (sh.getLastRow() === 0) {
    sh.appendRow(HEADERS);
  } else {
    var firstRow = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
    if (firstRow.length < HEADERS.length) sh.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  }
  sh.getRange('F2:G').setNumberFormat('@');
  return sh;
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    if (data.action === 'cancel') return cancelBooking_(data);

    var sh = getSheet_();

    var existing = sh.getDataRange().getValues();
    for (var i = 1; i < existing.length; i++) {
      if (!existing[i][0]) continue;
      if (String(existing[i][5]) === String(data.date)
          && String(existing[i][6]) === String(data.time)) {
        return json_({ ok: false, error: 'slot_taken', ref: data.ref });
      }
    }

    sh.appendRow([
      data.ref,
      new Date(),
      data.service,
      data.durationMin,
      data.price,
      String(data.date),
      String(data.time),
      data.name,
      data.phone,
      data.email || '',
      data.notes || '',
      'Confirmé'
    ]);

    return json_({ ok: true, ref: data.ref });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function doGet(e) {
  try {
    var action = (e && e.parameter && e.parameter.action) || 'ping';

    if (action === 'avail') {
      var sh = getSheet_();
      var values = sh.getDataRange().getValues();
      var bookings = {};
      for (var i = 1; i < values.length; i++) {
        var row = values[i];
        if (!row[0]) continue;
        if (String(row[11]).trim() === 'Annulé') continue;
        var dateKey = toDateKey_(row[5]);
        var timeStr = toTimeStr_(row[6]);
        if (!dateKey || !timeStr) continue;
        if (!bookings[dateKey]) bookings[dateKey] = [];
        if (bookings[dateKey].indexOf(timeStr) === -1) bookings[dateKey].push(timeStr);
      }
      return json_({ ok: true, bookings: bookings });
    }

    if (action === 'lookup') {
      var phone = phoneKey_(e.parameter.phone || '');
      if (!phone) return json_({ ok: false, error: 'phone_required' });
      var shL = getSheet_();
      var valsL = shL.getDataRange().getValues();
      var found = [];
      for (var l = 1; l < valsL.length; l++) {
        var rL = valsL[l];
        if (!rL[0]) continue;
        if (phoneKey_(rL[8]) !== phone) continue;
        found.push({
          ref: String(rL[0] || ''),
          service: String(rL[2] || ''),
          price: rL[4],
          date: toDateKey_(rL[5]),
          time: toTimeStr_(rL[6]),
          name: String(rL[7] || ''),
          status: String(rL[11]).trim() === 'Annulé' ? 'cancelled' : 'confirmed'
        });
      }
      found.sort(function (a, b) {
        var ka = a.date + ' ' + a.time, kb = b.date + ' ' + b.time;
        return ka < kb ? -1 : ka > kb ? 1 : 0;
      });
      return json_({ ok: true, bookings: found });
    }

    if (action === 'bookings') {
      if ((e.parameter.key || '') !== DASH_KEY) {
        return json_({ ok: false, error: 'unauthorized' });
      }
      var sh2 = getSheet_();
      var values2 = sh2.getDataRange().getValues();
      var rows = [];
      for (var j = 1; j < values2.length; j++) {
        var r = values2[j];
        if (!r[0]) continue;
        rows.push({
          ref: String(r[0] || ''),
          createdAt: r[1] instanceof Date ? Utilities.formatDate(r[1], tz_(), 'yyyy-MM-dd HH:mm') : String(r[1] || ''),
          service: String(r[2] || ''),
          durationMin: String(r[3] || ''),
          price: r[4],
          date: toDateKey_(r[5]),
          time: toTimeStr_(r[6]),
          name: String(r[7] || ''),
          phone: String(r[8] || ''),
          email: String(r[9] || ''),
          notes: String(r[10] || ''),
          status: String(r[11]).trim() === 'Annulé' ? 'cancelled' : 'confirmed'
        });
      }
      return json_({ ok: true, headers: HEADERS, rows: rows });
    }

    return json_({ ok: true, message: 'Donia Spa — endpoint actif.' });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function cancelBooking_(data) {
  var ref = String(data.ref || '').trim();
  var phone = phoneKey_(data.phone || '');
  if (!ref || !phone) return json_({ ok: false, error: 'bad_request' });

  var sh = getSheet_();
  var values = sh.getDataRange().getValues();
  for (var i = 1; i < values.length; i++) {
    var row = values[i];
    if (!row[0]) continue;
    if (String(row[0]).trim() === ref && phoneKey_(row[8]) === phone) {
      if (String(row[11]).trim() === 'Annulé') {
        return json_({ ok: false, error: 'already_cancelled' });
      }
      sh.getRange(i + 1, 12).setValue('Annulé');
      return json_({ ok: true, cancelled: ref });
    }
  }
  return json_({ ok: false, error: 'not_found' });
}

function phoneKey_(v) {
  var s = String(v || '').replace(/[^\d]/g, '');
  if (s.length >= 10 && s.slice(0, 3) === '216') s = s.slice(3);
  return s;
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function toDateKey_(v) {
  if (v instanceof Date) return Utilities.formatDate(v, tz_(), 'yyyy-MM-dd');
  var s = String(v).trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
  var m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (m) {
    var dd = m[1].length === 1 ? '0' + m[1] : m[1];
    var mm = m[2].length === 1 ? '0' + m[2] : m[2];
    return m[3] + '-' + mm + '-' + dd;
  }
  return '';
}

function toTimeStr_(v) {
  if (v instanceof Date) return Utilities.formatDate(v, tz_(), 'HH:mm');
  var s = String(v).trim();
  var m = s.match(/^(\d{1,2}):(\d{2})$/);
  if (m) return (m[1].length === 1 ? '0' + m[1] : m[1]) + ':' + m[2];
  return s;
}

function tz_() {
  try { return Session.getScriptTimeZone(); }
  catch (e) { return 'Africa/Tunis'; }
}
