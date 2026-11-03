/**
 * 定期実行用エントリーポイント（引数なし）
 * 設定したスケジュール（毎日・毎時など）に従って自動で呼び出されます。
 */
function runScheduledTask() {
  try {
    Logger.log('=== 定期実行タスクを開始します ===');
    
    // 1. 10個の Drive フォルダ構造の自動アサート（整合性チェック）
    Object.keys(DRIVE_STRUCTURE).forEach(key => {
      assertAndGetFolder_(DRIVE_STRUCTURE[key]);
    });
    Logger.log('すべての Drive フォルダ構造（10箇所）の整合性確認（アサート）が完了しました。');
    
    // 2. 自動巡回タスクの生成（09_Tasks へ保存 ＆ 原本パス埋め込み）
    const today = new Date().toISOString().split('T')[0];
    const taskTitle = `自動定期巡回レポート_${today}`;
    const taskContent = '日次システム巡回および Drive フォルダ構造の整合性自動アサートが正常に完了しました。';
    
    // 既存のタスク作成関数を呼び出して保存
    const result = createAndSaveTask(taskTitle, taskContent);
    
    if (result.success) {
      Logger.log('定期タスクの自動保存に成功しました: ' + result.fileUrl);
    } else {
      Logger.log('定期タスクの保存に失敗しました: ' + result.message);
    }
    
    Logger.log('=== 定期実行タスクが正常に終了しました ===');
  } catch (e) {
    Logger.log('【エラー】定期実行タスクで例外が発生しました: ' + e.message);
    // 必要に応じてエラー時の通知処理などをここに追加できます
  }
}
