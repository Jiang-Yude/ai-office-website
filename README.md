# AI 辦公室官網 — website

**建立你的 AI 辦公室** 的對外介紹網站。單頁式，奶茶配色（奶茶知識風）。

---

## 檔案結構

```
website/
├── index.html        ← 主頁（單頁七區塊）
├── css/
│   └── style.css     ← 奶茶配色、排版、響應式
├── robots.txt        ← 預設擋搜尋引擎（搭配 vercel.json X-Robots-Tag）
├── vercel.json       ← Vercel 部署設定
└── README.md         ← 本檔
```

## 七個區塊（對應 index.html 錨點）

1. `#hero` — 核心命題：我賣的是讓你能「累積知識」的系統
2. `#why` — 為什麼要 AI 辦公室
3. `#space` — 辦公室長怎樣（四個空間）
4. `#team` — 你的 AI 編制表（8 位員工 + 1 免費 + 3 未來顧問）
5. `#method` — 工具間介紹（3X4、檔名索引、雙向連結）
6. `#path` — 升級路徑（基礎 / 進階 / 專業）
7. `#cta` — 下載 / 購買 / 諮詢

## 色盤（奶茶｜奶茶知識風）

定義在 `css/style.css` `:root`，來源：`_agent/skills/spring-editor/references/14-pres-styles.md`

| 變數 | 值 | 用途 |
|---|---|---|
| `--bg` | `#D7CCC8` | 深米色（牛皮紙）底 |
| `--bg-alt` | `#E8DED9` | 交替區段（稍淺）|
| `--text` | `#5D4037` | 濃咖啡字 |
| `--text-soft` | `#7A5B4C` | 次要文字 |
| `--accent` | `#D88C3A` | 焦糖（標題、按鈕、重點）|
| `--accent-light` | `#D4A574` | 暖金 |
| `--card` | `#EFEBE9` | 奶咖卡片背景 |
| `--subtle` | `#BCAAA4` | 淺咖啡線條 |
| `--muted` | `#8D6E63` | 說明文字 |

## 內容來源（single source of truth）

所有文案從這份主檔推：

`01 AI 辦公室 & Agent 團隊/02 GitHub 產品包/2026-04-19-1047 Agent辦公室·商品企劃：建立你的 AI 辦公室 完整企劃與官網主文案｜商品企劃 官網文案 累積系統.md`

修改文案時先改主檔，再同步到 index.html。

## 部署

本地預覽（在 website/ 底下）：
```bash
python3 -m http.server 8000
# 打開 http://localhost:8000
```

Vercel 部署：
```bash
cd website/
vercel
```

**預設擋搜尋引擎**（robots.txt + X-Robots-Tag header）。正式公開前先確認：
- [ ] 移除 robots.txt 的 `Disallow: /`
- [ ] 移除 vercel.json 的 `X-Robots-Tag` header
- [ ] 移除 index.html 的 `<meta name="robots" content="noindex, nofollow">`

## 待補

- [ ] 「免費下載納瓦爾顧問」按鈕接實際 email 表單
- [ ] 「立即購買」按鈕接傳送門連結
- [ ] 「預約開箱導覽」接報名表
- [ ] 「預約諮詢」接表單
- [ ] favicon
- [ ] Open Graph / Twitter Card meta
- [ ] GA / 分析工具（視需要）
