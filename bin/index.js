#!/usr/bin/env node
const { getData, render } = require('../utils').default
const program = require('commander');
require('../utils/ws')

program
  .version(`${require('../package').version}`, '-v, --version')
  .command('go')
  .description('获取弱智吧内容')
  .action(async () => {
    const arr = await getData()
    render(arr)
  })

program.parse(process.argv)