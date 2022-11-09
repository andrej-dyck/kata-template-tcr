#!/usr/bin/env node

import { testOrRevert } from './test-or-revert.js'
import { shellExec } from './shell-exec.js'

const tryCommit = (logger) => () => {
  logger.log('⏳ committing work...')

  return shellExec('git add . && git commit -m "it works" --no-verify', logger)
    .then(({ code }) => {
      logger.log('✅ work committed')
      return code
    })
    .catch(({ code }) => {
      logger.error('❌ commit failed')
      return code
    })
}

process.exit(
  await testOrRevert({ onSuccess: tryCommit(console) }, console)
)
