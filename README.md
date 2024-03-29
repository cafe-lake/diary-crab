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
必要な情報はcafe-lakeに聞いてね

### AWS設定
ローカルからでもAWS S3に画像を保存できるように設定する。
ホストマシンに```~/.aws/config```ができるのでそれをdocker内に入れる。
2/25時点で↓記載するけど間違ってるかもなので適宜修正していく。

#### 初期設定
- aws cliをホストマシンにインストール
  - https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html
  - ターミナルでawsコマンドが使えるようになる
- ターミナルで```aws configure sso```
  - このコマンド打つと、質問事項聞かれるのでcafe-lakeに聞いてね
- ターミナルで```aws sso login```
  - 言われるがままに進んでログイン

#### 開発時
- ```aws sso login```
  - 言われるがままに進んでログイン
  - 開発中にセッション切れるとS3保存時にエラーになるのでこれやって再ログイン

### dockerコンテナ立ち上げ
```
docker compose up -d
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

### データ投入
ローカルにデータを投入
```
npx prisma db seed
```

### フロントのディレクトリ構成
[これ](https://zenn.dev/brachio_takumi/articles/5af43549cdc4e0#%2Fsrc-%E3%82%92%E4%BD%9C%E3%82%89%E3%81%9A%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E7%9B%B4%E4%B8%8B%E3%81%AB%2Fapp-%E3%82%92%E4%BD%9C%E3%82%8A%E3%81%9D%E3%81%AE%E4%B8%AD%E3%81%AB%E6%A7%8B%E6%88%90%E3%81%99%E3%82%8B)を参考

### AWS Copilot
基本はこれで操作したいけど、画面からインフラいじった場合はここに公開していい範囲で何に何をしたか追記していく。
後々↑が追えなくなると困りそう
- S3
  - オブジェクト所有者のところ