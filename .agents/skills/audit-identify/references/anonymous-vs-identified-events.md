> AI agents: this is one page from PostHog's docs. Full index of Markdown docs for LLMs: https://posthog.com/llms.txt

# Anonymous vs identified events - Docs

Copy page

# Anonymous vs identified events - Docs

PostHog captures two types of events: [**anonymous** and **identified**](/docs/data/anonymous-vs-identified-events.md)

**Identified events** enable you to attribute events to specific users, and attach [person properties](/docs/product-analytics/person-properties.md). They're best suited for logged-in users.

Scenarios where you want to capture identified events are:

-   Tracking logged-in users in B2B and B2C SaaS apps
-   Doing user segmented product analysis
-   Growth and marketing teams wanting to analyze the *complete* conversion lifecycle

**Anonymous events** are events without individually identifiable data. They're best suited for [web analytics](/docs/web-analytics.md) or apps where users aren't logged in.

Scenarios where you want to capture anonymous events are:

-   Tracking a marketing website
-   Content-focused sites
-   B2C apps where users don't sign up or log in

Under the hood, the key difference between identified and anonymous events is that for identified events we create a [person profile](/docs/data/persons.md) for the user, whereas for anonymous events we do not.

> **Important:** Due to the reduced cost of processing them, anonymous events can be up to 4x cheaper than identified ones, so we recommended you only capture identified events when needed.

## How to capture anonymous events

## Web

The JavaScript Web SDK captures anonymous events by default. However, this may change depending on your [`person_profiles` config](/docs/libraries/js/config.md) when initializing PostHog:

1.  `person_profiles: 'identified_only'` *(recommended)* *(default)* - Anonymous events are captured by default. PostHog only captures identified events for users where [person profiles](/docs/data/persons.md) have already been created.

2.  `person_profiles: 'always'` - Capture identified events for all events.

For example:

Web

PostHog AI

```javascript
posthog.init('<ph_project_token>', {
    api_host: 'https://us.i.posthog.com',
    defaults: '2026-05-30',
    person_profiles: 'always'
})
```

## Backend

PostHog's backend SDKs and API capture identified events by default. To capture anonymous events, set the `$process_person_profile` property to `false`:

PostHog AI

### Node.js

```javascript
client.capture({
    distinctId: 'distinct_id_of_the_user',
    event: 'your_event_name',
    properties: {
        $process_person_profile: false,
    },
})
```

### Python

```python
posthog.capture(
    "your_event_name",
    distinct_id="distinct_id_of_the_user",
    properties={
        "$process_person_profile": false
    }
)
```

### PHP

```php
PostHog::capture([
  'distinctId' => 'distinct_id_of_the_user',
  'event' => 'your_event_name',
  'properties' => [
    '$process_person_profile' => false
  ]
]);
```

### Ruby

```ruby
posthog.capture({
    distinct_id: 'distinct_id_of_the_user',
    event: 'your_event_name',
    properties: {
        '$process_person_profile': false
    }
})
```

### Go

```go
client.Enqueue(posthog.Capture{
    DistinctId: "distinct_id_of_the_user",
    Event:      "your_event_name",
    Properties: posthog.NewProperties().
      Set("$process_person_profile", false),
})
```

### Java

```java
posthog.capture("distinct_id_of_the_user", "your_event_name", new HashMap<String, Object>() {
  {
    put("$process_person_profile", false);
  }
});
```

### Rust

```rust
let mut event = Event::new("your_event_name", "distinct_id_of_the_user");
event.insert_prop("$process_person_profile", false).unwrap();
client.capture(event);
```

### Elixir

```elixir
PostHog.capture("your_event_name", %{
  distinct_id: "distinct_id_of_the_user",
  "$process_person_profile": false
})
```

### Terminal

```bash
curl -v -L --header "Content-Type: application/json" -d '{
    "api_key": "<ph_project_token>",
    "properties": {
        "$process_person_profile": false
    },
    "distinct_id": "distinct_id_of_the_user",
    "event": "your_event_name"
}' https://us.i.posthog.com/i/v0/e/
```

## Android

The Android SDK captures anonymous events by default. However, this may change depending on your `personProfiles` [config](/docs/libraries/android.md#all-configuration-options) when initializing PostHog:

1.  `personProfiles = PersonProfiles.IDENTIFIED_ONLY` *(recommended)* *(default)* - Anonymous events are captured by default. PostHog only captures identified events for users where [person profiles](/docs/data/persons.md) have already been created.

2.  `personProfiles = PersonProfiles.ALWAYS` - Capture identified events for all events.

3.  `personProfiles = PersonProfiles.NEVER` - Capture anonymous events for all events.

For example:

Kotlin

PostHog AI

```kotlin
val config = PostHogAndroidConfig(
   apiKey = POSTHOG_API_KEY,
   host = POSTHOG_HOST,
).apply {
   personProfiles = PersonProfiles.IDENTIFIED_ONLY
}
```

## iOS

The iOS SDK captures anonymous events by default. However, this may change depending on your `personProfiles` [config](/docs/libraries/ios/configuration.md#all-configuration-options) when initializing PostHog:

1.  `personProfiles: .identifiedOnly` *(recommended)* *(default)* - Anonymous events are captured by default. PostHog only captures identified events for users where [person profiles](/docs/data/persons.md) have already been created.

2.  `personProfiles: .always` - Capture identified events for all events.

3.  `personProfiles: .never` - Capture anonymous events for all events.

For example:

iOS

PostHog AI

```swift
let config = PostHogConfig(
    projectToken: POSTHOG_PROJECT_TOKEN,
    host: POSTHOG_HOST
)
config.personProfiles = .identifiedOnly
PostHogSDK.shared.setup(config)
```

## Flutter

The Flutter SDK captures anonymous events by default. However, this may change depending on your `personProfiles` [config](/docs/libraries/flutter.md#person-profiles-anonymous-vs-identified-persons) when initializing PostHog:

1.  `personProfiles: PostHogPersonProfiles.identifiedOnly` *(recommended)* *(default)* - Anonymous events are captured by default. PostHog only captures identified events for users where [person profiles](/docs/data/persons.md) have already been created.

2.  `personProfiles: PostHogPersonProfiles.always` - Capture identified events for all events.

3.  `personProfiles: PostHogPersonProfiles.never` - Capture anonymous events for all events.

For example:

Dart

PostHog AI

```dart
final config = PostHogConfig('<ph_project_token>');
config.host = 'https://us.i.posthog.com';
config.personProfiles = PostHogPersonProfiles.identifiedOnly;
```

## How to capture identified events

## Web

If you've set the [`personProfiles` config](/docs/libraries/js/config.md) to `IDENTIFIED_ONLY` (the default option), anonymous events are captured by default. To capture identified events, call any of the following functions:

-   [`identify()`](/docs/product-analytics/identify.md)
-   [`alias()`](/docs/product-analytics/identify.md#alias-assigning-multiple-distinct-ids-to-the-same-user)
-   [`group()`](/docs/product-analytics/group-analytics.md)
-   [`setPersonProperties()`](/docs/product-analytics/person-properties.md)
-   [`setGroupPropertiesForFlags()`](/docs/libraries/js/usage.md#overriding-server-properties)

When you call any of these functions, it creates a [person profile](/docs/data/persons.md) for the user. Once this profile is created, all subsequent events for this user will be captured as identified events.

[`setPersonPropertiesForFlags()`](/docs/feature-flags/property-overrides.md#manual-overrides-with-setpersonpropertiesforflags) is the exception. It doesn't create a person profile, so you can use it to target feature flags on person properties while the user is still anonymous.

Alternatively, you can set `personProfiles` to `ALWAYS` to capture identified events by default.

## Backend

PostHog's backend SDKs and API capture identified events by default.

PostHog AI

### Node.js

```javascript
client.capture({
    distinctId: 'distinct_id_of_the_user',
    event: 'your_event_name',
})
```

### Python

```python
posthog.capture(
    "your_event_name",
    distinct_id="distinct_id_of_the_user",
)
```

### PHP

```php
PostHog::capture([
  'distinctId' => 'distinct_id_of_the_user',
  'event' => 'your_event_name',
]);
```

### Ruby

```ruby
posthog.capture({
    distinct_id: 'distinct_id_of_the_user',
    event: 'your_event_name',
})
```

### Go

```go
client.Enqueue(posthog.Capture{
    DistinctId: "distinct_id_of_the_user",
    Event:      "your_event_name",
})
```

### Java

```java
posthog.capture("distinct_id_of_the_user", "your_event_name", new HashMap<String, Object>() {});
```

### Rust

```rust
let mut event = Event::new("your_event_name", "distinct_id_of_the_user");
client.capture(event);
```

### Elixir

```elixir
PostHog.capture("your_event_name", %{
  distinct_id: "distinct_id_of_the_user"
})
```

### api

```api
curl -v -L --header "Content-Type: application/json" -d '{
    "api_key": "<ph_project_token>",
    "distinct_id": "distinct_id_of_the_user",
    "event": "your_event_name"
}' https://us.i.posthog.com/i/v0/e/
```

## Android

If you've set the [`personProfiles` config](/docs/libraries/android.md#all-configuration-options) to `IDENTIFIED_ONLY` (the default option), anonymous events are captured by default. Then, to capture identified events, call any of the following functions:

-   [`identify()`](/docs/product-analytics/identify.md)
-   [`alias()`](/docs/product-analytics/identify.md#alias-assigning-multiple-distinct-ids-to-the-same-user)
-   [`group()`](/docs/product-analytics/group-analytics.md)

When you call any of these functions, it creates a [person profile](/docs/data/persons.md) for the user. Once this profile is created, all subsequent events for this user will be captured as identified events.

Alternatively, you can set `personProfiles` to `ALWAYS` to capture identified events by default.

## iOS

If you've set the [`personProfiles` config](/docs/libraries/ios/configuration.md#all-configuration-options) to `.identifiedOnly` (the default option), anonymous events are captured by default. Then, to capture identified events, call any of the following functions:

-   [`identify()`](/docs/product-analytics/identify.md)
-   [`alias()`](/docs/product-analytics/identify.md#alias-assigning-multiple-distinct-ids-to-the-same-user)
-   [`group()`](/docs/product-analytics/group-analytics.md)

When you call any of these functions, it creates a [person profile](/docs/data/persons.md) for the user. Once this profile is created, all subsequent events for this user will be captured as identified events.

Alternatively, you can set `personProfiles` to `.always` to capture identified events by default.

## Flutter

If you've set the [`personProfiles` config](/docs/libraries/flutter.md#person-profiles-anonymous-vs-identified-persons) to `PostHogPersonProfiles.identifiedOnly` (the default option), anonymous events are captured by default. Then, to capture identified events, call any of the following functions:

-   [`identify()`](/docs/product-analytics/identify.md)
-   [`alias()`](/docs/product-analytics/identify.md#alias-assigning-multiple-distinct-ids-to-the-same-user)
-   [`group()`](/docs/product-analytics/group-analytics.md)

When you call any of these functions, it creates a [person profile](/docs/data/persons.md) for the user. Once this profile is created, all subsequent events for this user will be captured as identified events.

Alternatively, you can set `personProfiles` to `PostHogPersonProfiles.always` to capture identified events by default.

## Identify best practices

### 1\. Call `identify` as soon as you're able to

In your frontend, you should call `identify` as soon as you're able to.

Typically, this is every time your **app loads** for the first time, and directly after your **users log in**.

This ensures that events sent during your users' sessions are correctly associated with them.

You only need to call `identify` once per session, and you should avoid calling it multiple times unnecessarily.

If you call `identify` multiple times with the same data without reloading the page in between, PostHog will ignore the subsequent calls.

### 2\. Use unique strings for distinct IDs

If two users have the same distinct ID, their data is merged and they are considered one user in PostHog. Two common ways this can happen are:

-   Your logic for generating IDs does not generate sufficiently strong IDs and you can end up with a clash where 2 users have the same ID.
-   There's a bug, typo, or mistake in your code leading to most or all users being identified with generic IDs like `null`, `true`, or `distinctId`.

PostHog also has built-in protections to stop the most common distinct ID mistakes.

### 3\. Set up person profiles and properties

You'll notice that one of the parameters in the `identify` method is a `properties` object.

This enables you to set [person properties](/docs/product-analytics/person-properties.md).

Whenever possible, we recommend passing in all person properties you have available each time you call identify, as this ensures their person profile on PostHog is up to date.

Person properties can also be set being adding a `$set` property to a event `capture` call.

**\`$set\` and \`$set\_once\` aren't stored on events**

These properties only tell PostHog how to update person data during ingestion — they aren't kept on the stored event, so you can't filter, break down, or query events by them. To query the values you set, use [person properties](/docs/product-analytics/person-properties.md) instead.

See our [person properties docs](/docs/product-analytics/person-properties.md) for more details on how to work with them and best practices.

## Mobile SDK version considerations

When using PostHog's mobile SDKs, any changes made to `personProfiles` configuration will only apply to users who have updated their app to the latest version. This is because mobile SDKs are bundled with your app and cannot be updated dynamically.

**Impact on existing users:**

Users running older versions of your app will continue using the `personProfiles` configuration that was bundled with their installed version, even after you release updates with new configurations.

**Managing version differences:**

To ensure consistent behavior across your user base, you can:

1.  Use feature flags (with a version payload) to detect users running outdated app versions
2.  Implement an update flow to guide users to install the latest version
3.  Consider making app updates mandatory for critical changes

This will help maintain consistency in how person profiles are handled across your entire user base.

## Frequently asked questions

### General questions

What can I do with anonymous events?

You **can**:

-   Set [event properties](/docs/product-analytics/capture-events.md#setting-event-properties)
-   Aggregate and filter events by event properties (e.g. URL, location, UTM source)
-   Create insights like [trends](/docs/product-analytics/trends/overview.md), [funnels](/docs/product-analytics/funnels.md), [SQL insights](/docs/product-analytics/sql.md) and more

You **cannot**:

-   Set [person properties](/docs/product-analytics/person-properties.md)
-   Create [cohorts](/docs/data/cohorts.md)
-   Use Lifecycle insights
-   Filter on person properties
-   Use person properties for targeting feature flags, A/B tests, or surveys
-   Query the [`persons` table](/docs/data-warehouse/sources/posthog.md#persons) using the [SQL editor](/docs/data-warehouse/query.md)
-   Use group analytics

What can I do with identified events?

You can use all of PostHog's features with identified events. There are no restrictions.

What happens to events when an anonymous user is identified?

All future events are associated with their person profile and are captured and billed as identified events.

Past events are attributed to the person, but are otherwise unchanged. This means that past events remain billed as anonymous.

Can I specify some events to be identified and others to be anonymous for the same users?

Not if you already identified them. Once a user is identified, all *future* events for that user are associated with their person profile and are captured as identified events.

How do I revert back to anonymous events after identifying?

Calling [`reset()`](/docs/product-analytics/identify.md#reset) will unlink the person profile from the user and create a new PostHog anonymous ID for capturing events. Any future events are captured as anonymous events.

However, if you capture events using the `distinct_id` used in their previously identified person profile, the events are captured as identified events. You need to use a new `distinct_id` to capture events as anonymous events.

### Data questions

Can identified events still be "anonymous"?

Yes, identified events can still be "anonymous" in the sense that they don't need to contain personal information such as name, email, or phone number. A person profile is still created for them, but it doesn't need to include any personal information.

How are initial person properties set when an anonymous user is identified?

As person properties are not stored on anonymous events, we cannot get any initial person properties directly from those events. Instead, we retrieve the initial person properties based on the values in the [persistence store](/docs/libraries/js/persistence.md).

We derive the following values from the persistence store:

-   `$initial_current_url`
-   `$initial_pathname`
-   `$initial_referrer`
-   `$initial_referring_domain`
-   `$initial_host`
-   and any initial properties that can be derived from the URL e.g., `$initial_utm_campaign`, `$initial_utm_content`, `$initial_utm_medium`, `$initial_utm_source`

Note that the above initial parameters will only work across subdomains if you're using `persistence: "localStorage+cookie"` (default) or `persistence: "cookie"`.

For cross-domain traffic, or when tracking users between web and mobile, cookie-based data wouldn't be available on the new site, so it's advised to call one of:

-   `posthog.identify()` if you have a persistent user ID available, or
-   `posthog.createPersonProfile()` if you don't have a persistent user ID. Make sure that you are bootstrapping the PostHog SDK on the new second or mobile app with the anonymous distinct ID from the first site.

Any other initial [person properties](/docs/product-analytics/person-properties.md#default-person-properties), including initial [GeoIP properties](/docs/product-analytics/person-properties.md#geoip-properties) will be set from the values in the event at the time that the person profile was created i.e. when the events became identified.

If we change our \`person\_profiles\` config from \`identified\_only'\`to \`always\`, will we get all the person data from the previously captured anonymous events?

No, anonymous events only capture the event data and none of the person data. If that person is identified at a later date – either by identifying them or changing your configuration settings – there isn't a way to retrieve the person properties from the previously captured anonymous events.

### Insights questions

Are there any insights that behave differently?

Most insights make use of both anonymous and identified events. The exception to this is [lifecycle insights](/docs/product-analytics/lifecycle.md), as anonymous events are excluded from this calculation. Users who first appear as 'new' might have had prior anonymous events, but their lifecycle starts only when they are identified.

Why am I seeing "Person without distinct\_id" in my insights?

These are users who do not have a person profile and are anonymous users. We're aware that the wording here is confusing and are looking into updating this.

Why am I seeing drops in my insights that rely on person properties?

If you have previously had your `person_profiles` config set to `always` and your `person_profiles` config is now set to `identified_only`, you will likely see a dip in your insights graph if the filter settings include a person property.

Insights using person properties in the filter settings will essentially be filtering on identified events, where the person profile linked to that event has the relevant property set.

Changing your `person_profiles` config to `identified_only` now means that there are fewer person profiles being created and being associated with events, and therefore fewer events to be included in your insight. The person profile won't exist until the person has been identified, which may happen at a later date or not happen at all.

Depending on what you're trying to visualize, you may be able to use some of the properties on the events themselves to achieve a similar outcome – e.g. by filtering on the referring domain on the first ever pageview for each user, instead of the initial referrer person property.

### Billing questions

Why are identified events more expensive?

Since identified events are associated with a person profile, processing and querying them requires using resource intensive table JOINs. On the other hand, anonymous events are stored in a single table, and are more efficient to query. [Read this post](/blog/analytics-pricing.md#why-are-anonymous-events-so-much-cheaper) for more detail on this.

Why am I being charged for both "events" and "persons"

We're not charging you for both. The person profiles line item you see on your invoice is a number of identified events captured. The events line item is the total number of anonymous events captured.

How does my free allowance work for anonymous vs identified events?

Your first one million events each month are free, regardless if they are anonymous or identified.

### Still have questions?

Ask PostHog AI

### Was this page useful?

HelpfulCould be better