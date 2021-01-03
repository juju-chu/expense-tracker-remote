# 老爸的私房錢

## 環境建置與需求 (prerequisites)
+ 開發環境：Visual Studio Code
+ 應用程式架構：Express
+ 模板引擎：Express-Handlebars

## 安裝與執行步驟 (installation and execution)
1. 打開 terminal 輸入指令：git clone https://github.com/juju-chu/restaurant_list_remote.git
2. 進入存放此專案的資料夾
3. 用 nvm 指令安裝 Node.js：nvm install <版號>
  - 只要執行 npm install，就會依 package.json 的清單來安裝套件，安裝後會自動建立 /node_modules 資料夾，把相依的套件統一歸類在這個資料夾裡。
4. 執行
  - npm run start → 等於執行 "node app.js"
  - npm run dev → 等於執行 "nodemon app.js"
  - npm run seed → 等於執行 "node models/seeds/restaurantSeeder.js"

## 功能
+ 在首頁一次瀏覽所有支出的清單
+ 在首頁看到所有支出清單的總金額
+ 新增一筆支出
+ 編輯支出
+ 刪除任何一筆支出
+ 在首頁可以根據支出「類別」篩選支出（總金額的計算只包括被篩選出來的支出總和）