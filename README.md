# 営業日カレンダー生成ツール

このツールは、指定した期間の第N営業日のスケジュールを含む.icalファイルを生成するWebアプリケーションです。静的なファイル（HTML+JS+CSS）のみで構成されており、サーバーサイドの処理を必要とせずに.icalファイル（RFC2445準拠）をダウンロードできます。

![営業日カレンダー生成ツール](./public/screenshot.png)

## 機能

- 期間設定：何年何月から何年何月までのスケジュールを生成するかを指定
- 営業日設定：第何営業日のデータを取得するかを選択（1〜30営業日）
- 時間設定：イベントの開始時間と終了時間を指定
- 営業日表示：設定に基づいて計算された営業日の一覧を表示
- iCalファイルのダウンロード：設定に基づいて生成されたiCalファイルをダウンロード

## 使用技術

- [Next.js 15](https://nextjs.org/) - Reactフレームワーク（SSG機能を使用）
- [TypeScript](https://www.typescriptlang.org/) - 型安全なJavaScript
- [dayjs](https://day.js.org/) - 日付操作ライブラリ
- [ical-generator](https://github.com/sebbo2002/ical-generator) - iCalファイル生成ライブラリ
- [Tailwind CSS](https://tailwindcss.com/) - CSSフレームワーク

## ローカル開発環境のセットアップ

```bash
# リポジトリのクローン
git clone https://github.com/yourusername/ical-generator.git
cd ical-generator

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

開発サーバーが起動したら、ブラウザで [http://localhost:3000](http://localhost:3000) にアクセスしてアプリケーションを確認できます。

## ビルドと静的ファイルの生成

```bash
# 静的ファイルの生成
npm run export
```

生成された静的ファイルは `out` ディレクトリに保存されます。

## GitHub Pagesへのデプロイ

このプロジェクトはGitHub Actionsを使用して、GitHub Pagesに自動的にデプロイするように設定されています。

### デプロイの設定方法

1. リポジトリの「Settings」タブを開く
2. 左側のメニューから「Pages」を選択
3. 「Source」セクションで「GitHub Actions」を選択

これにより、mainブランチにプッシュするたびに、GitHub Actionsが自動的にビルドを実行し、GitHub Pagesにデプロイします。

### GitHub Actionsの設定

`.github/workflows/deploy.yml` ファイルには、GitHub Pagesへのデプロイを自動化するためのワークフローが定義されています。このワークフローは以下の処理を行います：

1. リポジトリのチェックアウト
2. Node.jsのセットアップ
3. 依存関係のインストール
4. Next.jsアプリケーションのビルドと静的ファイルの生成
5. GitHub Pagesへのデプロイ

## 祝日データについて

このアプリケーションには、2025年から10年分の日本の祝日データが含まれています。祝日データは `src/data/holidays.ts` ファイルに定義されています。

## Clineを使用した開発について

なお、このアプリは以下文言をClineに入力するだけで作成できました。

①
```
静的なファイル（html+js+css）のみで.icalファイル(RFC2445)をダウンロードできるWebページを作り静的ホスティングをしたいです。

例えば、「第7営業日の10時から11時」などをSelectBoxなどのUIを用いて指定させ、
それらの定期的なスケジュールカレンダーが記載された.icalファイルが出力される仕組みが欲しいです。
コンポーネントは
・何年何月～何年何月までのスケジュールとするか決定するDatePicker
・何営業日のデータを取得するか、30程度までの自然数が格納されたリストボックス
・上記設定により計算された営業日を表示するテキストエリア
・icalファイルのダウンロードボタン
を想定しています。

日本の祝日は2025年から10年分をあらかじめWebで調べて登録してください。

Next.jsのSSGでGithub pagesに保存する仕組みも含め作成してください。
```

②
```
next.jsのSSGの結果をgithub pagesにホスティングするため、Github Actionsのコードを書いて
```

## ライセンス

MIT
