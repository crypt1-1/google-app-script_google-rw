# 【運用ルール】プロジェクト記録・管理・GAS自動化規約

### 1. 基本目的とアシスタント/自動化の役割

- チャット内の会話やログから**日々の作業、発生したタスク、プロジェクトの進捗、課題、決定事項、および次の対応**を正確に抽出・整理し、標準化された記録を作成します。
- 記録の作成および管理にあたっては、規定のテンプレート、`Project Milestones` 規約、および `README.md` 運用仕様書を厳格に遵守します。

---

### 2. 原本確認および構成表示の強制ルール【必須規約】

- 原本検証の義務化: タスクの切り出し、ログ更新、作業の実施、および GAS 処理の実行前には、必ず Google Drive 上の原本フォルダ構成および格納ファイルを照合・確認すること。
- ディレクトリ構成の出力表示: 提出物や作業記録、各種レポート内には、実際にアサート・確認した最新の原本ディレクトリ階層構造を必ず明記・提示すること。

---

### 3. Project Milestones 記載ルール

- 記録媒体の役割: プロジェクトの主要マイルストーンや進捗を管理する蓄積型記録媒体（`.md`）として運用します。
- 推測の完全排除: チャット内やソース情報に存在しない項目は、推測で書かず必ず「**Not specified**」と記載すること。
- 共通ユニーク採番: 全プロジェクト共通のユニーク連番 `No.XXXX`（1〜9,999は4桁ゼロ埋め例: `No.0001`、10,000以上は8桁）を必須付与すること。
- リアルタイム追記 & 降順管理: 新しい記録は常に最上位（降順 / 逆時系列）に追記・管理すること。
- 秘匿情報の排除: パスワード、APIキー、認証トークン等の機密情報は一切記録に含めないこと（Zero-Tolerance Policy）。

---

### 4. README.md / ChangeLog（索引）運用ルール

記録媒体の役割: プロジェクト全体の変更履歴（ChangeLog）および検索性を高めるための索引媒体として機能します。
ChangeLog 自動連携: `Project Milestones` 作成時、同時に `README.md` の ChangeLog へ `[YYYY-MM-DD] 作業概要 - No.XXXX` の形式で降順（最上位）追記を行うこと。

---

### 5. タグ管理仕様（Tags Management）

- 検索性の確保: 分類および RAG / Local LLM 走査を容易にするため、規定のタグ（例: `#Rule`, `#Setup`, `#Phase-1` など）を適切に付与すること。
- フォーマットルール: ハッシュタグ `#` で開始し、半角スペース区切りで記載すること。

※ 個人情報や機密情報をタグに含めないこと。


### 6. GAS自動化システム（`RulesManager-AutoLogger`）運用構成

ログ管理およびアサート処理を自動化する GAS モジュール構造および参照 Drive フォルダ ID: 

#### 【参照原本 Drive フォルダ構造】

```
Google Drive Root (ID: 1-MNJkalzkhK\_oR4GL4GSTLcIzkjHIe-0)
  ├── 📁 00\_Overview (ID: 1oI8VKTqOzJUk1I\_b1nEP\_VS51xb-tckA)
  ├── 📁 01\_Project-Milestones (ID: 12fiFeEYTozuwlLyjYKreEfY8XT5LnWIx)
  ├── 📁 02\_README (ID: 1WZJsrMQPN42thhs78KwVcwxZpipjGaBH)
  ├── 📁 03\_SKILLs\_backup (ID: 1C4YhJvRefn0NCh2xqM0Sz4m6uvI8SC9L)
  ├── 📁 04\_Pivot (ID: 1slIfoJqumGocdVOkMQKLRDGjIIT0a-O2)
  ├── 📁 05\_Journal (ID: 1\_3SeVY1H7J-vvqbQu7yhvQwU\_-GV66q2)
  ├── 📁 06\_Web\_knowledge (ID: 1u6yZz\_BK7yOUFEOCX5hGFkStF4d0Ml3H)  
  │  └── 📁 github-repository (ID: 1YH5yN\_PjZw0c\_ht3wp8LmfNq2mb212zS)
  ├── 📁 07\_Knowledge (ID: 1EKtQIRqg2BuIMvmK-N\_gsq5nYIAymA7b)
  ├── 📁 08\_Tags (ID: 1zBwAGYct8AMGktSf4sFyx2TY4GmmuzJO)
  └── 📁 09\_Tasks (ID: 13nJ\_4eX-MAAIxOy6cIu4-nJkMGLve\_4X)
```

#### 【GAS モジュール設計】

- 01_Config.gs: 10箇所の Drive フォルダ ID 定数化およびフォルダ実在自動アサート (assertAndGetFolder_)
- 03_NumberingService.gs: 4桁/8桁ゼロ埋めユニーク連番 (No.0001) の自動発行
- 05_ReadmeUpdater.gs: README.md ChangeLog 降順自動追記
- 07_TaskManager.gs: 09_Tasks へのタスク保存および参照原本 URL 自動埋め込み
- grw.gs: Web App バックエンド（作業ログ作成・採番・README 更新連携）
- Index.html: ダークモード対応コントロールパネル UI
- runTask.gs: 定期実行トリガー用エントリポイント（自動巡回・アサート・レポート出力）

