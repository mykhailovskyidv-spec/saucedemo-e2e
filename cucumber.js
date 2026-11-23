// Cucumber configuration. Profiles: default, smoke, regression.
// Run a profile: npx cucumber-js --profile smoke
// Run by tag:    npx cucumber-js --tags "@cart and not @wip"

const common = {
  paths: ['features/**/*.feature'],
  requireModule: ['ts-node/register'],
  require: ['src/support/**/*.ts', 'src/steps/**/*.ts'],
  format: [
    'progress-bar',
    'html:reports/cucumber-report.html',
    'json:reports/cucumber-report.json',
    'junit:reports/junit.xml',
  ],
  formatOptions: { snippetInterface: 'async-await' },
  // On CI, re-run a failed scenario once, but only if it is tagged @flaky
  ...(process.env.CI ? { retry: 1, retryTagFilter: '@flaky' } : {}),
};

module.exports = {
  default: { ...common },
  smoke: { ...common, tags: '@smoke' },
  regression: { ...common, tags: '@regression' },
};
