// ==UserScript==
// @name           ZenDesk for TSEs
// @namespace      holatuwol
// @version        24.4
// @updateURL      https://raw.githubusercontent.com/holatuwol/liferay-faster-deploy/master/userscripts/zendesk.user.js
// @downloadURL    https://raw.githubusercontent.com/holatuwol/liferay-faster-deploy/master/userscripts/zendesk.user.js
// @supportURL     https://github.com/holatuwol/liferay-zendesk-userscript/issues/new
// @include        /https:\/\/liferay-?support[0-9]*.zendesk.com\/.*/
// @include        /https:\/\/24475.apps.zdusercontent.com\/24475\/assets\/.*\/issue_creator.html/
// @include        /https:\/\/help.liferay.com\/hc\/[^\/]*\/articles\/.*/
// @grant          unsafeWindow
// @grant          GM.xmlHttpRequest
// @grant          GM_getValue
// @grant          GM.getValue
// @grant          GM_setValue
// @grant          GM.setValue
// @grant          GM_registerMenuCommand
// @grant          GM.registerMenuCommand
// @require        https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.5/jszip.min.js
// @require        https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js
// @require        https://unpkg.com/stackedit-js@1.0.7/docs/lib/stackedit.min.js
// @require        https://unpkg.com/turndown@5.0.3/dist/turndown.js
// @require        https://raw.githubusercontent.com/sizzlemctwizzle/GM_config/master/gm_config.js
// ==/UserScript==
/**
 * Compiled from TypeScript
 * https://github.com/holatuwol/liferay-zendesk-userscript
 */ 
var styleElement = document.createElement('style');
if (window.location.hostname == '24475.apps.zdusercontent.com') {
    styleElement.textContent = "\nbody {\n  overflow-y: hidden;\n}\n";
}
else {
    styleElement.textContent = "\na.downloading {\n  color: #999;\n}\n\na.downloading::after {\n  content: ' (downloading...)';\n  color: #999;\n}\n\na.generating {\n  color: #999;\n}\n\na.generating::after {\n  content: ' (generating...)';\n  color: #999;\n}\n\narticle {\n  border-top: 1px solid #ebebeb;\n}\n\ndiv.lesa-ui-subtitle {\n  display: flex;\n  flex-direction: column;\n}\n\n.lesa-ui-attachments,\n.lesa-ui-knowledge-capture {\n  display: flex;\n  flex-direction: column;\n  margin-bottom: 0.5em;\n}\n\n#attachments-modal .lesa-ui-attachments,\n#description-modal .lesa-ui-description {\n  margin: 0.5em;\n}\n\n#description-modal .event {\n  border-top: 0px;\n}\n\n.lesa-ui-attachment-info {\n  display: grid;\n  grid-gap: 0em 1em;\n  grid-template-columns: 1em auto;\n  margin: 0.5em;\n}\n\n.lesa-ui-attachment-info input {\n  margin-left: 0.5em;\n}\n\n.lesa-ui-attachment-info .lesa-ui-attachment-extra-info {\n  grid-column: 1 / 2 span;\n  padding: 0.2em 0.5em;\n  text-align: right;\n  margin-bottom: 0.5em;\n}\n\n.lesa-ui-attachment-info .lesa-ui-attachment-extra-info:not(:first-child) {\n  margin-top: 1em;\n  border-top: 1px solid lightgray;\n  padding-top: 0.5em;\n}\n\n.lesa-ui-description .lesa-ui-attachment-info .lesa-ui-attachment-extra-info {\n  border-top: 1px solid #eee;\n}\n\n.lesa-ui-attachment-info a {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.lesa-ui-attachments-bulk-download {\n  margin-top: 0.5em;\n  text-align: right;\n  text-decoration: underline;\n}\n\n.lesa-ui-attachments-label,\n.lesa-ui-knowledge-capture-label {\n  font-weight: 600;\n  margin-right: 1em;\n  white-space: nowrap;\n}\n\n.lesa-ui-knowledge-capture-label:not(:first-child) {\n  margin-top: 1em;\n}\n\n.lesa-ui-knowledge-capture ul {\n  margin-left: 1em;\n}\n\n.lesa-ui-description {\n  font-weight: normal;\n}\n\n.lesa-ui-description > div {\n  margin-bottom: 2em;\n}\n\n.lesa-ui-description .zd-comment,\n.lesa-ui-description .lesa-ui-attachment-info {\n  max-height: 25em;\n  overflow-y: auto;\n}\n\n.lesa-ui-event-highlighted,\narticle.lesa-ui-event-highlighted {\n  background-color: #eee;\n  scroll-margin-top: 1em;\n}\n\n.lesa-ui-form-field {\n  display: flex;\n  flex-direction: column;\n  margin-bottom: 0.5em;\n}\n\n.lesa-ui-permalink {\n  margin-bottom: 1em;\n}\n\n.lesa-ui-orgnotes {\n  color: darkgreen;\n}\n\n.lesa-ui-permalink > input,\n.lesa-ui-form-field.lesa-ui-helpcenter > input {\n  background-color: transparent;\n  border: 0px;\n  font-size: 12px;\n  margin: 0px;\n  padding: 0px;\n  width: 100%;\n}\n\n.lesa-ui-stackedit-icon {\n  height: 16px;\n  width: 16px;\n  padding: 4px;\n}\n\n.mast .editable .lesa-ui-subject {\n  background-color: #fff;\n  font-size: 20px;\n  font-weight: 600;\n  resize: vertical;\n  text-align: left;\n  width: 100%;\n}\n\n.header.mast > .round-avatar {\n  display: none;\n}\n\n.lesa-ui-priority:not(:empty) {\n  margin-top: 6px;\n  margin-bottom: 8px;\n}\n\nspan[data-garden-container-id=\"containers.tooltip\"] {\n  display: inline-flex;\n  align-items: center;\n  column-gap: 4px;\n}\n\n.lesa-ui-heat-score,\n.lesa-ui-priority span {\n  color: #fff;\n  border-radius: 2px;\n  font-size: 10px;\n  font-weight: 600;\n  text-align: center;\n}\n\n.lesa-ui-priority span:not(.lesa-ui-offering) {\n  text-transform: uppercase;\n}\n\n.lesa-ui-heat-score {\n  padding: 0px 4px;\n  line-height: 1.6;\n}\n\n.lesa-ui-priority span {\n  line-height: 16px;\n  margin-right: 8px;\n  padding: 0.5em;\n  width: 6em;\n}\n\n.lesa-ui-priority a {\n  color: #fff;\n  text-decoration: none;\n}\n\n.lesa-ui-priority > *:last-child {\n  margin-right: 0;\n}\n\n.lesa-ui-priority .lesa-ui-subject-emojis a {\n  color: #000;\n}\n\n.lesa-ui-subpriority {\n  border: 1px #eee dashed;\n  font-size: 0.8em;\n}\n\n.lesa-ui-offering {\n  background-color: #222;\n}\n\n.lesa-ui-quickwin {\n  background-color: #037f52;\n}\n\ntr.quickwin {\n  background-color: #eef8f4;\n}\n\n.lesa-ui-priority-minor,\n.lesa-ui-subpriority-none,\n.lesa-ui-subpriority-low {\n  background-color: #0066cc;\n}\n\n.lesa-ui-priority-major,\n.lesa-ui-subpriority-medium {\n  background-color: #f2783b;\n}\n\n.lesa-ui-priority-critical,\n.lesa-ui-subpriority-high {\n  background-color: #bf1e2d;\n}\n\n.lesa-ui-subject-emojis-container {\n  display: flex;\n  flex-direction: row;\n  align-items: flex-end;\n}\n\n\n.lesa-ui-subject-emojis {\n  background-color: #f8f9f9;\n  margin-right: 0.5em;\n  font-size: 1rem;\n}\n\n.lesa-ui-subject-emojis a {\n  font-size: 1.5em;\n  font-weight: normal;\n  margin-left: 2px;\n  margin-right: 2px;\n}\n\n.rich_text .comment_input .lesa-ui-playbook-reminder,\ndiv[data-test-id=\"editor-view\"] .lesa-ui-playbook-reminder {\n  display: none;\n}\n\n.rich_text .comment_input.is-public .lesa-ui-playbook-reminder:not(:empty),\ndiv[data-test-id=\"editor-view\"] .lesa-ui-playbook-reminder:not(:empty) {\n  background-color: #eef2fa;\n  border: 1px solid #d8dcde;\n  border-radius: 0 3px 0 0 !important;\n  color: #2e5aac;\n  display: block;\n  margin-bottom: 1em;\n  padding: 10px;\n}\n\n.rich_text .comment_input.is-public .lesa-ui-playbook-reminder a,\ndiv[data-test-id=\"editor-view\"] .lesa-ui-playbook-reminder a {\n  text-decoration: underline;\n}\n\n#modals .modal-header,\n#attachments-modal .modal-header {\n  cursor: move;\n}\n\n.fNgWaW {\n  padding: 2px 0px;\n  height: 14px;\n  width: 1px;\n  background: rgb(194, 200, 204);\n  display: flex;\n  margin: 0px 8px;\n}\n\nbutton[data-test-id=\"omnilog-jump-button\"] {\n  display: none;\n}\n\n.tags span a {\n  color: rgb(73, 84, 92);\n  font-weight: normal;\n}\n\n.tags span.important-tag a {\n  color: rebeccapurple;\n  font-weight: 600;\n}\n\n.lesa-ui-group-rows-summary {\n  width: fit-content;\n}\n\ntd[data-test-id=\"ticket-table-cells-subject\"] .lesa-ui-tags {\n  display: flex;\n  flex-wrap: wrap;\n}\n\ntd[data-test-id=\"ticket-table-cells-subject\"] .lesa-ui-tags span {\n  background: rgb(233, 235, 237);\n  border-radius: 0.2em;\n  color: rgb(73, 84, 92);\n  font-size: x-small;\n  margin: 0.2em 0.2em;\n  padding-left: 0.3em;\n  padding-right: 0.3em;\n}\n\ntd[data-test-id=\"generic-table-cells-id\"] span.lesa-ui-tags {\n  background: rgb(233, 235, 237);\n  border-radius: 0.2em;\n  color: rgb(73, 84, 92);\n  font-size: x-small;\n  margin: 0.2em 0.2em;\n  padding-left: 0.3em;\n  padding-right: 0.3em;\n}\n\ndiv[data-cy-test-id=\"status-badge-state\"] {\n  width: 4em;\n}\n\ndiv[data-test-id=\"ticket_table_tooltip-header-ticket-info\"] > * > div[data-cy-test-id=\"status-badge-state\"],\ndiv[data-test-id=\"header-tab-tooltip\"] > * > * > div[data-cy-test-id=\"status-badge-state\"],\ndiv[data-cy-test-id=\"submit_button-menu\"] > * > * > div[data-cy-test-id=\"status-badge-state\"] {\n  width: auto;\n}\n\n[type=\"internal\"] {\n  transition: max-height 0.3s ease, padding 0.3s ease;\n  overflow: hidden;\n  max-height: 100%;\n}\n  \n[type=\"internal\"].collapsed {\n  max-height: 0 !important;\n  padding: 0 !important;\n  opacity: 0;\n  pointer-events: none;\n}\n";
}
var head = document.querySelector('head');
head.appendChild(styleElement);
/**
 * Waits until elements appear and then click on them.
 */
function clickReactElement(selector, callback) {
    var element = document.querySelector(selector);
    if (!element) {
        setTimeout(clickReactElement.bind(null, selector, callback), 100);
        return;
    }
    element.click();
    if (callback) {
        callback();
    }
}
/**
 * Generate an anchor tag with the specified text, href, and download attributes.
 * If the download attribute has an extension that looks like it will probably be
 * served inline, use the downloadBlob function instead.
 */
function createAnchorTag(text, href, download) {
    var link = document.createElement('a');
    link.textContent = text;
    if (href) {
        link.href = href;
    }
    if (download) {
        link.download = download;
        var lowerCaseName = download.toLowerCase();
        var isLikelyInline = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp', '.pdf'].some(function (substr) {
            return lowerCaseName.length > substr.length &&
                lowerCaseName.indexOf(substr) == lowerCaseName.length - substr.length;
        });
        if (isLikelyInline) {
            link.onclick = downloadFile.bind(null, href, download);
        }
    }
    else if (href && href.charAt(0) != '#') {
        link.target = '_blank';
    }
    return link;
}
/**
 * Download the specified HREF using the specified file name.
 */
function downloadFile(href, filename, callback) {
    var requestURL = href;
    if (href.indexOf('https://help.liferay.com') == 0) {
        requestURL = href.substring('https://help.liferay.com'.length);
    }
    GM.xmlHttpRequest({
        'method': 'GET',
        'url': requestURL,
        'headers': {
            'Cache-Control': 'no-cache, no-store, max-age=0',
            'Pragma': 'no-cache'
        },
        'responseType': 'blob',
        'onload': function (xhr) {
            if (callback) {
                callback(xhr.response);
            }
            else {
                downloadBlob(filename, xhr.response);
            }
        },
        'onerror': function (xhr) {
            if (callback) {
                callback(xhr.response);
            }
        }
    });
}
/**
 * Download a generated Blob object by generating a dummy link and simulating a click.
 * Avoid doing this too much, because browsers may have security to block this.
 */
function downloadBlob(fileName, blob) {
    var blobURL = createObjectURL(blob);
    var downloadLink = createAnchorTag(fileName, blobURL);
    downloadLink.download = fileName;
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}
/**
 * Retrieve the value for a cookie.
 */
function getCookieValue(name) {
    var nameEquals = name + '=';
    var matchingCookies = document.cookie.split('; ').filter(function (it) { return it.indexOf(nameEquals) == 0; });
    return (matchingCookies.length == 0) ? '' : matchingCookies[0].substring(nameEquals.length);
}
/**
 * Create a link to the JIRA linked issues.
 */
function getJiraSearchLink(text, ticketId) {
    var query = ("\n\"Customer Ticket Permalink\" = \"https://" + document.location.host + document.location.pathname + "\" OR\n\"Zendesk Ticket IDs\" ~ \"" + ticketId + "\" OR\n\"Zendesk Ticket IDs\" ~ \"https://" + document.location.host + document.location.pathname + "\" OR\n\"Customer Ticket\" = \"https://" + document.location.host + document.location.pathname + "\"\n  ").trim();
    var encodedQuery = encodeURIComponent(query);
    var jiraSearchLinkHREF = 'https://liferay.atlassian.net/issues/?jql=' + encodedQuery;
    return createAnchorTag(text, jiraSearchLinkHREF);
}
var accountCodeCache = {};
var organizationCache = {};
var ticketInfoCache = {};
/**
 * Retrieve the account code from the sidebar.
 */
function getAccountCode(ticketId, ticketInfo, propertyBox) {
    if (ticketId && accountCodeCache.hasOwnProperty(ticketId)) {
        return accountCodeCache[ticketId];
    }
    var accountCode = null;
    if (ticketInfo && ticketInfo.organizations && (ticketInfo.organizations.length == 1)) {
        var organizationInfo = ticketInfo.organizations[0];
        var organizationFields = organizationInfo.organization_fields;
        accountCode = organizationFields.account_code;
    }
    else if (propertyBox) {
        var parentElement = propertyBox.parentElement;
        var accountCodeField = parentElement.querySelector('.custom_field_360013377592 .ember-text-field');
        if (accountCodeField) {
            accountCode = accountCodeField.value;
        }
    }
    if (ticketId && accountCode) {
        accountCodeCache[ticketId] = accountCode;
    }
    return accountCode;
}
/**
 * Retrieve information about a ticket, and then call a function
 * once that information is retrieved.
 */
function cacheOrganizations(organizations) {
    for (var i = 0; i < organizations.length; i++) {
        organizationCache[organizations[i].organization_fields.account_code] = organizations[i];
    }
}
/**
 * Retrieve information about a ticket, and then call a function
 * once that information is retrieved.
 */
function checkTicket(ticketId, callback) {
    if (ticketInfoCache.hasOwnProperty(ticketId)) {
        if (ticketInfoCache[ticketId] == 'PENDING') {
            return;
        }
        callback(ticketId, ticketInfoCache[ticketId]);
        return;
    }
    var ticketInfo;
    ticketInfoCache[ticketId] = 'PENDING';
    var joinCallback = function (ticketId, newTicketInfo) {
        if (ticketInfo == null) {
            ticketInfo = newTicketInfo;
        }
        else {
            Object.assign(ticketInfo, newTicketInfo);
        }
        if (Object.keys(ticketInfo).length == 0) {
            delete ticketInfoCache[ticketId];
        }
        else {
            ticketInfoCache[ticketId] = ticketInfo;
        }
    };
    checkTicketMetadata(ticketId, joinCallback);
}
/**
 * Retrieve information about a ticket, and then call a function
 * once that information is retrieved.
 */
function checkTicketMetadata(ticketId, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status != 200) {
            console.error("URL: " + xhr.responseURL);
            console.error("Error: " + xhr.status + " - " + xhr.statusText);
            callback(ticketId, null);
            return;
        }
        var ticketInfo = null;
        try {
            ticketInfo = JSON.parse(xhr.responseText);
        }
        catch (e) {
        }
        checkUser(ticketId, ticketInfo, callback);
    };
    xhr.onerror = function () {
        callback(ticketId, null);
    };
    var ticketDetailsURL = [
        document.location.protocol,
        '//',
        document.location.host,
        '/api/v2/tickets/',
        ticketId,
        '?include=organizations'
    ].join('');
    xhr.open('GET', ticketDetailsURL);
    xhr.setRequestHeader('Cache-Control', 'no-cache, no-store, max-age=0');
    xhr.setRequestHeader('Pragma', 'no-cache');
    xhr.send();
}
/**
 * When the ticket doesn't contain enough information on the organization,
 * fetch the user and the user's organization and invoke the callback.
 */
function checkUser(ticketId, ticketInfo, callback) {
    if (ticketInfo.organizations.length != 0) {
        cacheOrganizations(ticketInfo.organizations);
        callback(ticketId, ticketInfo);
        return;
    }
    var userId = ticketInfo.ticket.requester_id;
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        var userInfo = null;
        try {
            userInfo = JSON.parse(xhr.responseText);
        }
        catch (e) {
        }
        cacheOrganizations(userInfo.organizations);
        ticketInfo.organizations = userInfo.organizations;
        callback(ticketId, ticketInfo);
    };
    xhr.onerror = function () {
        callback(ticketId, null);
    };
    var userDetailsURL = [
        document.location.protocol,
        '//',
        document.location.host,
        '/api/v2/users/',
        userId,
        '?include=organizations'
    ].join('');
    xhr.open('GET', userDetailsURL);
    xhr.setRequestHeader('Cache-Control', 'no-cache, no-store, max-age=0');
    xhr.setRequestHeader('Pragma', 'no-cache');
    xhr.send();
}
/**
 * Audit event information is incomplete unless we specifically
 * request it, so do that here.
 */
function checkEvents(ticketId, ticketInfo, callback, audits, pageId) {
    if (audits === void 0) { audits = []; }
    if (pageId === void 0) { pageId = 1; }
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        var auditInfo = null;
        try {
            auditInfo = JSON.parse(xhr.responseText);
        }
        catch (e) {
        }
        Array.prototype.push.apply(audits, auditInfo.audits);
        if (auditInfo.next_page) {
            checkEvents(ticketId, ticketInfo, callback, audits, pageId + 1);
        }
        else {
            ticketInfo['audits'] = audits;
            callback();
        }
    };
    xhr.onerror = function () {
        callback();
    };
    var auditEventsURL = [
        document.location.protocol,
        '//',
        document.location.host,
        '/api/v2/tickets/',
        ticketId,
        '/audits.json?page=',
        pageId
    ].join('');
    xhr.open('GET', auditEventsURL);
    xhr.setRequestHeader('Cache-Control', 'no-cache, no-store, max-age=0');
    xhr.setRequestHeader('Pragma', 'no-cache');
    xhr.send();
}
/**
 * Comments are hidden behind a "Show More" button, so click it here
 * until we've loaded everything.
 */
function checkComments(conversation, callback) {
    var showMoreButton = document.querySelector('button[data-test-id="convolog-show-more-button"]');
    if (showMoreButton) {
        showMoreButton.click();
        setTimeout(checkComments.bind(null, conversation, callback), 500);
        return;
    }
    if (document.querySelector('[role="progressbar"]')) {
        setTimeout(checkComments.bind(null, conversation, callback), 500);
        return;
    }
    callback();
}
var today = new Date();
var limitedSupportDates = {
    '6.x': new Date('2017-12-01'),
    '7.0': new Date('2020-06-14'),
    '7.1': new Date('2022-11-13'),
    '7.2': new Date('2023-06-03'),
    '7.3': new Date('2024-10-12')
};
var endOfSoftwareLifeDates = {
    '6.x': new Date('2020-12-01'),
    '7.0': new Date('2023-06-14'),
    '7.1': new Date('2025-11-13'),
    '7.2': new Date('2026-06-03'),
    '7.3': new Date('2027-10-12')
};
function addServiceLifeMarker(priorityElement, ticketId, ticketTags, organizationTagSet) {
    var versions = getProductVersions(ticketTags);
    if (versions.length == 0) {
        return;
    }
    var version = versions[0];
    if (!endOfSoftwareLifeDates[version] || !limitedSupportDates[version]) {
        return;
    }
    var limitedSupport = (today > limitedSupportDates[version]);
    var endOfSoftwareLife = (today > endOfSoftwareLifeDates[version]);
    var declinedVersions = [];
    if ((versions.indexOf('7.3') != -1) &&
        (organizationTagSet.has('neg_7_3_eps'))) {
        declinedVersions.push('7.3');
    }
    if ((versions.indexOf('7.2') != -1) &&
        (organizationTagSet.has('neg_7_2_eps'))) {
        declinedVersions.push('7.2');
    }
    if ((versions.indexOf('7.1') != -1) &&
        (organizationTagSet.has('neg_7_1_eps'))) {
        declinedVersions.push('7.1');
    }
    if ((versions.indexOf('7.0') != -1) &&
        (organizationTagSet.has('neg_7_0_eps'))) {
        declinedVersions.push('7.0');
    }
    var extendedPremiumSupport = null;
    if (declinedVersions.length == 0) {
        for (var i = 0; i < ticketTags.length; i++) {
            if ((ticketTags[i].indexOf('eps') != -1)) {
                extendedPremiumSupport = 'Extended Premium Support';
                break;
            }
        }
    }
    else {
        extendedPremiumSupport = 'Declined ' + declinedVersions[0] + ' EPS';
    }
    var serviceLifeLink = null;
    var href = 'https://liferay.atlassian.net/wiki/spaces/SUPPORT/pages/1998783040/EOSL+Guide+For+Support';
    if (extendedPremiumSupport != null) {
        serviceLifeLink = createAnchorTag(extendedPremiumSupport, href);
    }
    else if (endOfSoftwareLife) {
        serviceLifeLink = createAnchorTag('End of Software Life', href);
    }
    else if (limitedSupport) {
        serviceLifeLink = createAnchorTag('Limited Support', href);
    }
    if (serviceLifeLink) {
        var serviceLifeElement = document.createElement('span');
        serviceLifeElement.classList.add('lesa-ui-priority-minor');
        serviceLifeElement.appendChild(serviceLifeLink);
        priorityElement.appendChild(serviceLifeElement);
    }
}
function getCriticalMarkerText(ticketInfo, ticketTagSet) {
    var subpriority = ticketInfo.ticket.priority || 'none';
    if ((subpriority != 'high') && (subpriority != 'urgent')) {
        return null;
    }
    if (ticketTagSet.has('premium')) {
        return 'premium critical';
    }
    var criticalMarkers = ['production', 'production_completely_shutdown', 'production_severely_impacted_inoperable'].filter(Set.prototype.has.bind(ticketTagSet));
    if (criticalMarkers.length >= 2) {
        if (ticketTagSet.has('platinum')) {
            return 'platinum critical';
        }
        return 'critical';
    }
    return subpriority;
}
function addCriticalMarker(priorityElement, ticketInfo, ticketTagSet) {
    var markerText = getCriticalMarkerText(ticketInfo, ticketTagSet);
    if (markerText == null) {
        return;
    }
    var criticalElement = document.createElement('span');
    criticalElement.classList.add('lesa-ui-priority-critical');
    criticalElement.textContent = markerText;
    priorityElement.appendChild(criticalElement);
}
function addOrganizationTagSearchHeader(priorityElement, organizationTagSet, tag, text, cssClass) {
    if ((tag != null) && !organizationTagSet.has(tag)) {
        return;
    }
    var element = document.createElement('span');
    element.classList.add('lesa-ui-' + cssClass);
    if (tag == null) {
        element.appendChild(document.createTextNode(text));
    }
    else {
        var query = 'tags:' + tag;
        var link = document.createElement('a');
        link.textContent = text;
        link.href = 'https://' + document.location.host + '/agent/search/1?type=organization&q=' + encodeURIComponent(query);
        link.setAttribute('title', query);
        element.appendChild(link);
    }
    priorityElement.appendChild(element);
}
function addCustomerTypeMarker(priorityElement, organizationTagSet) {
    addOrganizationTagSearchHeader(priorityElement, organizationTagSet, 'tam_services', 'TAM Services', 'priority-critical');
    if (!organizationTagSet.has('tam_services')) {
        addOrganizationTagSearchHeader(priorityElement, organizationTagSet, 'premium_service', 'Trial TAM Services', 'priority-critical');
    }
    addOrganizationTagSearchHeader(priorityElement, organizationTagSet, 'gs_opportunity', 'GS Opportunity', 'priority-minor');
    addOrganizationTagSearchHeader(priorityElement, organizationTagSet, 'service_solution', 'Service Portal Customer', 'priority-minor');
    addOrganizationTagSearchHeader(priorityElement, organizationTagSet, 'commerce_solution', 'Commerce Portal Customer', 'priority-minor');
}
function addQuickWinMarker(priorityElement, ticketInfo, ticketTagSet) {
    if (!ticketTagSet.has("quick_win")) {
        return;
    }
    var quickwinElement = document.createElement('span');
    quickwinElement.classList.add('lesa-ui-quickwin');
    quickwinElement.textContent = "Quick Win";
    priorityElement.appendChild(quickwinElement);
}
/**
 * Checks whether the assignee text corresponds to the specified support region.
 */
function isSupportRegion(assigneeText, regionText) {
    if (assigneeText.indexOf('- ' + regionText) != -1) {
        return true;
    }
    if (assigneeText.indexOf('/' + regionText + '/') != -1) {
        return true;
    }
    return false;
}
function addOfferingMarker(priorityElement, ticketInfo, ticketTags, organizationTagSet) {
    var offeringText = 'Self-Hosted';
    var offeringTag = null;
    for (var i = 0; i < ticketTags.length; i++) {
        if (ticketTags[i].indexOf('lxc') != -1) {
            offeringText = 'SaaS';
            offeringTag = ticketTags[i];
            break;
        }
    }
    if (offeringText == 'SaaS') {
        for (var i = 0; i < ticketTags.length; i++) {
            if (ticketTags[i] === 'lxc_sm') {
                offeringText = 'PaaS';
                offeringTag = ticketTags[i];
                break;
            }
        }
    }
    addOrganizationTagSearchHeader(priorityElement, organizationTagSet, offeringTag, offeringText, 'offering');
}
var middleEastCountries = new Set([
    'Saudi Arabia', 'United Arab Emirates', 'Qatar', 'Kuwait', 'Bahrein', 'Oman', 'Jordan', 'Iraq', 'Lebanon'
]);
function addRegionMarker(priorityElement, ticketInfo, ticketContainer) {
    if (ticketInfo.organizations.length == 0) {
        return;
    }
    var organizationFields = ticketInfo.organizations[0].organization_fields;
    if (middleEastCountries.has(organizationFields.country)) {
        var customerCountryElement = document.createElement('span');
        customerCountryElement.classList.add('lesa-ui-priority-minor');
        var customerCountryLink = document.createElement('a');
        customerCountryLink.textContent = 'country: middle east';
        var query = Array.from(middleEastCountries).map(function (x) { return 'country:"' + x + '"'; }).join(' ');
        customerCountryLink.href = 'https://' + document.location.host + '/agent/search/1?type=organization&q=' + encodeURIComponent(query);
        customerCountryElement.appendChild(customerCountryLink);
        priorityElement.appendChild(customerCountryElement);
    }
    var assigneeElement = ticketContainer.querySelector('.js-zero-state-ticket-tutorial-assignee-field > div > div');
    if (ticketInfo.ticket.status == 'closed') {
        return;
    }
    var customerRegion = organizationFields.support_region;
    var assigneeText = ((assigneeElement && assigneeElement.textContent) || '').trim();
    var subpriority = ticketInfo.ticket.priority || 'none';
    var customerRegionElement = document.createElement('span');
    customerRegionElement.classList.add('lesa-ui-priority-major');
    var customerRegionLink = document.createElement('a');
    customerRegionLink.textContent = 'customer region: ' + customerRegion;
    var query = 'support_region:' + customerRegion;
    customerRegionLink.setAttribute('title', query);
    customerRegionLink.href = 'https://' + document.location.host + '/agent/search/1?type=organization&q=' + encodeURIComponent(query);
    customerRegionElement.appendChild(customerRegionLink);
    priorityElement.appendChild(customerRegionElement);
}
/**
 * Generates a text string representing the emojis corresponding to the provided list of tags.
 */
var emojiMap = {
    'cas_fire': '⚠️',
    'cas_hot': '⚠️',
    'cas_priority': '⚠️',
    'fire': '🔥'
};
var isEmoji = Set.prototype.has.bind(new Set(Object.keys(emojiMap)));
function getEmojiText(tags) {
    return tags.filter(isEmoji).map(function (x) { return emojiMap[x]; }).join('');
}
/**
 * Generates an emoji for the given tag.
 */
function getEmojiAnchorTag(tag) {
    var anchor = document.createElement('a');
    anchor.title = 'tags:' + tag;
    anchor.textContent = emojiMap[tag];
    anchor.href = 'https://' + document.location.host + '/agent/search/1?q=' + encodeURIComponent('tags:' + tag);
    return anchor;
}
/**
 * Converts a list of tags into a span holding a bunch of
 * emojis with 'title' attributes.
 */
function getEmojiAnchorTags(tags) {
    var matchingTags = tags.filter(isEmoji);
    if (matchingTags.length == 0) {
        return null;
    }
    var emojiContainer = document.createElement('span');
    emojiContainer.classList.add('lesa-ui-subject-emojis');
    var emojis = matchingTags.map(getEmojiAnchorTag);
    for (var i = 0; i < emojis.length; i++) {
        emojiContainer.appendChild(emojis[i]);
    }
    return emojiContainer;
}
/**
 * Add a marker to show the LESA priority on the ticket.
 */
function addPriorityMarker(header, conversation, ticketId, ticketInfo) {
    var ticketContainer = header.closest('.main_panes');
    var priorityElement = header.querySelector('.lesa-ui-priority');
    if (priorityElement) {
        if (priorityElement.getAttribute('data-ticket-id') == ticketId) {
            return;
        }
        var parentElement = priorityElement.parentElement;
        parentElement.removeChild(priorityElement);
    }
    priorityElement = document.createElement('div');
    priorityElement.classList.add('lesa-ui-priority');
    priorityElement.setAttribute('data-ticket-id', ticketId);
    // Check to see if the ticket matches the rules for a regular
    // high priority ticket (production, severely impacted or worse)
    var ticketTags = (ticketInfo && ticketInfo.ticket && ticketInfo.ticket.tags) || [];
    var ticketTagSet = new Set(ticketTags);
    var organizationTagSet = new Set((ticketInfo && ticketInfo.organizations) ? ticketInfo.organizations.map(function (it) { return it.tags || []; }).reduce(function (acc, it) { return acc.concat(it); }, []) : []);
    addOfferingMarker(priorityElement, ticketInfo, ticketTags, organizationTagSet);
    addRegionMarker(priorityElement, ticketInfo, ticketContainer);
    addServiceLifeMarker(priorityElement, ticketId, ticketTags, organizationTagSet);
    addCriticalMarker(priorityElement, ticketInfo, ticketTagSet);
    addCustomerTypeMarker(priorityElement, organizationTagSet);
    addQuickWinMarker(priorityElement, ticketInfo, ticketTagSet);
    var emojiContainer = getEmojiAnchorTags(ticketTags);
    if (emojiContainer != null) {
        var subjectElement = document.querySelector('input[data-test-id="omni-header-subject"]');
        var subjectContainerElement = subjectElement.parentElement;
        subjectContainerElement.insertBefore(emojiContainer, subjectElement);
        subjectContainerElement.classList.add('lesa-ui-subject-emojis-container');
    }
    var viaLabel = conversation.querySelector('div[data-test-id="omni-header-via-label"]');
    var divider = document.createElement('div');
    divider.classList.add('Divider-sc-2k6bz0-9');
    if (priorityElement.childNodes.length > 0) {
        divider.classList.add('fNgWaW');
    }
    viaLabel.before(divider);
    divider.before(priorityElement);
}
/**
 * Generate a single dummy field to add to the sidebar.
 */
function generateFormField(propertyBox, className, labelText, formElements) {
    var oldFormFields = propertyBox.querySelectorAll('.' + className);
    for (var i = 0; i < oldFormFields.length; i++) {
        propertyBox.removeChild(oldFormFields[i]);
    }
    if (formElements.length == 0) {
        return;
    }
    var formField = document.createElement('div');
    formField.classList.add('ember-view');
    formField.classList.add('form_field');
    formField.classList.add('lesa-ui-form-field');
    formField.classList.add(className);
    var label = document.createElement('label');
    label.innerHTML = labelText;
    formField.appendChild(label);
    for (var i = 0; i < formElements.length; i++) {
        formField.appendChild(formElements[i]);
    }
    propertyBox.appendChild(formField);
}
/**
 * Utility method to replace ticket URLs on any nested HTML. The first matching
 * group is the text we use for the link. The function will attempt to decode
 * the text, as if it were a URI component, and fall back to the text itself.
 */
function replaceHelpCenterTicketURLs(element, urlPattern, replacePrefix, target) {
    if (element.nodeType == Node.TEXT_NODE) {
        var matchResult = null;
        var parentNode = element.parentNode;
        var elementText = element.textContent || '';
        while ((matchResult = urlPattern.exec(elementText)) != null) {
            var newText1 = document.createTextNode(elementText.substring(0, matchResult.index));
            var newText2 = document.createTextNode(elementText.substring(matchResult.index + matchResult[0].length));
            var newLink = document.createElement('a');
            newLink.href = matchResult[0];
            var newLinkText = (matchResult.length > 1) ? matchResult[1] : matchResult[0].substring(matchResult[0].lastIndexOf('/') + 1);
            try {
                newLinkText = replacePrefix + decodeURIComponent(newLinkText).replace(/\+/g, ' ');
            }
            catch (e) {
                newLinkText = replacePrefix + newLinkText;
            }
            newLink.textContent = newLinkText;
            if (target) {
                newLink.setAttribute('target', target);
            }
            parentNode.insertBefore(newText1, element);
            parentNode.insertBefore(newLink, element);
            parentNode.insertBefore(newText2, element);
            parentNode.removeChild(element);
            element = newText2;
            elementText = element.textContent || '';
        }
    }
    else {
        for (var i = 0; i < element.childNodes.length; i++) {
            replaceHelpCenterTicketURLs(element.childNodes[i], urlPattern, replacePrefix, target);
        }
    }
}
/**
 * Add the Organization field to the sidebar, which will contain a link to Help Center
 * for the account details and the customer's SLA level.
 */
function addOrganizationField(propertyBox, ticketId, ticketInfo) {
    var accountCode = getAccountCode(ticketId, ticketInfo, propertyBox);
    var tags = (ticketInfo && ticketInfo.ticket && ticketInfo.ticket.tags) || [];
    var tagSet = new Set(tags);
    var helpCenterLinkHREF = null;
    var serviceLevel = [];
    var subOrganizationTag = null;
    if (tagSet.has('t1')) {
        serviceLevel.push('Account Tier 1');
    }
    else if (tagSet.has('t2')) {
        serviceLevel.push('Account Tier 2');
    }
    else if (tagSet.has('t3')) {
        serviceLevel.push('Account Tier 3');
    }
    else if (tagSet.has('t4')) {
        serviceLevel.push('Account Tier 4');
    }
    var organizationInfo = null;
    if (accountCode) {
        organizationInfo = organizationCache[accountCode];
    }
    var notesItems = [];
    if (organizationInfo && organizationInfo.organization_fields.account_key) {
        var provisioningSupportInstructionsLink = createAnchorTag("edit", "https://provisioning.liferay.com/group/guest/~/control_panel/manage?p_p_id=com_liferay_osb_provisioning_web_portlet_AccountsPortlet&p_p_lifecycle=0&p_p_state=maximized&p_p_mode=view&_com_liferay_osb_provisioning_web_portlet_AccountsPortlet_mvcRenderCommandName=%2Faccounts%2Fview_account&_com_liferay_osb_provisioning_web_portlet_AccountsPortlet_tabs1=support&_com_liferay_osb_provisioning_web_portlet_AccountsPortlet_accountKey=" + organizationInfo.organization_fields.account_key);
        notesItems.push(provisioningSupportInstructionsLink);
    }
    if (organizationInfo && organizationInfo.notes) {
        var notesContainer = document.createElement('div');
        notesContainer.textContent = organizationInfo.notes;
        notesContainer.innerHTML = notesContainer.textContent.replace(/\n/g, '<br/>');
        replaceHelpCenterTicketURLs(notesContainer, /https:\/\/liferay-support.zendesk.com\/agent\/tickets\/([0-9]+)\?comment=[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{3}Z/, '#', '_blank');
        replaceHelpCenterTicketURLs(notesContainer, /https:\/\/liferay-support.zendesk.com\/agent\/tickets\/([0-9]+)/, '#');
        replaceHelpCenterTicketURLs(notesContainer, /https:\/\/liferay.atlassian.net\/[^\s\.]*/, '', '_blank');
        replaceHelpCenterTicketURLs(notesContainer, /https:\/\/provisioning.liferay.com\/.*_com_liferay_osb_provisioning_web_portlet_AccountsPortlet_accountSearchKeywords=([^&]+)[^\s\.]*/, '', '_blank');
        notesItems.push(notesContainer);
    }
    generateFormField(propertyBox, 'lesa-ui-orgnotes', 'Notes', notesItems);
    if (organizationInfo) {
        var organizationFields = organizationInfo.organization_fields;
        var sla = organizationFields.sla;
        if (sla) {
            serviceLevel.push(sla.toUpperCase());
        }
        if (organizationInfo.organization_fields.account_key) {
            helpCenterLinkHREF = "https://support.liferay.com/project/#/" +
                organizationInfo.organization_fields.account_key;
        }
        subOrganizationTag = organizationFields.sub_organization;
    }
    var helpCenterItems = [];
    if (accountCode && helpCenterLinkHREF) {
        var helpCenterLinkContainer = document.createElement('div');
        var helpCenterLink = createAnchorTag(accountCode, helpCenterLinkHREF);
        helpCenterLinkContainer.appendChild(helpCenterLink);
        helpCenterItems.push(helpCenterLinkContainer);
    }
    if (serviceLevel.length > 0) {
        var serviceLevelContainer = document.createElement('div');
        serviceLevelContainer.appendChild(document.createTextNode(serviceLevel.join(', ')));
        helpCenterItems.push(serviceLevelContainer);
    }
    var permalinkHREF = 'https://help.liferay.com/hc/requests/' + ticketInfo.ticket.id;
    helpCenterItems.push(createPermaLinkInputField(permalinkHREF));
    generateFormField(propertyBox, 'lesa-ui-helpcenter', 'Help Center', helpCenterItems);
    if (subOrganizationTag) {
        var subOrganizationContainer = document.createElement('div');
        var subOrganizationName = subOrganizationTag.split("_").map(function (word) { return word.charAt(0).toUpperCase() + word.slice(1); }).join(" "); /* replace underscores with spaces and capitalize: spain_pod_a => Spain Pod A */
        subOrganizationContainer.appendChild(document.createTextNode(subOrganizationName));
        generateFormField(propertyBox, 'lesa-ui-suborganization', 'Sub Organization', [subOrganizationContainer]);
    }
    else {
        generateFormField(propertyBox, 'lesa-ui-suborganization', '', []);
    }
}
/**
 * Generate a URL to Patcher Portal's accounts view.
 */
function getPatcherPortalAccountsHREF(path, params) {
    var portletId = '1_WAR_osbpatcherportlet';
    var ns = '_' + portletId + '_';
    var queryString = Object.keys(params).map(function (key) { return (key.indexOf('p_p_') == 0 ? key : (ns + key)) + '=' + encodeURIComponent(params[key]); }).join('&');
    return 'https://patcher.liferay.com/group/guest/patching/-/osb_patcher/accounts' + path + '?p_p_id=' + portletId + '&' + queryString;
}
/**
 * Retrieve the Liferay version from the tags.
 */
function getProductVersions(tags) {
    if (tags == null) {
        return [];
    }
    var candidates = [];
    for (var i = 0; i < tags.length; i++) {
        var tag = tags[i];
        if (tag == 'prd_quarterly_release') {
            candidates.push('Quarterly Release');
        }
        else if (tag.indexOf('prd_liferay_dxp_7_') == 0) {
            candidates.push('7.' + tag.charAt(18));
        }
        else if (tag.indexOf('prd_liferay_portal_') == 0) {
            candidates.push('6.x');
        }
        else if ((tag.indexOf('event_') == 0) || (tag.indexOf('go_live_') == 0) ||
            (tag.indexOf('_days') != -1) || (tag.indexOf('_eps') != -1)) {
            continue;
        }
        else {
            var x = tag.indexOf('7_');
            if (x == 0) {
                candidates.push('7.' + tag.charAt(2));
                continue;
            }
            x = tag.indexOf('_7_');
            if (x != -1) {
                candidates.push('7.' + tag.charAt(x + 3));
                continue;
            }
            if ((tag.indexOf('6_') == 0) || (tag.indexOf('_6_') != -1)) {
                candidates.push('6.x');
                continue;
            }
        }
    }
    if ((candidates.indexOf('7.4') != -1) && (candidates.indexOf('Quarterly Release') == -1)) {
        candidates.push('Quarterly Release');
    }
    candidates.sort().reverse();
    if (candidates.length == 0) {
        candidates.push('Quarterly Release');
    }
    return candidates;
}
/**
 * Convert the Liferay version into the Patcher Portal product version.
 */
function getProductVersionId(version) {
    if (version == 'Quarterly Release') {
        return '249803555';
    }
    if (version == '7.4') {
        return '206111201';
    }
    if (version == '7.3') {
        return '175004848';
    }
    if (version == '7.2') {
        return '130051253';
    }
    if (version == '7.1') {
        return '102311424';
    }
    if (version == '7.0') {
        return '101625504';
    }
    if (version == '6.x') {
        return '101625503';
    }
    return '';
}
/**
 * Add the Patcher Portal field to the sidebar, which will contain two links to
 * the customer's builds in Patcher Portal.
 */
function addPatcherPortalField(propertyBox, ticketId, ticketInfo) {
    var accountCode = getAccountCode(ticketId, ticketInfo, propertyBox);
    var patcherPortalItems = [];
    if (accountCode) {
        var allBuildsLinkHREF = getPatcherPortalAccountsHREF('', {
            'accountEntryCode': accountCode
        });
        patcherPortalItems.push(createAnchorTag('All Builds', allBuildsLinkHREF));
        var versions = getProductVersions(ticketInfo.ticket && ticketInfo.ticket.tags ? ticketInfo.ticket.tags : []);
        for (var i = 0; i < versions.length; i++) {
            var version = versions[i];
            var versionBuildsLinkHREF = getPatcherPortalAccountsHREF('/view', {
                'patcherBuildAccountEntryCode': accountCode,
                'patcherProductVersionId': getProductVersionId(version)
            });
            patcherPortalItems.push(createAnchorTag(version + ' Builds', versionBuildsLinkHREF));
        }
    }
    else if (ticketId) {
        patcherPortalItems.push(document.createTextNode('N/A'));
    }
    generateFormField(propertyBox, 'lesa-ui-patcher', 'Patcher Portal', patcherPortalItems);
}
/**
 * Add the Linked JIRA Issues field to the sidebar, which will contain a link to
 * the relevant JIRA tickets.
 */
function addJIRASearchField(propertyBox, ticketId) {
    var jiraSearchLinkContainer = document.createElement('div');
    var jiraSearchItems = [];
    if (ticketId) {
        jiraSearchLinkContainer.appendChild(getJiraSearchLink('Linked Issues', ticketId));
        jiraSearchItems.push(jiraSearchLinkContainer);
    }
    generateFormField(propertyBox, 'lesa-ui-jirasearch', 'JIRA Search', jiraSearchItems);
}
function hideSidebarSelectOption(parentElement, hiddenMenuItemTexts) {
    var menu = parentElement.querySelector('ul[data-garden-id="dropdowns.menu"]');
    if (menu == null) {
        setTimeout(hideSidebarSelectOption.bind(null, parentElement, hiddenMenuItemTexts), 500);
        return;
    }
    var menuItems = Array.from(menu.querySelectorAll('li'));
    var menuItemCount = menuItems.length;
    for (var i = 0; i < menuItems.length; i++) {
        var menuItemText = (menuItems[i].textContent || '').trim();
        if (hiddenMenuItemTexts.has(menuItemText)) {
            menuItems[i].style.display = 'none';
            --menuItemCount;
        }
    }
    var menuParentElement = menu.parentElement;
    var spacerElement = menuParentElement.querySelector('div');
    spacerElement.style.height = (menuItemCount * 36) + 'px';
}
/**
 * Hide certain select options that we don't want users to select.
 */
function hideSidebarSelectOptions(propertyBox, ticketId, ticketInfo) {
    var workspaceElement = propertyBox.closest('.workspace');
    var longTermResolutionButton = workspaceElement.querySelector('.custom_field_360013378112');
    if (longTermResolutionButton) {
        longTermResolutionButton.onclick = hideSidebarSelectOption.bind(null, longTermResolutionButton, new Set(['Partner Audit']));
    }
}
/**
 * Make tags in the sidebar clickable, so we can easily find tickets
 * with similar tags. Also, highlight certain important tags.
 */
var importantTags = new Set([
    'fcr_eligible'
]);
function checkSidebarTags() {
    var spans = Array.from(document.querySelectorAll('.tags span'));
    for (var i = 0; i < spans.length; i++) {
        var span = spans[i];
        if (span.querySelector('a') || !span.textContent) {
            continue;
        }
        if (importantTags.has(span.textContent)) {
            span.classList.add('important-tag');
        }
        var href = 'https://' + document.location.host + '/agent/search/1?q=' + encodeURIComponent('tags:' + span.textContent);
        span.innerHTML = '<a href="' + href + '" title="tags:' + span.textContent.replace(/"/, '&quot;') + '" target="_blank">' + span.textContent + '</a>';
    }
}
function getPropertyBoxes(ticketId) {
    var propertyBoxes = Array.from(document.querySelectorAll('.property_box:not(.ticket_properties)'));
    var visiblePropertyBoxes = propertyBoxes.filter(function (it) {
        var workspaceElement = it.closest('.workspace');
        return workspaceElement && workspaceElement.style.display != 'none';
    });
    if (ticketId) {
        return visiblePropertyBoxes.filter(function (it) { return it.getAttribute('data-ticket-id') != ticketId; });
    }
    return visiblePropertyBoxes;
}
/**
 * Update the sidebar with any ticket details we can pull from the ZenDesk API.
 */
function updateSidebarBoxContainer(ticketId, ticketInfo) {
    var propertyBoxes = getPropertyBoxes(ticketId);
    if (propertyBoxes.length == 0) {
        return;
    }
    for (var i = 0; i < propertyBoxes.length; i++) {
        addOrganizationField(propertyBoxes[i], ticketId, ticketInfo);
        addJIRASearchField(propertyBoxes[i], ticketId);
        addPatcherPortalField(propertyBoxes[i], ticketId, ticketInfo);
        hideSidebarSelectOptions(propertyBoxes[i], ticketId, ticketInfo);
        propertyBoxes[i].setAttribute('data-ticket-id', ticketId || '');
    }
}
/**
 * Generate a Blob URL, and remember it so that we can unload it if we
 * navigate away from the page.
 */
var blobURLs = [];
function createObjectURL(blob) {
    var blobURL = URL.createObjectURL(blob);
    blobURLs.push(blobURL);
    return blobURL;
}
/**
 * Unload any generated Blob URLs that we remember.
 */
function revokeObjectURLs() {
    for (var i = 0; i < blobURLs.length; i++) {
        URL.revokeObjectURL(blobURLs[i]);
    }
    blobURLs.splice(0, blobURLs.length);
}
/**
 * Download the attachment mentioned in the specified link, and then invoke a callback
 * once the download has completed.
 */
function downloadAttachment(checkbox, callback) {
    var href = checkbox.getAttribute('data-href');
    var download = checkbox.getAttribute('data-download');
    var link = document.querySelector('.lesa-ui-attachment-info a[data-href="' + href + '"]');
    link.classList.add('downloading');
    downloadFile(href, download, function (blob) {
        link.classList.remove('downloading');
        callback(download, blob);
    });
}
/**
 * Generate a single object representing the metadata for the attachment.
 */
function extractAttachmentLinkMetadata(attachmentLink) {
    var comment = attachmentLink.closest('article');
    // Since we're using the query string in order to determine the name (since the actual text
    // in the link has a truncated name), we need to decode the query string.
    var encodedFileName = attachmentLink.href.substring(attachmentLink.href.indexOf('?') + 6);
    encodedFileName = encodedFileName.replace(/\+/g, '%20');
    var attachmentFileName = decodeURIComponent(encodedFileName);
    var authorElement = comment.querySelector('div[data-test-id="omni-log-item-sender"]');
    var timeElement = comment.querySelector('time');
    return {
        element: attachmentLink,
        text: attachmentFileName,
        href: attachmentLink.href,
        download: attachmentFileName,
        commentId: comment.getAttribute('data-comment-id'),
        author: authorElement.textContent,
        time: timeElement.textContent || 'unknown',
        timestamp: timeElement.getAttribute('datetime'),
        missingCorsHeader: false
    };
}
/**
 * Generate a single object representing the metadata for an external link.
 */
function extractExternalLinkMetadata(externalLink) {
    var comment = externalLink.closest('article');
    var authorElement = comment.querySelector('div[data-test-id="omni-log-item-sender"]');
    var timeElement = comment.querySelector('time');
    // Since we're using the query string in order to determine the name (since the actual text
    // in the link has a truncated name), we need to decode the query string.
    return {
        element: externalLink,
        text: externalLink.textContent,
        href: externalLink.href,
        download: externalLink.textContent,
        commentId: comment.getAttribute('data-comment-id'),
        author: authorElement.textContent,
        time: timeElement.textContent || 'unknown',
        timestamp: timeElement.getAttribute('datetime'),
        missingCorsHeader: true
    };
}
function addAttachmentDate(ticketId, conversation, container, attachment, oldDate) {
    var newDate = attachment.time;
    if (oldDate == newDate) {
        return newDate;
    }
    // Attach an author and a timestamp. We'll have the timestamp be a comment permalink, since
    // other parts in this script provide us with that functionality.
    var attachmentExtraInfo = document.createElement('div');
    attachmentExtraInfo.classList.add('lesa-ui-attachment-extra-info');
    attachmentExtraInfo.appendChild(document.createTextNode(attachment.author + ', '));
    var attachmentCommentLink = createAnchorTag(newDate, null);
    attachmentCommentLink.classList.add('attachment-comment-link');
    attachmentCommentLink.onclick = highlightComment.bind(null, conversation, ticketId, attachment.timestamp);
    attachmentExtraInfo.appendChild(attachmentCommentLink);
    container.appendChild(attachmentExtraInfo);
    return newDate;
}
/**
 * Generate a single row in the attachment table based on the provided link.
 */
function addAttachmentRow(container, attachment) {
    var attachmentCheckbox = document.createElement('input');
    attachmentCheckbox.setAttribute('type', 'checkbox');
    attachmentCheckbox.setAttribute('data-text', attachment.text);
    attachmentCheckbox.setAttribute('data-download', attachment.download);
    attachmentCheckbox.setAttribute('data-href', attachment.href);
    if (attachment.missingCorsHeader) {
        attachmentCheckbox.disabled = true;
        attachmentCheckbox.setAttribute('title', 'The domain where this attachment is hosted does not send proper CORS headers, so it is not eligible for bulk download.');
    }
    else {
        attachmentCheckbox.checked = true;
    }
    container.appendChild(attachmentCheckbox);
    var attachmentLink = createAnchorTag(attachment.text, null);
    attachmentLink.setAttribute('data-href', attachment.href);
    attachmentLink.classList.add('attachment');
    attachmentLink.onclick = function (e) {
        attachment.element.click();
    };
    var attachmentWrapper = document.createElement('span');
    attachmentWrapper.appendChild(attachmentLink);
    container.appendChild(attachmentWrapper);
}
/**
 * Generate a zip file containing all attachments for the specified ticket.
 */
function createAttachmentZip(ticketId, ticketInfo) {
    var instance = this;
    var attachmentLinks = Array.from(document.querySelectorAll('div[data-side-conversations-anchor-id="' + ticketId + '"] .lesa-ui-attachment-info input[type="checkbox"]'));
    var attachmentCount = 0;
    for (var i = 0; i < attachmentLinks.length; i++) {
        attachmentLinks[i].disabled = true;
        if (attachmentLinks[i].checked) {
            ++attachmentCount;
        }
    }
    if (attachmentCount == 0) {
        return;
    }
    instance.classList.add('downloading');
    var downloadCount = 0;
    var zip = new JSZip();
    for (var i = 0; i < attachmentLinks.length; i++) {
        if (!attachmentLinks[i].checked) {
            continue;
        }
        downloadAttachment(attachmentLinks[i], function (fileName, blob) {
            if (blob) {
                zip.file(fileName, blob);
            }
            if (++downloadCount < attachmentCount) {
                return;
            }
            instance.classList.remove('downloading');
            instance.classList.add('generating');
            zip.generateAsync({
                type: 'blob'
            }).then(function (blob) {
                var accountCode = getAccountCode(ticketId, ticketInfo) || 'UNKNOWN';
                var zipFileName = accountCode + '.zendesk-' + ticketId + '.zip';
                var downloadLink = createAnchorTag('Download ' + zipFileName, URL.createObjectURL(blob), zipFileName);
                downloadLink.classList.add('.lesa-ui-attachments-download-blob');
                var parentElement = instance.parentElement;
                parentElement.replaceChild(downloadLink, instance);
            });
        });
    }
}
/**
 * Create a container to hold all of the attachments in the ticket, and a convenience
 * link which allows the user to download all of the selected attachments at once.
 */
function createAttachmentsContainer(ticketId, ticketInfo, conversation) {
    var attachmentLinks = Array.from(conversation.querySelectorAll('a.attachment'));
    var attachmentThumbnails = Array.from(conversation.querySelectorAll('a[data-test-id="attachment-thumbnail"]'));
    var externalLinks = Array.from(conversation.querySelectorAll('.zd-comment > a:not(.attachment)'));
    if (attachmentLinks.length + attachmentThumbnails.length + externalLinks.length == 0) {
        return null;
    }
    var attachmentsContainer = document.createElement('div');
    attachmentsContainer.classList.add('lesa-ui-attachments');
    // Accumulate the attachments, and then sort them by date
    var attachments = attachmentLinks.map(extractAttachmentLinkMetadata).
        concat(attachmentThumbnails.map(extractAttachmentLinkMetadata)).
        concat(externalLinks.map(extractExternalLinkMetadata));
    attachments.sort(function (a, b) {
        return a.timestamp > b.timestamp ? -1 : a.timestamp < b.timestamp ? 1 :
            a.text > b.text ? 1 : a.text < b.text ? -1 : 0;
    });
    // Generate the table and a 'bulk download' link for convenience
    var attachmentInfo = document.createElement('div');
    attachmentInfo.classList.add('lesa-ui-attachment-info');
    var oldDate = null;
    for (var i = 0; i < attachments.length; i++) {
        oldDate = addAttachmentDate(ticketId, conversation, attachmentInfo, attachments[i], oldDate);
        addAttachmentRow(attachmentInfo, attachments[i]);
    }
    attachmentsContainer.appendChild(attachmentInfo);
    if (JSZip) {
        var downloadAllContainer = document.createElement('div');
        downloadAllContainer.classList.add('lesa-ui-attachments-bulk-download');
        var attachmentsZipLink = createAnchorTag('Generate Bulk Download', null);
        attachmentsZipLink.onclick = createAttachmentZip.bind(attachmentsZipLink, ticketId, ticketInfo);
        downloadAllContainer.appendChild(attachmentsZipLink);
        attachmentsContainer.appendChild(downloadAllContainer);
    }
    return attachmentsContainer;
}
var CUSTOM_FIELD_CHILD_OF = 360013377052;
var CUSTOM_FIELD_HEAT_SCORE = 360049454932;
var CUSTOM_FIELD_OFFERING = 360006076471;
function getSlaPolicyContainer(conversation) {
    var slaPolicy = conversation.querySelector('div[data-test-id^="sla-policy-"]');
    var slaPolicyContainer = null;
    if (slaPolicy == null) {
        slaPolicy = document.createElement('div');
        slaPolicy.classList.add('sc-hljan3-0', 'iQJOlz', 'StyledTag-sc-1jvbe03-0', 'fSIpth');
        slaPolicy.setAttribute('data-test-id', 'sla-policy-metric');
        slaPolicyContainer = document.createElement('span');
        slaPolicyContainer.setAttribute('data-garden-container-id', 'containers.tooltip');
        var viaLabel = conversation.querySelector('div[data-test-id="omni-header-via-label"]');
        var divider = document.createElement('div');
        divider.classList.add('Divider-sc-2k6bz0-9', 'fNgWaW');
        viaLabel.before(divider);
        divider.before(slaPolicyContainer);
    }
    else {
        slaPolicyContainer = slaPolicy.parentElement;
    }
    return [slaPolicy, slaPolicyContainer];
}
/**
 * Add a heat score.
 */
function addHeatScoreMarker(header, conversation, ticketInfo) {
    var heatScore = getCustomFieldValue(ticketInfo.ticket, CUSTOM_FIELD_HEAT_SCORE);
    if (heatScore == null) {
        return;
    }
    var _a = getSlaPolicyContainer(conversation), slaPolicy = _a[0], slaPolicyContainer = _a[1];
    var heatScoreElement = document.createElement('span');
    heatScoreElement.classList.add('lesa-ui-heat-score', 'lesa-ui-priority-major');
    heatScoreElement.setAttribute('title', 'Heat Score');
    heatScoreElement.textContent = heatScore;
    slaPolicyContainer.insertBefore(heatScoreElement, slaPolicy.nextSibling);
}
/**
 * Add a sort button.
 */
function addSortButton(conversation, header) {
    var button = document.createElement('button');
    button.setAttribute('data-test-id', 'comment-sort');
    var sort = getCookieValue('_lesa-ui-comment-sort') || 'asc';
    button.textContent = sort;
    var conversationLog = conversation.querySelector('div[data-test-id="omni-log-container"]');
    var buttons = header.children[1];
    button.onclick = function () {
        if (conversationLog.style.flexDirection == 'column') {
            conversationLog.style.flexDirection = 'column-reverse';
            button.textContent = 'desc';
            document.cookie = '_lesa-ui-comment-sort=desc';
        }
        else {
            conversationLog.style.flexDirection = 'column';
            button.textContent = 'asc';
            document.cookie = '_lesa-ui-comment-sort=asc';
        }
    };
    buttons.prepend(button);
}
/**
 * Replaces the input field for the 'subject' with something with line wrapping
 * so that we can see the entire subject (untruncated).
 */
function addSubjectTextWrap(header, ticketId, ticketInfo) {
    var oldSubjectField = header.querySelector('input[data-test-id=ticket-pane-subject]');
    if (!oldSubjectField) {
        return;
    }
    oldSubjectField.setAttribute('type', 'hidden');
    var newSubjectField = header.querySelector('.lesa-ui-subject');
    if (newSubjectField) {
        if (newSubjectField.getAttribute('data-ticket-id') == ticketId) {
            return;
        }
        var parentElement = newSubjectField.parentElement;
        parentElement.removeChild(newSubjectField);
    }
    newSubjectField = document.createElement('div');
    var oldClassList = Array.from(oldSubjectField.classList);
    for (var i = 0; i < oldClassList.length; i++) {
        newSubjectField.classList.add(oldClassList[i]);
    }
    newSubjectField.textContent = oldSubjectField.value;
    if (!oldSubjectField.readOnly) {
        newSubjectField.setAttribute('contenteditable', 'true');
        newSubjectField.addEventListener('blur', function () {
            oldSubjectField.value = this.textContent || '';
            var event = document.createEvent('HTMLEvents');
            event.initEvent('blur', false, true);
            oldSubjectField.dispatchEvent(event);
        });
    }
    newSubjectField.classList.add('lesa-ui-subject');
    newSubjectField.setAttribute('data-ticket-id', ticketId);
    var parentElement = oldSubjectField.parentElement;
    parentElement.insertBefore(newSubjectField, oldSubjectField);
}
/**
 * Generate a knowledge capture container.
 */
function createKnowledgeCaptureContainer(ticketId, ticketInfo, conversation) {
    var seenArticles = new Set();
    var fastTrackList = document.createElement('ul');
    if (ticketInfo.audits) {
        var knowledgeCaptureEvents = ticketInfo.audits.map(function (x) {
            return x.events.filter(function (x) {
                return x.type == 'KnowledgeCaptured';
            });
        }).reduce(function (array, x) {
            return array.concat(x);
        }, []);
        fastTrackList = knowledgeCaptureEvents.reduce(function (list, x) {
            var htmlURL = x.body.article.html_url;
            if (seenArticles.has(htmlURL)) {
                return list;
            }
            seenArticles.add(htmlURL);
            var item = document.createElement('li');
            item.appendChild(createAnchorTag(x.body.article.title, htmlURL));
            list.appendChild(item);
            return list;
        }, fastTrackList);
    }
    var otherArticleList = document.createElement('ul');
    Array.from(conversation.querySelectorAll('a[href*="/hc/"]')).reduce(function (list, x) {
        var htmlURL = x.href;
        if (seenArticles.has(htmlURL)) {
            return list;
        }
        seenArticles.add(htmlURL);
        var item = document.createElement('li');
        if (x.textContent != x.getAttribute('href')) {
            item.appendChild(document.createTextNode(x.textContent + ' - '));
        }
        var link = x.cloneNode(true);
        link.textContent = htmlURL;
        item.appendChild(link);
        list.appendChild(item);
        return list;
    }, otherArticleList);
    if ((otherArticleList.childNodes.length == 0) && (fastTrackList.childNodes.length == 0)) {
        return null;
    }
    var knowledgeCaptureContainer = document.createElement('div');
    knowledgeCaptureContainer.classList.add('lesa-ui-knowledge-capture');
    var fastTrackLabel = document.createElement('div');
    fastTrackLabel.classList.add('lesa-ui-knowledge-capture-label');
    fastTrackLabel.innerHTML = (fastTrackList.childNodes.length == 1) ? 'Fast Track Article:' : 'Fast Track Articles:';
    knowledgeCaptureContainer.appendChild(fastTrackLabel);
    if (fastTrackList.childNodes.length == 0) {
        var item = document.createElement('li');
        item.textContent = 'No matching articles.';
        fastTrackList.appendChild(item);
    }
    knowledgeCaptureContainer.appendChild(fastTrackList);
    if (otherArticleList.childNodes.length > 0) {
        var otherArticleLabel = document.createElement('div');
        otherArticleLabel.classList.add('lesa-ui-knowledge-capture-label');
        otherArticleLabel.innerHTML = (otherArticleList.childNodes.length == 1) ? 'Other Linked Article:' : 'Other Linked Articles:';
        knowledgeCaptureContainer.appendChild(otherArticleLabel);
        knowledgeCaptureContainer.appendChild(otherArticleList);
    }
    return knowledgeCaptureContainer;
}
/**
 * Sometimes CSEs post a dummy comment, which basically says "see comment above this one"
 * in order to preserve formatting when creating child tickets.
 */
function isDummyComment(ticketInfo, comment) {
    var childOf = getCustomFieldValue(ticketInfo.ticket, CUSTOM_FIELD_CHILD_OF);
    if (childOf == null || childOf.indexOf('child_of:') == -1) {
        return false;
    }
    var innerHTML = comment.innerHTML;
    if (innerHTML != comment.textContent) {
        return false;
    }
    if ((innerHTML.indexOf('(to maintain formatting)') != -1) ||
        (innerHTML.indexOf('(to retain formatting)') != -1) ||
        (innerHTML.indexOf('formatted comment'))) {
        return true;
    }
    return false;
}
/**
 * Returns the custom field value
 */
function getCustomFieldValue(ticketInfo, fieldId) {
    var matchingFields = ticketInfo.custom_fields.filter(function (it) { return it.id == fieldId; });
    return matchingFields.length == 0 ? null : matchingFields[0].value;
}
/**
 * Add collapse internal info
 */
function addCollapseInternalInfo(header) {
    var collapseInternalInfoElement = document.createElement('button');
    collapseInternalInfoElement.setAttribute('data-test-id', 'collapse-internal-comments');
    collapseInternalInfoElement.classList.add('lesa-ui-collapseInternalInfoElement');
    collapseInternalInfoElement.classList.add('eUFUgT');
    collapseInternalInfoElement.classList.add('iQoDao');
    collapseInternalInfoElement.classList.add('lnpbol');
    collapseInternalInfoElement.textContent = "";
    var imgCollapse = document.createElement('img');
    imgCollapse.setAttribute('src', 'https://www.tiny.cloud/docs/tinymce/latest/_images/icons/flip-vertically.svg');
    imgCollapse.setAttribute('alt', 'Collapse internal Info');
    collapseInternalInfoElement.prepend(imgCollapse);
    var buttons = header.children[1];
    var isCollapsed = getCookieCustom('_lesa-ui-collapse-info') || GM_config.get('DISPLAY_INTERNAL_COMMENTS_COLLAPSED_ON_LIST');
    var collapsedBool = (isCollapsed === true || isCollapsed === 'true');
    var targets = document.querySelectorAll('[type="internal"]');
    collapseInternalInfoElement.addEventListener("click", function () {
        collapsedBool = !collapsedBool;
        setCookieCustom('_lesa-ui-collapse-info', String(collapsedBool));
        targets.forEach(function (el) {
            el.classList.toggle('collapsed', collapsedBool);
        });
    });
    targets.forEach(function (el) {
        el.classList.toggle('collapsed', collapsedBool);
    });
    buttons.prepend(collapseInternalInfoElement);
}
function getCookieCustom(name) {
    var cookieArr = document.cookie.split("; ");
    for (var _i = 0, cookieArr_1 = cookieArr; _i < cookieArr_1.length; _i++) {
        var cookie = cookieArr_1[_i];
        var _a = cookie.split("="), key = _a[0], value = _a[1];
        if (key === name) {
            return decodeURIComponent(value);
        }
    }
    return null;
}
function setCookieCustom(name, value) {
    var years = 10;
    var expires = new Date(Date.now() + years * 365 * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = name + "=" + encodeURIComponent(value) + "; expires=" + expires + "; path=/";
}
/**
 * Add a ticket description and a complete list of attachments to the top of the page.
 */
function addTicketDescription(ticketId, ticketInfo, conversation) {
    var header = conversation.childNodes[0];
    if (!header) {
        return;
    }
    // Check to see if we have any descriptions that we need to remove.
    var oldLinks = conversation.querySelectorAll('.lesa-ui-modal-header-link');
    if (oldLinks.length > 0) {
        return;
    }
    // Add a marker indicating the LESA priority based on critical workflow rules
    addHeatScoreMarker(header, conversation, ticketInfo);
    addPriorityMarker(header, conversation, ticketId, ticketInfo);
    addSubjectTextWrap(header, ticketId, ticketInfo);
    // Generate something to hold all of our attachments.
    addHeaderLinkModal('description-modal', 'Description', header, conversation, checkComments.bind(null, conversation), createDescriptionContainer.bind(null, ticketId, ticketInfo, conversation));
    addHeaderLinkModal('description-modal', 'Fast Track', header, conversation, checkEvents.bind(null, ticketId, ticketInfo), createKnowledgeCaptureContainer.bind(null, ticketId, ticketInfo, conversation));
    addHeaderLinkModal('attachments-modal', 'Attachments', header, conversation, checkComments.bind(null, conversation), createAttachmentsContainer.bind(null, ticketId, ticketInfo, conversation));
    addSortButton(conversation, header);
    addCollapseInternalInfo(header);
}
function createDescriptionContainer(ticketId, ticketInfo, conversation) {
    var comments = conversation.querySelectorAll('article');
    if (comments.length == 0) {
        return null;
    }
    var descriptionContainer = document.createElement('div');
    descriptionContainer.classList.add('is-public');
    var tags = (ticketInfo && ticketInfo.ticket && ticketInfo.ticket.tags) || [];
    var tagSet = new Set(tags);
    if (tagSet.has('partner_first_line_support')) {
        var flsContainer = document.createElement('div');
        flsContainer.classList.add('event');
        var flsReminder = document.createElement('div');
        flsReminder.classList.add('comment');
        flsReminder.appendChild(document.createTextNode('REMINDER: '));
        flsReminder.appendChild(document.createTextNode('Additional description, error logs, etc. collected by the partner are available in '));
        flsReminder.appendChild(getJiraSearchLink('the linked FLS ticket', ticketId));
        flsReminder.appendChild(document.createTextNode('.'));
        flsContainer.appendChild(flsReminder);
        descriptionContainer.appendChild(flsContainer);
    }
    var firstComment = comments[0];
    if (isDummyComment(ticketInfo, firstComment)) {
        firstComment = comments[1];
    }
    var description = document.createElement('div');
    description.classList.add('comment');
    description.classList.add('zd-comment');
    description.innerHTML = firstComment.innerHTML;
    descriptionContainer.appendChild(description);
    return descriptionContainer;
}
/**
 * Adds a button which loads a window which allows you to compose a
 * post with Markdown.
 */
function addReplyStackeditButton(element) {
    var parentElement = element.parentElement;
    var grandparentElement = parentElement.parentElement;
    var list = grandparentElement.querySelector('.zendesk-editor--toolbar ul');
    if (list.querySelector('.lesa-ui-stackedit-icon')) {
        return;
    }
    var img = document.createElement('img');
    img.title = 'Compose with Stackedit';
    img.classList.add('lesa-ui-stackedit-icon');
    img.src = 'https://benweet.github.io/stackedit.js/icon.svg';
    var listItem = document.createElement('li');
    listItem.appendChild(img);
    listItem.onclick = composeWithStackedit.bind(null, element);
    list.appendChild(listItem);
}
/**
 * Adds an underline button to the regular formatter.
 */
function addReplyUnderlineButton(element) {
    var parentElement = element.parentElement;
    var grandparentElement = parentElement.parentElement;
    var formattingButtons = grandparentElement.querySelector('.zendesk-editor--text-commands .zendesk-editor--group');
    if (formattingButtons.querySelector('.underline')) {
        return;
    }
    var underlineSVGPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    underlineSVGPath.setAttribute('fill', 'currentColor');
    underlineSVGPath.setAttribute('d', 'M11 7.5c0 2.5-1.4 3.8-3.9 3.8-2.6 0-4.1-1.2-4.1-3.8V1.2h1.3v6.3c0 1.8 1 2.7 2.7 2.7 1.7 0 2.6-.9 2.6-2.7V1.2H11v6.3zm-9 5.3v-.7h10v.7H2z');
    var underlineButtonIconContainer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    underlineButtonIconContainer.setAttribute('viewBox', '0 0 14 14');
    underlineButtonIconContainer.appendChild(underlineSVGPath);
    var underlineButton = document.createElement('button');
    underlineButton.setAttribute('type', 'button');
    underlineButton.classList.add('zendesk-editor--item', 'underline');
    underlineButton.setAttribute('data-command-name', 'underline');
    underlineButton.setAttribute('aria-label', 'Underline');
    underlineButton.setAttribute('data-editor-tooltip', 'Underline (ctrl u)');
    underlineButton.setAttribute('aria-pressed', 'false');
    underlineButton.setAttribute('aria-disabled', 'false');
    underlineButton.appendChild(underlineButtonIconContainer);
    var underlineButtonText = document.createElement('span');
    underlineButtonText.textContent = ('Underline');
    underlineButtonText.classList.add('zendesk-editor--accessible-hidden-text');
    underlineButton.appendChild(underlineButtonText);
    underlineButton.addEventListener('click', function (e) {
        document.execCommand('underline', false, undefined);
    });
    underlineButton.onmousedown = function (e) {
        e.stopPropagation();
        return false;
    };
    var underlineButtonListItem = document.createElement('li');
    underlineButtonListItem.appendChild(underlineButton);
    formattingButtons.appendChild(underlineButtonListItem);
}
/**
 * Add buttons which load windows that allow you to compose a post
 * with Markdown.
 */
function addReplyFormattingButtons(ticketId, ticketInfo, conversation) {
    if (conversation.classList.contains('lesa-ui-stackedit')) {
        return;
    }
    conversation.classList.add('lesa-ui-stackedit');
    var legacyComments = Array.from(conversation.querySelectorAll('.zendesk-editor--rich-text-container .zendesk-editor--rich-text-comment'));
    for (var i = 0; i < legacyComments.length; i++) {
        addReplyUnderlineButton(legacyComments[i]);
        addReplyStackeditButton(legacyComments[i]);
    }
    var workspaceComments = Array.from(conversation.querySelectorAll('div[data-test-id="editor-view"]'));
    for (var i = 0; i < workspaceComments.length; i++) {
        shrinkReplyEditor(conversation, workspaceComments[i]);
    }
}
/**
 * Allows you to compose a post with Markdown, even if we are still
 * configured to use Zendesk's WYSIWYG editor.
 */
var paragraphTag = /<(\/)?p>/g;
var turndownService = new TurndownService({
    codeBlockStyle: 'fenced'
});
function composeWithStackedit(element, callback) {
    var stackedit = new Stackedit();
    var preElements = Array.from(element.querySelectorAll('pre'));
    for (var i = 0; i < preElements.length; i++) {
        preElements[i].setAttribute('style', '');
        preElements[i].innerHTML = preElements[i].innerHTML.replace(paragraphTag, '<$1code>');
    }
    stackedit.openFile({
        content: {
            text: turndownService.turndown(element.innerHTML)
        }
    });
    stackedit.on('fileChange', function (file) {
        element.innerHTML = file.content.html;
        if (callback) {
            callback(element);
        }
    });
}
/**
 * Add a playbook reminder to the given editor.
 */
var reminderLinks = {
    'platinum critical': '<a href="https://liferay.atlassian.net/wiki/spaces/SUPPORT/pages/2093908830/How+To+Handle+Critical+Tickets" target="_blank">playbook</a>',
    'premium critical': '<a href="https://liferay.atlassian.net/wiki/spaces/LXC/pages/2156265703/LXC+Global+Critical+Ticket+Workflow" target="_blank">workflow</a>'
};
function addPlaybookReminder(ticketId, ticketInfo, conversation) {
    var editor = conversation.querySelector('div[data-test-id="omnicomposer-rich-text-ckeditor"]');
    if (!editor) {
        return;
    }
    var parentElement = editor.parentElement;
    var playbookReminderElement = parentElement.querySelector('.lesa-ui-playbook-reminder');
    if (playbookReminderElement) {
        if (ticketId == playbookReminderElement.getAttribute('data-ticket-id')) {
            return;
        }
    }
    else {
        playbookReminderElement = document.createElement('div');
        playbookReminderElement.setAttribute('data-ticket-id', ticketId);
        playbookReminderElement.classList.add('lesa-ui-playbook-reminder');
    }
    var reminders = [];
    var tags = (ticketInfo && ticketInfo.ticket && ticketInfo.ticket.tags) || [];
    var tagSet = new Set(tags);
    var markerText = getCriticalMarkerText(ticketInfo, tagSet);
    if ((markerText != null) && (markerText in reminderLinks)) {
        reminders.push([markerText, reminderLinks[markerText]]);
    }
    playbookReminderElement.innerHTML = reminders.map(function (x) { return 'This is a <strong>' + x[0] + '</strong> ticket. Please remember to follow the ' + x[1] + '!'; }).join('<br/>');
    parentElement.insertBefore(playbookReminderElement, editor);
}
/**
 * Shrinks the reply editor.
 */
function shrinkReplyEditor(conversation, element) {
    var interval = setInterval(function () {
        if (!element.style.flexBasis) {
            return;
        }
        var editor = element.querySelector('div[data-test-id="ticket-rich-text-editor"]');
        if (!editor) {
            return;
        }
        if (!editor.textContent) {
            element.style.flexBasis = '10%';
        }
        clearInterval(interval);
    }, 1000);
}
;
/**
 * Removes the highlight class from all comments.
 */
function clearHighlightedComments() {
    var highlightedComments = document.querySelectorAll('.lesa-ui-event-highlighted');
    for (var i = 0; i < highlightedComments.length; i++) {
        highlightedComments[i].classList.remove('lesa-ui-event-highlighted');
    }
}
/**
 * Scroll to a specific comment if its comment ID is included in a
 * query string parameter.
 */
function highlightComment(conversation, ticketId, commentId, force) {
    if (!force && !commentId && !document.location.search) {
        var logContainer = conversation.querySelector('div[data-test-id="omni-log-container"]');
        if (logContainer && logContainer.getAttribute('data-sort-ticket-id') != ticketId) {
            var sortedComments = document.querySelectorAll('div[data-sort-ticket-id]');
            for (var i = 0; i < sortedComments.length; i++) {
                sortedComments[i].removeAttribute('data-sort-ticket-id');
            }
            var sort = getCookieValue('_lesa-ui-comment-sort') || 'asc';
            logContainer.style.flexDirection = (sort == 'asc') ? 'column' : 'column-reverse';
            var event = conversation.querySelector('div[id^="convo_log_sentinel_"]');
            event.scrollIntoView();
            logContainer.setAttribute('data-sort-ticket-id', ticketId);
        }
        clearHighlightedComments();
        return;
    }
    if (!commentId && document.location.search && document.location.search.indexOf('?comment=') == 0) {
        commentId = document.location.search.substring('?comment='.length);
        var pos = commentId.indexOf('&');
        if (pos != -1) {
            commentId = commentId.substring(0, pos);
        }
    }
    if (!commentId || (commentId.indexOf('"') != -1)) {
        return;
    }
    var comment = document.querySelector('time[datetime="' + commentId + '"], div[data-comment-id="' + commentId + '"]');
    if (!comment) {
        var showMoreButton = document.querySelector('button[data-test-id="convolog-show-more-button"]');
        if (showMoreButton) {
            showMoreButton.click();
        }
        return;
    }
    var event = comment.closest('article');
    if (!force && event.classList.contains('lesa-ui-event-highlighted')) {
        return;
    }
    var commentURL = 'https://' + document.location.host + document.location.pathname + '?comment=' + commentId;
    history.pushState({ path: commentURL }, '', commentURL);
    clearHighlightedComments();
    event.classList.add('lesa-ui-event-highlighted');
    if (force) {
        event.scrollIntoView();
    }
    else {
        setTimeout(function () {
            event.scrollIntoView();
        }, 1000);
    }
}
/**
 * Creates a self-highlighting input field.
 */
function createPermaLinkInputField(permalinkHREF) {
    var permalink = document.createElement('input');
    permalink.value = permalinkHREF;
    permalink.onclick = function () {
        permalink.setSelectionRange(0, permalink.value.length);
    };
    return permalink;
}
/**
 * Add the comment ID as a query string parameter to function as a
 * pseudo permalink (since this script scrolls to it).
 */
function addPermaLinks(ticketId, ticketInfo, conversation) {
    var comments = conversation.querySelectorAll('article');
    for (var i = 0; i < comments.length; i++) {
        var timeElement = comments[i].querySelector('time');
        if (!timeElement) {
            continue;
        }
        var itemSender = comments[i].querySelector('div[data-test-id="omni-log-item-sender"]');
        if (!itemSender) {
            continue;
        }
        var commentHeader = itemSender.parentElement;
        var parentElement = commentHeader.parentElement;
        if (parentElement.querySelector('.lesa-ui-permalink')) {
            continue;
        }
        var commentId = timeElement.getAttribute('datetime');
        var permalinkContainer = document.createElement('div');
        permalinkContainer.classList.add('lesa-ui-permalink');
        var permalinkHREF = 'https://' + document.location.host + document.location.pathname + '?comment=' + commentId;
        var permalink = createPermaLinkInputField(permalinkHREF);
        permalinkContainer.appendChild(permalink);
        commentHeader.after(permalinkContainer);
    }
}
/**
 * Attempt to bypass the single page application framework used by
 * ZenDesk and force a page reload.
 */
function skipSinglePageApplication(href) {
    document.location.href = href;
    return false;
}
/**
 * If it's a regular ZenDesk link, fix it by making the anchor's onclick
 * event scroll to the comment (if applicable).
 */
function fixZenDeskLink(conversation, anchor, ticketId) {
    var href = anchor.href;
    var x = href.indexOf('/tickets/');
    if (x == -1) {
        return;
    }
    var y = href.indexOf('?comment=');
    if (y == -1) {
        return;
    }
    anchor.removeAttribute('href');
    if (href.substring(x + '?comment='.length, y) == ticketId) {
        var commentId = href.substring(y + '?comment='.length);
        anchor.onclick = highlightComment.bind(null, conversation, ticketId, commentId, true);
    }
    else {
        var commentURL = 'https://' + document.location.host + '/agent' + href.substring(x);
        anchor.onclick = skipSinglePageApplication.bind(null, commentURL);
    }
}
/**
 * If it's a Liferay HelpCenter link, fix it by massaging it so that it
 * behaves like we want a ZenDesk link to behave.
 */
function fixHelpCenterLink(conversation, anchor, ticketId) {
    var href = anchor.href;
    var x = href.indexOf('https://help.liferay.com/hc/');
    if (x != 0) {
        return;
    }
    var y = href.indexOf('/requests/');
    if (y == -1) {
        return;
    }
    var z = href.indexOf('?comment=');
    var commentId = null;
    if (z != -1) {
        commentId = href.substring(z + '?comment='.length);
    }
    else {
        z = href.indexOf('#request_comment_');
        if (z != -1) {
            commentId = href.substring(z + '#request_comment_'.length);
        }
    }
    if (!commentId) {
        return;
    }
    var commentURL = 'https://' + document.location.host + '/agent/tickets/' + ticketId + '?commentId=' + commentId;
    anchor.removeAttribute('href');
    var linkTicketId = href.substring(y + '/requests/'.length, Math.min(href.indexOf('?'), z));
    if (linkTicketId == ticketId) {
        anchor.onclick = highlightComment.bind(null, conversation, ticketId, commentId, true);
    }
    else {
        anchor.onclick = skipSinglePageApplication.bind(null, commentURL);
    }
}
/**
 * Detect any existing permalinks on the page, and make them open in
 * a new tab (if they are an existing ticket) or auto-scroll.
 */
function fixPermaLinkAnchors(ticketId, ticketInfo, conversation) {
    var selectors = [
        'a[href^="https://help.liferay.com/hc/"]',
        'a[href*="/tickets/' + ticketId + '?comment="]'
    ];
    var anchors = conversation.querySelectorAll(selectors.join(','));
    for (var i = 0; i < anchors.length; i++) {
        var anchor = anchors[i];
        fixZenDeskLink(conversation, anchor, ticketId);
        fixHelpCenterLink(conversation, anchor, ticketId);
    }
}
function initializeModal(conversation, contentWrapper, callback) {
    var content = callback();
    var loadingElement = contentWrapper.querySelector('.loading');
    if (content == null) {
        content = document.createElement('div');
        content.appendChild(document.createTextNode('No data found.'));
    }
    content.classList.add('app_view', 'apps_modal');
    if (loadingElement) {
        loadingElement.remove();
    }
    contentWrapper.appendChild(content);
}
function createModal(modalId, linkText, header, conversation, dataCallback, elementCallback) {
    var modal = document.createElement('div');
    modal.setAttribute('id', modalId);
    modal.classList.add('modal', 'modal-resizable', 'in');
    var iframe = document.createElement('div');
    iframe.classList.add('iframe_app_view_wrapper');
    var modalHeader = document.createElement('header');
    modalHeader.classList.add('modal-header');
    var closeLink = document.createElement('a');
    closeLink.classList.add('close');
    closeLink.textContent = '\u00d7';
    closeLink.onclick = function () {
        modal.remove();
    };
    modalHeader.appendChild(closeLink);
    var headerText = document.createElement('h3');
    headerText.textContent = linkText;
    modalHeader.appendChild(headerText);
    iframe.appendChild(modalHeader);
    modal.appendChild(iframe);
    header.after(modal);
    var contentWrapper = document.createElement('div');
    contentWrapper.classList.add('modal-body', 'app_view_wrapper');
    var loadingElement = document.createElement('div');
    loadingElement.classList.add('loading');
    loadingElement.innerHTML = 'Loading data...';
    contentWrapper.appendChild(loadingElement);
    iframe.appendChild(contentWrapper);
    dataCallback(initializeModal.bind(null, conversation, contentWrapper, elementCallback));
}
function addHeaderLinkModal(modalId, linkText, header, conversation, dataCallback, elementCallback) {
    var openLink = document.createElement('a');
    openLink.textContent = linkText;
    openLink.onclick = createModal.bind(null, modalId, linkText, header, conversation, dataCallback, elementCallback);
    var viaLabel = conversation.querySelector('div[data-test-id="omni-header-via-label"]');
    var divider = document.createElement('div');
    divider.classList.add('Divider-sc-2k6bz0-9', 'fNgWaW', 'lesa-ui-modal-header-link');
    viaLabel.before(divider);
    divider.before(openLink);
}
function makeDraggableModals() {
    var headers = document.querySelectorAll(".modal-header");
    for (var i = 0; i < headers.length; i++) {
        var header = headers[i];
        var element = header.closest('.modal');
        if (element.getAttribute('draggable')) {
            continue;
        }
        makeDraggableModal(header, element);
    }
}
function moveModal(element, dragEvent, dropEvent) {
    var rect = element.getBoundingClientRect();
    var elementX = rect.left + (unsafeWindow.pageXOffset || document.documentElement.scrollLeft);
    var elementY = rect.top + (unsafeWindow.pageYOffset || document.documentElement.scrollTop);
    element.style.transform = 'translate(0px, 0px)';
    element.style.left = (dropEvent.clientX - dragEvent.clientX + elementX) + 'px';
    element.style.top = (dropEvent.clientY - dragEvent.clientY + elementY) + 'px';
}
function makeDraggableModal(header, element) {
    element.setAttribute('draggable', 'true');
    var dragEvent = null;
    element.addEventListener('dragstart', function (e) {
        dragEvent = e;
    });
    element.addEventListener('dragend', function (e) {
        moveModal(element, dragEvent, e);
    });
}
/**
 * Workaround for interacting with input fields built by react.js
 * https://github.com/facebook/react/issues/10135#issuecomment-314441175
 */
function setReactInputValue(selector, value, callback) {
    var element = document.querySelector(selector);
    if (!element) {
        setTimeout(setReactInputValue.bind(null, selector, value, callback), 100);
        return;
    }
    // Format dates like React datepickers expect.
    if (value instanceof Date) {
        var options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        var userLocale = navigator.language;
        value = new Intl.DateTimeFormat(userLocale, options).format(value);
    }
    // Make sure to call the right setter function so the underlying state is updated.
    var elementDescriptor = Object.getOwnPropertyDescriptor(element, 'value');
    var valueSetter = elementDescriptor && elementDescriptor.set;
    var prototype = Object.getPrototypeOf(element);
    var prototypeDescriptor = Object.getOwnPropertyDescriptor(prototype, 'value');
    var prototypeValueSetter = null;
    if (prototypeDescriptor) {
        var valueDescriptor = Object.getOwnPropertyDescriptor(prototype, 'value');
        prototypeValueSetter = valueDescriptor.set;
    }
    if (prototypeValueSetter) {
        prototypeValueSetter.call(element, value);
    }
    else if (valueSetter) {
        valueSetter.call(element, value);
    }
    element.dispatchEvent(new Event('input', { bubbles: true }));
    if (callback) {
        callback();
    }
}
/**
 * Utility method to simulate clicking on a drop-down select, entering
 * text into a search field, waiting for the results to populate, and
 * then selecting everything that matches.
 */
function setReactSearchSelectValue(testId, value, callback) {
    function requestPopup(callback) {
        var buttonField = document.querySelector('div[data-test-id=' + testId + ']');
        if (!buttonField) {
            setTimeout(requestPopup.bind(null, callback), 100);
            return;
        }
        if (!buttonField.querySelector('div[aria-haspopup=true]')) {
            var button = buttonField.querySelector('div[role=button]');
            button.click();
        }
        if (callback) {
            callback();
        }
    }
    function waitForPopup(callback) {
        var searchMenu = document.querySelector('div[data-test-id=' + testId + '-list]');
        if (!searchMenu) {
            setTimeout(waitForPopup.bind(null, callback), 100);
            return;
        }
        var options = Array.from(searchMenu.querySelectorAll('div[class*="optionText"]'));
        if (options.length == 0) {
            setTimeout(waitForPopup.bind(null, callback), 100);
            return;
        }
        if (callback) {
            callback();
        }
    }
    function setPopupValue(callback) {
        function clickSearchMenuOptions() {
            var searchMenu = document.querySelector('div[data-test-id=' + testId + '-list]');
            if (!searchMenu) {
                setTimeout(clickSearchMenuOptions, 100);
                return;
            }
            var options = Array.from(searchMenu.querySelectorAll('div[class*="optionText"]'));
            if (options.length != 1) {
                setTimeout(clickSearchMenuOptions, 100);
                return;
            }
            for (var i = 0; i < options.length; i++) {
                options[i].click();
            }
            if (callback) {
                callback();
            }
        }
        ;
        setReactInputValue('input[data-test-id=' + testId + '-search]', value, clickSearchMenuOptions);
    }
    var callOrder = [requestPopup, waitForPopup, setPopupValue];
    var nestedFunction = callOrder.reverse().reduce(function (accumulator, x) { return x.bind(null, accumulator); }, callback);
    nestedFunction();
}
/**
 * Utility method to add a new value to a list of tag-like values. Similar to the
 * search select value, except the search fields are less elaborate.
 */
function addReactLabelValue(testId, value, callback) {
    var buttonField = document.querySelector('div[data-test-id=' + testId + ']');
    var button = buttonField.querySelector('input');
    button.focus();
    function clickSearchMenuOptions() {
        var searchMenu = document.querySelector('div[class*="ssc-scrollable"]');
        if (!searchMenu) {
            setTimeout(clickSearchMenuOptions, 100);
            return;
        }
        var options = Array.from(searchMenu.querySelectorAll('div[role=menuitem]'));
        if (options.length == 0) {
            setTimeout(clickSearchMenuOptions, 100);
            return;
        }
        for (var i = 0; i < options.length; i++) {
            options[i].click();
        }
        if (callback) {
            callback();
        }
    }
    setReactInputValue('div[data-test-id=' + testId + '] input', value, clickSearchMenuOptions);
}
/**
 * Utility function which adds all the listed labels, and then invokes
 * the listed callback.
 */
function addReactLabelValues(testId, values, callback) {
    var nestedFunction = values.reverse().reduce(function (accumulator, x) { return addReactLabelValue.bind(null, testId, x, accumulator); }, callback);
    nestedFunction();
}
/**
 * Retrieve the support offices based on the JIRA ticket.
 */
function getSupportOffices(supportRegion) {
    var supportOffices = [];
    if (supportRegion == 'australia') {
        supportOffices.push('APAC');
        supportOffices.push('AU/NZ');
    }
    if (supportRegion == 'brazil') {
        supportOffices.push('Brazil');
    }
    if (supportRegion == 'hungary') {
        supportOffices.push('EU');
    }
    if (supportRegion == 'india') {
        supportOffices.push('India');
    }
    if (supportRegion == 'japan') {
        supportOffices.push('Japan');
    }
    if (supportRegion == 'spain') {
        supportOffices.push('Spain');
    }
    if (supportRegion == 'us') {
        supportOffices.push('US');
    }
    return new Set(supportOffices);
}
/**
 * Set the initial values for the "Create Issue" modal dialog window
 * after the fields have initialized.
 */
function initPatchTicketValues(data) {
    var ticket = data['ticket'];
    var organizationFields = ticket.organization.organizationFields;
    var versions = getProductVersions(ticket.tags);
    function setSummary(callback) {
        setReactInputValue('input[data-test-id=summary]', ticket.subject, callback);
    }
    function setCustomerTicketCreationDate(callback) {
        setReactInputValue('span[data-test-id=customfield_10134] input', new Date(ticket.createdAt), callback);
    }
    function setBaseline(callback) {
        GM.xmlHttpRequest({
            'method': 'GET',
            'url': 'https://patcher.liferay.com/api/jsonws',
            'headers': {
                'Cache-Control': 'no-cache, no-store, max-age=0',
                'Pragma': 'no-cache'
            },
            'onload': function (xhr) {
                var matcher = /Liferay.authToken="([^"]*)"/g.exec(xhr.responseText);
                if (!matcher) {
                    setReactInputValue('input[data-test-id=customfield_10172]', '', callback);
                    return;
                }
                var authToken = matcher[1];
                GM.xmlHttpRequest({
                    'method': 'POST',
                    'url': 'https://patcher.liferay.com/api/jsonws/invoke',
                    'data': new URLSearchParams({
                        limit: '1',
                        patcherBuildAccountEntryCode: organizationFields.account_code,
                        cmd: JSON.stringify({ "/osb-patcher-portlet.accounts/view": {} }),
                        p_auth: authToken
                    }),
                    'headers': {
                        'Cache-Control': 'no-cache, no-store, max-age=0',
                        'Pragma': 'no-cache'
                    },
                    'onload': function (xhr) {
                        var json = JSON.parse(xhr.responseText);
                        if (!json.data || json.data.length == 0) {
                            setReactInputValue('input[data-test-id=customfield_10172]', '', callback);
                            return;
                        }
                        setReactInputValue('input[data-test-id=customfield_10172]', json.data[0].patcherProjectVersionName, callback);
                    },
                    'onerror': function (xhr) {
                        if (callback) {
                            setReactInputValue('input[data-test-id=customfield_10172]', '', callback);
                        }
                    }
                });
            },
            'onerror': function (xhr) {
                setReactInputValue('input[data-test-id=customfield_10172]', '', callback);
            }
        });
    }
    function setSupportOffice(callback) {
        var supportRegion = organizationFields.support_region;
        var supportOffices = Array.from(getSupportOffices(supportRegion));
        addReactLabelValues('customfield_10133', supportOffices, callback);
    }
    function setAffectsVersion(callback) {
        var value = (versions.indexOf('7.0') != -1) ? '7.0.10' :
            (versions.indexOf('7.1') != -1) ? '7.1.10' :
                (versions.indexOf('7.2') != -1) ? '7.2.10' :
                    (versions.indexOf('7.3') != -1) ? '7.3.10' :
                        null;
        if (value) {
            addReactLabelValue('versions', value, callback);
        }
        else if (callback) {
            callback();
        }
    }
    function focusSummary(callback) {
        var summary = document.querySelector('input[data-test-id=summary]');
        summary.focus();
        var app = document.getElementById('app');
        app.scrollIntoView();
        if (callback) {
            callback();
        }
    }
    var callOrder = [setSummary, setCustomerTicketCreationDate, setBaseline, setSupportOffice, setAffectsVersion, focusSummary];
    var nestedFunction = callOrder.reverse().reduce(function (accumulator, x) { return x.bind(null, accumulator); });
    nestedFunction();
}
/**
 * Attempt to initialize the ZAF client instance, then initialize the
 * ZAF parent client instance so we can retrieve ticket metadata.
 */
function initZafClient() {
    if (!unsafeWindow.ZAFClient) {
        setTimeout(initZafClient, 1000);
        return;
    }
    function initJiraTicketValues() {
        var issueTypeMenu = document.querySelector('div[data-test-id="issuetype-menu"]');
        if (!issueTypeMenu) {
            setTimeout(initJiraTicketValues, 1000);
            return;
        }
        if (issueTypeMenu.textContent != 'Customer Issue') {
            setTimeout(initJiraTicketValues, 1000);
            return;
        }
        var client = unsafeWindow.ZAFClient.init();
        client.context().then(function (context) {
            var parentGuid = document.location.hash.substring('#parentGuid='.length);
            client.instance(parentGuid).get(['ticket', 'ticket.customField:custom_field_360006076471']).then(initPatchTicketValues);
        });
    }
    setReactSearchSelectValue('projectId', 'LPP', initJiraTicketValues);
}
function detachModalWindowHandler() {
    var backdrop = document.querySelector('.modal-backdrop.in');
    if (!backdrop) {
        return;
    }
    jQuery(backdrop).unbind('click');
}
if (unsafeWindow.location.hostname == '24475.apps.zdusercontent.com') {
    setTimeout(initZafClient, 1000);
}
else {
    setInterval(detachModalWindowHandler, 1000);
}
function addArticleCodeButton(toolbar, tinymce) {
    // Creates the code format container button
    var codeFormatButton = document.createElement('div');
    codeFormatButton.classList.add('ssc-view-3d4f1d68', 'src-components-EditorToolbar-ToolbarButton---button---2IfvR');
    codeFormatButton.setAttribute('tabindex', '0');
    codeFormatButton.setAttribute('role', 'button');
    codeFormatButton.setAttribute('id', 'custom-code-format-button');
    codeFormatButton.setAttribute('data-test-id', 'toolbarCodeFormatButton');
    // Creates the code format label
    var codeFormatLabel = document.createElement('div');
    codeFormatLabel.classList.add('src-components-EditorToolbar-ToolbarButton---label---PACxZ');
    codeFormatLabel.setAttribute('title', 'Code Format');
    // Creates the code format icon
    var codeFormatIcon = document.createElement('img');
    codeFormatIcon.setAttribute('src', 'https://www.tiny.cloud/docs/images/icons/code-sample.svg'); // Icon taken from https://www.tiny.cloud/docs/advanced/editor-icon-identifiers/
    codeFormatIcon.setAttribute('alt', "code format");
    // Adds icon to the label
    codeFormatLabel.appendChild(codeFormatIcon);
    // Adds the label to the button
    codeFormatButton.appendChild(codeFormatLabel);
    // Adds the button to the toolbar
    var toolbarPreButton = toolbar.querySelector('div[data-test-id="toolbarPreButton"]');
    toolbar.insertBefore(codeFormatButton, toolbarPreButton);
    // Registers the button functionality
    // API: https://www.tiny.cloud/docs/api/tinymce/tinymce.formatter/
    var registerArguments = {
        inline: 'code'
    };
    if (cloneInto) {
        registerArguments = cloneInto(registerArguments, unsafeWindow);
    }
    tinymce.activeEditor.formatter.register('codeformat', registerArguments);
    // Adds function to the button
    codeFormatButton.addEventListener('click', function (e) {
        var target = e.currentTarget;
        tinymce.activeEditor.focus();
        tinymce.activeEditor.formatter.toggle('codeformat');
        tinymce.DOM.toggleClass(target, 'src-components-EditorToolbar-ToolbarButton---active---3qTSV');
    });
    // Adds event listener to check <code> markup everywhere on the active editor
    var checkIfInCodeTag = function (e) {
        if (e.element.nodeName == 'CODE') {
            codeFormatButton.classList.add('src-components-EditorToolbar-ToolbarButton---active---3qTSV');
        }
        else {
            codeFormatButton.classList.remove('src-components-EditorToolbar-ToolbarButton---active---3qTSV');
        }
    };
    if (exportFunction) {
        checkIfInCodeTag = exportFunction(checkIfInCodeTag, unsafeWindow);
    }
    tinymce.activeEditor.on('NodeChange', checkIfInCodeTag);
}
function wrapLiferayGatedContent(tinymce) {
    // Only runs if on a KCS
    var isFastTrack = Array.from(document.querySelectorAll([
        'div[data-test-id="sectionSelector-section"]',
        'div[data-test-id="section-name"]' // Visible when sidebar is closed
    ].join(','))).filter(function (x) { return x.textContent == 'Fast Track'; }).length > 0;
    if (!isFastTrack) {
        return;
    }
    var allEditorH2 = tinymce.activeEditor.contentDocument.getElementsByTagName('h2');
    for (var i = 0; i < allEditorH2.length; i++) {
        if ((allEditorH2[i].textContent == 'Resolution' || allEditorH2[i].textContent == 'Additional Information') &&
            allEditorH2[i].nextSibling.tagName != 'DIV') {
            tinymce.dom.DomQuery(allEditorH2[i]).nextUntil().wrapAll('<div>');
        }
    }
}
function addArticleSubmissionListeners(tinymce) {
    var validationButtons = document.querySelectorAll([
        'div[data-test-id="createButton-menu-button"]',
        'div[data-test-id="updateButton-menu-button"]' // appears when updating an existing one
    ].join(','));
    for (var i = 0; i < validationButtons.length; i++) {
        var button = validationButtons[i];
        if (button.classList.contains('lesa-ui-button-listen')) {
            continue;
        }
        button.classList.add('lesa-ui-button-listen');
        button.addEventListener('click', wrapLiferayGatedContent.bind(null, tinymce));
    }
}
function addArticleFormattingButtons(tinymce) {
    var preButtons = Array.from(document.querySelectorAll('div[data-test-id="toolbarPreButton"]'));
    for (var i = 0; i < preButtons.length; i++) {
        var toolbar = preButtons[i].parentElement;
        if (toolbar == null || toolbar.classList.contains('lesa-ui-stackedit')) {
            continue;
        }
        toolbar.classList.add('lesa-ui-stackedit');
        addArticleCodeButton(toolbar, tinymce);
    }
}
function updateKnowledgeCenterEditor() {
    var tinymce = unsafeWindow.tinymce;
    if (!tinymce) {
        return;
    }
    addArticleFormattingButtons(tinymce);
    addArticleSubmissionListeners(tinymce);
}
function updateFastTrackArticle() {
    if ((document.location.pathname.indexOf('/hc/') != 0) || (document.location.pathname.indexOf('/articles/') == -1)) {
        return;
    }
    var metaElement = document.querySelector('div.article-author .article-meta');
    if (metaElement == null) {
        return;
    }
    if (metaElement.classList.contains('lesa-ui-article-linked')) {
        return;
    }
    metaElement.classList.add('lesa-ui-article-linked');
    var articleLinksElement = document.createElement('div');
    metaElement.appendChild(articleLinksElement);
    articleLinksElement.classList.add('meta-group', 'secondary-font', 'secondary-text-color');
    articleLinksElement.style.gap = '0.5em';
    var articleId = document.location.pathname.substring(document.location.pathname.lastIndexOf('/') + 1);
    var pos = articleId.indexOf('-');
    if (pos != -1) {
        articleId = articleId.substring(0, pos);
    }
    var requestURL = document.location.origin + '/api/v2/help_center/articles/' + articleId + '.json';
    GM.xmlHttpRequest({
        'method': 'GET',
        'url': requestURL,
        'headers': {
            'Cache-Control': 'no-cache, no-store, max-age=0',
            'Pragma': 'no-cache'
        },
        'responseType': 'blob',
        'onload': function (xhr) {
            var payload = JSON.parse(xhr.responseText);
            var labelNames = ((payload && payload.article && payload.article.label_names) ? payload.article.label_names : []);
            var ticketIds = labelNames.filter(function (it) { return it.match(/^[0-9]+$/g); });
            var ticketLinks = ticketIds.map(function (it) { return createAnchorTag('https://liferay-support.zendesk.com/agent/tickets/' + it, 'https://liferay-support.zendesk.com/agent/tickets/' + it); });
            if (ticketLinks.length > 0) {
                for (var _i = 0, ticketLinks_1 = ticketLinks; _i < ticketLinks_1.length; _i++) {
                    var ticketLink = ticketLinks_1[_i];
                    articleLinksElement.appendChild(ticketLink);
                }
            }
            else {
                articleLinksElement.remove();
            }
        },
        'onerror': function (xhr) {
        }
    });
}
function viewsGoToPage(target) {
    if (target <= 0) {
        return;
    }
    var pageIndicator = document.querySelector('[data-test-id="views_views-header-page-amount"]');
    if (pageIndicator == null) {
        setTimeout(viewsGoToPage.bind(null, target), 100);
        return;
    }
    var pageMatcher = (pageIndicator.textContent || '').match(/\d+/g);
    if (pageMatcher == null) {
        setTimeout(viewsGoToPage.bind(null, target), 100);
        return;
    }
    var _a = pageMatcher.map(function (it) { return parseInt(it); }).sort(function (a, b) { return a - b; }), current = _a[0], total = _a[1];
    if (current == target) {
        return;
    }
    var direction = current > target ? 'previous' : 'next';
    var button = document.querySelector('button[data-test-id="generic-table-pagination-' + direction + '"]');
    if (button == null) {
        setTimeout(viewsGoToPage.bind(null, target), 100);
        return;
    }
    button.click();
    viewsGoToPage(target);
}
function addViewsGoToPageButton() {
    var cursorPaginator = document.querySelector('#views_views-ticket-table nav[data-garden-id="cursor_pagination"]');
    if (!cursorPaginator) {
        return;
    }
    var goToPageButton = cursorPaginator.querySelector('button.lesa-ui-go-to-page');
    if (goToPageButton) {
        return;
    }
    var nextButton = cursorPaginator.querySelector('button[data-test-id="generic-table-pagination-next"]');
    if (!nextButton) {
        return;
    }
    goToPageButton = document.createElement('button');
    goToPageButton.classList.add('lesa-ui-go-to-page');
    goToPageButton.textContent = '...';
    goToPageButton.addEventListener('click', function () {
        viewsGoToPage(parseInt(prompt('Which page?') || '0'));
    });
    var buttonContainer = nextButton.parentElement;
    buttonContainer.insertBefore(goToPageButton, nextButton);
}
function isInternalTicket(ticketId, ticketInfo, conversation) {
    if (conversation.querySelectorAll('article').length == conversation.querySelectorAll('article div[data-test-id="omni-log-internal-note-tag"]').length) {
        return true;
    }
    return false;
}
function switchToInternalNotes(ticketId, ticketInfo, conversation) {
    if (!isInternalTicket(ticketId, ticketInfo, conversation)) {
        return;
    }
    var editor = conversation.querySelector('div[data-test-id="editor-view"]');
    if (!editor || editor.classList.contains('lesa-ui-channel')) {
        return;
    }
    editor.classList.add('lesa-ui-channel');
    var button = editor.querySelector('button[data-test-id="omnichannel-channel-switcher-button"][data-channel="web"]');
    if (!button) {
        return;
    }
    button.click();
    clickReactElement('[data-test-id="omnichannel-channel-switcher-menuitem-internal"]');
}
var rowCounts = {};
function createViewGroupRowsSummary(rowCounts) {
    var table = document.createElement('table');
    table.classList.add('table', 'lesa-ui-group-rows-summary');
    var ticketTable = document.querySelector('div#views_views-ticket-table > div');
    if (ticketTable) {
        table.setAttribute('data-views-ticket-table-id', ticketTable.getAttribute('id') || '');
    }
    var body = Array.from(Object.keys(rowCounts)).sort().reduce(function (acc, next) {
        var row = document.createElement('tr');
        var valueCell = document.createElement('td');
        valueCell.textContent = '' + rowCounts[next];
        row.appendChild(valueCell);
        var nameCell = document.createElement('td');
        nameCell.textContent = next;
        row.appendChild(nameCell);
        acc.appendChild(row);
        return acc;
    }, document.createElement('tbody'));
    table.appendChild(body);
    return table;
}
function checkViewGroupRows(counterElement, rowCounts) {
    var pageIndicator = document.querySelector('span[data-test-id="views_views-header-page-amount"]');
    if (pageIndicator) {
        var pageMatcher = (pageIndicator.textContent || '').match(/\d+/g);
        if (pageMatcher) {
            var _a = pageMatcher.map(function (it) { return parseInt(it); }).sort(function (a, b) { return a - b; }), current = _a[0], total = _a[1];
            if (current != 1) {
                var firstElement = document.querySelector('button[data-test-id="generic-table-pagination-first"]');
                firstElement.click();
            }
        }
        checkViewGroupRowsNextPageView(counterElement, rowCounts, 1);
    }
    else {
        checkViewGroupRowsPaginationView(counterElement, rowCounts, 1);
    }
}
function updateViewGroupRowCounts(rowCounts) {
    var tableBody = document.querySelector('table[data-garden-id="tables.table"] tbody');
    if (!tableBody) {
        return;
    }
    var groupName = undefined;
    var rowCount = 0;
    for (var i = 0; i < tableBody.rows.length; i++) {
        var gardenId = tableBody.rows[i].getAttribute('data-garden-id');
        if (gardenId == 'tables.group_row') {
            var groupNameElement = tableBody.rows[i].querySelector('td span');
            groupName = groupNameElement ? groupNameElement.textContent : undefined;
            rowCount = 0;
        }
        else if (groupName && (gardenId = 'tables.row')) {
            if (!(groupName in rowCounts)) {
                rowCounts[groupName] = 0;
            }
            ++rowCounts[groupName];
        }
    }
}
function checkViewGroupRowsNextPageView(counterElement, rowCounts, page) {
    var paginator = document.querySelector('nav[data-test-id="generic-table-pagination"]');
    console.log(paginator, rowCounts, page);
    if (!paginator) {
        setTimeout(checkViewGroupRowsNextPageView.bind(null, counterElement, rowCounts, page), 100);
        return;
    }
    var pageIndicator = document.querySelector('[data-test-id="views_views-header-page-amount"]');
    if (pageIndicator == null) {
        setTimeout(checkViewGroupRowsNextPageView.bind(null, counterElement, rowCounts, page), 100);
        return;
    }
    var pageMatcher = (pageIndicator.textContent || '').match(/\d+/g);
    if (pageMatcher == null) {
        setTimeout(checkViewGroupRowsNextPageView.bind(null, counterElement, rowCounts, page), 100);
        return;
    }
    var _a = pageMatcher.map(function (it) { return parseInt(it); }).sort(function (a, b) { return a - b; }), current = _a[0], total = _a[1];
    if (current != page) {
        setTimeout(checkViewGroupRowsNextPageView.bind(null, counterElement, rowCounts, page), 100);
        return;
    }
    updateViewGroupRowCounts(rowCounts);
    if (current == total) {
        counterElement.appendChild(createViewGroupRowsSummary(rowCounts));
        return;
    }
    var nextElement = document.querySelector('button[data-test-id="generic-table-pagination-next"]');
    nextElement.click();
    setTimeout(checkViewGroupRowsNextPageView.bind(null, counterElement, rowCounts, page + 1), 100);
}
function checkViewGroupRowsPaginationView(counterElement, rowCounts, page) {
    var paginator = document.querySelector('ul[data-garden-id="pagination.pagination_view"]');
    if (!paginator) {
        setTimeout(checkViewGroupRowsPaginationView.bind(null, counterElement, rowCounts, page), 500);
        return;
    }
    var pageElement = paginator.querySelector('li[title="' + page + '"]');
    if (!pageElement) {
        counterElement.appendChild(createViewGroupRowsSummary(rowCounts));
        return;
    }
    if (pageElement.getAttribute('aria-current') != 'true') {
        pageElement.click();
        setTimeout(checkViewGroupRowsPaginationView.bind(null, counterElement, rowCounts, page), 500);
        return;
    }
    updateViewGroupRowCounts(rowCounts);
    checkViewGroupRowsPaginationView(counterElement, rowCounts, page + 1);
}
function addViewsBreakdownLink() {
    var counterElement = document.querySelector('div[data-test-id="views_views-header-counter"]');
    if (!counterElement) {
        return;
    }
    var breakdownLink = counterElement.querySelector('a.lesa-ui-count-breakdown');
    if (breakdownLink) {
        return;
    }
    var groupRowsSummaryTable = counterElement.querySelector('table.lesa-ui-group-rows-summary');
    if (groupRowsSummaryTable) {
        var ticketTable = document.querySelector('div#views_views-ticket-table > div');
        if (ticketTable && groupRowsSummaryTable.getAttribute('data-views-ticket-table-id') == ticketTable.getAttribute('id')) {
            return;
        }
        groupRowsSummaryTable.remove();
    }
    var groupRow = document.querySelector('table[data-garden-id="tables.table"] tbody tr[data-garden-id="tables.group_row"]');
    if (!groupRow) {
        return;
    }
    breakdownLink = document.createElement('a');
    breakdownLink.classList.add('lesa-ui-count-breakdown');
    breakdownLink.textContent = '(count groups)';
    breakdownLink.addEventListener('click', function () {
        breakdownLink.remove();
        checkViewGroupRows(counterElement, {});
    });
    counterElement.appendChild(breakdownLink);
}
var CUSTOM_FIELD_SWARM_CATEGORIES = 14748442953229;
function populateTicketTableExtraColumns(tableContainer, tickets) {
    if (tickets) {
        tableContainer.setAttribute('data-tickets', JSON.stringify(tickets));
    }
    else {
        tickets = JSON.parse(tableContainer.getAttribute('data-tickets') || '[]');
    }
    if (GM_config.get('DISPLAY_SWARMING_CATEGORIES_ON_LIST')) {
        for (var i = 0; i < tickets.length; i++) {
            if (!tickets[i].custom_fields) {
                continue;
            }
            var swarmCategories = getCustomFieldValue(tickets[i], CUSTOM_FIELD_SWARM_CATEGORIES);
            if (swarmCategories == null) {
                continue;
            }
            var selector = 'td[data-test-id="ticket-table-cells-subject"] a[href="tickets/' + tickets[i].id + '"]';
            var link = tableContainer.querySelector(selector);
            if (!link) {
                continue;
            }
            var cell = link.closest('td');
            var categoriesContainer = cell.querySelector('.lesa-ui-tags');
            if (categoriesContainer) {
                continue;
            }
            categoriesContainer = document.createElement('div');
            categoriesContainer.classList.add('lesa-ui-tags');
            categoriesContainer = swarmCategories.reduce(function (acc, next) {
                var categoryElement = document.createElement('span');
                categoryElement.textContent = '+' + next.substring(5);
                acc.appendChild(categoryElement);
                return acc;
            }, categoriesContainer);
            cell.appendChild(categoriesContainer);
        }
    }
    if (GM_config.get('DISPLAY_SUB_ORGANIZATION_ON_LIST')) {
        for (var i = 0; i < tickets.length; i++) {
            var selector = 'td[data-test-id="generic-table-cells-id"]';
            var cellIds = Array.from(tableContainer.querySelectorAll(selector));
            var cellId = null;
            for (var j = 0; j < cellIds.length; j++) {
                var cellIdText = cellIds[j].textContent;
                if (cellIdText == null) {
                    continue;
                }
                if (cellIdText.trim() === "#" + tickets[i].id) {
                    cellId = cellIds[j];
                }
            }
            if (cellId == null) {
                continue;
            }
            var subOrgContainer = cellId.querySelector('.lesa-ui-tags');
            if (subOrgContainer) {
                continue;
            }
            var ticketTags = tickets[i].tags;
            if (ticketTags == null) {
                continue;
            }
            for (var j = 0; j < ticketTags.length; j++) {
                var tag = ticketTags[j];
                // Check for specific tag patterns
                if (tag.indexOf("_pod_") !== -1 || tag.indexOf("_porygon") !== -1 || tag.indexOf("_mewtwo") !== -1 || tag.indexOf("_slowpoke") !== -1) {
                    // Create or select the container
                    var container;
                    if (GM_config.get('DISPLAY_SWARMING_CATEGORIES_ON_LIST')) {
                        container = document.createElement('div');
                        cellId.appendChild(container);
                    }
                    else {
                        container = cellId;
                        cellId.textContent += " "; // Append space
                    }
                    // Create and append the tag element
                    var tagElement = document.createElement('span');
                    tagElement.classList.add('lesa-ui-tags');
                    tagElement.textContent = tag;
                    container.appendChild(tagElement);
                }
            }
        }
    }
    if (GM_config.get('DISPLAY_QUICKWIN_ON_LIST')) {
        var selector = 'table[data-test-id="generic-table"] tbody tr[data-test-id="generic-table-row"]';
        var rows = document.querySelectorAll(selector);
        for (var i_1 = 0; i_1 < tickets.length; i_1++) {
            var row = rows[i_1];
            if (!row) {
                continue;
            }
            if (row.classList.contains('quickwin') || row.classList.contains('not-quickwin')) {
                continue;
            }
            var ticketTags = tickets[i_1].tags;
            var quickWin = ticketTags && ticketTags.filter(function (it) { return it.includes('quick_win'); }).length > 0;
            if (quickWin) {
                row.classList.add('quickwin');
            }
            else {
                row.classList.add('not-quickwin');
            }
            if (GM_config.get('DISPLAY_GREENCIRCLE_ON_LIST')) {
                row.cells[1].textContent = quickWin ? '🟢' : '';
                row.cells[1].style.width = '';
                row.cells[1].style.maxWidth = '';
                row.cells[1].style.padding = '';
            }
        }
    }
}
function addTicketTableExtraColumns(tableContainer, requestURL) {
    var ticketTable = tableContainer.querySelector('div#views_views-ticket-table > div, div[id^="search-ticket-"]');
    if (!ticketTable) {
        return;
    }
    var currentURL = requestURL;
    var previousURL = ticketTable.getAttribute('data-lesa-ui-filter-url');
    if (currentURL == previousURL) {
        populateTicketTableExtraColumns(tableContainer);
        return;
    }
    ticketTable.setAttribute('data-lesa-ui-filter-url', currentURL);
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status != 200) {
            console.error("URL: " + xhr.responseURL);
            console.error("Error: " + xhr.status + " - " + xhr.statusText);
            return;
        }
        var response = null;
        try {
            response = JSON.parse(xhr.responseText);
        }
        catch (e) {
            console.error("URL: " + xhr.responseURL);
            console.error("Not JSON: " + xhr.responseText);
            return;
        }
        populateTicketTableExtraColumns(tableContainer, response['tickets'] || response['results']);
    };
    xhr.open('GET', requestURL);
    xhr.setRequestHeader('Cache-Control', 'no-cache, no-store, max-age=0');
    xhr.setRequestHeader('Pragma', 'no-cache');
    xhr.send();
}
function addViewsExtraColumns() {
    var tableContainer = document.querySelector('div[data-garden-id="pane"][role="tabpanel"]');
    if (tableContainer == null) {
        return;
    }
    var currentFilter = unsafeWindow.location.pathname.substring('/agent/filters/'.length);
    var currentPage = '1';
    var pageIndicator = document.querySelector('span[data-test-id="views_views-header-page-amount"]');
    if (pageIndicator) {
        var pageMatcher = (pageIndicator.textContent || '').match(/\d+/g);
        if (pageMatcher) {
            currentPage = pageMatcher[0];
        }
    }
    var requestURL = '/api/v2/views/' + currentFilter + '/tickets.json?per_page=30&page=' + currentPage;
    addTicketTableExtraColumns(tableContainer, requestURL);
}
function addSearchExtraColumns() {
    var activeWorkspaceElement = document.querySelector('div.workspace:not([style^="display"]');
    if (!activeWorkspaceElement) {
        return;
    }
    var page = '1';
    var pageElement = activeWorkspaceElement.querySelector('li[data-garden-id="pagination.page"][aria-current="true"]');
    if (pageElement) {
        page = pageElement.title;
    }
    var searchElement = activeWorkspaceElement.querySelector('input[data-test-id="search_advanced-search-box_input-field_media-input"]');
    var search = searchElement.value;
    if (!search) {
        return;
    }
    var requestURL = '/api/v2/search.json?include=tickets&per_page=30&page=' + page + '&query=' + encodeURIComponent(search);
    addTicketTableExtraColumns(activeWorkspaceElement, requestURL);
}
;
/**
 * Updates all help.liferay.com/attachments links to point to the current domain.
 */
function fixAttachmentLinks() {
    fixAttachmentLinksHelper('a', 'href');
    fixAttachmentLinksHelper('img', 'src');
}
function fixAttachmentLinksHelper(tagName, attributeName) {
    Array.from(document.querySelectorAll(tagName + '[' + attributeName + '^="https://help.liferay.com/attachments/')).forEach(function (it) {
        var value = it.getAttribute(attributeName);
        it.setAttribute(attributeName, value.substring('https://help.liferay.com'.length));
    });
}
/**
 * Apply updates to the page based on the retrieved ticket information. Since the
 * ticket corresponds to a "conversation", find that conversation.
 */
function checkTicketConversation(ticketId, ticketInfo) {
    updateSidebarBoxContainer(ticketId, ticketInfo);
    var conversation = document.querySelector('div[data-side-conversations-anchor-id="' + ticketId + '"]');
    if (!conversation) {
        clearHighlightedComments();
        return;
    }
    var hasHeader = conversation.querySelectorAll('div[data-test-id="ticket-call-controls-action-bar"], .pane_header').length > 0;
    if (!hasHeader) {
        return;
    }
    var hasAgentWorkspaceComments = conversation.querySelectorAll('article').length > 0;
    if (!hasAgentWorkspaceComments) {
        return;
    }
    addReplyFormattingButtons(ticketId, ticketInfo, conversation);
    addPlaybookReminder(ticketId, ticketInfo, conversation);
    addTicketDescription(ticketId, ticketInfo, conversation);
    fixPermaLinkAnchors(ticketId, ticketInfo, conversation);
    addPermaLinks(ticketId, ticketInfo, conversation);
    updateWindowTitle(ticketId, ticketInfo);
    switchToInternalNotes(ticketId, ticketInfo, conversation);
    highlightComment(conversation, ticketId, '', false);
}
/**
 * Set the window title based on which URL you are currently visiting, so that if you
 * use browser history, you have useful information.
 */
function updateWindowTitle(ticketId, ticketInfo) {
    var accountName = (document.location.hostname == 'liferay-support.zendesk.com') ? 'Liferay Help Center' : 'Liferay Sandbox';
    if (document.location.pathname.indexOf('/agent/dashboard') == 0) {
        document.title = accountName + ' - Agent Dashboard';
        return;
    }
    if (document.location.pathname.indexOf('/agent/admin/') == 0) {
        document.title = accountName + ' - Agent Admin';
        return;
    }
    if (ticketId && ticketInfo) {
        var emojis = '';
        if (ticketInfo.ticket && ticketInfo.ticket.tags) {
            emojis = getEmojiText(ticketInfo.ticket.tags);
            if (emojis.length > 0) {
                emojis += ' - ';
            }
        }
        var accountCode = getAccountCode(ticketId, ticketInfo);
        if (accountCode) {
            document.title = accountName + ' - ' + emojis + 'Agent Ticket #' + ticketInfo.ticket.id + ' - ' + accountCode + ' - ' + ticketInfo.ticket.raw_subject;
        }
        else {
            document.title = accountName + ' - ' + emojis + 'Agent Ticket #' + ticketInfo.ticket.id + ' - ' + ticketInfo.ticket.raw_subject;
        }
        return;
    }
    if (document.location.pathname.indexOf('/agent/filters/') == 0) {
        var filterElement = document.querySelector('.filter-title');
        if (filterElement && filterElement.textContent) {
            document.title = accountName + ' - Agent Filter - ' + filterElement.textContent;
        }
        return;
    }
}
/**
 * Since there's an SPA framework in place that I don't fully understand, attempt to
 * apply updates once per second, once we have the ticket information.
 */
function checkForConversations() {
    var ticketPath = '/agent/tickets/';
    if (document.location.pathname.indexOf(ticketPath) == 0) {
        var ticketId = document.location.pathname.substring(ticketPath.length);
        var pos = ticketId.indexOf('/');
        if (pos != -1) {
            revokeObjectURLs();
        }
        else {
            checkTicket(ticketId, checkTicketConversation);
        }
    }
    else {
        updateWindowTitle();
        revokeObjectURLs();
    }
}
/**
 * Update the selected tab with the account code.
 */
function updateSubtitle(title, subtitle, ticketId, ticketInfo) {
    title.textContent = ticketInfo.ticket.raw_subject;
    title.setAttribute('title', ticketInfo.ticket.raw_subject);
    var accountCode = getAccountCode(ticketId, ticketInfo);
    if (!accountCode) {
        return;
    }
    var oldSpan = subtitle.querySelector('.lesa-ui-account-code');
    if (oldSpan && (oldSpan.textContent == accountCode)) {
        return;
    }
    if (!subtitle.classList.contains('lesa-ui-subtitle')) {
        subtitle.classList.add('lesa-ui-subtitle');
    }
    var newSpan = document.createElement('span');
    var emojis = getEmojiText(ticketInfo.ticket.tags || []);
    if (emojis.length > 0) {
        newSpan.appendChild(document.createTextNode(emojis + ' '));
    }
    newSpan.classList.add('lesa-ui-account-code');
    newSpan.textContent = accountCode;
    if (oldSpan) {
        oldSpan.replaceWith(newSpan);
    }
    else {
        subtitle.appendChild(newSpan);
    }
}
/**
 * Attempt to update the tab subtitles.
 */
function checkForSubtitles() {
    var tabs = Array.from(document.querySelectorAll('div[data-test-id="header-tab"]'));
    var subtitles = Array.from(document.querySelectorAll('div[data-test-id="header-tab-subtitle"]'));
    for (var i = 0; i < tabs.length; i++) {
        var tab = tabs[i];
        var subtitle = tab.querySelector('div[data-test-id="header-tab-subtitle"]');
        var textContent = ((subtitle.children.length > 0 && subtitle.children[0].textContent) || '').trim();
        if (textContent[0] != '#') {
            continue;
        }
        var title = tab.querySelector('div[data-test-id="header-tab-title"]');
        var ticketId = textContent.substring(1);
        checkTicket(ticketId, updateSubtitle.bind(null, title, subtitle));
    }
}
function abbreviateBadgeText(badge) {
    var madeResizeChanges = false;
    if (!badge.textContent || (badge.textContent.length <= 2) || (badge.textContent[0] == '\u00A0')) {
        return madeResizeChanges;
    }
    if (badge.textContent === 'On-hold') {
        badge.textContent = '\u00A0H\u00A0';
        madeResizeChanges = true;
    }
    else if (badge.textContent === 'Open-Pending') {
        badge.textContent = 'OP';
        madeResizeChanges = true;
    }
    else {
        badge.textContent = '\u00A0' + badge.textContent[0] + '\u00A0';
        madeResizeChanges = true;
    }
    return madeResizeChanges;
}
/**
 * Set the old compact ticket status column style and change "Open-Pending" color to differenciate it from the "Open" one
 * For more information, see https://liferay.slack.com/archives/CL8DNJYB0/p1675440794494529
 */
function fixOldTicketStatusColumnStyle() {
    var pathname = unsafeWindow.location.pathname;
    var viewPage = (pathname.indexOf('/agent/dashboard') == 0) ||
        ((pathname.indexOf('/agent/filters/') == 0) && (pathname.indexOf('/suspended') == -1)) ||
        ((pathname.indexOf('/agent/search/') == 0) && (document.querySelector('div[data-test-id="search_tables_tab-tickets"][aria-selected="true"]') != null)) ||
        (pathname.indexOf('/organization/tickets') != -1);
    /* update status column */
    var badges = Array.from(document.querySelectorAll('div[data-cy-test-id="status-badge-state"]'));
    var needsResize = false;
    for (var _i = 0, badges_1 = badges; _i < badges_1.length; _i++) {
        var badge = badges_1[_i];
        if (updateBadge(badge)) {
            needsResize = true;
        }
        /* Change the status text to the abbreviate form only if we are in a view page and we are not in a popup */
        if (viewPage && !isBadgeInPopup(badge)) {
            if (abbreviateBadgeText(badge)) {
                needsResize = true;
            }
        }
    }
    /* Update Open-Pending badge color inside the ticket */
    var ticketBadges = Array.from(document.querySelectorAll('span.ticket_status_label'));
    for (var _a = 0, ticketBadges_1 = ticketBadges; _a < ticketBadges_1.length; _a++) {
        var badge = ticketBadges_1[_a];
        if (updateBadge(badge)) {
            needsResize = true;
        }
    }
    if (viewPage) {
        if (removeTicketStatusColumn()) {
            needsResize = true;
        }
        if (adjustColumnTextWidth()) {
            needsResize = true;
        }
        if (needsResize) {
            unsafeWindow.dispatchEvent(new Event('resize'));
        }
    }
}
function adjustColumnTextWidth() {
    var madeResizeChanges = false;
    var tables = Array.from(document.querySelectorAll('table[data-onboarding-id="table_main"], table[data-test-id="table_header"]'));
    for (var _i = 0, tables_1 = tables; _i < tables_1.length; _i++) {
        var table = tables_1[_i];
        var headers = Array.from(table.tHead.rows[0].cells);
        for (var _a = 0, headers_1 = headers; _a < headers_1.length; _a++) {
            var header = headers_1[_a];
            if (header.getAttribute('heatscore_processed') === 'true') {
                continue;
            }
            var textHeader = getTextHeader(header);
            if (textHeader && (textHeader.nodeValue === 'Heat Score')) {
                var button = header.querySelector('button');
                if (button) {
                    button.title = 'Heat Score';
                }
                textHeader.nodeValue = 'Heat';
                madeResizeChanges = true;
            }
            header.setAttribute('heatscore_processed', 'true');
        }
        var product_column;
        var i = 0;
        for (var _b = 0, headers_2 = headers; _b < headers_2.length; _b++) {
            var header = headers_2[_b];
            var textHeader = getTextHeader(header);
            if (textHeader && (textHeader.nodeValue === 'Offering')) {
                product_column = i;
                break;
            }
            i++;
        }
        if (!product_column) {
            continue;
        }
        var rows = Array.from(table.tBodies[0].rows);
        for (var _c = 0, rows_1 = rows; _c < rows_1.length; _c++) {
            var row = rows_1[_c];
            var cell = row.cells[product_column];
            if (!cell || !cell.textContent || cell.getAttribute('product_processed')) {
                continue;
            }
            cell.title = cell.textContent;
            if (cell.textContent === 'Liferay Self-Hosted::Quarterly Release') {
                cell.textContent = 'Self-Hosted::Quarterly';
                madeResizeChanges = true;
            }
            else if (cell.textContent === 'Provisioning Request') {
                cell.textContent = 'Provisioning';
                madeResizeChanges = true;
            }
            else if (cell.textContent.startsWith('Liferay ')) {
                cell.textContent = cell.textContent.replace('Liferay ', '');
                madeResizeChanges = true;
            }
            cell.setAttribute('product_processed', 'true');
        }
    }
    return madeResizeChanges;
}
function getTextHeader(header) {
    var button = header.querySelector('button');
    if (!button) {
        return null;
    }
    if (!button.firstChild) {
        return null;
    }
    if (button.firstChild.nodeType === Node.TEXT_NODE) {
        return button.firstChild;
    }
    return null;
}
function removeTicketStatusColumn() {
    var madeResizeChanges = false;
    var tables = Array.from(document.querySelectorAll('table[data-onboarding-id="table_main"], table[data-test-id="table_header"]'));
    for (var i = 0; i < tables.length; i++) {
        var table = tables[i];
        var statusIndex = -1;
        var badge = table.querySelector('div[data-cy-test-id="status-badge-state"]');
        if (!badge) {
            if (table.getAttribute('data-test-id') == 'table_header') {
                var container = table.closest('div[data-test-id="table_container"]');
                var sibling = container.querySelector('table[data-test-id="table_main"]');
                if (sibling) {
                    badge = sibling.querySelector('div[data-cy-test-id="status-badge-state"]');
                }
            }
        }
        if (badge) {
            var cell = badge.closest('td');
            var row = cell.closest('tr');
            for (var j = 0; j < row.cells.length; j++) {
                if (row.cells[j] == cell) {
                    statusIndex = j;
                    break;
                }
            }
        }
        if (statusIndex == -1) {
            continue;
        }
        var statusHeaderCell = table.tHead.rows[0].cells[statusIndex];
        if (statusHeaderCell.getAttribute('processed') == 'true') {
            continue;
        }
        madeResizeChanges = true;
        /* remove "Ticket status" text from headers */
        statusHeaderCell.setAttribute('processed', 'true');
        statusHeaderCell.textContent = ' ';
        /* remove the padding of the column 2 before the status column */
        var cells = Array.from(table.querySelectorAll('tr > td:nth-child(' + (statusIndex - 1) + '), tr > th:nth-child(' + (statusIndex - 1) + ')'));
        for (var _i = 0, cells_1 = cells; _i < cells_1.length; _i++) {
            var cell = cells_1[_i];
            cell.style.paddingLeft = '0';
        }
        /* remove the column 1 before the status column */
        cells = Array.from(table.querySelectorAll('tr > td:nth-child(' + (statusIndex) + '), tr > th:nth-child(' + (statusIndex) + ')'));
        for (var _a = 0, cells_2 = cells; _a < cells_2.length; _a++) {
            var cell = cells_2[_a];
            cell.style.width = '0';
            cell.style.minWidth = '0';
            cell.style.maxWidth = '0';
            cell.style.padding = '0';
        }
    }
    return madeResizeChanges;
}
function updateBadge(badge) {
    var madeResizeChanges = false;
    /* Change badge colors for Open-Pending to purple */
    if ((badge.textContent === 'Open-Pending' || badge.textContent === 'OP')) {
        if (!badge.getAttribute('updated-open-color')) {
            badge.style.setProperty("background-color", "#c782fc", "important");
            badge.setAttribute('updated-open-color', "true");
        }
    }
    /* Restore badge color if changing from Open-Pending to any other status */
    else if (badge.getAttribute('updated-open-color')) {
        badge.style.removeProperty("background-color");
        badge.removeAttribute('updated-open-color');
    }
    /* Closed status was lost now is shown as Resolved, we can get it again from badge attributes */
    else if (!badge.getAttribute('updated-closed-color') && ((badge.getAttribute('data-test-id') === 'status-badge-closed') || badge.classList.contains('closed'))) {
        badge.style.setProperty("background-color", "#dcdee0", "important");
        badge.style.setProperty("color", "#04363d", "important");
        badge.textContent = 'Closed';
        badge.setAttribute('updated-closed-color', "true");
        madeResizeChanges = true;
    }
    return madeResizeChanges;
}
function isBadgeInPopup(badge) {
    if (!badge.parentElement) {
        return false;
    }
    var grandParent = badge.parentElement.parentElement;
    if (!grandParent) {
        return false;
    }
    if (grandParent.getAttribute('data-test-id') === "ticket_table_tooltip-header-ticket-info") {
        return true;
    }
    if (!grandParent.parentElement) {
        return false;
    }
    if (grandParent.parentElement.getAttribute('data-test-id') === "header-tab-tooltip") {
        return true;
    }
    if (grandParent.parentElement.getAttribute('data-cy-test-id') === "submit_button-menu") {
        return true;
    }
    return false;
}
/**
 * Close all tabs button
 */
function closeAllTabs() {
    var tablist = document.querySelector('[data-test-id="header-tablist"]');
    if (tablist) {
        var updateCloseAllButton_1 = function () {
            // Get all visible and non-collapsed close buttons
            var visibleCloseButtons = Array.from(document.querySelectorAll('[data-test-id="close-button"]')).filter(function (btn) {
                var tab = btn.closest('[data-test-id="header-tab"]');
                return tab && tab.offsetParent !== null && !tab.classList.contains('collapsed');
            });
            var existingButton = document.querySelector('#close-all-tabs-btn');
            // If no visible tabs and button exists → remove the button
            if (visibleCloseButtons.length === 0) {
                if (existingButton) {
                    var existingButtonContainer = existingButton.closest('div');
                    if (existingButtonContainer) {
                        existingButtonContainer.remove();
                    }
                }
                return;
            }
            // If the button is already present → do nothing
            if (existingButton)
                return;
            // Create the wrapper div
            var wrapper = document.createElement('div');
            wrapper.className = 'sc-19uji9v-0 dcLIks'; // same styling as native tab button container
            // Create the button
            var button = document.createElement('button');
            button.id = 'close-all-tabs-btn';
            button.type = 'button';
            button.setAttribute('data-test-id', 'close-all-tabs-button');
            button.className = 'sc-1yqwijl-0 fSkeuV';
            // Inner structure (icon + label)
            var content = document.createElement('div');
            content.style.display = 'flex';
            content.style.alignItems = 'center';
            content.style.gap = '6px';
            var icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            icon.setAttribute('width', '12');
            icon.setAttribute('height', '12');
            icon.setAttribute('viewBox', '0 0 12 12');
            icon.setAttribute('aria-hidden', 'true');
            icon.setAttribute('focusable', 'false');
            icon.classList.add('sc-y7z43x-0', 'gGJlIS');
            var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('stroke', 'currentColor');
            path.setAttribute('stroke-linecap', 'round');
            path.setAttribute('d', 'M3 9L9 3M9 9L3 3');
            icon.appendChild(path);
            var label = document.createElement('span');
            label.className = 'sc-10vdpwu-0 hysyZs';
            label.textContent = 'Close all';
            content.appendChild(icon);
            content.appendChild(label);
            button.appendChild(content);
            wrapper.appendChild(button);
            tablist.appendChild(wrapper);
            button.addEventListener('click', function () {
                if (confirm('Are you sure you want to close all tabs?')) {
                    var freshCloseButtons = Array.from(document.querySelectorAll('[data-test-id="close-button"]')).filter(function (btn) {
                        var tab = btn.closest('[data-test-id="header-tab"]');
                        return tab && tab.offsetParent !== null && !tab.classList.contains('collapsed');
                    });
                    freshCloseButtons.forEach(function (btn) { return btn.click(); });
                    wrapper.remove();
                }
            });
        };
        // Run once initially
        updateCloseAllButton_1();
        // Observe tab list for changes
        var observer = new MutationObserver(function () { return updateCloseAllButton_1(); });
        observer.observe(tablist, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['class', 'style', 'aria-selected', 'aria-hidden']
        });
    }
}
function updateZendeskUI() {
    var pathname = unsafeWindow.location.pathname;
    if (document.location.hostname == 'help.liferay.com') {
        updateFastTrackArticle();
    }
    else if (pathname.indexOf('/agent/') == 0) {
        checkForConversations();
        checkForSubtitles();
        checkSidebarTags();
        fixAttachmentLinks();
        makeDraggableModals();
        fixOldTicketStatusColumnStyle();
        closeAllTabs();
        if (pathname.indexOf('/agent/filters/') == 0) {
            addViewsGoToPageButton();
            addViewsExtraColumns();
        }
        if (pathname.indexOf('/agent/search/') == 0) {
            addSearchExtraColumns();
        }
    }
    else if (pathname.indexOf('/knowledge/') == 0) {
        updateKnowledgeCenterEditor();
    }
}
GM_config.init({
    id: 'zendesk_for_tse_config',
    title: GM_info.script.name + ' Settings',
    fields: {
        DISPLAY_SWARMING_CATEGORIES_ON_LIST: {
            label: 'Check this box if you want to display Swarming Skills below the ticket title in each row on filter views (this will make rows larger vertically)',
            type: 'checkbox',
            "default": true
        },
        DISPLAY_SUB_ORGANIZATION_ON_LIST: {
            label: 'Check this box if you want to display suborganization information below the ticket title in each row on filter views',
            type: 'checkbox',
            "default": false
        },
        DISPLAY_QUICKWIN_ON_LIST: {
            label: 'Check this box if you want to highlight quick win tickets in green in the filter views',
            type: 'checkbox',
            "default": true
        },
        DISPLAY_GREENCIRCLE_ON_LIST: {
            label: 'Check this box if you want to display a green circle emoji instead of the eye icon',
            type: 'checkbox',
            "default": true
        },
        DISPLAY_INTERNAL_COMMENTS_COLLAPSED_ON_LIST: {
            label: 'Check this box if you want to collapse internal comments by default',
            type: 'checkbox',
            "default": false
        },
        EXECUTION_INTERVAL: {
            label: 'Enter the number of milliseconds to wait between each iteration of the script UI checking loop',
            type: 'number',
            min: 100,
            "default": 1000
        }
    },
    css: "\n#zendesk_for_tse_config #zendesk_for_tse_config_wrapper #zendesk_for_tse_config_header {\n  font-size: x-large;\n  font-weight: 600;\n  margin: 1em;\n}\n\n#zendesk_for_tse_config #zendesk_for_tse_config_wrapper .section_header_holder {\n  display: grid;\n  grid-template-columns: 5em auto;\n  grid-gap: 0.5em;\n}\n\n#zendesk_for_tse_config #zendesk_for_tse_config_wrapper .section_header_holder .config_var {\n  display: contents;\n}\n\n#zendesk_for_tse_config #zendesk_for_tse_config_wrapper .section_header_holder .config_var label {\n  justify-self: start;\n  font-size: large;\n  font-weight: normal;\n}\n\n#zendesk_for_tse_config #zendesk_for_tse_config_wrapper .section_header_holder .config_var input {\n  font-size: medium;\n  text-align: end;\n  max-width: 4em;\n  align-self: start;\n  justify-self: end;\n}\n",
    events: {
        init: function () {
            // Since there's an SPA framework in place that I don't fully understand,
            // attempt to do everything once per second.
            setInterval(updateZendeskUI, GM_config.get('EXECUTION_INTERVAL'));
        },
        open: function (configDocument) {
            configDocument.querySelectorAll('.config_var').forEach(function (element) {
                element.appendChild(element.querySelector('label'));
            });
        }
    }
});
GM_registerMenuCommand('Settings', function () {
    GM_config.open();
});
