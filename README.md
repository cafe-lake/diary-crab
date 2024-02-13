# 絵日記クラブ
## 環境構築
### git clone
```
git clone git@github.com:cafe-lake/diary-crab.git
```
### .env.exampleからコピーで.envを作って必要な情報を入れる
```
cp .env.example .env
```

### dockerコンテナ立ち上げ
```
docker-compose up
```
### フロントエンドサーバー起動
```
docker exec -it client bash
```
でコンテナ内に入り
```
npm install && npm run dev
```

### バックエンドサーバー起動
```
docker exec -it server bash
```
でコンテナ内に入り
```
npm install && npm run dev
```
### migration
```
docker exec -it server bash
```
でコンテナ内に入り

初回なら
```
npx prisma migrate dev --name init
```

テーブル追加、変更などしたら
```
npx prisma migrate dev --name ええかんじのmigrationの内容がわかる名前
```