# Tags Manegement

# #Roule

## 目的

- Notion 全体の横断検索と分類を揃えるためのタグ辞書。
- タグ名は `#` から始め、タグ同士は半角スペースで区切る。
- プロジェクト固有タグと共通カテゴリタグを組み合わせて使用する。
- 既存記録に使われているタグは、内容を確認せずに一括改名・削除しない。

## タグ運用ルール

- **形式**: `#Category`、`#ProjectName`、`#Phase-1` のように表記する。
- **区切り**: 複数タグは半角スペース区切り。
- **粒度**: 1タグにつき1つの分類軸・目的を持たせる。
- **一貫性**: 同じ意味のタグを日本語・英語や大小文字違いで重複作成しない。既存表記と衝突する場合は、利用状況を確認してから統合する。
- **機密性**: パスワード、APIキー、Token などの秘匿情報をタグや説明欄に記録しない。
- **ライフサイクル**: 新規タグはこの表に定義してから利用し、廃止候補は即時削除せず「非推奨」として整理する。

## 棚卸し結果（2026-10-18）

- Progress Tracking の「タグ」プロパティに標準タグを追加。
- 旧選択肢 `オンボーディング`、`デザイン`、`Template` を削除。既存ページは内容に合わせてタグを再評価し、標準表記へ整理。
- `#Rule`、`#Setup`、`#Phase-1` は既存の運用タグとして継続。
- 現時点の棚卸し対象は Progress Tracking のみ。他データベースは別途確認する。

## タグ辞書

| Tag | Category | 用途・意味 | 適用対象・例 | Status |
| --- | --- | --- | --- | --- |
| `#Rule` | Governance | 運用ルール、標準、記載規則 | README、Project Milestones、共通運用ポリシー | 既存 |
| `#Setup` | Lifecycle | 初期設定、環境構築、導入作業 | 初期設定、構成準備、セットアップ手順 | 既存 |
| `#Phase-1` | Lifecycle | フェーズ・段階を示す | Phase 1 に属する作業・成果物 | 既存 |
| `#TagManagement` | Governance | タグ辞書、タグ命名、タグ利用状況の管理 | #tags-table、Progress Tracking のタグ整理 | 標準タグ |
| `#Template` | Artifact | テンプレートや再利用可能なひな形 | Project Milestones、README、文書テンプレート | 標準タグ |
| `#README` | Artifact | 索引・概要・ChangeLog | 各プロジェクトの README | 既存概念 |
| `#Project-Milestones` | Artifact | プロジェクトの進捗・マイルストーン記録 | 進捗更新、次の節目、リスク、対応事項 | 候補 |
| `#Design` | Domain | UI/UX、デザインシステム、設計判断 | コンポーネント、デザイントークン、情報設計 | 標準タグ |
| `#Onboarding` | Domain | 導入・初回利用・セットアップ体験 | オンボーディング手順、初期体験 | 標準タグ |
| `#FileManagement` | Domain | ファイル・ディレクトリの管理設計 | name、layer、path、kind、owner、content_type | 候補 |
| `#Ingest` | Workflow | データの取り込み・登録 | raw データ、staging、ingest、RAG index | 候補 |
| `#Backup` | Workflow | バックアップ・復元対象 | backup、archive、保管方針 | 候補 |
| `#Archive` | Lifecycle | 保管・アーカイブ・現行対象外 | archive、完了済み記録、旧版資料 | 候補 |
| `#Debug` | Workflow | 調査・切り分け・デバッグ | debug_mode、障害調査、検証ログ | 候補 |
| `#Security` | Governance | 権限、認証、機密情報の安全な取り扱い | アクセス制御、秘匿情報を含めない安全設計 | 候補 |
| `#API` | Technology | API の設計・実装・連携 | REST API、連携仕様、API テスト | 候補 |
| `#MCP` | Technology | Model Context Protocol 関連 | MCP サーバー、ツール、リソース、連携 | 候補 |
| `#Docker` | Technology | コンテナ・Compose・実行環境 | コンテナ構成、ボリューム、サービス管理 | 候補 |
| `#Tailscale` | Technology | プライベートネットワーク接続 | Serve、端末間接続、ネットワーク境界 | 候補 |

## 使用例

- 運用ルールの制定: `#Rule #Setup #Phase-1`
- デザインシステムの変更: `#Design #ProjectName`
- ファイル登録・RAG 連携: `#FileManagement #Ingest #MCP`
- コンテナ環境の調査: `#Docker #Debug #Security`

## CSV の列マッピングをタグ分類に使う場合

添付 `mapping.csv` にある列はファイル管理のメタデータ候補として整理する。列名そのものをすべてタグにせず、タグは分類用、`name`・`path`・`owner`・`content_type`・`action` などはプロパティ／メタデータとして扱う。

- `kind`: directory / file / os / vm などの対象種別
- `purpose`: backup / ingest / archive / debug_mode などの目的
- `action`: backup / rag_index / skip などの処理方針
- `content_type`: markdown / json / yaml などの形式
- `owner`: osnw / atlxus などの管理主体

※上記の「候補」は、これまでの記録と CSV から整理した提案であり、既存データに適用済みであることを意味しない。既存データの一括変更は行わない。
