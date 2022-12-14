# AIM-SC ワークショップ予約システム

## 概要
開催予定のワークショップを一覧で確認でき、簡単に予約・キャンセルができるフォームアプリ

## URL (※Chrome推奨)
- [システムデモ](https://script.google.com/macros/s/AKfycbyAnBluPHYrX6RY7lADeC0DCnCzBTi4PElMXsmjeBbBttzsVXXY4yYOtpp_tsJGP8to/exec)
- [予約者DB（デモ）](https://docs.google.com/spreadsheets/d/14P-oIABdGodeiXzJ_KCYXiy8z7f30MnzrYaQwuBlq2c/edit?usp=sharing)

---

## 目的
現在、青山学院大学附置情報メディアセンターに属するAIM Commonsでは、様々なワークショップを提供している。
今後より一層活発に企画していくために、利用者が容易に存在を知ることができ、申し込めるようなシステムの開発を目的とする。

---

## 機能一覧
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
- 管理者ステータスの変更

## 機能一覧（表）
<table>
	<thead>
		<tr>
			<th scope='col'></th>
			<th scope='col'>機能</th>
			<th scope='col'>詳細</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td rowspan='4'>管理者画面</td>
			<td>新規フォームの作成</td>
			<td>
				画面中の<code>＋</code>ボタンから新規フォームを作成できる。
				作成されたフォームのカードは、<code>設定</code>ボタンからモーダルウィンドウが展開される。
				また、フォームには、ワークショップ開催のための必須項目を設定するモジュールがあらかじめ追加されている。
			</td>
		</tr>
		<tr>
			<td>フォームに質問モジュールの追加</td>
			<td>
				モーダルウィンドウ下部の、質問モジュール<code>追加</code>のボタンから、ドロップアップで追加可能な質問形式が表示され、対応する質問モジュールを追加できる。
			</td>
		</tr>
		<tr>
			<td>フォーム情報の保存</td>
			<td>
				モーダルウィンドウ下部の、<code>保存</code>ボタンから、フォームに追加・編集した情報を保存することができる。
			</td>
		</tr>
		<tr>
			<td>フォーム情報の削除</td>
			<td>
				モーダルウィンドウ下部の、<code>削除</code>ボタンから、フォームを削除することができる。
				注意として、フォーム情報は削除されるが、回答情報は削除されない。
			</td>
		</tr>
		<tr>
			<td rowspan='3'>利用者画面</td>
			<td>募集中のワークショップの確認</td>
			<td></td>
		</tr>
		<tr>
			<td>募集の終了したワークショップの確認</td>
			<td></td>
		</tr>
		<tr>
			<td>予約済みのワークショップの確認</td>
			<td></td>
		</tr>
		<tr>
			<td rowspan='2'>サーバーサイド</td>
			<td>終了したワークショップの自動削除</td>
			<td></td>
		</tr>
		<tr>
			<td>管理者ステータスの変更</td>
			<td></td>
		</tr>
	</tbody>
</table>