# react-elk
reactでelasticsearchを参照・更新するSPAアプリ
elasticsearchは以下プロジェクトで構築するものを想定
https://github.com/hudifu316/python_elk

### 起動
依存ライブラリのインストール
`npm install`
コンパイル＆起動
`npm start`


elasticsearchの接続先を変更する場合
`.env`ファイルの`REACT_APP_ES_URL=http://localhost:9200`
を修正する。