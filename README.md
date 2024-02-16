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

### フロントのディレクトリ構成
[これ](https://zenn.dev/brachio_takumi/articles/5af43549cdc4e0#%2Fsrc-%E3%82%92%E4%BD%9C%E3%82%89%E3%81%9A%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E7%9B%B4%E4%B8%8B%E3%81%AB%2Fapp-%E3%82%92%E4%BD%9C%E3%82%8A%E3%81%9D%E3%81%AE%E4%B8%AD%E3%81%AB%E6%A7%8B%E6%88%90%E3%81%99%E3%82%8B)を参考