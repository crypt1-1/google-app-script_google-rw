/**
 * @file 07_TaskManager.gs
 * @description Task 管理および 09_Tasks フォルダの入出力・パース処理モジュール
 */

/**
 * 09_Tasks フォルダ内の全タスクをパースして構造化データを返す
 */
function apiGetTaskList() {
  try {
    const folder = assertAndGetFolder_(DRIVE_STRUCTURE.TASKS);
    const files = folder.getFiles();
    const taskList = [];

    while (files.hasNext()) {
      const file = files.next();
      if (!file.getName().endsWith('.md')) continue;

      const content = file.getBlob().getDataAsString('utf-8');
      const parsed = parseTaskMarkdown_(content, file.getId(), file.getName());
      taskList.push(parsed);
    }

    // 管理番号の降順（新着順）でソート
    return taskList.sort((a, b) => b.seqNumber - a.seqNumber);
  } catch (e) {
    Logger.log('タスク一覧取得エラー: ' + e.message);
    return [];
  }
}

/**
 * 新規タスク作成 API（規約に準拠した命名・メタデータ埋め込み）
 */
function apiCreateTask(data) {
  try {
    const seqNoStr = getNextSequenceNumber(); // 例: "0001"
    const seqNumber = parseInt(seqNoStr, 10);
    const dateStr = Utilities.formatDate(new Date(), SYSTEM_CONFIG.timezone, 'yyyy-MM-dd');

    // 命名規則の適用（半角英数字・指定記号以外はハイフン置換）
    const sanitizedTitle = (data.title || 'General-Task').replace(/[\s ]/g, '-').replace(/[^A-Za-z0-9_\-@!#$()~]/g, '');
    const fileName = 'Task_' + dateStr + '_No.' + seqNoStr + '_' + sanitizedTitle + '.md';
    const overviewFolderUrl = 'https://drive.google.com/drive/folders/' + DRIVE_STRUCTURE.OVERVIEW;

    // テンプレートフォーマットの構築（文字列結合により構文エラーを完全回避）
    const markdownContent = '# [Task-No.' + seqNoStr + '] ' + data.title + '\n\n' +
      '---\n' +
      '- **検出日**: ' + dateStr + '\n' +
      '- **優先度**: ' + (data.priority || 'P2') + '\n' +
      '- **状態**: ' + (data.status || '未対応') + '\n' +
      '- **管理番号**: No.' + seqNoStr + '\n' +
      '- **参照原本パス (Overview)**: ' + overviewFolderUrl + '\n\n' +
      '## 1. 課題・タスク詳細\n' + (data.detail || 'Not specified') + '\n\n' +
      '## 2. 原因・背景\n' + (data.cause || 'Not specified') + '\n\n' +
      '## 3. 対応方針・アクション\n' + ((data.actions && data.actions.length > 0) ? data.actions.map(act => '- [ ] ' + act).join('\n') : '- [ ] 特記事項なし') + '\n\n' +
      '## 4. 申し送り事項・特記事項\n' + (data.notes || 'Not specified') + '\n';

    const folder = assertAndGetFolder_(DRIVE_STRUCTURE.TASKS);
    const file = folder.createFile(fileName, markdownContent, MimeType.PLAIN_TEXT);

    // README ChangeLog（索引）への自動追記連携
    appendChangeLogToReadme(dateStr, 'Task起票: ' + data.title, seqNoStr, '#Task #' + (data.priority || 'P2') + ' #' + (data.status || '未対応'));

    return { success: true, message: 'タスク「' + data.title + ' (No.' + seqNoStr + ')」を作成しました。', fileId: file.getId() };
  } catch (e) {
    return { success: false, message: e.message };
  }
}

/**
 * タスクのステータスおよびチェックリスト状態を更新する API
 */
function apiUpdateTaskStatus(fileId, newStatus) {
  try {
    const file = DriveApp.getFileById(fileId);
    let content = file.getBlob().getDataAsString('utf-8');

    // 状態の書き換え
    content = content.replace(/- \*\*状態\*\*: .*/, '- **状態**: ' + newStatus);

    file.setContent(content);
    return { success: true, message: 'ステータスを「' + newStatus + '」に更新しました。' };
  } catch (e) {
    return { success: false, message: e.message };
  }
}

/**
 * 内部ヘルパー: Markdown からタスク情報を抽出するパーサー
 */
function parseTaskMarkdown_(content, fileId, fileName) {
  const lines = content.split('\n');
  let title = fileName;
  let priority = 'P2';
  let status = '未対応';
  let seqNoStr = '0001';
  let seqNumber = 1;
  let dateStr = '';
  let detail = '';

  lines.forEach(line => {
    if (line.startsWith('# ')) {
      title = line.replace(/#\s*\[.*?\]\s*/, '').trim();
    }
    if (line.includes('**検出日**')) {
      dateStr = line.split(':')[1] ? line.split(':')[1].trim() : '';
    }
    if (line.includes('**優先度**')) {
      priority = line.split(':')[1] ? line.split(':')[1].trim() : 'P2';
    }
    if (line.includes('**状態**')) {
      status = line.split(':')[1] ? line.split(':')[1].trim() : '未対応';
    }
    if (line.includes('**管理番号**')) {
      const match = line.match(/No\.([0-9]+)/);
      if (match) {
        seqNoStr = match[1];
        seqNumber = parseInt(seqNoStr, 10);
      }
    }
  });

  return {
    fileId: fileId,
    fileName: fileName,
    title: title,
    priority: priority,
    status: status,
    seqNoStr: seqNoStr,
    seqNumber: seqNumber,
    dateStr: dateStr,
    url: 'https://drive.google.com/file/d/' + fileId + '/view'
  };
}
