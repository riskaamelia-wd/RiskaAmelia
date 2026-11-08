import * as Sentry from "@sentry/nextjs";
export function register() {
  const dsn = process.env.SENTRY_DSN;
  if (dsn)
    Sentry.init({
      dsn,
      tracesSampleRate: 0,
      dataCollection: {
        userInfo: false,
        cookies: false,
        httpHeaders: false,
        httpBodies: [],
        urlQueryParams: false,
      },
    });
}
export const onRequestError = Sentry.captureRequestError;
