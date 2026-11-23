import assert from "node:assert/strict";
import { test } from "node:test";
import { buildWebsiteLinkHtml } from "./links.js";
import {
  buildWebsiteButtonMarkup,
  parseWebsiteButtonUrl,
  websiteButtonExample,
} from "./websiteButtons.js";

test("accepts app listings and existing smart links", () => {
  assert.equal(parseWebsiteButtonUrl(websiteButtonExample.ios, "ios"), websiteButtonExample.ios);
  assert.equal(
    parseWebsiteButtonUrl(" https://apps.apple.com/es/app/tourixy/id6807142283 ", "ios"),
    "https://apps.apple.com/es/app/tourixy/id6807142283",
  );
  assert.equal(parseWebsiteButtonUrl(websiteButtonExample.android, "android"), websiteButtonExample.android);
  assert.equal(parseWebsiteButtonUrl("example.com/app-download", "smart"), "https://example.com/app-download");
});

test("rejects empty inputs, non-listings, lookalike hosts, credentials and unsafe protocols", () => {
  for (const [value, type] of [
    [" ", "ios"],
    ["https://apps.apple.com/es", "ios"],
    ["https://apps.apple.com.example.org/app/id12", "ios"],
    ["https://play.google.com/store/apps/details", "android"],
    ["https://play.google.com/store/apps/details?id=123", "android"],
    ["https://play.google.com.example.org/store/apps/details?id=com.tourixy.app", "android"],
    ["https://user:password@example.com/app", "smart"],
    ["javascript:alert(1)", "smart"],
    ["data:text/html,example", "smart"],
    ["not-a-url", "smart"],
  ]) {
    assert.equal(parseWebsiteButtonUrl(value, type), "", value);
  }
});

test("generates standalone HTML for one or two buttons while preserving the dashboard helper", () => {
  const ios = { href: websiteButtonExample.ios, label: "App Store" };
  const android = { href: `${websiteButtonExample.android}&hl=es`, label: "Google Play" };
  const smart = { href: "https://example.com/one-link", label: "iOS & Android" };
  assert.equal(buildWebsiteButtonMarkup([]), "");
  assert.match(buildWebsiteButtonMarkup([ios]), /^<a href="[^"]+" style="[^"]+">App Store<\/a>$/);
  const twoButtons = buildWebsiteButtonMarkup([ios, android]);
  assert.equal(twoButtons.split("\n").length, 2);
  assert.ok(twoButtons.includes('id=com.tourixy.app&amp;hl=es"'));
  assert.match(buildWebsiteButtonMarkup([smart]), /iOS &amp; Android<\/a>$/);
  assert.doesNotMatch(twoButtons, /script|onclick|class=/i);
  assert.equal(
    buildWebsiteLinkHtml("https://example.com/download", "App & Web"),
    '<a href="https://example.com/download">App &amp; Web</a>',
  );
});
