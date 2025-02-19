#!/usr/bin/env node

/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

try {
  const { CARBON_TELEMETRY_DEBUG } = process.env;
  const currentNodeVersion = process.versions.node;
  const semver = currentNodeVersion.split('.');
  const major = semver[0];

  if (major < 12) {
    if (CARBON_TELEMETRY_DEBUG) {
      console.log('@carbon/telemetry requires Node v12 or higher');
    }
    return;
  }

  process.on('uncaughtException', (error) => {
    if (CARBON_TELEMETRY_DEBUG) {
      throw error;
    }
  });

  const main = require('../src/cli');
  main(process);
} catch (error) {
  const { CARBON_TELEMETRY_DEBUG } = process.env;

  if (CARBON_TELEMETRY_DEBUG) {
    throw error;
  }
}
