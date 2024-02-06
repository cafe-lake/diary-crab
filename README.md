# 絵日記クラブ
## 環境構築
### git clone
```
git clone git@github.com:cafe-lake/diary-crab.git
```
### dockerコンテナ立ち上げ
```
docker-compose up
```
### フロントエンドサーバー起動
```
docker exec -it コピーしたコンテナID bash
```
でコンテナ内に入り
```
npm run dev
```

### バックエンドサーバー起動
```
docker exec -it コピーしたコンテナID bash
```
でコンテナ内に入り
```
npm run dev
```
### backendコンテナ内でmigration
```
npx prisma migrate dev --name init
```