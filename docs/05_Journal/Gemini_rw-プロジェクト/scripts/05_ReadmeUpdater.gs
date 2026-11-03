/**
 * @file 05_ReadmeUpdater.gs
 * @description README.md の ChangeLog（索引）へ自動追記するモジュール
 */
function appendChangeLogToReadme(dateStr, title, seqNo, tags) {
  try {
    const readmeFolder = assertAndGetFolder_(DRIVE_STRUCTURE.README);
    const files = readmeFolder.getFilesByName('README.md');
    
    let readmeFile;
    if (files.hasNext()) {
      readmeFile = files.next();
    } else {
      const initialContent = `# README / ChangeLog - 索引\n\n## ChangeLog - 索引\n\n`;
      readmeFile = readmeFolder.createFile('README.md', initialContent, MimeType.PLAIN_TEXT);
    }
    
    let content = readmeFile.getBlob().getDataAsString('utf-8');
    const newLogEntry = `##### [${dateStr}] ${title} - No.${seqNo}\ntag: ${tags || '#Project-Milestones'}\n\n`;
    
    const targetHeader = '## ChangeLog - 索引';
    if (content.includes(targetHeader)) {
      content = content.replace(targetHeader, `${targetHeader}\n\n${newLogEntry}`);
    } else {
      content += `\n${newLogEntry}`;
    }
    
    readmeFile.setContent(content);
    return true;
  } catch (e) {
    Logger.log(`README 追記エラー: ${e.message}`);
    return false;
  }
}
