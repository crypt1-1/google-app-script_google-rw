/**
 * @file 06_GitHubKnowledgeManager.gs
 * @description GitHub リポジトリのナレッジ & Installガイド自動生成モジュール
 */

/**
 * GitHubリポジトリ情報の解析・Markdown自動生成およびフォルダ保存
 */
function apiGenerateGitHubKnowledge(data) {
  try {
    const seqNoStr = getNextSequenceNumber(); // 4桁/8桁ゼロ埋め連番取得
    const dateStr = Utilities.formatDate(new Date(), SYSTEM_CONFIG.timezone, 'yyyy-MM-dd');
    
    // URLから owner/repository 名を抽出 (例: https://github.com/owner/repo -> owner-repo)
    let repoSlug = 'repository';
    if (data.repoUrl) {
      const match = data.repoUrl.match(/github\.com\/([^\/]+\/[^\/]+)/);
      if (match) {
        repoSlug = match[1].replace('/', '-');
      }
    }
    
    // 命名規則の適用（半角英数字・指定記号のみ）
    const sanitizedSlug = repoSlug.replace(/[^A-Za-z0-9_\-@!#$()~]/g, '');
    const fileName = 'Repo_' + dateStr + '_No.' + seqNoStr + '_' + sanitizedSlug + '.md';
    const folder = assertAndGetFolder_(DRIVE_STRUCTURE.GITHUB_REPO);
    const folderUrl = 'https://drive.google.com/drive/folders/' + DRIVE_STRUCTURE.GITHUB_REPO;

    // 構造化Markdownの構築
    const markdownContent = '# [Repo-No.' + seqNoStr + '] ' + repoSlug + '\n\n' +
      '---\n' +
      '- **登録日**: ' + dateStr + '\n' +
      '- **管理番号**: No.' + seqNoStr + '\n' +
      '- **リポジトリURL**: ' + (data.repoUrl || 'N/A') + '\n' +
      '- **カテゴリ**: #' + (data.category || 'Tool') + ' #GitHub\n' +
      '- **動作要件**: ' + (data.environment || 'Python / Node.js / Docker') + '\n' +
      '- **参照原本フォルダ**: [github-repository](' + folderUrl + ')\n\n' +
      '---\n\n' +
      '## 1. プロジェクト概要 & 要約\n' +
      '- **目的**: ' + (data.purpose || '本リポジトリが解決する課題やコア機能の解説。') + '\n' +
      '- **主な特徴**:\n' +
      '  - 特徴1: 自動インストール・構成管理のサポート\n' +
      '  - 特徴2: RAG / Local LLM 連携に最適化されたナレッジ構造\n\n' +
      '## 2. 動作要件・前提条件 (Prerequisites)\n' +
      '- 対象環境: ' + (data.environment || '標準ランタイム環境') + '\n' +
      '- 必要な依存関係および API キー設定\n\n' +
      '## 3. Install ガイド & セットアップ手順\n' +
      '```bash\n' +
      '# 1. リポジトリのクローン\n' +
      'git clone ' + (data.repoUrl || '') + '.git\n' +
      'cd ' + repoSlug.split('-').pop() + '\n\n' +
      '# 2. 依存パッケージのインストール・セットアップ\n' +
      '# (環境に応じたセットアップコマンドを実行)\n' +
      '```\n\n' +
      '## 4. 設定ファイル (.env / Config) 仕様\n' +
      '- 必要な環境変数やパラメータ設定の解説。\n\n' +
      '## 5. 実行・使用方法 (Usage)\n' +
      '- 基本実行コマンドおよび主要なオプション引数。\n\n' +
      '## 6. トラブルシューティング & 既知の制約\n' +
      '- よくあるエラーと対処法、依存関係の競合に関する注意点。\n';

    const file = folder.createFile(fileName, markdownContent, MimeType.PLAIN_TEXT);

    // README.md の ChangeLog（索引）へ降順自動追記
    appendChangeLogToReadme(dateStr, 'Repo登録: ' + repoSlug, seqNoStr, '#GitHub #' + (data.category || 'Tool'));

    return {
      success: true,
      message: 'GitHub リポジトリのナレッジドキュメント「' + fileName + '」を自動生成しました。',
      fileId: file.getId(),
      url: 'https://drive.google.com/file/d/' + file.getId() + '/view'
    };
  } catch (e) {
    return { success: false, message: e.message };
  }
}

/**
 * 登録済み GitHub ナレッジの一覧を取得する API
 */
function apiGetGitHubRepoList() {
  try {
    const folder = assertAndGetFolder_(DRIVE_STRUCTURE.GITHUB_REPO);
    const files = folder.getFiles();
    const repoList = [];

    while (files.hasNext()) {
      const file = files.next();
      if (!file.getName().endsWith('.md')) continue;

      repoList.push({
        fileId: file.getId(),
        fileName: file.getName(),
        url: 'https://drive.google.com/file/d/' + file.getId() + '/view'
      });
    }

    return repoList;
  } catch (e) {
    Logger.log('GitHubリポジトリ一覧取得エラー: ' + e.message);
    return [];
  }
}
