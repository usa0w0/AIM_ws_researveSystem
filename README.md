# AIM-SC ワークショップ予約システム

## 概要
開催予定のワークショップを一覧で確認でき、簡単に予約・キャンセルができるフォームアプリ

## URL
- [システムデモ](https://script.google.com/macros/s/AKfycbyAnBluPHYrX6RY7lADeC0DCnCzBTi4PElMXsmjeBbBttzsVXXY4yYOtpp_tsJGP8to/exec)
- [予約者DB（デモ）](https://docs.google.com/spreadsheets/d/14P-oIABdGodeiXzJ_KCYXiy8z7f30MnzrYaQwuBlq2c/edit?usp=sharing)

------

## 目的
現在、青山学院大学附置情報メディアセンターに属するAIM Commonsでは、様々なワークショップを提供している。
今後より一層活発に企画していくために、利用者が容易に存在を知ることができ、申し込めるようなシステムの開発を目的とする。


## 機能一覧
### 管理画面
- 新規のフォーム作成
- フォームに質問モジュールの追加
    - タイトルと説明
    - 短文回答
    - 長文回答
    - ラジオボタン
    - チェックボックス
- 既存フォームの削除

### 利用者画面
- 募集中のワークショップの確認
    - フォームへの回答・応募
- 募集の終了したワークショップの確認
- 予約済みフォームの表示
    - 回答内容の確認
    - 応募のキャンセル

### サーバーサイド
- 回答のバリデーション
- 終了したワークショップの削除