/**
 * AI 辦公室上架前需求調查 — Google Form 自動建立腳本
 *
 * 使用方式：
 * 1. 打開 https://script.google.com
 * 2. 點「新增專案」
 * 3. 把這份 .gs 全部內容貼進去（覆蓋原本的 myFunction）
 * 4. 按上方 ▶ 執行（第一次會要授權：登入你的 Google、允許存取 Form / Sheet / Drive）
 * 5. 執行完後點「執行記錄」（View → Logs 或 Ctrl+Enter），會看到完整的 URL 和 entry ID 清單
 * 6. 把執行記錄整段貼回 Claude 的聊天，Claude 會自動改 index.html
 *
 * 這支腳本會做：
 * - 建一份完整的 Google Form（含 8 題、Q2 Q3 限制最多 3 個、說明文字）
 * - 建一份對應的 Google Sheet 收集回覆
 * - 印出：填寫網址、HTML action 用的 URL、每題的 entry ID
 */

function createAIOfficeSurvey() {
  // === 建立表單 ===
  const form = FormApp.create('建立你的 AI 辦公室 — 上架前需求調查');
  form.setDescription(
    '流水的 AI,鐵打的知識。\n' +
    '我想做一套讓你能「累積知識」的系統。\n\n' +
    '下週正式上架前,想先了解你想要什麼樣的 AI 辦公室。\n' +
    '這份問卷大約 3 分鐘,你的回答會直接影響最後的功能組合與定價。\n\n' +
    '—— 江江教練'
  );
  form.setCollectEmail(false);
  form.setAllowResponseEdits(false);
  form.setShowLinkToRespondAgain(false);
  form.setConfirmationMessage(
    '收到了,感謝你。\n\n' +
    '你的回答會直接影響 AI 辦公室正式上架時的功能組合與定價。\n' +
    '如果有留 email,下週正式上架時會優先通知你。\n\n' +
    '—— 江江教練'
  );

  const entries = {};

  // Q1
  const q1 = form.addMultipleChoiceItem()
    .setTitle('Q1. 你目前使用 AI 工具的狀況?')
    .setRequired(true)
    .setChoiceValues([
      '還沒開始用,不知道怎麼開始',
      '用了但零散,感覺沒發揮',
      '有在用,想系統化',
      '已經有自己的 AI 工作流'
    ]);
  entries['Q1_現況'] = q1.getId();

  // Q2
  const q2 = form.addCheckboxItem()
    .setTitle('Q2. 你現在遇到的最大困擾?')
    .setHelpText('最多選 3 個')
    .setRequired(true)
    .setChoiceValues([
      '檔案太亂,找不到東西',
      'AI 每次都要重新交代一遍',
      '工作進度管理混亂',
      '寫文章缺人檢查、順稿',
      '不知道怎麼整理知識',
      '想把工作經驗變知識資產,但不會',
      '工具太多不知道怎麼搭配'
    ])
    .setValidation(FormApp.createCheckboxValidation().requireSelectAtMost(3).build());
  entries['Q2_痛點'] = q2.getId();

  // Q3
  const q3 = form.addCheckboxItem()
    .setTitle('Q3. 下列內建小助理,你最想先有哪幾個?')
    .setHelpText('最多選 3 個')
    .setRequired(true)
    .setChoiceValues([
      'AI 助理 — 入口、教學、指引',
      '專案助理 — 看板、進度、任務追蹤',
      '辦公室秘書 — 幫我建置 AI 辦公室、3X4 資料管理法',
      '格式轉檔助理 — PDF/文件轉 AI 好讀的格式',
      '文件整理助理 — 幫文件想標籤、改詳細檔名(省 token 的關鍵)',
      '順稿助理 — 幫我順文案、優化風格',
      '盲點助理 — 幫我檢查文章邏輯漏洞'
    ])
    .setValidation(FormApp.createCheckboxValidation().requireSelectAtMost(3).build());
  entries['Q3_優先助理'] = q3.getId();

  // Q4
  const q4 = form.addMultipleChoiceItem()
    .setTitle('Q4. 將來最想加購哪個進階顧問?')
    .setRequired(true)
    .setChoiceValues([
      '個人知識管理顧問 — 幫我蓋一整套屬於自己的知識系統',
      '隱性知識提煉師 — 把經驗變成可重複使用的知識資產',
      'Agent 指揮官 — 調度多個 AI 助理協作',
      '我還不知道,想先上手基礎版再決定'
    ]);
  entries['Q4_顧問'] = q4.getId();

  // Q5
  const q5 = form.addMultipleChoiceItem()
    .setTitle('Q5. 這套 AI 辦公室(7 位助理 + 開箱導覽一小時 + 一年份更新)定價 1000 元,你的第一反應是?')
    .setRequired(true)
    .setChoiceValues([
      '馬上買',
      '考慮一下,可能會買',
      '太貴了',
      '太便宜,反而讓我懷疑'
    ]);
  entries['Q5_價格反應'] = q5.getId();

  // Q6
  const q6 = form.addMultipleChoiceItem()
    .setTitle('Q6. 你覺得合理的定價範圍是?')
    .setRequired(true)
    .setChoiceValues([
      '500 元以下',
      '500 – 1,000 元',
      '1,000 – 2,000 元',
      '2,000 – 3,000 元',
      '3,000 元以上'
    ]);
  entries['Q6_合理定價'] = q6.getId();

  // Q7
  const q7 = form.addParagraphTextItem()
    .setTitle('Q7. 你還希望 AI 辦公室能有什麼功能?')
    .setHelpText('寫什麼都可以,越具體越好(例如:自動從 LINE 整理客戶對話、可連結 Notion...)')
    .setRequired(false);
  entries['Q7_其他功能'] = q7.getId();

  // Q8a: email
  const q8a = form.addTextItem()
    .setTitle('Q8. 正式上架時要不要優先通知你?(請留 email)')
    .setHelpText('選填,留空代表不用')
    .setRequired(false);
  entries['Q8a_Email'] = q8a.getId();

  // Q8b: name
  const q8b = form.addTextItem()
    .setTitle('你的稱呼')
    .setHelpText('選填,讓江江知道怎麼稱呼你')
    .setRequired(false);
  entries['Q8b_稱呼'] = q8b.getId();

  // === 建立回覆 Sheet 並綁定 ===
  const ss = SpreadsheetApp.create('AI 辦公室問卷回覆收集');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());

  // === 輸出 URL 和 Entry ID ===
  const viewUrl = form.getPublishedUrl();
  const submitUrl = viewUrl.replace('/viewform', '/formResponse');
  const editUrl = form.getEditUrl();

  const output = [];
  output.push('=== AI 辦公室問卷表單建立完成 ===');
  output.push('');
  output.push('【填寫網址】(給受眾分享): ' + viewUrl);
  output.push('【HTML action 用】: ' + submitUrl);
  output.push('【編輯表單】: ' + editUrl);
  output.push('【回覆 Sheet】: ' + ss.getUrl());
  output.push('');
  output.push('=== Entry IDs (每題的欄位編號) ===');
  for (const key in entries) {
    output.push(key + ': entry.' + entries[key]);
  }
  output.push('');
  output.push('=== 把這整段複製回 Claude 的聊天,它會自動改 index.html ===');

  const fullOutput = output.join('\n');
  Logger.log(fullOutput);

  // 也用 Browser alert 秀出來,方便直接複製
  // (注意:alert 只在 Google Sheets 有綁定時才能跳,這裡就用 Logger 就好)

  return fullOutput;
}
