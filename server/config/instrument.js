// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
//const Sentry = require("@sentry/node");
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: "https://ee33eb59f5b3ad41449e78bafc56b7a0@o4509220779458560.ingest.us.sentry.io/4509220786143232",

  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  integrations: [Sentry.mongooseIntegration()],
  sendDefaultPii: true,
});
