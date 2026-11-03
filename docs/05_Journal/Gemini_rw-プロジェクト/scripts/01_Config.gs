/**
 * @file 01_Config.gs
 * @description フォルダ構造および基本設定の定義
 */

const DRIVE_STRUCTURE = {
  OVERVIEW:           '1oI8VKTqOzJUk1I_b1nEP_VS51xb-tckA',
  PROJECT_MILESTONES: '12fiFeEYTozuwlLyjYKreEfY8XT5LnWIx',
  README:             '1WZJsrMQPN42thhs78KwVcwxZpipjGaBH',
  SKILLS_BACKUP:      '1C4YhJvRefn0NCh2xqM0Sz4m6uvI8SC9L',
  PIVOT:              '1slIfoJqumGocdVOkMQKLRDGjIIT0a-O2',
  JOURNAL:            '1_3SeVY1H7J-vvqbQu7yhvQwU_-GV66q2',
  WEB_KNOWLEDGE:      '1u6yZz_BK7yOUFEOCX5hGFkStF4d0Ml3H',
  GITHUB_REPO:        '1YH5yN_PjZw0c_ht3wp8LmfNq2mb212zS', // ★新規追加 (github-repository)
  KNOWLEDGE:          '1EKtQIRqg2BuIMvmK-N_gsq5nYIAymA7b',
  TAGS:               '1zBwAGYct8AMGktSf4sFyx2TY4GmmuzJO',
  TASKS:              '13nJ_4eX-MAAIxOy6cIu4-nJkMGLve_4X'
};

const SYSTEM_CONFIG = {
  appName: "GRW RulesManager-AutoLogger",
  version: "1.0.0",
  timezone: "Asia/Tokyo"
};

/**
 * フォルダ構造を自動アサート（検証）する共通ヘルパー
 * @param {string} folderId 
 * @return {GoogleAppsScript.Drive.Folder}
 */

function assertAndGetFolder_(folderId) {
  try {
    const folder = DriveApp.getFolderById(folderId);
    return folder;
  } catch (e) {
    throw new Error(`指定されたDriveフォルダにアクセスできません（ID確認要）。詳細: ${e.message}`);
  }
}
