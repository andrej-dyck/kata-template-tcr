#!/usr/bin/env node
import { testOrRevert } from './tcr.js'

const success = () => 0

process.exit(
  await testOrRevert({ onSuccess: success }, console)
)
