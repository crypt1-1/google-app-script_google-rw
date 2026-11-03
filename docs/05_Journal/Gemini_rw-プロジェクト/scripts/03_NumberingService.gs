/**
 * @file 03_NumberingService.gs
 * @description 共通の採番ルール（4桁/8桁ゼロ埋め）を管理するモジュール
 */
function getNextSequenceNumber() {
  const scriptProperties = PropertiesService.getScriptProperties();
  let currentSeq = parseInt(scriptProperties.getProperty('GLOBAL_SEQ_COUNTER') || '0', 10);
  currentSeq += 1;
  scriptProperties.setProperty('GLOBAL_SEQ_COUNTER', currentSeq.toString());
  
  // 1〜9999は4桁、10000以上は8桁のゼロ埋め
  if (currentSeq <= 9999) {
    return String(currentSeq).padStart(4, '0');
  } else {
    return String(currentSeq).padStart(8, '0');
  }
}
