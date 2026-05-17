# AI 辦公室上架前需求調查｜使用與部署說明

## 這個資料夾是什麼

`index.html` 是上架前的客戶調查問卷，深咖配色，共 8 題，約 3 分鐘填完。

設計原則：
- 純 HTML + CSS + 極少 JS，零外部相依
- Google Fonts（Noto Serif TC + Noto Sans TC）
- 已內建：checkbox 最多選 3 個的限制、fetch 送出、送出後顯示感謝頁
- 已預設 `noindex, nofollow`（搜尋引擎不收錄）

---

## 發出前要做一件事：連接表單後端

`index.html` 裡 `form action` 目前是 `REPLACE_WITH_YOUR_FORMSPREE_ENDPOINT`，**必須換成真實 endpoint 才能收到回覆**。

### 方案 A｜Formspree（推薦）

1. 到 [formspree.io](https://formspree.io) 註冊（免費方案：50 submissions/月）
2. 新建一個 form，拿到類似 `https://formspree.io/f/xxxxxxxx` 的 endpoint
3. 在 `index.html` 找到 `REPLACE_WITH_YOUR_FORMSPREE_ENDPOINT`，整個替換成那個 URL
4. 儲存、上傳

優點：JSON API、收件直接進 email、可匯出 CSV

### 方案 B｜Google Form（完全免費，無上限）

如果不想用 Formspree：
1. 建一份 Google Form，題目對應問卷
2. 預覽表單，用瀏覽器的「檢視原始碼」找每個題目的 `name="entry.XXXXX"` 編號
3. 把 `index.html` 每個 `<input>` 的 name 改成對應的 `entry.XXXXX`
4. `form action` 改成 `https://docs.google.com/forms/d/e/FORM_ID/formResponse`

優點：免費無上限、資料直接進 Google Sheet

缺點：要手動對應 name 欄位，送出後跳轉到 Google 頁面（可加 `target="_blank"` 避讓）

### 方案 C｜最懶的辦法（直接用 Google Form）

如果沒時間改後端，**把 `index.html` 當落地頁，最下方的「送出回覆」按鈕改成連結到現成的 Google Form**。兩步就好：

1. 建 Google Form，拿分享連結
2. `index.html` 裡把 `<form>` 整段改成 `<a href="GOOGLE_FORM_URL" class="cta-link">填問卷</a>`，配一點 button 樣式

這個方案最快出門，缺點是不沉浸（會跳站）。

---

## 部署到 Vercel

父資料夾 `website/` 已經有 `vercel.json`、`robots.txt`、`index.html`（主站空白）。問卷在 `website/survey/`。

### 方法一｜一次部署整個 website/

```bash
cd "/Users/jiangyude2/Library/Mobile Documents/iCloud~md~obsidian/Documents/江昱德 主知識庫/01 AI 辦公室 & Agent 團隊/03 官網/website"
vercel deploy
```

部署後：
- `yourdomain.vercel.app/` → 主站（目前空白）
- `yourdomain.vercel.app/survey/` → 問卷頁

### 方法二｜只部署 survey（獨立一個專案）

```bash
cd "/Users/jiangyude2/Library/Mobile Documents/iCloud~md~obsidian/Documents/江昱德 主知識庫/01 AI 辦公室 & Agent 團隊/03 官網/website/survey"
vercel deploy
```

部署後：
- `ai-office-survey.vercel.app/` → 直接是問卷

建議用方法一，之後主站也上線時同一個 domain。

---

## 分享策略

- **內部性質**：受控分享，不公開給搜尋引擎
- 已預設 `robots.txt` block all
- 已加 `<meta name="robots" content="noindex, nofollow">` 保險
- 分享方式：LINE 社群 + 脆文（帶連結）+ 直接私訊給目標對象
- 蒐集期：1 週（下週日前）
- 回收目標：至少 20 份

---

## 問卷題目一覽（8 題）

| # | 題目 | 題型 | 用途 |
|---|---|---|---|
| Q1 | 目前使用 AI 工具的狀況 | 單選 | 分層受眾 |
| Q2 | 最大困擾 | 複選 max 3 | 驗證痛點假設 |
| Q3 | 最想先有哪幾個小助理 | 複選 max 3 | 功能優先級 |
| Q4 | 最想加購哪個進階顧問 | 單選 | 顧問市場測試 |
| Q5 | 1000 元的第一反應 | 單選 | 價格接受度 |
| Q6 | 合理定價範圍 | 單選 | 定價區間驗證 |
| Q7 | 還希望有什麼功能 | 開放填寫 | 蒐集需求 |
| Q8 | 留 email 等上架通知 | email + 稱呼 | 建立名單 |

---

## 相關檔案

- 主檔（商品企劃 + 官網文案）：[[2026-04-19-1047 Agent辦公室·商品企劃：建立你的 AI 辦公室 完整企劃與官網主文案｜商品企劃 官網文案 累積系統]]
- 前一天工作日記：[[2026-04-18-2350 Agent辦公室·工作日記：結構大整併與 1000 元版架構確立｜商品化 結構整併 1000元版]]
