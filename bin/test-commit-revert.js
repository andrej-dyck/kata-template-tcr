#!/usr/bin/env node

import { tcr } from './tcr.js'

process.exit(
  await tcr(console)
)
