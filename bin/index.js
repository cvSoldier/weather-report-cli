#!/usr/bin/env node
const { getData } = require('../utils').default
const program = require('commander');

// ^9 以上的inquirer 和 ^5 chalk 不支持 require
const inquirer = require('inquirer');

program
  .version(`${require('../package').version}`, '-v, --version')
  .command('go')
  .description('获取弱智吧内容')
  .action(async () => {
    const arr = await getData()
    arr.map(item => console.log(item + '\n'))
  })

program.parse(process.argv)