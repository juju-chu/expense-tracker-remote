const Record = require('../record.js')
const db = require('../../config/mongoose.js')
const Category = require('../../models/category.js')

db.once('open', () => {
  Record.create([
    {
      name: '電費',
      category: '家居物業',
      categoryIcon: '<i class="fas fa-home"></i>',
      amount: 1100,
    },
    {
      name: '水費',
      category: '家居物業',
      categoryIcon: '<i class="fas fa-home"></i>',
      amount: 300,
    },
    {
      name: '停車',
      category: '交通出行',
      categoryIcon: '<i class="fas fa-shuttle-van"></i>',
      amount: 30,
    },
    {
      name: '迷客夏',
      category: '餐飲食品',
      categoryIcon: '<i class="fas fa-utensils"></i>',
      amount: 65,
    },
    {
      name: '電影：神力女超人1984',
      category: '休閒娛樂',
      categoryIcon: '<i class="fas fa-grin-beam"></i>',
      amount: 650,
    },
    {
      name: '一卡通加值',
      category: '交通出行',
      categoryIcon: '<i class="fas fa-shuttle-van"></i>',
      amount: 200,
    },
    {
      name: '還錢',
      category: '其他',
      categoryIcon: '<i class="fas fa-pen"></i>',
      amount: 500,
    },
  ]).then(() => {
    db.close()
    console.log('recordSeeder.js done.')
  })
})
