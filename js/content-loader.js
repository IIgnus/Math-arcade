import {
  validateContent
} from './content-validator.js';

export function loadStemContent(rawContent) {
  const report = validateContent(rawContent);

  if (!report.valid) {
    console.group('STEM Quest content errors');

    report.errors.forEach(error => {
      console.error(
        `[${error.code}] ${error.message}`,
        error.location
      );
    });

    console.groupEnd();

    throw new Error(
      `Content validation failed with ${report.errors.length} error(s).`
    );
  }

  if (report.warnings.length > 0) {
    console.group('STEM Quest content warnings');

    report.warnings.forEach(warning => {
      console.warn(
        `[${warning.code}] ${warning.message}`,
        warning.location
      );
    });

    console.groupEnd();
  }

  return {
    courses: rawContent,
    report
  };
}

export function formatContentReport(report) {
  if (!report) {
    return {
      summary: 'Content has not been checked.',
      status: 'unknown'
    };
  }

  const {
    counts = {},
    errors = [],
    warnings = []
  } = report;

  const summary = [
    `${counts.courses || 0} courses`,
    `${counts.topics || 0} topics`,
    `${counts.lessons || 0} lessons`,
    `${counts.questions || 0} questions`,
    `${errors.length} errors`,
    `${warnings.length} warnings`
  ].join(' · ');

  return {
    summary,
    status: errors.length > 0
      ? 'error'
      : warnings.length > 0
        ? 'warning'
        : 'healthy'
  };
}
