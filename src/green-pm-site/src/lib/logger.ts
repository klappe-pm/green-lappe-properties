/**
 * Structured JSON logging for server contexts (Cloudflare Pages Functions),
 * per 80-system-architecture.md. One line of JSON per event so logs are
 * queryable. Errors should also flow to Sentry (wired separately). Do not log
 * PII or secrets.
 */
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogFields {
  [key: string]: string | number | boolean | null;
}

export type LogRecord = LogFields & { level: LogLevel; event: string; timestamp: string };

/** Build a structured log record (also useful for assertions/tests). */
export function buildLog(level: LogLevel, event: string, fields: LogFields = {}): LogRecord {
  return {
    ...fields,
    level,
    event,
    timestamp: new Date().toISOString(),
  };
}

/** Emit a structured log line to the appropriate console channel. */
export function logEvent(level: LogLevel, event: string, fields: LogFields = {}): string {
  const record = buildLog(level, event, fields);
  const line = JSON.stringify(record);
  const channel = level === 'error' ? console.error : level === 'warn' ? console.warn : console.log;
  channel(line);
  return line;
}
