#!/usr/bin/env node
import { exec } from 'node:child_process'
import { promisify } from 'node:util'

console.log('😎 test && commit || 🙃 revert', process.argv)
try {
  const { stdout, stderr } = await promisify(exec)('npm run test')
  console.log('✅ tests successful', stdout, stderr)
} catch (e) {
  console.error('❌ tests failed', e.stdout, e.stderr)

  const { stdout, stderr } = await promisify(exec)('git reset --hard HEAD && git clean -fd')
  console.log('⏮ hard reset\n', stdout, stderr)

  process.exit(e.code)
}
