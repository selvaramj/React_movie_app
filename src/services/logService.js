import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

function init() {
  Sentry.init({
    dsn: 'https://f544e2705a904b22b7bef412928a6052@o1156081.ingest.sentry.io/6237119',
    integrations: [new BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}

function log(error) {
  Sentry.captureException(error);
}

export default {
  init,
  log,
};
