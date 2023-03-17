const axios = require('axios');
const cheerio = require('cheerio');

exports.getData = function() {
  return axios.get('https://tieba.baidu.com/f?kw=%E5%BC%B1%E6%99%BA%E5%90%A7&ie=utf-8')
  .then((response) => {
    const arr = []
    const $ = cheerio.load(response.data);
    // 过滤置顶的吧规
    $('.j_thread_list:not(.thread_top)').each((i, element) => {
      const titleEle = $(element).find('.threadlist_title');
      const textELe = $(element).find('.threadlist_text');
      
      let title = ''
      let text = ''
      if (titleEle.length) {
        title = `${titleEle.text().trim()}`
      }
      
      // $(textELe).find('img').length <= 0
      // 暂时不知道图片怎么处理
      if (textELe.length) {
        text = textELe.text().trim()
      }
      arr.push(`title:${title}${text ? `\ncontent:${text}` : ''}`)
    });
    return arr
  })
  .catch((error) => {
    console.log(`很抱歉，你因为太正常而无法进入弱智吧，踢踢网线再试`);
  });
}