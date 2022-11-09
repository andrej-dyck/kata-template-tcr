#!/usr/bin/env node
import { testOrRevert } from './test-or-revert.js'

const success = () => 0

process.exit(
  await testOrRevert({ onSuccess: success }, console)
)
