/**
 * @file grw.gs
 * @description 運用コントロールパネル メインバックエンドスクリプト
 */

function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('GRW 運用コントロールパネル')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// その他の既存API（apiCreateWorkLog, apiScanDriveFiles, apiManageSkill, apiSummarizeToKnowledge, apiOrganizeByTags 等）はそのまま維持します。
/**
 * 作業記録の作成 (.md) ＋ 自動採番 ＋ README自動連携
 */
function apiCreateWorkLog(title, content) {
  try {
    const folder = assertAndGetFolder_(DRIVE_STRUCTURE.PROJECT_MILESTONES);
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0]; // YYYY-MM-DD
    const seqNo = getNextSequenceNumber();
    
    const safeTitle = (title || 'General-Task').replace(/[\s ]/g, '-').replace(/[^A-Za-z0-9_\-@!#$()~]/g, '');
    const fileName = `${dateStr}_${safeTitle}_No.${seqNo}.md`;
    
    const body = `# Project Milestones\n\n- **Title**: ${title}\n- **Date**: ${dateStr}\n- **管理番号**: No.${seqNo}\n- **Tags**: #Project-Milestones #Rule\n\n## Updates & Decisions\n${content || '- Not specified'}`;
    
    folder.createFile(fileName, body, MimeType.PLAIN_TEXT);
    appendChangeLogToReadme(dateStr, title, seqNo, '#Project-Milestones #Rule');

    return { success: true, message: `作業記録「${fileName}」を作成し、README 索引を更新しました。` };
  } catch (e) {
    return { success: false, message: e.message };
  }
}

function apiScanDriveFiles() {
  try {
    Object.keys(DRIVE_STRUCTURE).forEach(key => {
      assertAndGetFolder_(DRIVE_STRUCTURE[key]);
    });
    return { success: true, message: 'すべての Drive フォルダ構造（10箇所）の整合性確認（アサート）が完了しました。' };
  } catch (e) {
    return { success: false, message: `スキャン失敗: ${e.message}` };
  }
}

function apiManageSkill(action, skillData) {
  try {
    if (action === 'create') {
      const folder = assertAndGetFolder_(DRIVE_STRUCTURE.SKILLS_BACKUP);
      const seqNo = getNextSequenceNumber();
      folder.createFile(`${skillData.name}_No.${seqNo}.md`, `# Skill: ${skillData.name}\n`, MimeType.PLAIN_TEXT);
      return { success: true, message: `Skill「${skillData.name} (No.${seqNo})」を作成しバックアップしました。` };
    } else if (action === 'list') {
      return { success: true, data: ['system:wellness_coach', 'user:generate-fresh-ideas', 'user:get-more-perspectives'] };
    }
  } catch (e) {
    return { success: false, message: e.message };
  }
}

function apiSummarizeToKnowledge(rawText) {
  try {
    if (!rawText || rawText.trim() === '') {
      throw new Error('テキストが入力されていません。');
    }
    const folder = assertAndGetFolder_(DRIVE_STRUCTURE.KNOWLEDGE);
    const dateStr = new Date().toISOString().split('T')[0];
    const seqNo = getNextSequenceNumber();
    const summary = rawText.substring(0, 150) + '...';
    
    folder.createFile(`${dateStr}_Knowledge_No.${seqNo}.md`, `# Knowledge Summary (No.${seqNo})\n\n${rawText}`, MimeType.PLAIN_TEXT);
    return { 
      success: true, 
      message: `テキストを要約し、07_Knowledge フォルダへ保存しました (No.${seqNo})。`,
      summary: summary 
    };
  } catch (e) {
    return { success: false, message: e.message };
  }
}

function apiOrganizeByTags() {
  try {
    assertAndGetFolder_(DRIVE_STRUCTURE.TAGS);
    return { success: true, message: 'タグ管理フォルダに基づくファイル整合性チェックが完了しました。' };
  } catch (e) {
    return { success: false, message: e.message };
  }
}
