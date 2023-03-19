const blessed = require('blessed');

function selectFirstOne(list, arr) {
  const firstIndex = arr.findIndex(str => str.startsWith('title'))
  list.select(firstIndex)
}
function getLastIndex(arr) {
  for(let back = arr.length - 1; back >= 0; back--) {
    if(arr[back].startsWith('title')) return back
  }
}
// 初始化屏幕和列表组件
const screen = blessed.screen({
  fullUnicode: true,
  smartCSR: true
});

exports.render = function (data, ids) {
  const list = blessed.list({
    parent: screen,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%-2',
    style: {
      selected: {
        fg: 'yellow',
      },
    },
    items: data.slice(0, 10)
  });
  
  blessed.text({
    parent: screen,
    bottom: 0,
    left: 0,
    width: '100%',
    height: 1,
    content: 'Use arrow keys to navigate, press q to quit'
  });
  
  let index = 0;
  
  // 处理列表选择事件
  list.on('select', (_, idx) => {
    console.log(`You selected ${data[idx]}`);
  });
  
  // 处理键盘事件
  screen.key(['q', 'C-c'], () => process.exit(0));
  screen.key(['up', 'k'], () => {
    index = Math.max(0, index - 1);
    list.setItems(data.slice(index, index + 10));
    selectFirstOne(list, data.slice(index, index + 10))
    screen.render();
  });

  const lastIndex = getLastIndex(data)
  screen.key(['down', 'j'], () => {
    index = Math.min(lastIndex, index + 1);
    list.setItems(data.slice(index, index + 10));
    selectFirstOne(list, data.slice(index, index + 10))
    screen.render();
  });

  // 显示屏幕
  screen.render();
}

let onlineNums = 0
exports.setUserNum = function(num) {
  if(onlineNums === num) return

  blessed.text({
    parent: screen,
    bottom: 1,
    left: 0,
    width: '100%',
    height: 1,
    content: 'online user num: ' + num
  });
  screen.render();
}