const Category = require('../record.js')
const db = require('../../config/mongoose.js')

db.once('open', () => {
  Category.create([
    {
      name: '電費',
      category: '家居物業',
      amount: 1100,
    },
    {
      name: '水費',
      category: '家居物業',
      amount: 300,
    },
    {
      name: '停車',
      category: '交通出行',
      amount: 30,
    },
    {
      name: '迷客夏',
      category: '餐飲食品',
      amount: 65,
    },
    {
      name: '電影：神力女超人1984',
      category: '休閒娛樂',
      amount: 650,
    },
    {
      name: '一卡通加值',
      category: '交通出行',
      amount: 200,
    },
  ]).then(() => {
    db.close()
    console.log('recordSeeder.js done.')
  })
})
