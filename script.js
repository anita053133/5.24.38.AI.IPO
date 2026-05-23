/**
 * 🐈‍⬛ 小黑貓貓 AI 視覺 Prompt 產生器 - 核心邏輯
 * 專為初學者設計，加入繁體中文詳細註解，極簡好懂且高效！
 * 【效能優化版】：採用 DOM 狀態原地更新技術（In-place UI Update），徹底解決點擊時畫面跳動與排版移位的問題！
 */

// 1. 各項別與選項定義（完全對齊原 JSX 專案）
const sections = [
  {
    key: "outputTypes",
    title: "0. 作品輸出類型",
    helper: "這次的指令最後要輸出成什麼作品？這會影響版面、比例、內容密度與生成方式。",
    color: "linear-gradient(135deg, #60a5fa 0%, #0ea5e9 100%)",
    options: [
      "簡報", "懶人包", "社群圖卡", "活動海報", "互動網頁",
      "短影音", "YouTube 封面", "課程封面", "銷售頁 / Landing Page", "漫畫分鏡",
      "流程圖", "比較表", "知識地圖", "輪播圖卡", "電子報視覺"
    ]
  },
  {
    key: "goals",
    title: "1. 輸出目標",
    helper: "這次內容主要想達成什麼目的？",
    color: "linear-gradient(135deg, #22d3ee 0%, #2563eb 100%)",
    options: [
      "招生報名", "活動宣傳", "知識教學", "重點摘要", "品牌曝光",
      "商品介紹", "服務介紹", "社群互動", "建立信任", "導流點擊",
      "收集名單", "課程封面", "短影音吸睛封面", "簡報提案", "數據報告",
      "流程說明", "任務引導", "案例分享", "招募徵才", "成果展示"
    ]
  },
  {
    key: "audiences",
    title: "2. 受眾對象",
    helper: "這份內容主要是給誰看的？",
    color: "linear-gradient(135deg, #2dd4bf 0%, #06b6d4 100%)",
    options: [
      "AI 新手", "一般上班族", "企業主管", "創業者", "保險業務員",
      "房地產從業者", "行銷人員", "內容創作者", "講師 / 顧問", "學生",
      "求職者", "家長", "親子家庭", "女性族群", "年輕社群族群",
      "科技產品使用者", "投資理財新手", "課程學員", "社群社團成員", "一般大眾 / 消費者"
    ]
  },
  {
    key: "styles",
    title: "3. 主風格",
    helper: "決定整體視覺的大方向。",
    color: "linear-gradient(135deg, #818cf8 0%, #2563eb 100%)",
    options: [
      "專業商務風", "極簡清爽風", "資訊圖表風", "日系動漫風", "可愛手繪風",
      "溫暖療癒風", "科技未來風", "高級雜誌風", "社群爆款封面風", "漫畫分鏡風",
      "手帳筆記風", "扁平插畫風", "3D 卡通風", "黑板教學風", "遊戲介面風",
      "賽博龐克風", "復古懷舊風", "韓系清新風", "日系雜貨風", "美式漫畫風",
      "新創品牌風", "金融信任風", "教練顧問風", "心理測驗風", "地圖路線風",
      "卡片 UI 風", "儀表板數據風", "白板塗鴉風", "電影海報風", "品牌識別系統風",
      "文青生活風", "精品極簡風", "自然有機風", "童趣繪本風", "貼紙拼貼風",
      "紙感手作風", "未來 HUD 介面風", "科技藍圖風", "AI 助理風", "網頁 Landing Page 風",
      "玻璃擬態風", "黏土公仔風", "水彩插畫風", "粉彩療癒風", "暗黑潮流風",
      "國潮風", "清單懶人包風", "教科書圖解風", "直播縮圖風", "報紙專欄風"
    ]
  },
  {
    key: "characters",
    title: "4. 主體角色",
    helper: "畫面的主角、IP 或主視覺元素。",
    color: "linear-gradient(135deg, #38bdf8 0%, #6366f1 100%)",
    options: [
      "小黑貓貓", "水豚", "講師角色", "上班族男性", "上班族女性",
      "學生角色", "家長角色", "小朋友角色", "AI 機器人", "專家顧問",
      "創業者", "設計師", "工程師", "醫師", "護理師",
      "房仲顧問", "保險顧問", "財務教練", "心理師", "教練型講師",
      "主持人", "店長 / 老闆", "電商賣家", "行銷人", "社群小編",
      "求職者", "面試官", "產品經理", "客服人員", "企業主管",
      "團隊夥伴", "情侶 / 夫妻", "家庭三口", "朋友群", "運動員",
      "羽球選手", "學習夥伴", "書本擬人角色", "電腦 / 手機擬人角色", "吉祥物角色",
      "小動物朋友團", "貓咪老師", "狐狸角色", "狗狗角色", "企鵝角色",
      "熊熊角色", "兔子角色", "獅子角色", "太空人角色", "虛擬主播 / VTuber 角色"
    ]
  },
  {
    key: "tones",
    title: "5. 調性修飾詞",
    helper: "畫面看起來要有什麼感覺？",
    color: "linear-gradient(135deg, #93c5fd 0%, #06b6d4 100%)",
    options: [
      "溫暖", "可愛", "專業", "療癒", "吸睛",
      "穩重", "活潑", "清爽", "有質感", "高級感",
      "精緻", "品牌感", "親切", "信任感", "現代感",
      "未來感", "科技感", "年輕感", "成熟感", "安心感",
      "陪伴感", "激勵感", "熱血感", "幽默感", "趣味感",
      "俐落", "簡約", "明亮", "柔和", "夢幻",
      "時尚", "文青", "沉穩", "高對比", "輕盈",
      "厚實", "乾淨", "清楚易懂", "故事感", "冒險感",
      "探索感", "童趣", "慢生活感", "知性感", "權威感",
      "幸福感", "希望感", "成長感", "共鳴感", "放鬆感"
    ]
  },
  {
    key: "techniques",
    title: "6. 視覺技法",
    helper: "要用什麼視覺方式呈現？",
    color: "linear-gradient(135deg, #22d3ee 0%, #0ea5e9 100%)",
    options: [
      "柔和光影", "乾淨線條", "扁平化設計", "3D 立體建模感", "手繪筆觸",
      "水彩暈染", "粉彩塗抹", "厚塗插畫", "賽璐璐上色", "紙張拼貼",
      "貼紙拼貼", "黏土材質", "玻璃擬態", "金屬質感", "漸層光暈",
      "霓虹發光", "高對比色塊", "低飽和配色", "明亮高飽和配色", "大量留白",
      "卡片式資訊區塊", "左右分欄設計", "九宮格設計", "時間軸呈現", "流程箭頭設計",
      "對照表版型", "圖文對應標註", "圖示 icon 輔助", "漫畫分鏡格", "場景式構圖",
      "角色特寫構圖", "俯視視角", "等距 isometric 視角", "UI 介面模擬", "儀表板面板",
      "HUD 未來介面", "鏡頭景深效果", "光斑與散景", "陰影層次加強", "邊框標籤貼紙",
      "描邊粗線風格", "簡潔幾何圖形", "模組化排版", "圓角卡片元件", "透明浮層效果",
      "質感紙紋", "網格背景", "點線面資訊視覺化", "剪影對比", "多層前中後景"
    ]
  },
  {
    key: "fonts",
    title: "7. 字體文字風格",
    helper: "文字要呈現什麼氣質與可讀性？",
    color: "linear-gradient(135deg, #60a5fa 0%, #8b5cf6 100%)",
    options: [
      "現代無襯線字體", "圓潤可愛字體", "粗體大標字體", "手寫感字體", "高級襯線字體",
      "科技感字體", "簡報商務字體", "活潑童趣字體", "海報標題字體", "雜誌編排字體",
      "乾淨易讀字體", "筆記風字體", "極簡細字體", "厚實黑體", "優雅細襯線字",
      "像素遊戲字體", "漫畫對話字體", "黑板粉筆字體", "未來機械字體", "親和社群字體"
    ]
  },
  {
    key: "layouts",
    title: "8. 用途排版需求",
    helper: "這份內容要用在哪裡？如何排版？",
    color: "linear-gradient(135deg, #2dd4bf 0%, #2563eb 100%)",
    options: [
      "16:9 橫式簡報", "9:16 直式懶人包", "1:1 社群圖卡", "4:5 IG 貼文圖", "16:9 YouTube 封面",
      "橫式活動海報", "直式活動海報", "首屏 Hero 互動網頁", "卡片式功能介紹頁", "長頁式銷售頁 / Landing Page",
      "短影音分鏡腳本頁", "漫畫式多格排版", "流程圖排版", "比較表排版", "時間軸排版",
      "地圖路線排版", "課程章節目錄排版", "問答 FAQ 排版", "儀表板數據排版", "輪播多頁圖卡排版"
    ]
  },
  {
    key: "contents",
    title: "9. 內容重點",
    helper: "畫面中一定要放進去的資訊。",
    color: "linear-gradient(135deg, #94a3b8 0%, #2563eb 100%)",
    options: [
      "主標題", "副標題", "三大重點", "五大步驟", "核心金句",
      "問題痛點", "解決方案", "功能特色", "使用流程", "日期時間",
      "地點 / 平台", "價格 / 優惠", "講師 / 品牌名稱", "CTA 報名引導", "聯絡資訊",
      "LOGO / 品牌識別", "數據 / 圖表", "案例 / 見證", "FAQ 常見問題", "注意事項 / 備註"
    ]
  },
  {
    key: "limits",
    title: "10. 限制條件",
    helper: "不要出現什麼？避免生成跑偏。",
    color: "linear-gradient(135deg, #64748b 0%, #1e3a8a 100%)",
    options: [
      "不要太多文字", "不要畫面雜亂", "不要過度寫實", "不要複雜背景", "不要太花俏",
      "不要陰暗色調", "不要色彩過多", "不要小字過多", "不要資訊層級不清", "不要角色搶走重點",
      "不要字體難讀", "不要過度裝飾", "不要低解析感", "不要風格不一致", "不要擁擠排版",
      "不要留白過少", "不要過度商業感", "不要太幼稚", "不要版面失衡", "不要與品牌調性不符"
    ]
  }
];

const labels = {
  outputTypes: "作品輸出類型",
  goals: "輸出目標",
  audiences: "受眾對象",
  styles: "主風格",
  characters: "主體角色",
  tones: "調性修飾詞",
  techniques: "視覺技法",
  fonts: "字體文字風格",
  layouts: "用途排版需求",
  contents: "內容重點",
  limits: "限制條件"
};

// 2. 應用程式核心狀態 (State)
let selected = {};
sections.forEach(s => {
  selected[s.key] = [];
});

let noteText = "";
let searchKeyword = "";

// 初始化折疊狀態：預設全部收合
let openMap = {};
sections.forEach((s, index) => {
  openMap[s.key] = false;
});

// 3. 獲取頁面 DOM 元素
const searchInput = document.getElementById("search-input");
const sectionsContainer = document.getElementById("sections-container");
const summaryContainer = document.getElementById("summary-container");
const summaryBadge = document.getElementById("summary-badge");
const globalCounter = document.getElementById("global-counter");
const noteInput = document.getElementById("note-input");
const promptOutput = document.getElementById("prompt-output");
const sidebarCount = document.getElementById("sidebar-count");
const toastMessage = document.getElementById("toast-message");

// 按鈕組
const btnExpandAll = document.getElementById("btn-expand-all");
const btnCollapseAll = document.getElementById("btn-collapse-all");
const btnClearAll = document.getElementById("btn-clear-all");
const btnClearMobile = document.getElementById("btn-clear-mobile");
const btnCopyTop = document.getElementById("btn-copy-top");
const btnCopySidebar = document.getElementById("btn-copy-sidebar");
const btnCopyMobile = document.getElementById("btn-copy-mobile");

// 4. 初始化手風琴面板與選項（只在網頁載入時執行一次，確保 DOM 穩定性）
function initSections() {
  sectionsContainer.innerHTML = "";

  sections.forEach(section => {
    const isOpen = openMap[section.key];
    const count = selected[section.key].length;

    // 建立手風琴卡片容器，分配唯一的 ID 方便後續原地更新
    const itemDiv = document.createElement("div");
    itemDiv.className = `accordion-item ${isOpen ? 'open' : ''}`;
    itemDiv.id = `section-${section.key}`;
    itemDiv.dataset.key = section.key;

    // 手風琴頂部標頭 HTML
    itemDiv.innerHTML = `
      <button class="accordion-header" onclick="toggleSection('${section.key}')">
        <div class="accordion-header-left">
          <div class="color-icon-box" style="background: ${section.color}">
            <i data-lucide="sparkles" style="width: 20px; height: 20px; color: #ffffff;"></i>
          </div>
          <div class="accordion-title-info">
            <h2 class="accordion-title">${section.title}</h2>
            <p class="accordion-helper">${section.helper}</p>
          </div>
        </div>
        <div class="accordion-header-right">
          <span id="badge-${section.key}" class="badge-count" style="display: ${count > 0 ? 'inline-block' : 'none'}">${count}</span>
          <i data-lucide="chevron-down" class="accordion-chevron"></i>
        </div>
      </button>
      <div class="accordion-content" style="display: ${isOpen ? 'block' : 'none'}">
        <div class="options-wrap"></div>
      </div>
    `;

    sectionsContainer.appendChild(itemDiv);

    // 填入選項 Pills，並儲存 dataset 方便點擊時原地更換 class
    const optionsWrap = itemDiv.querySelector(".options-wrap");
    section.options.forEach(option => {
      const active = selected[section.key].includes(option);
      const btn = document.createElement("button");
      btn.className = `option-pill ${active ? 'active' : ''}`;
      btn.innerText = option;
      btn.dataset.key = section.key;
      btn.dataset.value = option;
      btn.onclick = () => toggleOption(section.key, option);
      optionsWrap.appendChild(btn);
    });
  });

  // 渲染圖標
  lucide.createIcons();
}

// 5. 原地更新特定大類別的徽章計數與按鈕狀態，絕不重新繪製大區塊
function updateSectionUI(key) {
  const sectionEl = document.getElementById(`section-${key}`);
  if (!sectionEl) return;

  // 1. 更新大標題旁的紅色計數徽章
  const count = selected[key].length;
  const badgeEl = document.getElementById(`badge-${key}`);
  if (badgeEl) {
    badgeEl.innerText = count;
    badgeEl.style.display = count > 0 ? "inline-block" : "none";
  }

  // 2. 原地切換該類別下所有藥丸按鈕的 active 狀態
  const pills = sectionEl.querySelectorAll(".option-pill");
  pills.forEach(pill => {
    const val = pill.dataset.value;
    if (selected[key].includes(val)) {
      pill.classList.add("active");
    } else {
      pill.classList.remove("active");
    }
  });
}

// 6. 動態渲染已選摘要（摘要與底下的選項面板完全獨立，不影響選項滾動）
function renderSummary() {
  const selectedSummary = sections
    .map(section => ({ key: section.key, title: labels[section.key], values: selected[section.key] }))
    .filter(item => item.values.length > 0);

  const total = getTotalSelectedCount();

  // 更新總計數器與側欄資訊
  globalCounter.innerText = total;
  summaryBadge.innerText = `${total} 個`;
  sidebarCount.innerText = `已選 ${total} 個項目`;

  if (selectedSummary.length === 0) {
    summaryContainer.className = "summary-empty";
    summaryContainer.innerText = "目前還沒有選擇任何項目。您可以先從「作品輸出類型」開始，也可以直接在備註欄輸入需求。";
    return;
  }

  summaryContainer.className = "summary-sections-list";
  summaryContainer.innerHTML = "";

  selectedSummary.forEach(item => {
    const groupDiv = document.createElement("div");
    groupDiv.innerHTML = `
      <div class="summary-group-title">${item.title}</div>
      <div class="summary-tags-container"></div>
    `;
    summaryContainer.appendChild(groupDiv);

    const tagsContainer = groupDiv.querySelector(".summary-tags-container");
    item.values.forEach(val => {
      const tag = document.createElement("button");
      tag.className = "tag-remove";
      tag.innerHTML = `${val} <i data-lucide="x" style="width: 12px; height: 12px;"></i>`;
      tag.onclick = () => removeSelected(item.key, val);
      tagsContainer.appendChild(tag);
    });
  });

  lucide.createIcons();
}

// 7. 計算當前已被選擇的總數量
function getTotalSelectedCount() {
  return Object.values(selected).reduce((sum, arr) => sum + arr.length, 0);
}

// 8. 生成可直接貼上的指令 Prompt
function updatePrompt() {
  const total = getTotalSelectedCount();
  const extra = noteText.trim();

  if (total === 0 && !extra) {
    promptOutput.value = "請先從左側選擇一些項目，這裡會自動產出可直接貼上使用的 Prompt。";
    return;
  }

  const lines = [];
  const has = key => selected[key].length > 0;
  const get = key => selected[key].join("、");

  // 按類別逐步填寫指令
  if (has("outputTypes")) lines.push(`作品輸出類型：${get("outputTypes")}`);
  if (has("goals")) lines.push(`輸出目標：${get("goals")}`);
  if (has("audiences")) lines.push(`受眾對象：${get("audiences")}`);
  if (has("styles")) lines.push(`主風格：${get("styles")}`);
  if (has("characters")) lines.push(`主體角色：${get("characters")}`);
  if (has("tones")) lines.push(`調性修飾詞：${get("tones")}`);
  if (has("techniques")) lines.push(`視覺技法：${get("techniques")}`);
  if (has("fonts")) lines.push(`字體文字風格：${get("fonts")}`);
  if (has("layouts")) lines.push(`用途排版需求：${get("layouts")}`);
  if (has("contents")) lines.push(`內容重點：${get("contents")}`);
  if (has("limits")) lines.push(`限制條件：${get("limits")}`);
  if (extra) lines.push(`補充需求：${extra}`);

  promptOutput.value = `${lines.join("\n")}\n\n請依照以上需求直接產出作品，畫面需清楚好讀、風格一致、資訊層級分明，並兼顧美感與實際使用性。`;
}

// ==========================================================================
// 互動操作函式 (Interactive Functions)
// ==========================================================================

// 切換手風琴展開 / 收合狀態 (原地切換 class 與 inline 顯示，不重新渲染 DOM)
window.toggleSection = function(key) {
  openMap[key] = !openMap[key];
  const sectionEl = document.getElementById(`section-${key}`);
  if (sectionEl) {
    const contentEl = sectionEl.querySelector(".accordion-content");
    if (openMap[key]) {
      sectionEl.classList.add("open");
      contentEl.style.display = "block";
    } else {
      sectionEl.classList.remove("open");
      contentEl.style.display = "none";
    }
  }
};

// 切換單一選項的選取狀態 (原地更新，絕不引起頁面跳動)
window.toggleOption = function(key, value) {
  const index = selected[key].indexOf(value);
  if (index > -1) {
    selected[key].splice(index, 1);
  } else {
    selected[key].push(value);
  }
  updateSectionUI(key);
  renderSummary();
  updatePrompt();
};

// 從摘要欄快速移除已被選項目 (原地更新)
window.removeSelected = function(key, value) {
  selected[key] = selected[key].filter(item => item !== value);
  updateSectionUI(key);
  renderSummary();
  updatePrompt();
};

// 顯示提示訊息 (Toast)
let toastTimer = null;
function showToast(message) {
  toastMessage.innerText = message;
  toastMessage.classList.remove("hidden");

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastMessage.classList.add("hidden");
  }, 2200);
}

// 複製 Prompt 內容至剪貼簿
function copyToClipboard() {
  const text = promptOutput.value;
  if (!text || text.startsWith("請先從左側選擇")) {
    showToast("目前沒有可複製的內容");
    return;
  }

  // 嘗試使用現代的 Clipboard API
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(() => showToast("已複製"))
      .catch(() => copyByTextareaFallback(text));
  } else {
    copyByTextareaFallback(text);
  }
}

// 傳統網頁複製手段 (Fallback)
function copyByTextareaFallback(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  try {
    document.execCommand("copy");
    showToast("已複製");
  } catch (err) {
    showToast("複製失敗，請手動複製！");
  }
  document.body.removeChild(textarea);
}

// 清空所有狀態 (原地清空 active，維持 DOM 結構完整與滾動穩定)
function clearAll() {
  sections.forEach(s => {
    selected[s.key] = [];
    updateSectionUI(s.key);
    
    // 如果因為搜尋被隱藏了，恢復它的正常顯示
    const sectionEl = document.getElementById(`section-${s.key}`);
    if (sectionEl) {
      sectionEl.style.display = "block";
      const pills = sectionEl.querySelectorAll(".option-pill");
      pills.forEach(pill => {
        pill.style.display = ""; 
      });
    }
  });
  
  noteText = "";
  noteInput.value = "";
  searchKeyword = "";
  searchInput.value = "";
  
  renderSummary();
  updatePrompt();
  showToast("已清空");
}

// ==========================================================================
// 綁定事件監聽器 (Event Listeners)
// ==========================================================================

// 搜尋輸入監聽：採用原地 CSS display 過濾法，絕不重新繪製 DOM，體驗流暢！
searchInput.addEventListener("input", (e) => {
  searchKeyword = e.target.value.trim().toLowerCase();

  sections.forEach(section => {
    const sectionEl = document.getElementById(`section-${section.key}`);
    if (!sectionEl) return;

    let hasMatch = false;
    const pills = sectionEl.querySelectorAll(".option-pill");

    pills.forEach(pill => {
      const val = pill.dataset.value.toLowerCase();
      if (!searchKeyword || val.includes(searchKeyword)) {
        pill.style.display = ""; // 恢復 CSS 的預設 inline 樣式
        hasMatch = true;
      } else {
        pill.style.display = "none"; // 隱藏無關藥丸
      }
    });

    // 如果搜尋狀態下，該類別沒有任何符合選項，則隱藏該手風琴
    if (searchKeyword && !hasMatch) {
      sectionEl.style.display = "none";
    } else {
      sectionEl.style.display = "block";
    }
  });
});

// 備註欄輸入監聽
noteInput.addEventListener("input", (e) => {
  noteText = e.target.value;
  updatePrompt();
});

// 全部展開按鈕 (原地更新)
btnExpandAll.addEventListener("click", () => {
  sections.forEach(s => {
    openMap[s.key] = true;
    const sectionEl = document.getElementById(`section-${s.key}`);
    if (sectionEl) {
      sectionEl.classList.add("open");
      sectionEl.querySelector(".accordion-content").style.display = "block";
    }
  });
});

// 全部收合按鈕 (原地更新)
btnCollapseAll.addEventListener("click", () => {
  sections.forEach(s => {
    openMap[s.key] = false;
    const sectionEl = document.getElementById(`section-${s.key}`);
    if (sectionEl) {
      sectionEl.classList.remove("open");
      sectionEl.querySelector(".accordion-content").style.display = "none";
    }
  });
});

// 各個複製與重設按鈕點擊事件綁定
btnCopyTop.addEventListener("click", copyToClipboard);
btnCopySidebar.addEventListener("click", copyToClipboard);
btnCopyMobile.addEventListener("click", copyToClipboard);

btnClearAll.addEventListener("click", clearAll);
btnClearMobile.addEventListener("click", clearAll);

// ==========================================================================
// 初始化頁面 (網頁初次載入)
// ==========================================================================
initSections();
renderSummary();
updatePrompt();
lucide.createIcons();
