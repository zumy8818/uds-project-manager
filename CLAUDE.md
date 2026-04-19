# uds-project-manager

## プロジェクト概要
新規プロジェクトの設計・実行・検証・判断を一気通貫で管理する自社用業務ツール。
アイデアをコンセプトに落とし、実行計画・タスク・進捗・数値・利益判断まで一画面で管理する。

## 技術スタック
- フロントエンド：React / Vite
- データベース：Supabase（PostgreSQL）
- AI連携：Claude API（Supabase Edge Functions経由）
- デプロイ：GitHub Actions → FTP（Lolipop）

## ディレクトリ構成
src/
├── components/   # 共通UIコンポーネント
├── pages/        # 各画面
├── lib/          # Supabase接続・API呼び出し
└── assets/       # 画像・アイコン

## 画面構成
1. ダッシュボード
2. 新規プロジェクト作成
3. コンセプトメイキング
4. 全体設計
5. 実行ロードマップ
6. タスク管理
7. 進捗確認
8. 数値管理・利益判定
9. 振り返り・継続/撤退判断

## DB構成（Supabase）
- projects：基本情報
- concepts：コンセプト
- designs：全体設計
- roadmaps：ロードマップ
- tasks：タスク
- financials：数値・利益
- reviews：振り返り

## 開発ルール
- コミットプレフィックス：feat / fix / update / docs / style / delete
- ブランチ：main運用（規模が大きくなったらdevelop分離）
- 環境変数：.envで管理、.gitignoreに必ず含める
- Supabase接続情報は必ず.envに記載しコードに直書きしない

## 環境変数（.env）
VITE_SUPABASE_URL=https://hqkurxiifpyvltggpta.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_xxxxxxxxxx（実際のキー）

## 作業PC
- ShopPC：username = owner / C:\dev\UDS\uds-project-manager
- HomePC：username = scare / C:\dev\UDS\uds-project-manager（GitHub経由で同期）