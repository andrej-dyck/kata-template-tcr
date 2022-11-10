import { shellExec } from './shell-exec.js'

export const tcr = (logger) =>
  testOrRevert({ onSuccess: tryCommit(logger) }, logger)

export const testOrRevert = async (
  { onSuccess },
  logger = console,
) => {
  logger.log('✅  test && ⏺  commit || ⏮  revert', process.argv)

  logger.log('⏳  running tests')
  return await shellExec('npm run test', logger)
    .then(({ code }) => {
      logger.log('✅  tests successful')

      return onSuccess() ?? code
    })
    .catch(async ({ code }) => {
      logger.error('❌  tests failed')

      await shellExec('git reset --hard HEAD && git clean -fd', logger)
      logger.log('⏮  hard reset\n')

      return code
    })
}

const tryCommit = (logger) => () => {
  logger.log('⏳  committing work...')

  return shellExec('git add . && git commit -m "it works" --no-verify', logger)
    .then(({ code }) => {
      logger.log('⏺  work committed')
      return code
    })
    .catch(({ code }) => {
      logger.error('❌  commit failed')
      return code
    })
}

