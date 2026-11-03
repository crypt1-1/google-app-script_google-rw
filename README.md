# 🌙 RulesManager-AutoLogger システム仕様 & 索引 README

本リポジトリおよびシステムは、Google Apps Script (GAS) と Web App コントロールパネルを基盤とし、プロジェクトのログ管理、タスク追跡、ナレッジドキュメントの自動生成・インデックス化を完全自動化するための運用管理システムです[cite: 2]。

---

## 📋 概要
- **目的**: 開発資産、タスク、作業記録の標準化および RAG / Local LLM による横断検索性の最大化[cite: 2, 4]。
- **技術スタック**: Google Apps Script (GAS), HTMLService (ダークモード対応 Web UI), Google Drive API。
- **管理ポリシー**: 厳格な命名規則、4桁/8桁ゼロ埋めユニーク採番、および README ChangeLog への降順自動同期[cite: 2, 5, 6]。

---

## 📁 Google Drive 10コアフォルダ構造
システムが常時アサート（整合性検証）および連携を行う運用ターゲットディレクトリです[cite: 2]。
1. `00_Overview`: プロジェクト全体の概観・基準[cite: 2]
2. `01_Project-Milestones`: 蓄積型作業記録 (`.md`) の保存先[cite: 2]
3. `02_README`: 本索引ファイル (`README.md`) および ChangeLog の保管先[cite: 2, 6]
4. `03_SKILLs_backup`: AI アシスタント用 Skill 定義のバックアップ[cite: 2]
5. `04_Pivot`: 方向転換・ピボット設計の記録[cite: 2]
6. `05_Journal`: 日次ジャーナル・日報[cite: 2]
7. `06_Web_knowledge`: 外部 Web 知識および `github-repository` ナレッジの保管先[cite: 2]
8. `07_Knowledge`: コピペテキストの要約・構造化データの保存先[cite: 2]
9. `08_Tags`: タグ辞書・分類管理[cite: 2, 5]
10. `09_Tasks`: インシデント・運用タスク管理 (`Task_...md`) の保存先[cite: 2, 7]

---

## 🔄 ChangeLog - 索引

##### [2026-11-03] GitHub Repository ナレッジ自動生成機能およびTaskカンバン管理の統合 - No.0002
tag: #GitHub #TaskManagement #Automation #Rule
- **本日の作業概要**:
  - Web App コントロールパネルへのタスク管理（09_Tasks 連携）の実装
  - GitHub Repository の自動解析・Installガイド自動生成機能の追加
  - 4桁/8桁ゼロ埋め採番モジュール (`03_NumberingService`) と README 降順自動同期の確立
  - ダークモード対応統合 UI (`Index.html`) の刷新

##### [2026-10-17] 運用ルールの策定および初期設定の実施 - No.0001
tag: #Rule #Setup #Phase-1
- **本日の作業概要**:
  - 10個のコアフォルダ構造の定義と自動アサート機能の実装[cite: 2]
  - Project Milestones および README 記載ルールの制定[cite: 3, 6]
  - 命名規則（`YYYY-MM-DD_Project-Overview_No.0001.md`）の確定[cite: 2]

---

## 🛠 主要機能 & Web App パネル仕様
1. **作業記録の作成**: 
   - 規程フォーマット (`YYYY-MM-DD_[Title]_No.xxxx.md`) で `01_Project-Milestones` へ自動保存し、同時に `README.md` の ChangeLog へ降順インデックスを追記[cite: 2, 5, 6]。
2. **タスク管理 (09_Tasks カンバン)**:
   - 優先度 (`P1`〜`P3`)、状態（未対応〜解決済み）に応じたタスク起票・原本原本パス埋め込み・パネル上からのステータス即時同期[cite: 6, 7]。
3. **GitHub Repository ナレッジ自動生成**:
   - リポジトリ URL から概要、前提条件、Install ガイド、実行コマンド集を構造化した Markdown を自動生成し、`06_Web_knowledge/github-repository` へ蓄積。
