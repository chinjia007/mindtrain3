(function(){
  if(window.__ChatAssistantLoaded){return;} 
  window.__ChatAssistantLoaded=true;

  // Helper: create root & shadow
  const root=document.createElement('div');
  root.id='chat-assistant-root';
  document.body.appendChild(root);
  const shadow=root.attachShadow?root.attachShadow({mode:'open'}):root;

  // 添加Google Fonts链接
  const fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=ZCOOL+KuaiLe&display=swap';
  shadow.appendChild(fontLink);

  // Styles (kept inside template literal)
  const style=`
  /* 导入Google Fonts */
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap');

  /* 本地字体引入 */
  @font-face {
    font-family: 'AaBanShuZhiShi-JiaoTangXiaoMao';
    src: url('./AaBanShuZhiShi-JiaoTangXiaoMao/AaBanShuZhiShi-JiaoTangXiaoMao-2.ttf') format('truetype');
    font-display: swap;
  }

  @font-face {
    font-family: 'AaNianDuZuiKeAiJiang';
    src: url('./AaNianDuZuiKeAiJiang/AaNianDuZuiKeAiJiang-2.ttf') format('truetype');
    font-display: swap;
  }

  @font-face {
    font-family: 'DaMengKaTongTi';
    src: url('./DaMengKaTongTi/DaMengKaTongTi-Regular-2.ttf') format('truetype');
    font-display: swap;
  }

  @font-face {
    font-family: 'ShangShouZongYiTi';
    src: url('./ShangShouZongYiTi/No.142-ShangShouZongYiTi-2.ttf') format('truetype');
    font-display: swap;
  }

  @font-face {
    font-family: 'YeZiGongChangGuaiJiaoHei';
    src: url('./YeZiGongChangGuaiJiaoHei/YeZiGongChangGuaiJiaoHei-2.ttf') format('truetype');
    font-display: swap;
  }

  @font-face {
    font-family: 'ZiHunDaHei-Heavy';
    src: url('./ZiHunDaHei-Heavy/ZiHunDaHei-Heavy(ShangYongXuShouQuan)-2.ttf') format('truetype');
    font-display: swap;
  }

  /* 本地字体引入 */
  @font-face {
    font-family: 'AaBanShuZhiShi-JiaoTangXiaoMao';
    src: url('./fonts/AaBanShuZhiShi-JiaoTangXiaoMao.ttf') format('truetype');
    font-display: swap;
  }

  @font-face {
    font-family: 'AaNianDuZuiKeAiJiang';
    src: url('./fonts/AaNianDuZuiKeAiJiang.ttf') format('truetype');
    font-display: swap;
  }

  @font-face {
    font-family: 'DaMengKaTongTi';
    src: url('./fonts/DaMengKaTongTi.ttf') format('truetype');
    font-display: swap;
  }

  @font-face {
    font-family: 'ShangShouZongYiTi';
    src: url('./fonts/ShangShouZongYiTi.ttf') format('truetype');
    font-display: swap;
  }

  @font-face {
    font-family: 'YeZiGongChangGuaiJiaoHei';
    src: url('./fonts/YeZiGongChangGuaiJiaoHei.ttf') format('truetype');
    font-display: swap;
  }

  @font-face {
    font-family: 'ZiHunDaHei-Heavy';
    src: url('./fonts/ZiHunDaHei-Heavy.ttf') format('truetype');
    font-display: swap;
  }

  /* 基础变量 - 现代终端风格亮色主题 */
  :host {
    --ca-primary: #4f46e5;
    --ca-primary-rgb: 79, 70, 229;
    --ca-primary-light: #6366f1;
    --ca-primary-dark: #4338ca;
    --ca-primary-glow: rgba(79, 70, 229, 0.3);
    --ca-primary-glow-strong: rgba(79, 70, 229, 0.4);
    --ca-primary-glow-hover: rgba(79, 70, 229, 0.5);
    --ca-primary-glow-drag: rgba(79, 70, 229, 0.6);
    --ca-accent: #7c3aed;
    --ca-accent-light: #8b5cf6;
    --ca-text: #1f2937;
    --ca-text-light: #6b7280;
    --ca-text-on-primary: #ffffff;
    --ca-bg-light: #ffffff;
    --ca-bg-panel: #ffffff;
    --ca-bg-messages: #f9fafb;
    --ca-bg-bubble-user: #f3f4f6;
    --ca-bg-bubble-assistant: transparent;
    --ca-border-light: #e5e7eb;
    --ca-border-focus: #4f46e5;
    --ca-border-assistant: #4f46e5;
    --ca-shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05);
    --ca-shadow-sm: 0 4px 6px rgba(0, 0, 0, 0.07);
    --ca-shadow-md: 0 10px 25px rgba(0, 0, 0, 0.1);
    --ca-shadow-lg: 0 20px 40px rgba(0, 0, 0, 0.12);
    --ca-shadow-xl: 0 25px 50px rgba(0, 0, 0, 0.15);
    --ca-shadow-focus: 0 0 0 3px rgba(79, 70, 229, 0.1);
    --ca-radius-xs: 4px;
    --ca-radius-sm: 8px;
    --ca-radius-md: 12px;
    --ca-radius-lg: 16px;
    --ca-radius-xl: 20px;
    --ca-radius-full: 9999px;
    --ca-transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    --ca-transition-fast: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    --ca-font: 'AaBanShuZhiShi-JiaoTangXiaoMao', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', cursive;
    --ca-font-ui: 'AaBanShuZhiShi-JiaoTangXiaoMao', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', cursive;
    --ca-font-weight: 400;
  }

  /* 全局重置 */
  :host{all:initial;}
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* 装饰元素 - 简洁背景 */
  .ca-panel::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(79, 70, 229, 0.02);
    pointer-events: none;
    z-index: -1;
  }

  /* 悬浮球样式 - 可拖动的现代蓝色设计 + 渐显效果 */
  .ca-ball{
    position: fixed;
    right: 28px;
    top: 33.33vh;
    width: 64px;
    height: 64px;
    border-radius: var(--ca-radius-full);
    background: var(--ca-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--ca-shadow-lg),
                0 0 0 1px rgba(255, 255, 255, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.3),
                0 0 20px var(--ca-primary-glow);
    cursor: pointer;
    transition: box-shadow var(--ca-transition-fast),
                opacity 0.6s ease-in-out,
                transform 0.6s ease-in-out;
    z-index: 2147483000;
    font-size: 26px;
    animation: ballPulse 3s ease-in-out infinite alternate;
    border: 2px solid rgba(255, 255, 255, 0.1);
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    /* 初始状态：隐藏 + 轻微缩放 */
    opacity: 0;
    transform: scale(0.8);
    pointer-events: none;
  }

  /* 加载完成后显示悬浮球 */
  .ca-ball.loaded {
    opacity: 1;
    transform: scale(1);
    pointer-events: auto;
  }

  /* 打开对话窗口时隐藏悬浮球 - 快速隐藏 */
  .ca-ball.hidden-for-chat {
    transform: scale(0) !important;
    opacity: 0 !important;
    pointer-events: none !important;
    transition: transform 0.1s cubic-bezier(0.4, 0, 0.2, 1),
                opacity 0.1s cubic-bezier(0.4, 0, 0.2, 1) !important;
  }

  /* AI Logo样式 */
  .ca-ball-logo {
    font-family: 'MengChoTiNaDiTi', 'Comic Sans MS', 'Marker Felt', cursive;
    font-size: 22px;
    font-weight: 300;
    color: white;
    text-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
    letter-spacing: 1px;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    line-height: 1;
  }

  /* 悬停时的微发光效果 - 跟随主题变化 */
  .ca-ball:hover {
    box-shadow: var(--ca-shadow-lg),
                0 0 0 1px rgba(255, 255, 255, 0.25),
                inset 0 1px 0 rgba(255, 255, 255, 0.35),
                0 0 25px var(--ca-primary-glow-hover),
                0 0 40px var(--ca-primary-glow);
    animation: none;
  }

  /* 拖动时的样式 - 跟随主题变化 */
  .ca-ball.dragging {
    cursor: pointer;
    opacity: 0.8;
    animation: none;
    transition: none;
    box-shadow: var(--ca-shadow-xl),
                0 0 0 1px rgba(255, 255, 255, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.4),
                0 0 30px var(--ca-primary-glow-drag);
  }
  /* 悬浮球脉冲动画 - 微发光效果，跟随主题变化 */
  @keyframes ballPulse {
    0% {
      box-shadow: var(--ca-shadow-lg),
                  0 0 0 1px rgba(255, 255, 255, 0.2),
                  inset 0 1px 0 rgba(255, 255, 255, 0.3),
                  0 0 20px var(--ca-primary-glow);
    }
    100% {
      box-shadow: var(--ca-shadow-lg),
                  0 0 0 1px rgba(255, 255, 255, 0.25),
                  inset 0 1px 0 rgba(255, 255, 255, 0.35),
                  0 0 25px var(--ca-primary-glow-strong),
                  0 0 35px var(--ca-primary-glow);
    }
  }

  /* 面板样式 - 现代亮色主题 */
  .ca-panel{
    position: fixed;
    right: 0;
    top: 0;
    height: 100vh;
    width: 400px;
    max-width: 100%;
    background: var(--ca-bg-panel);
    border-left: 2px solid var(--ca-border-light);
    box-shadow: var(--ca-shadow-xl),
                inset 1px 0 0 rgba(255, 255, 255, 0.8);
    transform: translateX(100%);
    transition: transform var(--ca-transition);
    display: flex;
    flex-direction: column;
    font-family: var(--ca-font-ui);
    z-index: 2147482999;
    overflow: hidden;
    border-radius: var(--ca-radius-lg) 0 0 var(--ca-radius-lg);
  }
















  .ca-panel.open{transform: translateX(0);}

  /* 全屏模式 - 纯CSS方案 */
  .ca-panel.ca-fullscreen {
    position: fixed !important;
    top: 5vh !important;
    left: 27.5vw !important;
    width: 45vw !important;
    height: 90vh !important;
    right: auto !important;
    bottom: auto !important;
    max-width: none !important;
    transform: translateX(0) !important;
    z-index: 2147483000 !important;
    border-radius: var(--ca-radius-xl) !important;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25),
                0 0 0 1px rgba(255, 255, 255, 0.05),
                0 0 120px rgba(0, 0, 0, 0.4),
                inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;
    pointer-events: auto !important;
  }

  /* 确保全屏模式下所有子元素都可以交互，但鼠标样式正常 */
  .ca-panel.ca-fullscreen * {
    pointer-events: auto !important;
  }

  /* 修复全屏模式下的鼠标指针问题 */
  .ca-panel.ca-fullscreen {
    cursor: default !important;
  }

  .ca-panel.ca-fullscreen .ca-messages,
  .ca-panel.ca-fullscreen .ca-header,
  .ca-panel.ca-fullscreen .ca-inputbar {
    cursor: default !important;
  }

  /* 全屏模式下的头部样式 - 缩小高度 */
  .ca-panel.ca-fullscreen > .ca-header {
    padding: 32px 72px !important;
    min-height: 80px !important;
    border-radius: var(--ca-radius-xl) var(--ca-radius-xl) 0 0 !important;
    margin: 0 !important;
    border: none !important;
    box-sizing: border-box !important;
    width: 100% !important;
  }

  /* 全屏模式下的标题区域 - 增大尺寸 */
  .ca-panel.ca-fullscreen .ca-title-wrapper {
    gap: 24px !important;
  }

  .ca-panel.ca-fullscreen .ca-title {
    font-size: 2.4rem !important;
    font-weight: 500 !important;
    letter-spacing: 1px !important;
  }

  .ca-panel.ca-fullscreen .ca-logo {
    width: 40px !important;
    height: 40px !important;
    font-size: 20px !important;
  }

  /* 全屏模式下的按钮区域 - 增大尺寸 */
  .ca-panel.ca-fullscreen .ca-actions {
    gap: 20px !important;
  }

  .ca-panel.ca-fullscreen .ca-newchat {
    height: 56px !important;
    padding: 0 20px !important;
    border-radius: 28px !important;
    font-size: 15px !important;
  }

  .ca-panel.ca-fullscreen .ca-fullscreen {
    width: 56px !important;
    height: 56px !important;
    border-radius: 16px !important;
  }

  .ca-panel.ca-fullscreen .ca-fullscreen svg {
    width: 24px !important;
    height: 24px !important;
  }

  /* 全屏模式下的输入区域 - 缩小高度 */
  .ca-panel.ca-fullscreen > .ca-inputbar {
    padding: 32px 72px !important;
    min-height: 80px !important;
    border-radius: 0 0 var(--ca-radius-xl) var(--ca-radius-xl) !important;
    margin: 0 !important;
    border: none !important;
    border-top: 1px solid var(--ca-border-light) !important;
    box-sizing: border-box !important;
    width: 100% !important;
  }

  /* 全屏模式下的输入框和按钮 - 完美对齐 */
  .ca-panel.ca-fullscreen .ca-input-container textarea {
    min-height: 56px !important;
    font-size: 16px !important;
    padding: 16px 60px 16px 60px !important; /* 左右都留出更多空间 */
    border-radius: 16px !important;
    box-sizing: border-box !important;
  }

  .ca-panel.ca-fullscreen .ca-quiz-btn {
    width: 32px !important;
    height: 32px !important;
    bottom: 12px !important;
    left: 12px !important;
  }

  .ca-panel.ca-fullscreen .ca-quiz-btn svg {
    width: 18px !important;
    height: 18px !important;
  }

  .ca-panel.ca-fullscreen .ca-send {
    width: 56px !important;
    height: 56px !important;
    border-radius: 16px !important;
    box-sizing: border-box !important;
  }

  .ca-panel.ca-fullscreen .ca-input-container {
    align-items: flex-end !important;
  }

  .ca-panel.ca-fullscreen .ca-send svg {
    width: 24px !important;
    height: 24px !important;
  }

  /* 全屏模式下的模型选择器 - 与小屏保持一致 */
  .ca-panel.ca-fullscreen .ca-model-selector {
    width: 28px !important;
    height: 28px !important;
    border-radius: var(--ca-radius-xs) !important;
    font-size: 12px !important;
    bottom: 16px !important;
    right: 16px !important;
    /* 保持与小屏相同的样式 */
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
    opacity: 0.6 !important;
  }

  .ca-panel.ca-fullscreen .ca-model-selector:hover {
    opacity: 1 !important;
    background: rgba(var(--ca-primary-rgb, 79, 70, 229), 0.08) !important;
    transform: translateY(-0.5px) !important;
  }

  /* 全屏模式下的模型下拉菜单 - 修复滚动条和美化 */
  .ca-panel.ca-fullscreen .ca-model-dropdown {
    bottom: 64px !important;
    right: 16px !important;
    width: 200px !important;
    max-width: 200px !important;
    min-width: 200px !important;
    max-height: 280px !important;
    border-radius: 12px !important;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12) !important;
    background: rgba(255, 255, 255, 0.98) !important;
    backdrop-filter: blur(20px) !important;
    border: 1px solid rgba(0, 0, 0, 0.06) !important;
    overflow: hidden !important;
  }

  .ca-panel.ca-fullscreen .ca-model-list {
    padding: 8px !important;
    max-height: 260px !important;
    overflow-y: auto !important;
    overflow-x: hidden !important;
  }

  .ca-panel.ca-fullscreen .ca-model-item {
    padding: 10px 12px !important;
    font-size: 13px !important;
    border-radius: 8px !important;
    margin: 2px 0 !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    transition: all 0.2s ease !important;
  }

  .ca-panel.ca-fullscreen .ca-model-item:hover {
    background: rgba(79, 70, 229, 0.08) !important;
    color: var(--ca-primary) !important;
  }

  /* 模型选择器图标 - 自然神经网络动画 */
  .ca-model-selector svg {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .ca-model-selector:hover svg {
    transform: scale(1.05);
  }

  /* 神经网络节点依次激活动画 */
  .ca-model-selector:hover svg circle:nth-of-type(1) {
    animation: neural-pulse 2s ease-in-out infinite;
    animation-delay: 0s;
  }

  .ca-model-selector:hover svg circle:nth-of-type(2) {
    animation: neural-pulse 2s ease-in-out infinite;
    animation-delay: 0.3s;
  }

  .ca-model-selector:hover svg circle:nth-of-type(3) {
    animation: neural-pulse 2s ease-in-out infinite;
    animation-delay: 0.6s;
  }

  .ca-model-selector:hover svg circle:nth-of-type(4) {
    animation: neural-pulse 2s ease-in-out infinite;
    animation-delay: 0.9s;
  }

  /* 连接线数据流动画 */
  .ca-model-selector:hover svg path {
    animation: data-flow 1.5s ease-in-out infinite;
  }

  /* 中央处理器呼吸动画 */
  .ca-model-selector:hover svg rect:nth-of-type(2) {
    animation: processor-breath 3s ease-in-out infinite;
  }

  @keyframes neural-pulse {
    0%, 70%, 100% {
      opacity: 0.6;
      transform: scale(1);
    }
    15%, 55% {
      opacity: 1;
      transform: scale(1.3);
    }
  }

  @keyframes data-flow {
    0%, 100% {
      opacity: 0.5;
      stroke-dasharray: 2, 4;
      stroke-dashoffset: 0;
    }
    50% {
      opacity: 0.9;
      stroke-dasharray: 2, 4;
      stroke-dashoffset: 6;
    }
  }

  @keyframes processor-breath {
    0%, 100% {
      opacity: 0.8;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.02);
    }
  }

  /* 消息内容段落样式优化 */
  .ca-message-content {
    line-height: 1.6;
    font-weight: 500;
    font-size: 0.95rem;
  }

  .ca-paragraph {
    margin: 0 0 8px 0;
    line-height: 1.6;
    font-weight: 500;
  }

  .ca-paragraph:last-child {
    margin-bottom: 0;
  }

  /* 紧凑的元素间距 */
  .ca-message-content > *:first-child {
    margin-top: 0;
  }

  .ca-message-content > *:last-child {
    margin-bottom: 0;
  }

  /* 优化br标签间距 */
  .ca-message-content br {
    line-height: 1.4;
  }

  /* 列表样式 - Apple 风格 */
  .ca-list, .ca-ordered-list {
    margin: 16px 0;
    padding-left: 0;
    list-style: none;
  }

  .ca-list-item, .ca-ordered-item {
    margin-bottom: 8px;
    line-height: 1.6;
    padding-left: 24px;
    position: relative;
    color: rgba(60, 60, 67, 0.9);
    font-weight: 400;
  }

  .ca-list-item:last-child, .ca-ordered-item:last-child {
    margin-bottom: 0;
  }

  /* 无序列表项目符号 - Apple 风格 */
  .ca-list-item::before {
    content: '•';
    color: #007AFF;
    font-weight: bold;
    position: absolute;
    left: 8px;
    font-size: 1.2em;
    line-height: 1.3;
  }

  /* 有序列表自定义编号支持 - Apple 风格 */
  .ca-ordered-list {
    counter-reset: none;
  }

  .ca-ordered-item[value] {
    counter-reset: list-counter calc(attr(value, number) - 1);
    counter-increment: list-counter;
  }

  .ca-ordered-item[value]::before {
    content: attr(value) ".";
    color: #007AFF;
    font-weight: 600;
    position: absolute;
    left: 0;
    font-size: 0.9em;
    line-height: 1.6;
  }

  /* 数学公式样式 */
  .ca-math-inline {
    font-family: 'Times New Roman', serif;
    font-style: italic;
    background: rgba(0, 0, 0, 0.05);
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.95em;
  }

  .ca-math-block {
    font-family: 'Times New Roman', serif;
    font-style: italic;
    background: rgba(0, 0, 0, 0.03);
    padding: 12px 16px;
    border-radius: 8px;
    margin: 12px 0;
    text-align: center;
    font-size: 1.1em;
    border-left: 3px solid var(--ca-primary);
  }

  /* 表格样式 - Apple 风格 */
  .ca-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    margin: 20px 0;
    background: #FFFFFF;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    border: 0.5px solid rgba(0, 0, 0, 0.04);
  }

  .ca-table-th {
    background: linear-gradient(180deg, #F2F2F7 0%, #E5E5EA 100%);
    color: #1D1D1F;
    padding: 16px 20px;
    text-align: left;
    font-weight: 600;
    font-size: 15px;
    border-bottom: 0.5px solid rgba(0, 0, 0, 0.08);
    letter-spacing: -0.24px;
  }

  .ca-table-td {
    padding: 14px 20px;
    border-bottom: 0.5px solid rgba(0, 0, 0, 0.04);
    font-size: 15px;
    line-height: 1.4;
    color: rgba(60, 60, 67, 0.9);
    font-weight: 400;
  }

  .ca-table-row:nth-child(even) {
    background: rgba(120, 120, 128, 0.04);
  }

  .ca-table-row:hover {
    background: rgba(0, 122, 255, 0.06);
    transition: background-color 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .ca-table-row:last-child .ca-table-td {
    border-bottom: none;
  }

  /* 选择题样式 - Apple 风格 */
  .ca-quiz-container {
    background: rgba(120, 120, 128, 0.08);
    border: 0.5px solid rgba(0, 0, 0, 0.04);
    border-radius: 12px;
    padding: 20px;
    margin: 16px 0;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  }

  .ca-quiz-question h4 {
    color: #007AFF;
    font-size: 16px;
    font-weight: 600;
    margin: 0 0 12px 0;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .ca-quiz-question p {
    color: #1D1D1F;
    font-size: 15px;
    font-weight: 500;
    line-height: 1.5;
    margin: 0 0 20px 0;
  }

  .ca-quiz-options {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 20px;
  }

  .ca-quiz-option {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    font-size: 14px;
    text-align: left;
    width: 100%;
    box-sizing: border-box;
  }

  .ca-quiz-option:hover {
    background: rgba(0, 122, 255, 0.06);
    border-color: rgba(0, 122, 255, 0.2);
    transform: translateY(-1px);
  }

  .ca-quiz-option.selected {
    background: rgba(0, 122, 255, 0.1);
    border-color: #007AFF;
    color: #007AFF;
  }

  .ca-quiz-option.correct {
    background: rgba(52, 199, 89, 0.1);
    border-color: #34C759;
    color: #34C759;
  }

  .ca-quiz-option.incorrect {
    background: rgba(255, 59, 48, 0.1);
    border-color: #FF3B30;
    color: #FF3B30;
  }

  .ca-quiz-option:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }

  .ca-option-label {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    background: currentColor;
    color: white;
    border-radius: 50%;
    font-weight: 600;
    font-size: 12px;
    flex-shrink: 0;
  }

  .ca-option-text {
    flex: 1;
    font-weight: 500;
  }

  .ca-quiz-actions {
    display: flex;
    justify-content: center;
    margin-bottom: 16px;
  }

  .ca-quiz-submit {
    background: #007AFF;
    color: white;
    border: none;
    border-radius: 20px;
    padding: 10px 24px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .ca-quiz-submit:hover:not(:disabled) {
    background: #0056CC;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
  }

  .ca-quiz-submit:disabled {
    background: rgba(120, 120, 128, 0.3);
    cursor: not-allowed;
  }

  .ca-quiz-result {
    border-top: 0.5px solid rgba(0, 0, 0, 0.08);
    padding-top: 16px;
  }

  .ca-quiz-status {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 12px;
    text-align: center;
  }

  .ca-quiz-status.correct {
    color: #34C759;
  }

  .ca-quiz-status.incorrect {
    color: #FF3B30;
  }

  .ca-quiz-explanation {
    background: rgba(120, 120, 128, 0.06);
    border-radius: 8px;
    padding: 12px 16px;
    font-size: 14px;
    line-height: 1.5;
    color: rgba(60, 60, 67, 0.8);
  }

  /* 自定义Tooltip样式 - Apple 风格 */
  .ca-tooltip {
    position: fixed;
    background: rgba(0, 0, 0, 0.85);
    color: white;
    padding: 6px 10px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 500;
    white-space: nowrap;
    z-index: 2147483647;
    pointer-events: none;
    opacity: 0;
    transform: translateY(4px);
    transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    letter-spacing: 0.2px;
    font-family: var(--ca-font);
  }

  .ca-tooltip.show {
    opacity: 1;
    transform: translateY(0);
  }

  .ca-tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 4px solid transparent;
    border-top-color: rgba(0, 0, 0, 0.85);
  }

  /* 为有tooltip的元素添加样式 */
  [data-tooltip] {
    position: relative;
  }

  /* 代码块样式 - Apple 风格 */
  .ca-code-block {
    margin: 20px 0;
    border-radius: 12px;
    overflow: hidden;
    background: #F2F2F7;
    border: 0.5px solid rgba(0, 0, 0, 0.04);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    font-family: 'SF Mono', ui-monospace, SFMono-Regular, 'Cascadia Code', Menlo, Monaco, Consolas, monospace;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  .ca-code-header {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.4) 100%);
    color: #1D1D1F;
    padding: 12px 16px;
    font-size: 13px;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 0.5px solid rgba(0, 0, 0, 0.08);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }

  .ca-code-lang {
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #007AFF;
    font-size: 11px;
  }

  .ca-code-copy {
    background: rgba(0, 122, 255, 0.1);
    border: 0.5px solid rgba(0, 122, 255, 0.2);
    color: #007AFF;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 11px;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    font-weight: 600;
    letter-spacing: 0.2px;
  }

  .ca-code-copy:hover {
    background: rgba(0, 122, 255, 0.15);
    border-color: rgba(0, 122, 255, 0.3);
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 122, 255, 0.2);
  }

  .ca-code-copy.copied {
    background: rgba(52, 199, 89, 0.1);
    border-color: rgba(52, 199, 89, 0.3);
    color: #34C759;
  }

  .ca-code-content {
    padding: 16px 20px;
    background: #FAFAFA;
    color: #1D1D1F;
    font-size: 14px;
    line-height: 1.6;
    overflow-x: auto;
    white-space: pre;
    font-family: inherit;
    font-weight: 400;
  }

  .ca-code-content code {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    color: inherit;
  }

  /* 行内代码样式 - Apple 风格 */
  .ca-inline-code {
    background: rgba(120, 120, 128, 0.12);
    color: #AF52DE;
    padding: 2px 6px;
    border-radius: 6px;
    font-family: 'SF Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 0.9em;
    font-weight: 500;
    letter-spacing: 0.2px;
  }

  /* 标题样式优化 */
  .ca-heading {
    margin: 20px 0 12px 0;
    font-weight: 600;
    line-height: 1.3;
  }

  .ca-h1 {
    font-size: 1.5em;
    color: var(--ca-primary);
    border-bottom: 2px solid var(--ca-primary);
    padding-bottom: 8px;
  }

  .ca-h2 {
    font-size: 1.3em;
    color: var(--ca-text);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding-bottom: 6px;
  }

  .ca-h3 {
    font-size: 1.1em;
    color: var(--ca-text);
  }

  /* 引用样式 - Apple 风格 */
  .ca-quote {
    background: rgba(120, 120, 128, 0.08);
    border-left: 4px solid #007AFF;
    padding: 16px 20px;
    margin: 16px 0;
    border-radius: 0 12px 12px 0;
    font-style: italic;
    color: rgba(60, 60, 67, 0.8);
    position: relative;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 0.5px solid rgba(0, 0, 0, 0.04);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  }

  /* 分隔线样式 */
  .ca-divider {
    border: none;
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(0, 0, 0, 0.1), transparent);
    margin: 24px 0;
  }

  /* 防止主题切换闪烁的平滑过渡 */
  :root {
    transition:
      --ca-primary 0.3s ease,
      --ca-primary-dark 0.3s ease,
      --ca-secondary 0.3s ease,
      --ca-accent 0.3s ease,
      --ca-text 0.3s ease,
      --ca-text-light 0.3s ease;
  }

  .ca-panel, .ca-bubble, .ca-send, .ca-model-selector {
    transition:
      background-color 0.3s ease,
      border-color 0.3s ease,
      color 0.3s ease;
  }

  /* 全屏模式下的消息区域 - 完美对齐 */
  .ca-panel.ca-fullscreen > .ca-messages {
    padding: 24px 72px !important;
    margin: 0 !important;
    border: none !important;
    box-sizing: border-box !important;
    width: 100% !important;
  }

  /* 全屏模式下隐藏关闭按钮，显示全屏按钮 */
  .ca-panel.ca-fullscreen .ca-close {
    display: none !important;
  }

  /* 全屏按钮图标切换 */
  .ca-fullscreen .ca-fullscreen-expand {
    display: block;
  }

  .ca-fullscreen .ca-fullscreen-compress {
    display: none;
  }

  .ca-panel.ca-fullscreen .ca-fullscreen .ca-fullscreen-expand {
    display: none !important;
  }

  .ca-panel.ca-fullscreen .ca-fullscreen .ca-fullscreen-compress {
    display: block !important;
  }

  /* 全屏模式下的背景遮罩调整 - 白色玻璃效果 */
  .ca-backdrop.ca-fullscreen-active {
    background: rgba(255, 255, 255, 0.1) !important;
    backdrop-filter: blur(8px) saturate(120%) !important;
    -webkit-backdrop-filter: blur(8px) saturate(120%) !important;
    pointer-events: none !important;
    z-index: 9999 !important;
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
  }

  /* 背景遮罩 - 移除毛玻璃 */
  .ca-backdrop{
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.2);
    opacity: 0;
    pointer-events: none;
    transition: opacity var(--ca-transition);
    z-index: 2147482998;
  }
  .ca-backdrop.open{opacity: 1; pointer-events: auto;}

  /* 标题栏样式 - 现代终端风格 */
  .ca-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 24px;
    background: var(--ca-primary);
    color: var(--ca-text-on-primary);
    position: relative;
    z-index: 1;
    border-radius: var(--ca-radius-lg) 0 0 0;
  }

  .ca-header::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1px;
    background: rgba(255, 255, 255, 0.2);
  }

  .ca-title-wrapper {
    display: flex;
    align-items: center;
    gap: 12px;
    animation: slideInLeft 0.6s ease-out;
  }

  .ca-logo {
    width: 28px;
    height: 28px;
    opacity: 0.95;
    animation: rotateLogo 25s ease-in-out infinite;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  }

  @keyframes rotateLogo {
    0% { transform: rotate(0deg) scale(1); }
    25% { transform: rotate(8deg) scale(1.05); }
    50% { transform: rotate(0deg) scale(1); }
    75% { transform: rotate(-8deg) scale(1.05); }
    100% { transform: rotate(0deg) scale(1); }
  }

  .ca-title {
    font-size: 1.6rem;
    font-weight: 300;
    letter-spacing: 0.5px;
    font-family: 'DaMengKaTongTi', 'Comic Sans MS', 'Marker Felt', 'Trebuchet MS', cursive, sans-serif;
    color: var(--ca-text-on-primary);
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .ca-actions {
    display: flex;
    align-items: center;
    gap: 8px;
    animation: slideInRight 0.6s ease-out;
  }



  /* 字体选择器样式 - 隐藏 */
  .ca-font-selector {
    display: none;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: var(--ca-radius-xs);
    color: var(--ca-text-on-primary);
    font-family: var(--ca-font);
    font-size: 0.8rem;
    padding: 4px 8px;
    cursor: pointer;
    transition: all var(--ca-transition-fast);
  }

  .ca-font-selector:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
  }

  .ca-font-selector option {
    background: var(--ca-primary);
    color: var(--ca-text-on-primary);
  }

  .ca-newchat {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: inherit;
    cursor: pointer;
    height: 36px;
    padding: 0 12px;
    border-radius: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--ca-transition-fast);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    font-family: var(--ca-font);
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.2px;
    white-space: nowrap;
  }

  .ca-newchat-text {
    color: inherit;
    font-size: inherit;
    font-weight: inherit;
  }

  .ca-fullscreen, .ca-close {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: inherit;
    cursor: pointer;
    width: 36px;
    height: 36px;
    border-radius: var(--ca-radius-full);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--ca-transition-fast);
    padding: 0;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  .ca-newchat:hover {
    background-color: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.25);
    transform: translateY(-0.5px);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  }

  .ca-newchat:active {
    background-color: rgba(255, 255, 255, 0.25);
    transform: translateY(0);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
  }

  .ca-fullscreen:hover, .ca-close:hover {
    background-color: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.25);
    transform: translateY(-0.5px);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  }

  .ca-fullscreen:active, .ca-close:active {
    background-color: rgba(255, 255, 255, 0.25);
    transform: translateY(0);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
  }

  /* 消息区域样式 - 适合儿童的高密度布局 */
  .ca-messages {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
    font-size: 0.85rem;
    line-height: 1.45;
    color: var(--ca-text);
    display: flex;
    flex-direction: column;
    gap: 8px;
    background: var(--ca-bg-messages);
    scroll-behavior: smooth;
    font-family: var(--ca-font);
    position: relative;
  }
  
  /* 消息组样式 - 紧凑布局 */
  .ca-message-group {
    display: flex;
    flex-direction: column;
    animation: terminalType 0.5s ease-out both;
    margin-bottom: 8px;
    position: relative;
  }

  /* 用户消息组 - 代码块风格 */
  .ca-message-group-user {
    align-items: flex-end;
  }

  /* 助手消息组 - 终端输出风格 */
  .ca-message-group-assistant {
    align-items: flex-start;
  }

  /* 终端打字动画 */
  @keyframes terminalType {
    0% {
      opacity: 0;
      transform: translateY(10px);
    }
    50% {
      opacity: 0.7;
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* 滚动条样式 - 现代化设计 */
  .ca-messages::-webkit-scrollbar {
    width: 8px;
  }

  .ca-messages::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.02);
    border-radius: var(--ca-radius-full);
  }

  .ca-messages::-webkit-scrollbar-thumb {
    background: rgba(79, 70, 229, 0.4);
    border-radius: var(--ca-radius-full);
    border: 2px solid transparent;
    background-clip: content-box;
  }

  .ca-messages::-webkit-scrollbar-thumb:hover {
    background: rgba(79, 70, 229, 0.6);
    background-clip: content-box;
  }
  
  /* 空白状态 - 紧凑现代终端风格 */
  .ca-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 20%;
    text-align: center;
    color: var(--ca-text-light);
    animation: fadeInUp 0.6s ease-out;
  }

  .ca-empty-icon {
    margin-bottom: 12px;
    color: var(--ca-primary-solid, var(--ca-primary));
    opacity: 0.8;
    animation: float 3s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-4px); }
  }

  .ca-empty-text {
    font-size: 1.2rem;
    max-width: 80%;
    line-height: 1.5;
    font-family: var(--ca-font);
    font-weight: var(--ca-font-weight, 400);
    letter-spacing: 0.3px;
    opacity: 0.7;
  }

  .ca-empty-text::before {
    content: '🐾 ';
    color: var(--ca-primary-solid, var(--ca-primary));
    font-weight: bold;
  }
  
  /* 消息气泡 - 适合儿童的紧凑终端基础样式 */
  .ca-bubble {
    word-break: break-word;
    position: relative;
    font-family: var(--ca-font);
    font-weight: 500;
    line-height: 1.5;
    font-size: 1.05rem;
    letter-spacing: 0.2px;
  }

  /* 时间戳样式 - 每条消息独立显示 */
  .ca-timestamp {
    font-size: 0.75rem;
    color: var(--ca-text-light);
    opacity: 0.6;
    font-family: var(--ca-font);
    font-weight: 300;
    margin-bottom: 4px;
    position: relative;
    letter-spacing: 0.3px;
  }

  /* 用户消息的时间戳右对齐 */
  .ca-message-group-user .ca-timestamp {
    text-align: right;
  }

  /* 助手消息的时间戳左对齐 */
  .ca-message-group-assistant .ca-timestamp {
    text-align: left;
  }

  /* 聊天示例样式 - Apple 风格，与主题色搭配 */
  .ca-chat-examples {
    margin-top: 16px;
    padding: 0;
    background: none;
    border: none;
  }

  .ca-examples-title {
    font-family: var(--ca-font);
    font-size: 13px;
    color: rgba(60, 60, 67, 0.7);
    margin-bottom: 12px;
    font-weight: 600;
    text-align: left;
    letter-spacing: -0.08px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .ca-examples-title::before {
    content: '💡';
    font-size: 12px;
    opacity: 0.8;
  }

  .ca-example-btn {
    display: block;
    width: 100%;
    margin-bottom: 8px;
    padding: 10px 14px;
    background: linear-gradient(135deg,
      rgba(var(--ca-primary-rgb, 79, 70, 229), 0.06) 0%,
      rgba(var(--ca-primary-rgb, 79, 70, 229), 0.02) 100%);
    border: 0.5px solid rgba(var(--ca-primary-rgb, 79, 70, 229), 0.12);
    border-radius: 10px;
    color: rgba(60, 60, 67, 0.85);
    font-family: var(--ca-font);
    font-size: 13px;
    text-align: left;
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    font-weight: 500;
    letter-spacing: -0.08px;
    position: relative;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  }

  .ca-example-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg,
      rgba(255, 255, 255, 0.8) 0%,
      rgba(255, 255, 255, 0.2) 100%);
    border-radius: inherit;
    opacity: 0;
    transition: opacity 0.25s ease;
    pointer-events: none;
  }

  .ca-example-btn:last-child {
    margin-bottom: 0;
  }

  .ca-example-btn:hover {
    background: linear-gradient(135deg,
      rgba(var(--ca-primary-rgb, 79, 70, 229), 0.12) 0%,
      rgba(var(--ca-primary-rgb, 79, 70, 229), 0.06) 100%);
    border-color: rgba(var(--ca-primary-rgb, 79, 70, 229), 0.2);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(var(--ca-primary-rgb, 79, 70, 229), 0.15);
    color: rgba(var(--ca-primary-rgb, 79, 70, 229), 1);
  }

  .ca-example-btn:hover::before {
    opacity: 1;
  }

  .ca-example-btn:active {
    transform: translateY(0);
    box-shadow: 0 1px 3px rgba(var(--ca-primary-rgb, 79, 70, 229), 0.2);
  }

  /* 主题选择消息样式 */
  .ca-theme-selection {
    margin-top: 12px;
    padding: 0;
  }

  .ca-theme-intro {
    font-family: var(--ca-font);
    font-size: 0.9rem;
    color: inherit;
    margin-bottom: 12px;
    font-weight: 500;
    opacity: 0.9;
  }

  .ca-theme-options {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 8px;
  }

  .ca-theme-option {
    background: rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: var(--ca-radius-sm);
    padding: 8px;
    cursor: pointer;
    transition: all var(--ca-transition-fast);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    position: relative;
    color: inherit;
    font-family: var(--ca-font);
  }

  .ca-theme-option:hover {
    background: rgba(0, 0, 0, 0.15);
    border-color: rgba(0, 0, 0, 0.2);
    transform: translateY(-1px);
  }

  .ca-theme-option.active {
    background: rgba(0, 0, 0, 0.2);
    border-color: rgba(0, 0, 0, 0.3);
  }

  .ca-theme-preview-small {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 8px;
    color: white;
    font-weight: bold;
  }

  .ca-theme-label {
    font-size: 0.7rem;
    text-align: center;
    line-height: 1.2;
    font-weight: 500;
  }

  .ca-current-badge {
    position: absolute;
    top: 2px;
    right: 2px;
    background: rgba(255, 215, 0, 0.9);
    color: #333;
    font-size: 0.6rem;
    padding: 1px 4px;
    border-radius: 8px;
    font-weight: bold;
  }

  /* 时间戳文本格式 - 简化样式 */
  .ca-timestamp-text {
    background: var(--ca-bg-messages);
    padding: 0 6px;
    position: relative;
    z-index: 1;
  }

  /* 用户消息气泡 - 紧凑代码块风格 */
  .ca-bubble-user {
    background: var(--ca-primary);
    color: var(--ca-text-on-primary);
    border-radius: var(--ca-radius-sm);
    padding: 8px 12px 8px 24px;
    border: 1px solid var(--ca-primary-dark);
    box-shadow: var(--ca-shadow-md),
                inset 0 1px 0 rgba(255, 255, 255, 0.2);
    max-width: 70%;
    align-self: flex-end;
    position: relative;
    font-weight: 500;
  }

  /* 用户消息前缀 - 绝对定位，避免多行问题 */
  .ca-bubble-user::before {
    content: '';
    position: absolute;
    left: 8px;
    top: 8px;
    color: rgba(255, 255, 255, 0.9);
    font-weight: bold;
    font-size: 0.9rem;
    line-height: 1.45;
  }

  /* 助手消息 - 简洁终端输出风格 */
  .ca-bubble-assistant {
    background: transparent;
    color: var(--ca-text);
    border: none;
    padding: 4px 0 4px 24px;
    margin: 0;
    position: relative;
    width: 100%;
    border-left: 3px solid var(--ca-primary-solid, var(--ca-primary));
    transition: all var(--ca-transition-fast);
  }

  /* 助手消息终端前缀 - 绝对定位，避免多行问题 */
  .ca-bubble-assistant::before {
    content: '🐾';
    position: absolute;
    left: 6px;
    top: 4px;
    color: var(--ca-primary-solid, var(--ca-primary));
    font-weight: bold;
    font-size: 0.9rem;
    line-height: 1.45;
  }

  /* 悬浮时的微妙效果 */
  .ca-bubble-assistant:hover {
    border-left-color: var(--ca-primary-solid, var(--ca-primary));
    background: var(--ca-hover-bg, rgba(79, 70, 229, 0.02));
  }
  
  /* 消息出现动画 - 更自然的动效 */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(12px) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  
  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  /* 输入区域 - 现代终端风格 */
  .ca-inputbar {
    display: flex;
    align-items: flex-end;
    padding: 18px 24px;
    background: var(--ca-bg-light);
    border-top: 1px solid var(--ca-border-light);
    position: relative;
    z-index: 2;
    animation: slideInUp 0.6s ease-out;
    gap: 12px;
  }

  /* 输入框容器 - 优化对齐 */
  .ca-input-container {
    flex: 1;
    position: relative;
    display: flex;
    align-items: flex-end; /* 确保与发送按钮底部对齐 */
  }

  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(15px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .ca-inputbar::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 1px;
    background: var(--ca-border-light);
    z-index: 1;
  }

  .ca-input-container textarea {
    width: 100%;
    resize: none;
    border: 1px solid var(--ca-border-light);
    border-radius: var(--ca-radius-sm);
    padding: 12px 40px 12px 48px; /* 左侧留出空间给出题按钮，右侧给模型选择器 */
    font-family: var(--ca-font);
    font-weight: var(--ca-font-weight, 400);
    font-size: 1.1rem;
    line-height: 1.5;
    min-height: 50px; /* 修改：与发送按钮对齐 */
    max-height: 120px;
    background: var(--ca-bg-bubble-user);
    color: var(--ca-text);
    box-shadow: var(--ca-shadow-sm);
    transition: all var(--ca-transition-fast);
    letter-spacing: 0.5px;
    overflow-y: hidden;
    box-sizing: border-box; /* 确保盒模型一致 */
  }

  /* 隐藏textarea的滚动条 */
  .ca-input-container textarea::-webkit-scrollbar {
    display: none;
  }

  .ca-input-container textarea {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .ca-input-container textarea:focus {
    outline: none;
    border-color: var(--ca-primary-solid, var(--ca-primary));
    box-shadow: var(--ca-shadow-sm),
                0 0 0 3px var(--ca-focus-shadow, rgba(79, 70, 229, 0.1));
  }

  .ca-input-container textarea::placeholder {
    color: var(--ca-text-light);
    opacity: 0.8;
  }

  /* 出题按钮 - 内嵌在输入框左下角 */
  .ca-quiz-btn {
    position: absolute;
    bottom: 8px;
    left: 8px;
    width: 28px;
    height: 28px;
    background: transparent;
    border: none;
    border-radius: var(--ca-radius-xs);
    color: var(--ca-text-light);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.6;
    transition: all var(--ca-transition-fast);
    z-index: 10;
  }

  .ca-quiz-btn:hover {
    opacity: 1;
    background: rgba(var(--ca-primary-rgb, 79, 70, 229), 0.1);
    color: var(--ca-primary-solid, var(--ca-primary));
    transform: translateY(-1px);
  }

  .ca-quiz-btn:active {
    transform: translateY(0);
  }

  .ca-quiz-btn svg {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .ca-quiz-btn:hover svg {
    transform: scale(1.05);
  }

  /* 模型选择器 - 内嵌在输入框右下角 */
  .ca-model-selector {
    position: absolute;
    bottom: 8px;
    right: 8px;
    width: 24px;
    height: 24px;
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--ca-radius-xs);
    color: var(--ca-text-light);
    opacity: 0.6;
    transition: all var(--ca-transition-fast);
    z-index: 10;
  }

  .ca-model-selector:hover {
    opacity: 1;
    background: rgba(var(--ca-primary-rgb, 79, 70, 229), 0.08);
    color: var(--ca-primary-solid, var(--ca-primary));
    transform: translateY(-0.5px);
  }

  .ca-model-selector:active {
    transform: translateY(0);
  }

  .ca-model-dropdown {
    position: absolute;
    bottom: 50px;
    right: 24px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: var(--ca-radius-md);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
    min-width: 220px;
    max-height: 280px;
    overflow: hidden;
    z-index: 1001;
    opacity: 0;
    visibility: hidden;
    transform: translateY(8px) scale(0.95);
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .ca-model-dropdown.show {
    opacity: 1;
    visibility: visible;
    transform: translateY(0) scale(1);
  }

  .ca-model-list {
    padding: 6px;
    max-height: 260px;
    overflow-y: auto;
  }

  .ca-model-item {
    padding: 10px 12px;
    cursor: pointer;
    transition: all var(--ca-transition-fast);
    border: none;
    background: none;
    width: 100%;
    text-align: left;
    font-family: var(--ca-font);
    border-radius: var(--ca-radius-xs);
    margin-bottom: 2px;
    position: relative;
  }

  .ca-model-item:hover {
    background: rgba(0, 0, 0, 0.06);
    transform: translateX(2px);
  }

  .ca-model-item.active {
    background: rgba(79, 70, 229, 0.08);
    color: var(--ca-primary-solid, var(--ca-primary));
  }

  .ca-model-item.active::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 60%;
    background: var(--ca-primary-solid, var(--ca-primary));
    border-radius: 0 2px 2px 0;
  }

  .ca-model-item-name {
    font-weight: 600;
    font-size: 0.9rem;
    margin-bottom: 3px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .ca-model-item-desc {
    font-size: 0.75rem;
    color: var(--ca-text-light);
    opacity: 0.8;
    line-height: 1.3;
    margin-bottom: 6px;
  }

  .ca-model-item-status {
    display: flex;
    gap: 6px;
  }

  .ca-model-status-badge {
    font-size: 0.65rem;
    padding: 2px 6px;
    border-radius: 10px;
    font-weight: 500;
    letter-spacing: 0.3px;
  }

  .ca-model-status-speed {
    background: rgba(34, 197, 94, 0.12);
    color: #15803d;
  }

  .ca-model-status-quality {
    background: rgba(59, 130, 246, 0.12);
    color: #1d4ed8;
  }

  .ca-model-status-cost {
    background: rgba(245, 158, 11, 0.12);
    color: #b45309;
  }

  .ca-model-current-indicator {
    font-size: 0.7rem;
    color: var(--ca-primary-solid, var(--ca-primary));
    font-weight: 600;
  }
  
  .ca-send {
    width: 50px;
    height: 50px;
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: var(--ca-radius-full);
    background: var(--ca-primary);
    color: var(--ca-text-on-primary);
    cursor: pointer;
    transition: all var(--ca-transition-fast);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--ca-shadow-md),
                inset 0 1px 0 rgba(255, 255, 255, 0.2);
    padding: 0;
    flex-shrink: 0;
    box-sizing: border-box; /* 确保盒模型一致 */
  }

  .ca-send:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: #cbd5e0;
    border-color: #e2e8f0;
    box-shadow: var(--ca-shadow-xs);
  }

  .ca-send:not(:disabled):hover {
    transform: translateY(-1px);
    box-shadow: var(--ca-shadow-md),
                inset 0 1px 0 rgba(255, 255, 255, 0.2),
                0 0 12px rgba(79, 70, 229, 0.2);
    border-color: rgba(255, 255, 255, 0.25);
  }

  .ca-send:not(:disabled):active {
    transform: translateY(0);
    box-shadow: var(--ca-shadow-sm),
                inset 0 1px 0 rgba(255, 255, 255, 0.15);
  }

  /* 移动端适配 - 优化移动端体验 */
  @media(max-width: 640px){
    .ca-panel{
      width: 100%;
      border-radius: var(--ca-radius-xl) var(--ca-radius-xl) 0 0;
      border-left: none;
      border-top: 2px solid var(--ca-border-light);
      transform: translateY(100%);
      height: 88vh;
      bottom: 0;
      top: auto;
    }
    .ca-panel.open{transform: translateY(0);}

    .ca-ball {
      right: 20px;
      bottom: 20px;
      width: 56px;
      height: 56px;
    }

    .ca-ball svg {
      width: 26px;
      height: 26px;
    }

    .ca-message-group {
      margin-bottom: 16px;
    }

    .ca-message-group-user {
      max-width: 85%;
    }

    .ca-bubble-user {
      padding: 10px 14px 10px 24px;
    }

    .ca-bubble-user::before {
      left: 10px;
      top: 10px;
    }

    .ca-bubble-assistant {
      padding: 6px 0 6px 24px;
      margin-right: 8px;
      width: calc(100% - 8px);
    }

    .ca-bubble-assistant::before {
      left: 6px;
      top: 6px;
    }

    .ca-timestamp {
      font-size: 0.6rem;
    }

    .ca-timestamp-user {
      right: 10px;
      bottom: 3px;
    }

    .ca-timestamp-assistant {
      left: 14px;
      bottom: 3px;
    }

    .ca-inputbar {
      padding: 16px 20px;
      gap: 10px;
    }

    .ca-send {
      width: 46px;
      height: 46px;
    }

    .ca-header {
      padding: 16px 20px;
    }

    .ca-messages {
      padding: 20px;
      gap: 18px;
    }

    .ca-bubble {
      padding: 14px 18px;
    }
  }

  .ca-confirm-content h3 {
    margin-bottom: 12px;
    color: var(--ca-text);
    font-weight: 600;
    font-family: 'ZCOOL KuaiLe', sans-serif;
  }
  .ca-confirm-content p {
    margin-bottom: 20px;
    color: var(--ca-text-light);
    font-size: 0.9rem;
    line-height: 1.5;
    font-family: 'ZCOOL KuaiLe', sans-serif;
  }
  .ca-confirm-actions {
    display: flex;
    justify-content: center;
    gap: 12px;
  }
  .ca-confirm-cancel, .ca-confirm-ok {
    padding: 8px 16px;
    border-radius: var(--ca-radius-sm);
    font-family: 'ZCOOL KuaiLe', var(--ca-font);
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s;
  }
  `;

  // HTML structure
  const html=`<button class="ca-ball" aria-label="打开喵喵对话助手">
    <div class="ca-ball-logo">AI</div>
  </button>
  <aside class="ca-panel" aria-expanded="false">
    <header class="ca-header">
      <div class="ca-title-wrapper">
        <svg class="ca-logo" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- 外圆圈 -->
          <circle cx="12" cy="12" r="11" stroke="currentColor" stroke-width="1.5" fill="none"/>
          <!-- 猫掌印 - 主掌垫 -->
          <ellipse cx="12" cy="15" rx="3" ry="2.5" fill="currentColor"/>
          <!-- 左上脚趾 -->
          <ellipse cx="9" cy="10" rx="1.2" ry="1.5" fill="currentColor"/>
          <!-- 左中脚趾 -->
          <ellipse cx="10.5" cy="8.5" rx="1.2" ry="1.5" fill="currentColor"/>
          <!-- 右中脚趾 -->
          <ellipse cx="13.5" cy="8.5" rx="1.2" ry="1.5" fill="currentColor"/>
          <!-- 右上脚趾 -->
          <ellipse cx="15" cy="10" rx="1.2" ry="1.5" fill="currentColor"/>
        </svg>
        <span class="ca-title">喵喵助手</span>
      </div>
      <div class="ca-actions">
        <select class="ca-font-selector" title="选择字体">
          <option value="AaBanShuZhiShi-JiaoTangXiaoMao" selected>教堂小猫</option>
          <option value="ShangShouZongYiTi">上首综艺体</option>
          <option value="ZiHunDaHei-Heavy">字魂大黑</option>
          <option value="modern-chinese">现代中文</option>
          <option value="noto-sans">思源黑体</option>
          <option value="pingfang">苹方体</option>
          <option value="microsoft-yahei">微软雅黑</option>
          <option value="system-ui">系统默认</option>
          <option value="DaMengKaTongTi">大萌卡通体</option>
        </select>
        <button class="ca-newchat" aria-label="新对话">
          <span class="ca-newchat-text">新对话</span>
        </button>
        <button class="ca-fullscreen" aria-label="全屏">
          <svg class="ca-fullscreen-expand" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 14H5V19H10V17H7V14ZM5 10H7V7H10V5H5V10ZM17 17H14V19H19V14H17V17ZM14 5V7H17V10H19V5H14Z" fill="currentColor"/>
          </svg>
          <svg class="ca-fullscreen-compress" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 16H8V19H10V14H5V16ZM8 8H5V10H10V5H8V8ZM14 19H16V16H19V14H14V19ZM16 8V5H14V10H19V8H16Z" fill="currentColor"/>
          </svg>
        </button>

        <button class="ca-close" aria-label="折叠">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z" fill="currentColor"/>
          </svg>
        </button>
      </div>
    </header>
    <section class="ca-messages">
      <div class="ca-empty">
        <div class="ca-empty-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z" fill="currentColor"/>
            <path d="M12 15C12.55 15 13 14.55 13 14C13 13.45 12.55 13 12 13C11.45 13 11 13.45 11 14C11 14.55 11.45 15 12 15Z" fill="currentColor"/>
            <path d="M12 5H10V11H12V5Z" fill="currentColor"/>
          </svg>
        </div>
        <p class="ca-empty-text">喵～ 神奇喵喵在此，有什么可以帮你？</p>
      </div>
    </section>
    <footer class="ca-inputbar">
      <div class="ca-input-container">
        <button class="ca-quiz-btn" aria-label="出题">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- 大脑轮廓 -->
            <path d="M12 2C8.5 2 6 4.5 6 8c0 1.5 0.5 3 1.5 4.5C8.5 14 9.5 15.5 10 17c0.5 1.5 1 3 2 3s1.5-1.5 2-3c0.5-1.5 1.5-3 2.5-4.5C17.5 11 18 9.5 18 8c0-3.5-2.5-6-6-6z" stroke="currentColor" stroke-width="1.5" fill="none"/>
            <!-- 大脑纹理 -->
            <path d="M9 8c0.5-0.5 1.5-0.5 2 0M13 8c0.5-0.5 1.5-0.5 2 0M10 11c0.5 0.5 1.5 0.5 2 0M12 14c0.5 0.5 1.5 0.5 2 0" stroke="currentColor" stroke-width="1" opacity="0.6"/>
          </svg>
        </button>
        <textarea placeholder="输入内容…" rows="1"></textarea>
        <button class="ca-model-selector" aria-label="选择AI模型">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- AI芯片外框 -->
            <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" stroke-width="1.2" fill="none" opacity="0.7"/>
            <!-- 中央处理核心 -->
            <rect x="8" y="8" width="8" height="8" rx="2" fill="currentColor" opacity="0.8"/>
            <!-- 神经网络连接点 - 按顺序排列便于动画 -->
            <circle cx="6" cy="6" r="1.2" fill="currentColor" opacity="0.6"/>
            <circle cx="18" cy="6" r="1.2" fill="currentColor" opacity="0.6"/>
            <circle cx="6" cy="18" r="1.2" fill="currentColor" opacity="0.6"/>
            <circle cx="18" cy="18" r="1.2" fill="currentColor" opacity="0.6"/>
            <!-- 数据流连接线 -->
            <path d="M7.2 6.8L8.5 8.5" stroke="currentColor" stroke-width="1" opacity="0.5" stroke-linecap="round"/>
            <path d="M16.8 6.8L15.5 8.5" stroke="currentColor" stroke-width="1" opacity="0.5" stroke-linecap="round"/>
            <path d="M7.2 17.2L8.5 15.5" stroke="currentColor" stroke-width="1" opacity="0.5" stroke-linecap="round"/>
            <path d="M16.8 17.2L15.5 15.5" stroke="currentColor" stroke-width="1" opacity="0.5" stroke-linecap="round"/>
            <!-- 中央状态指示 -->
            <circle cx="12" cy="12" r="0.8" fill="white" opacity="0.9"/>
          </svg>
        </button>
      </div>
      <div class="ca-model-dropdown">
        <div class="ca-model-list">
          <!-- 模型列表将动态生成 -->
        </div>
      </div>
      <button class="ca-send" disabled>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="currentColor"/>
        </svg>
      </button>
    </footer>
  </aside>
  <div class="ca-backdrop" tabindex="-1"></div>`;

  // Append to shadow
  const styleEl=document.createElement('style');styleEl.textContent=style;shadow.appendChild(styleEl);
  const wrapper=document.createElement('div');wrapper.innerHTML=html;while(wrapper.firstChild){shadow.appendChild(wrapper.firstChild);} 

  const ball=shadow.querySelector('.ca-ball');
  const panel=shadow.querySelector('.ca-panel');
  const backdrop=shadow.querySelector('.ca-backdrop');
  const textarea=shadow.querySelector('textarea');
  const sendBtn=shadow.querySelector('.ca-send');
  const closeBtn=shadow.querySelector('.ca-close');
  const fullscreenBtn=shadow.querySelector('.ca-fullscreen');
  const newBtn=shadow.querySelector('.ca-newchat');
  const fontSelector=shadow.querySelector('.ca-font-selector');
  const quizBtn=shadow.querySelector('.ca-quiz-btn');
  let isOpen=false;
  let isFullscreen=false;

  // 拖动相关变量
  let isDragging = false;
  let dragStartX = 0;
  let dragStartY = 0;
  let ballStartX = 0;
  let ballStartY = 0;
  let hasMoved = false;
  function toggle(){
    isOpen=!isOpen;
    panel.classList.toggle('open',isOpen);
    backdrop.classList.toggle('open',isOpen);
    panel.setAttribute('aria-expanded',isOpen);
    
    // 添加动画效果 - 使用CSS类而不是直接设置style
    if(isOpen) {
      ball.classList.add('hidden-for-chat');

      // 延迟聚焦输入框，但不自动显示欢迎消息（由loadPersistedData处理）
      setTimeout(()=>{
        textarea.focus();
      },300);
    } else {
      // 关闭面板时恢复悬浮球
      setTimeout(() => {
        ball.classList.remove('hidden-for-chat');
      }, 100);
    }
  }

  // 拖动功能实现
  function startDrag(e) {
    isDragging = true;
    hasMoved = false;

    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;

    dragStartX = clientX;
    dragStartY = clientY;

    const rect = ball.getBoundingClientRect();
    ballStartX = rect.left;
    ballStartY = rect.top;

    ball.classList.add('dragging');

    // 阻止默认行为
    e.preventDefault();
  }

  function drag(e) {
    if (!isDragging) return;

    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;

    const deltaX = clientX - dragStartX;
    const deltaY = clientY - dragStartY;

    // 如果移动距离超过阈值，标记为已移动
    if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
      hasMoved = true;
    }

    let newX = ballStartX + deltaX;
    let newY = ballStartY + deltaY;

    // 边界检测
    const ballSize = 64;
    const maxX = window.innerWidth - ballSize;
    const maxY = window.innerHeight - ballSize;

    newX = Math.max(0, Math.min(newX, maxX));
    newY = Math.max(0, Math.min(newY, maxY));

    // 更新位置
    ball.style.left = newX + 'px';
    ball.style.top = newY + 'px';
    ball.style.right = 'auto';
    ball.style.bottom = 'auto';

    e.preventDefault();
  }

  function endDrag(e) {
    if (!isDragging) return;

    isDragging = false;
    ball.classList.remove('dragging');

    // 如果没有移动，触发点击事件
    if (!hasMoved) {
      toggle();
    }

    e.preventDefault();
  }

  // 拖动事件监听
  ball.addEventListener('mousedown', startDrag);
  ball.addEventListener('touchstart', startDrag, { passive: false });

  document.addEventListener('mousemove', drag);
  document.addEventListener('touchmove', drag, { passive: false });

  document.addEventListener('mouseup', endDrag);
  document.addEventListener('touchend', endDrag);

  // 字体切换功能
  function changeFont(fontFamily) {
    let newFontStack;

    switch(fontFamily) {
      case 'modern-chinese':
        // 现代中文字体栈 - 最佳可读性
        newFontStack = `'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei UI', 'Microsoft YaHei', 'Source Han Sans CN', 'Noto Sans CJK SC', 'WenQuanYi Micro Hei', sans-serif`;
        break;
      case 'noto-sans':
        // Google思源黑体 - 开源专业
        newFontStack = `'Noto Sans SC', 'Source Han Sans CN', 'PingFang SC', 'Microsoft YaHei', sans-serif`;
        break;
      case 'pingfang':
        // 苹方体 - 苹果设计
        newFontStack = `'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei UI', 'Microsoft YaHei', sans-serif`;
        break;
      case 'microsoft-yahei':
        // 微软雅黑 - Windows优化
        newFontStack = `'Microsoft YaHei UI', 'Microsoft YaHei', 'PingFang SC', 'Hiragino Sans GB', sans-serif`;
        break;
      case 'system-ui':
        // 系统默认字体
        newFontStack = `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif`;
        break;
      case 'ZiHunDaHei-Heavy':
        // 字魂大黑
        newFontStack = `'ZiHunDaHei-Heavy', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif`;
        break;
      case 'ShangShouZongYiTi':
        // 上首综艺体 - 活泼专业，平衡趣味性和可读性
        newFontStack = `'ShangShouZongYiTi', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif`;
        break;
      case 'AaBanShuZhiShi-JiaoTangXiaoMao':
        // 教堂小猫 - 可爱温馨，符合喵喵助手的主题风格
        newFontStack = `'AaBanShuZhiShi-JiaoTangXiaoMao', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', cursive`;
        break;
      default:
        // 其他自定义字体
        newFontStack = `'${fontFamily}', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif`;
    }

    // 调试信息
    console.log(`字体切换到: ${fontFamily}`);
    console.log(`字体堆栈: ${newFontStack}`);

    // 方法1: 更新CSS变量
    const root = shadow.host;
    root.style.setProperty('--ca-font', newFontStack);
    root.style.setProperty('--ca-font-ui', newFontStack);

    // 方法2: 直接更新Shadow DOM中的CSS
    const styleEl = shadow.querySelector('style');
    if (styleEl) {
      // 添加字体覆盖样式
      const fontOverrideCSS = `
        .ca-bubble, .ca-title, .ca-empty-text, .ca-font-selector {
          font-family: ${newFontStack} !important;
        }
      `;

      // 检查是否已有字体覆盖样式
      let fontOverrideStyle = shadow.querySelector('#font-override-style');
      if (!fontOverrideStyle) {
        fontOverrideStyle = document.createElement('style');
        fontOverrideStyle.id = 'font-override-style';
        shadow.appendChild(fontOverrideStyle);
      }
      fontOverrideStyle.textContent = fontOverrideCSS;
    }

    // 方法3: 强制重新渲染所有文本元素
    const textElements = shadow.querySelectorAll('.ca-bubble, .ca-title, .ca-empty-text, .ca-font-selector, .ca-timestamp-text');
    textElements.forEach(el => {
      el.style.fontFamily = newFontStack;
    });
  }

  fontSelector.addEventListener('change', (e) => {
    const selectedFont = e.target.value;
    const selectedFontName = e.target.options[e.target.selectedIndex].text;

    changeFont(selectedFont);

    // 延迟一点时间让字体应用，然后发送测试消息
    setTimeout(() => {
      // 检测字体是否加载成功
      if (document.fonts && document.fonts.check) {
        const fontLoaded = document.fonts.check(`16px "${selectedFont}"`);
        if (fontLoaded) {
          appendMsg('assistant', `✅ 已成功切换到 ${selectedFontName} 字体！这是一段测试文字，包含中文和English混排效果。你觉得这个字体怎么样？😊`);
        } else {
          appendMsg('assistant', `⚠️ 正在加载 ${selectedFontName} 字体...如果字体没有变化，可能是字体文件加载失败。当前显示的是备选字体。`);
        }
      } else {
        appendMsg('assistant', `已切换到 ${selectedFontName} 字体！这是一段测试文字，包含中文和English混排效果。你觉得这个字体怎么样？😊`);
      }
    }, 100);
  });

  // 背景点击事件 - 全屏模式下禁用
  backdrop.addEventListener('click', (e) => {
    // 全屏模式下点击背景完全无反应
    if (isFullscreen) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    // 非全屏模式下正常切换
    toggle();
  });

  // 初始化自定义tooltip，替换默认title
  addTooltipToElement(closeBtn, '折叠');
  addTooltipToElement(fullscreenBtn, '全屏模式');
  addTooltipToElement(quizBtn, '出题');
  addTooltipToElement(sendBtn, '发送消息');

  // 移除原有的title属性，避免与自定义tooltip冲突
  [closeBtn, fullscreenBtn, quizBtn, sendBtn].forEach(btn => {
    btn.removeAttribute('title');
  });

  closeBtn.addEventListener('click',toggle);

  // 全屏功能 - 纯CSS方案
  fullscreenBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    isFullscreen = !isFullscreen;

    if (isFullscreen) {
      // 进入全屏模式
      panel.classList.add('ca-fullscreen');
      backdrop.classList.add('ca-fullscreen-active');
      fullscreenBtn.setAttribute('aria-label', '退出全屏');
      // 更新自定义tooltip内容
      fullscreenBtn.setAttribute('data-tooltip', '退出全屏');

      // 确保面板是打开状态
      if (!isOpen) {
        toggle();
      }

      // 防止页面滚动
      document.body.style.overflow = 'hidden';

    } else {
      // 退出全屏模式
      panel.classList.remove('ca-fullscreen');
      backdrop.classList.remove('ca-fullscreen-active');
      fullscreenBtn.setAttribute('aria-label', '全屏');
      // 更新自定义tooltip内容
      fullscreenBtn.setAttribute('data-tooltip', '全屏模式');

      // 恢复页面滚动
      document.body.style.overflow = '';
    }
  });

  // ESC键退出全屏
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isFullscreen) {
      fullscreenBtn.click();
    }
  });




  newBtn.addEventListener('click',()=>{
    // 创建自定义确认对话框
    const confirmDialog = document.createElement('div');
    confirmDialog.className = 'ca-confirm-dialog';
    confirmDialog.innerHTML = `
      <div class="ca-confirm-content">
        <div class="ca-confirm-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
            <path d="M12 17H14V15H12V17ZM12 7H14V13H12V7Z" fill="currentColor"/>
          </svg>
        </div>
        <h3>开始新对话</h3>
        <p>开启新的对话会清除当前聊天记录，是否继续？<br>（请注意保存重要内容）</p>
        <div class="ca-confirm-actions">
          <button class="ca-confirm-cancel">取消</button>
          <button class="ca-confirm-ok">确认</button>
        </div>
      </div>
    `;
    
    // 添加样式
    const dialogStyle = document.createElement('style');
    dialogStyle.textContent = `
      .ca-confirm-dialog {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10;
        animation: fadeIn 0.2s ease-out;
      }
      .ca-confirm-content {
        background: white;
        border-radius: var(--ca-radius-md);
        padding: 24px;
        width: 85%;
        max-width: 300px;
        text-align: center;
        box-shadow: var(--ca-shadow-lg);
        animation: scaleIn 0.3s ease-out;
      }
      .ca-confirm-icon {
        color: var(--ca-primary-solid, var(--ca-primary));
        margin-bottom: 16px;
      }
      @keyframes scaleIn {
        from { transform: scale(0.8); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }
    `;
    
    panel.appendChild(dialogStyle);
    panel.appendChild(confirmDialog);
    
    // 添加事件监听
    confirmDialog.querySelector('.ca-confirm-cancel').addEventListener('click', () => {
      confirmDialog.remove();
      dialogStyle.remove();
    });
    
    confirmDialog.querySelector('.ca-confirm-ok').addEventListener('click', () => {
      confirmDialog.remove();
      dialogStyle.remove();
      resetConversation();
    });
  });

  // 出题按钮事件处理
  quizBtn.addEventListener('click', async () => {
    // 模拟用户发送出题请求
    const userMessage = '帮我出一道思维训练的题目，谢谢';

    // 添加用户消息到界面
    appendMsg('user', userMessage);

    // 构建包含幕后指令的完整请求
    const systemPrompt = `请出一道适合8-15岁学生的思维训练题目，要求：
1. 题目类型：逻辑推理、数学思维、创意思考中的一种
2. 难度：中等偏易，符合年龄段认知水平
3. 格式：选择题，必须有4个选项（A、B、C、D）
4. 结构清晰：题目描述 + 4个选项 + 正确答案
5. 输出格式：请严格按照以下JSON格式输出，不要添加任何其他文字：
{
  "question": "题目描述",
  "options": {
    "A": "选项A内容",
    "B": "选项B内容",
    "C": "选项C内容",
    "D": "选项D内容"
  },
  "correct": "正确答案字母(A/B/C/D)",
  "explanation": "答案解析"
}`;

    const fullMessage = systemPrompt + '\n\n用户请求：' + userMessage;

    // 开始流式输出
    isStreaming = true;
    updateSendButton(true);

    // 创建助手消息容器
    currentStreamingMessage = appendMsg('assistant', '', false, true);

    try {
      await window.ChatAssistant.sendMessageHook(fullMessage,
        // onProgress 回调
        (chunk, fullContent) => {
          if (currentStreamingMessage) {
            updateStreamingMessage(currentStreamingMessage, chunk, fullContent);
          }
        },
        // onComplete 回调
        (finalMessage) => {
          isStreaming = false;
          updateSendButton(false);
          if (currentStreamingMessage) {
            // 尝试解析为选择题格式
            parseAndRenderQuiz(currentStreamingMessage, finalMessage);
          }
          currentStreamingMessage = null;
        }
      );
    } catch(err) {
      isStreaming = false;
      updateSendButton(false);
      if (currentStreamingMessage) {
        finalizeStreamingMessage(currentStreamingMessage, '[错误] ' + err.message);
      }
      currentStreamingMessage = null;
    }
  });

  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&isOpen)toggle();});

  textarea.addEventListener('input',()=>{sendBtn.disabled=!textarea.value.trim(); resizeTextarea();});
  function resizeTextarea(){textarea.style.height='auto';textarea.style.height=textarea.scrollHeight+'px';}

  let isStreaming = false;
  let currentStreamingMessage = null;

  sendBtn.addEventListener('click',async()=>{
    console.log('🔘 [DEBUG] 发送按钮被点击');
    console.log('🔘 [DEBUG] 当前isStreaming状态:', isStreaming);
    console.log('🔘 [DEBUG] 当前按钮innerHTML:', sendBtn.innerHTML);

    if (isStreaming) {
      // 如果正在流式输出，则停止
      console.log('🛑 [DEBUG] 检测到流式输出状态，开始中止流程...');
      console.log('🛑 [DEBUG] window.apiClient存在:', !!window.apiClient);
      console.log('🛑 [DEBUG] cancelRequest方法存在:', !!(window.apiClient && typeof window.apiClient.cancelRequest === 'function'));

      // 调用API客户端的取消方法
      if (window.apiClient && typeof window.apiClient.cancelRequest === 'function') {
        console.log('🛑 [DEBUG] 正在调用 apiClient.cancelRequest()...');
        window.apiClient.cancelRequest();
        console.log('🛑 [DEBUG] apiClient.cancelRequest() 调用完成');
      } else {
        console.error('🛑 [DEBUG] 无法调用 cancelRequest - apiClient或方法不存在');
      }

      console.log('🛑 [DEBUG] 设置 isStreaming = false');
      isStreaming = false;
      console.log('🛑 [DEBUG] 调用 updateSendButton(false)');
      updateSendButton(false);

      // 保存当前已输出的内容
      if (currentStreamingMessage) {
        const contentElement = currentStreamingMessage.querySelector('.ca-message-content');
        if (contentElement) {
          const currentContent = contentElement.getAttribute('data-original-content') || contentElement.textContent || '';
          if (currentContent.trim()) {
            // 完成当前流式消息，保留已输出的内容
            finalizeStreamingMessage(currentStreamingMessage, currentContent);
            console.log('用户主动停止，已保存当前内容:', currentContent.substring(0, 50) + '...');
          } else {
            // 如果没有内容，移除空的消息容器
            if (currentStreamingMessage.parentNode) {
              currentStreamingMessage.parentNode.removeChild(currentStreamingMessage);
            }
          }
        }
        currentStreamingMessage = null;
      }

      console.log('流式输出已成功中止');
      return;
    }

    const msg=textarea.value.trim();
    if(!msg)return;

    appendMsg('user',msg);
    textarea.value='';
    resizeTextarea();

    // 检查是否为特殊命令（不需要API调用）
    if (msg.includes('主题') || msg.includes('颜色')) {
      // 添加轻微延时，让用户感觉更自然
      await new Promise(resolve => setTimeout(resolve, 300));

      // 直接处理主题切换，不需要流式输出
      try {
        const reply = await window.ChatAssistant.sendMessageHook(msg);
        appendMsg('assistant', reply || getDefaultReply());
      } catch(err) {
        appendMsg('assistant', '[错误] ' + err.message);
      }
      return;
    }

    // 开始流式输出（仅用于需要API调用的消息）
    console.log('🚀 [DEBUG] 开始流式输出');
    console.log('🚀 [DEBUG] 设置 isStreaming = true');
    isStreaming = true;
    console.log('🚀 [DEBUG] 调用 updateSendButton(true)');
    updateSendButton(true);
    lastContent = ''; // 重置内容

    // 调试：检查按钮状态
    debugButtonState();

    // 创建助手消息容器
    currentStreamingMessage = appendMsg('assistant', '', false, true); // 第四个参数表示这是流式消息

    try {
      const result = await window.ChatAssistant.sendMessageHook(msg,
        // onProgress 回调
        (chunk, fullContent) => {
          if (currentStreamingMessage) {
            updateStreamingMessage(currentStreamingMessage, chunk, fullContent);
          }
        },
        // onComplete 回调
        (finalMessage) => {
          console.log('📝 [DEBUG] onComplete 回调被调用，finalMessage:', finalMessage);

          // 检查是否是取消操作，如果是则不在这里处理状态
          if (finalMessage === null || (finalMessage && finalMessage.cancelled)) {
            console.log('📝 [DEBUG] 检测到取消操作，跳过 onComplete 处理');
            return;
          }

          console.log('📝 [DEBUG] 正常完成，设置 isStreaming = false');
          isStreaming = false;
          updateSendButton(false);
          if (currentStreamingMessage) {
            finalizeStreamingMessage(currentStreamingMessage, finalMessage);
          }
          currentStreamingMessage = null;
        }
      );

      // 如果返回null，说明用户主动取消了请求
      if (result === null) {
        console.log('用户主动取消，保留已输出内容');
        isStreaming = false;
        updateSendButton(false);
        // 不调用finalizeStreamingMessage，保留当前已输出的内容
        // 但需要保存当前状态
        if (currentStreamingMessage) {
          const contentElement = currentStreamingMessage.querySelector('.ca-message-content');
          if (contentElement) {
            const currentContent = contentElement.getAttribute('data-original-content') || contentElement.textContent || '';
            if (currentContent.trim()) {
              // 保存当前已输出的内容
              finalizeStreamingMessage(currentStreamingMessage, currentContent);
            }
          }
        }
        currentStreamingMessage = null;
      }
    } catch(err) {
      isStreaming = false;
      updateSendButton(false);
      if (currentStreamingMessage) {
        finalizeStreamingMessage(currentStreamingMessage, '[错误] ' + err.message);
      }
      currentStreamingMessage = null;
    }
  });

  const messagesContainer=shadow.querySelector('.ca-messages');

  // 更新发送按钮状态
  function updateSendButton(streaming) {
    console.log('🔄 [DEBUG] updateSendButton 被调用，streaming:', streaming);
    console.log('🔄 [DEBUG] 按钮更新前 innerHTML:', sendBtn.innerHTML);

    if (streaming) {
      // 停止状态：纯白色方块
      console.log('🔄 [DEBUG] 设置按钮为停止状态');
      sendBtn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="7" y="7" width="10" height="10" fill="white" rx="1.5"/>
        </svg>
      `;
      sendBtn.setAttribute('data-tooltip', '停止生成');
      sendBtn.disabled = false;
    } else {
      // 发送状态：箭头
      console.log('🔄 [DEBUG] 设置按钮为发送状态');
      sendBtn.innerHTML = '➤';
      sendBtn.setAttribute('data-tooltip', '发送消息');
      sendBtn.disabled = !textarea.value.trim();
    }

    console.log('🔄 [DEBUG] 按钮更新后 innerHTML:', sendBtn.innerHTML);
    console.log('🔄 [DEBUG] 按钮更新后 disabled:', sendBtn.disabled);
  }

  // 调试函数：检查按钮状态
  function debugButtonState() {
    console.log('🔍 [DEBUG] === 按钮状态检查 ===');
    console.log('🔍 [DEBUG] isStreaming:', isStreaming);
    console.log('🔍 [DEBUG] sendBtn.innerHTML:', sendBtn.innerHTML);
    console.log('🔍 [DEBUG] sendBtn.disabled:', sendBtn.disabled);
    console.log('🔍 [DEBUG] sendBtn.getAttribute("data-tooltip"):', sendBtn.getAttribute('data-tooltip'));
    console.log('🔍 [DEBUG] window.apiClient 存在:', !!window.apiClient);
    if (window.apiClient) {
      console.log('🔍 [DEBUG] apiClient.isStreaming:', window.apiClient.isStreaming);
      console.log('🔍 [DEBUG] apiClient.abortController 存在:', !!window.apiClient.abortController);
    }
    console.log('🔍 [DEBUG] === 检查结束 ===');
  }

  // 更新流式消息内容
  let lastContent = '';

  function updateStreamingMessage(messageElement, chunk, fullContent) {
    const bubble = messageElement.querySelector('.ca-bubble-assistant');
    if (bubble) {
      const content = fullContent || chunk;
      let contentElement = bubble.querySelector('.ca-message-content');

      if (!contentElement) {
        contentElement = document.createElement('div');
        contentElement.className = 'ca-message-content';
        bubble.appendChild(contentElement);
      }

      // 检查是否有新内容
      if (content !== lastContent) {
        // 先移除之前的动画类
        contentElement.classList.remove('ca-streaming-text');

        // 更新内容
        contentElement.innerHTML = formatMessage(content);
        // 保存原始内容用于持久化
        contentElement.setAttribute('data-original-content', content);

        // 强制重排，然后添加动画类
        void contentElement.offsetHeight;
        contentElement.classList.add('ca-streaming-text');

        lastContent = content;

        console.log('流式更新:', content.length, '字符'); // 调试日志
      }

      // 滚动到底部
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }

  // 为代码块复制按钮添加事件监听器
  function addCodeCopyListeners(container) {
    const copyButtons = container.querySelectorAll('.ca-code-copy');
    copyButtons.forEach(button => {
      button.addEventListener('click', async () => {
        const codeId = button.getAttribute('data-code-id');
        const codeElement = document.getElementById(codeId);
        if (codeElement) {
          const codeText = codeElement.textContent || codeElement.innerText || '';
          try {
            await navigator.clipboard.writeText(codeText);
            // 临时显示复制成功
            const originalText = button.textContent;
            button.textContent = '已复制';
            setTimeout(() => {
              button.textContent = originalText;
            }, 1000);
          } catch (err) {
            console.error('复制失败:', err);
            button.textContent = '复制失败';
            setTimeout(() => {
              button.textContent = '复制';
            }, 1000);
          }
        }
      });
    });
  }

  // 格式化消息内容 - Markdown渲染器
  function formatMessage(text) {
    if (!text) return '';

    let html = text;

    // 1. 代码块处理 (```)
    html = html.replace(/```(\w+)?\n?([\s\S]*?)```/g, (match, lang, code) => {
      const language = lang || 'text';
      const codeId = 'code-' + Math.random().toString(36).substr(2, 9);
      return `<div class="ca-code-block">
        <div class="ca-code-header">
          <span class="ca-code-lang">${language}</span>
          <button class="ca-code-copy" data-code-id="${codeId}">复制</button>
        </div>
        <pre class="ca-code-content" id="${codeId}"><code>${escapeHtml(code.trim())}</code></pre>
      </div>`;
    });

    // 2. 行内代码处理 (`)
    html = html.replace(/`([^`]+)`/g, '<code class="ca-inline-code">$1</code>');

    // 3. 标题处理 (### ## #)
    html = html.replace(/^### (.*$)/gm, '<h3 class="ca-heading ca-h3">$1</h3>');
    html = html.replace(/^## (.*$)/gm, '<h2 class="ca-heading ca-h2">$1</h2>');
    html = html.replace(/^# (.*$)/gm, '<h1 class="ca-heading ca-h1">$1</h1>');

    // 4. 粗体处理 (**)
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="ca-bold">$1</strong>');

    // 5. 斜体处理 (*)
    html = html.replace(/\*(.*?)\*/g, '<em class="ca-italic">$1</em>');

    // 6. 列表处理 - 改进版
    html = processLists(html);

    // 7. 引用处理 (>)
    html = html.replace(/^>\s*(.+)$/gm, '<blockquote class="ca-quote">$1</blockquote>');

    // 8. 分隔线处理 (---)
    html = html.replace(/^---+$/gm, '<hr class="ca-divider">');

    // 9. 表格处理
    html = parseMarkdownTable(html);

    // 10. 数学公式处理 (LaTeX)
    // 行内公式 $...$
    html = html.replace(/\$([^$\n]+)\$/g, '<span class="ca-math-inline">$1</span>');
    // 块级公式 $$...$$
    html = html.replace(/\$\$([\s\S]*?)\$\$/g, '<div class="ca-math-block">$1</div>');

    // 11. 链接处理 [text](url)
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="ca-link" target="_blank">$1</a>');

    // 11. 智能段落和换行处理
    // 先清理多余的空行
    html = html.replace(/\n{3,}/g, '\n\n'); // 3个以上换行变成2个

    // 分割成段落（以双换行为分隔符）
    const paragraphs = html.split(/\n\s*\n/);

    html = paragraphs.map(paragraph => {
      // 跳过空段落
      paragraph = paragraph.trim();
      if (!paragraph) return '';

      // 如果段落已经包含块级元素，不包装在p标签中
      if (paragraph.match(/<(div|ul|ol|h[1-6]|blockquote|hr|table)/)) {
        // 对于块级元素，只处理内部的单换行
        return paragraph.replace(/\n(?!<)/g, '<br>');
      }

      // 普通段落：单换行变成<br>，然后包装在p标签中
      const processedParagraph = paragraph.replace(/\n/g, '<br>');
      return `<p class="ca-paragraph">${processedParagraph}</p>`;
    }).filter(p => p.trim()).join('');

    // 11. 表情符号增强
    html = html.replace(/:\)/g, '😊');
    html = html.replace(/:\(/g, '😔');
    html = html.replace(/:D/g, '😄');
    html = html.replace(/:\|/g, '😐');

    return html;
  }

  // HTML转义函数
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // 改进的列表处理函数
  function processLists(text) {
    const lines = text.split('\n');
    const result = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      // 检查是否是有序列表项
      const orderedMatch = line.match(/^[\s]*(\d+)\.\s+(.+)$/);
      if (orderedMatch) {
        // 收集连续的有序列表项
        const listItems = [];
        let currentNumber = parseInt(orderedMatch[1]);
        let expectedNumber = currentNumber; // 保持原始编号

        while (i < lines.length) {
          const currentLine = lines[i];
          const currentMatch = currentLine.match(/^[\s]*(\d+)\.\s+(.+)$/);

          if (currentMatch) {
            listItems.push(`<li class="ca-ordered-item" value="${currentMatch[1]}">${currentMatch[2]}</li>`);
            i++;
          } else if (currentLine.trim() === '') {
            // 空行，继续检查下一行是否还是列表项
            i++;
            if (i < lines.length) {
              const nextMatch = lines[i].match(/^[\s]*(\d+)\.\s+(.+)$/);
              if (!nextMatch) {
                // 下一行不是列表项，结束当前列表
                break;
              }
            }
          } else {
            // 非列表项，结束当前列表
            break;
          }
        }

        if (listItems.length > 0) {
          result.push(`<ol class="ca-ordered-list">${listItems.join('')}</ol>`);
        }
        continue;
      }

      // 检查是否是无序列表项
      const unorderedMatch = line.match(/^[\s]*[-*]\s+(.+)$/);
      if (unorderedMatch) {
        // 收集连续的无序列表项
        const listItems = [];

        while (i < lines.length) {
          const currentLine = lines[i];
          const currentMatch = currentLine.match(/^[\s]*[-*]\s+(.+)$/);

          if (currentMatch) {
            listItems.push(`<li class="ca-list-item">${currentMatch[1]}</li>`);
            i++;
          } else if (currentLine.trim() === '') {
            // 空行，继续检查下一行是否还是列表项
            i++;
            if (i < lines.length) {
              const nextMatch = lines[i].match(/^[\s]*[-*]\s+(.+)$/);
              if (!nextMatch) {
                // 下一行不是列表项，结束当前列表
                break;
              }
            }
          } else {
            // 非列表项，结束当前列表
            break;
          }
        }

        if (listItems.length > 0) {
          result.push(`<ul class="ca-list">${listItems.join('')}</ul>`);
        }
        continue;
      }

      // 普通行，直接添加
      result.push(line);
      i++;
    }

    return result.join('\n');
  }

  // 表格解析函数
  function parseMarkdownTable(text) {
    const lines = text.split('\n');
    let result = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i].trim();

      // 检查是否是表格行（包含 | 符号）
      if (line.includes('|') && line.length > 0) {
        const tableLines = [];
        let j = i;

        // 收集连续的表格行
        while (j < lines.length && lines[j].trim().includes('|')) {
          tableLines.push(lines[j].trim());
          j++;
        }

        if (tableLines.length >= 2) {
          // 解析表格
          const table = parseTable(tableLines);
          result.push(table);
          i = j;
        } else {
          result.push(line);
          i++;
        }
      } else {
        result.push(line);
        i++;
      }
    }

    return result.join('\n');
  }

  // 解析单个表格
  function parseTable(tableLines) {
    const rows = tableLines.map(line =>
      line.split('|').map(cell => cell.trim()).filter(cell => cell.length > 0)
    );

    // 过滤掉分隔行（包含 --- 的行）
    const dataRows = rows.filter(row =>
      !row.every(cell => /^[-:\s]*$/.test(cell))
    );

    if (dataRows.length === 0) return '';

    const [headerRow, ...bodyRows] = dataRows;

    let tableHtml = '<div class="ca-table-container"><table class="ca-table">';

    // 表头
    if (headerRow) {
      tableHtml += '<thead class="ca-table-header"><tr>';
      headerRow.forEach(cell => {
        tableHtml += `<th class="ca-table-th">${cell}</th>`;
      });
      tableHtml += '</tr></thead>';
    }

    // 表体
    if (bodyRows.length > 0) {
      tableHtml += '<tbody class="ca-table-body">';
      bodyRows.forEach(row => {
        tableHtml += '<tr class="ca-table-row">';
        row.forEach(cell => {
          tableHtml += `<td class="ca-table-td">${cell}</td>`;
        });
        tableHtml += '</tr>';
      });
      tableHtml += '</tbody>';
    }

    tableHtml += '</table></div>';
    return tableHtml;
  }

  // 完成流式消息
  function finalizeStreamingMessage(messageElement, finalContent) {
    const contentElement = messageElement.querySelector('.ca-message-content');
    if (contentElement) {
      contentElement.innerHTML = formatMessage(finalContent);
      // 保存原始内容用于持久化
      contentElement.setAttribute('data-original-content', finalContent);
      // 为代码块复制按钮添加事件监听器
      addCodeCopyListeners(contentElement);
    }

    // 保存消息到localStorage（流式消息完成时）
    savePersistedData();
  }

  // 解析并渲染选择题
  function parseAndRenderQuiz(messageElement, content) {
    try {
      // 尝试从内容中提取JSON
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        // 如果没有找到JSON，按普通消息处理
        finalizeStreamingMessage(messageElement, content);
        return;
      }

      const quizData = JSON.parse(jsonMatch[0]);

      // 验证必要字段
      if (!quizData.question || !quizData.options || !quizData.correct) {
        finalizeStreamingMessage(messageElement, content);
        return;
      }

      // 生成选择题HTML
      const quizId = 'quiz-' + Math.random().toString(36).substr(2, 9);
      const quizHtml = `
        <div class="ca-quiz-container" data-quiz-id="${quizId}">
          <div class="ca-quiz-question">
            <h4>🧠 思维训练题</h4>
            <p>${quizData.question}</p>
          </div>
          <div class="ca-quiz-options">
            ${Object.entries(quizData.options).map(([key, value]) => `
              <button class="ca-quiz-option" data-option="${key}">
                <span class="ca-option-label">${key}</span>
                <span class="ca-option-text">${value}</span>
              </button>
            `).join('')}
          </div>
          <div class="ca-quiz-actions">
            <button class="ca-quiz-submit" disabled>提交答案</button>
          </div>
          <div class="ca-quiz-result" style="display: none;">
            <div class="ca-quiz-feedback"></div>
          </div>
        </div>
      `;

      // 更新消息内容
      const contentElement = messageElement.querySelector('.ca-message-content');
      if (contentElement) {
        contentElement.innerHTML = quizHtml;
        contentElement.setAttribute('data-original-content', content);

        // 添加选择题交互事件
        addQuizInteraction(contentElement, quizData);
      }

    } catch (error) {
      console.error('解析选择题失败:', error);
      // 解析失败时按普通消息处理
      finalizeStreamingMessage(messageElement, content);
    }

    // 保存消息
    savePersistedData();
  }

  // 添加选择题交互功能
  function addQuizInteraction(containerElement, quizData) {
    const options = containerElement.querySelectorAll('.ca-quiz-option');
    const submitBtn = containerElement.querySelector('.ca-quiz-submit');
    const resultDiv = containerElement.querySelector('.ca-quiz-result');
    const feedbackDiv = containerElement.querySelector('.ca-quiz-feedback');

    let selectedOption = null;

    // 选项点击事件
    options.forEach(option => {
      option.addEventListener('click', () => {
        // 清除之前的选择
        options.forEach(opt => opt.classList.remove('selected'));

        // 选中当前选项
        option.classList.add('selected');
        selectedOption = option.dataset.option;

        // 启用提交按钮
        submitBtn.disabled = false;
      });
    });

    // 提交答案事件
    submitBtn.addEventListener('click', async () => {
      if (!selectedOption) return;

      // 禁用所有交互
      options.forEach(opt => opt.disabled = true);
      submitBtn.disabled = true;
      submitBtn.textContent = '评价中...';

      // 显示正确答案
      options.forEach(opt => {
        if (opt.dataset.option === quizData.correct) {
          opt.classList.add('correct');
        } else if (opt.dataset.option === selectedOption && selectedOption !== quizData.correct) {
          opt.classList.add('incorrect');
        }
      });

      // 构建评价请求
      const isCorrect = selectedOption === quizData.correct;
      const evaluationPrompt = `学生刚刚回答了一道思维训练题：
题目：${quizData.question}
学生选择：${selectedOption}. ${quizData.options[selectedOption]}
正确答案：${quizData.correct}. ${quizData.options[quizData.correct]}
答案解析：${quizData.explanation}

请对学生的回答进行评价，要求：
1. 如果答对了，给予鼓励和表扬
2. 如果答错了，温和地指出错误，并解释正确答案
3. 语言要适合8-15岁学生，鼓励性强
4. 简洁明了，不超过100字`;

      try {
        // 发送评价请求
        const evaluation = await window.ChatAssistant.sendMessageHook(evaluationPrompt);

        // 显示评价结果
        feedbackDiv.innerHTML = `
          <div class="ca-quiz-status ${isCorrect ? 'correct' : 'incorrect'}">
            ${isCorrect ? '✅ 回答正确！' : '❌ 回答错误'}
          </div>
          <div class="ca-quiz-explanation">
            ${evaluation || quizData.explanation}
          </div>
        `;

        resultDiv.style.display = 'block';
        submitBtn.textContent = '已完成';

      } catch (error) {
        console.error('获取评价失败:', error);
        feedbackDiv.innerHTML = `
          <div class="ca-quiz-status ${isCorrect ? 'correct' : 'incorrect'}">
            ${isCorrect ? '✅ 回答正确！' : '❌ 回答错误'}
          </div>
          <div class="ca-quiz-explanation">
            ${quizData.explanation}
          </div>
        `;
        resultDiv.style.display = 'block';
        submitBtn.textContent = '已完成';
      }
    });
  }

  function appendMsg(role, text, showExamples = false, isStreaming = false, skipSave = false){
    console.log(`[ChatAssistant] appendMsg调用 - role: ${role}, text: ${text.substring(0, 50)}..., showExamples: ${showExamples}, isStreaming: ${isStreaming}, skipSave: ${skipSave}`);

    // 确保messagesContainer存在
    if (!messagesContainer) {
      console.error('[ChatAssistant] appendMsg: messagesContainer未初始化!');
      return null;
    }

    // 移除空状态
    shadow.querySelector('.ca-empty')?.remove();

    const currentTime = new Date();

    // 创建消息组
    const messageGroup = document.createElement('div');
    messageGroup.className = 'ca-message-group ca-message-group-' + role;

    // 为每条消息创建时间戳
    const timestamp = document.createElement('div');
    timestamp.className = 'ca-timestamp';
    const timestampText = document.createElement('span');
    timestampText.className = 'ca-timestamp-text';
    timestampText.textContent = formatTime(currentTime);
    timestamp.appendChild(timestampText);

    // 将时间戳添加到消息组
    messageGroup.appendChild(timestamp);

    // 创建消息气泡
    const bubble = document.createElement('div');
    bubble.className = 'ca-bubble ca-bubble-' + role;

    // 检查是否是HTML内容（主题选择消息）
    if (text.includes('<div class="ca-theme-selection">')) {
      bubble.innerHTML = text;

      // 添加主题选择的点击事件
      bubble.querySelectorAll('.ca-theme-option').forEach(option => {
        option.addEventListener('click', () => {
          const themeKey = option.getAttribute('data-theme');
          const themeName = themes[themeKey].name;

          // 切换主题
          updateTheme(themeKey);

          // 发送确认消息
          setTimeout(() => {
            appendMsg('assistant', `✨ 已切换到"${themeName}"主题！你觉得这个颜色怎么样？`);
          }, 300);
        });
      });
    } else {
      // 处理普通文本中的表情符号
      text = text.replace(/:\)/g, '😊')
                 .replace(/:\(/g, '😔')
                 .replace(/:D/g, '😄')
                 .replace(/;\)/g, '😉')
                 .replace(/:P/g, '😋')
                 .replace(/<3/g, '❤️')
                 .replace(/:\|/g, '😐');

      if (role === 'assistant') {
        // 助手消息：使用formatMessage处理markdown并创建content元素
        console.log('[ChatAssistant] 处理助手消息，原始文本:', text);
        const contentElement = document.createElement('div');
        contentElement.className = 'ca-message-content';

        try {
          const formattedHtml = formatMessage(text);
          console.log('[ChatAssistant] formatMessage处理结果:', formattedHtml);
          contentElement.innerHTML = formattedHtml;
          console.log('[ChatAssistant] contentElement.innerHTML设置完成');
        } catch (error) {
          console.error('[ChatAssistant] formatMessage处理出错:', error);
          contentElement.textContent = text; // 降级处理
        }

        contentElement.setAttribute('data-original-content', text);
        bubble.appendChild(contentElement);
        console.log('[ChatAssistant] contentElement已添加到bubble');

        // 为代码块复制按钮添加事件监听器
        addCodeCopyListeners(contentElement);
      } else {
        // 用户消息：直接设置文本内容
        bubble.textContent = text;
      }
    }

    // 如果是打招呼消息，添加聊天示例到气泡内
    if (showExamples) {
      const examplesContainer = document.createElement('div');
      examplesContainer.className = 'ca-chat-examples';
      examplesContainer.innerHTML = `
        <div class="ca-examples-title">你可以试试：</div>
        <button class="ca-example-btn" data-text="如何判断一个信息是否可信？">如何判断一个信息是否可信？</button>
        <button class="ca-example-btn" data-text="分析一下网络游戏对学习的影响">分析一下网络游戏对学习的影响</button>
        <button class="ca-example-btn" data-text="我想换一种主题颜色">更换主题颜色</button>
      `;
      bubble.appendChild(examplesContainer);

      // 添加点击事件
      examplesContainer.querySelectorAll('.ca-example-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          const text = btn.getAttribute('data-text');

          // 发送用户消息
          appendMsg('user', text);

          // 检查是否为特殊命令（不需要API调用）
          if (text.includes('主题') || text.includes('颜色')) {
            // 添加轻微延时，让用户感觉更自然
            await new Promise(resolve => setTimeout(resolve, 300));

            // 直接处理主题切换，不需要流式输出
            try {
              const reply = await window.ChatAssistant.sendMessageHook(text);
              appendMsg('assistant', reply || getDefaultReply());
            } catch(err) {
              appendMsg('assistant', '[错误] ' + err.message);
            }
            return;
          }

          // 开始流式输出（仅用于需要API调用的消息）
          // 设置全局状态，确保停止按钮能正常工作
          isStreaming = true;
          updateSendButton(true);
          lastContent = ''; // 重置内容

          // 创建助手消息容器
          currentStreamingMessage = appendMsg('assistant', '', false, true);

          try {
            await window.ChatAssistant.sendMessageHook(text,
              // onProgress 回调
              (chunk, fullContent) => {
                if (currentStreamingMessage) {
                  updateStreamingMessage(currentStreamingMessage, chunk, fullContent);
                }
              },
              // onComplete 回调
              (finalMessage) => {
                isStreaming = false;
                updateSendButton(false);
                if (currentStreamingMessage) {
                  finalizeStreamingMessage(currentStreamingMessage, finalMessage);
                }
                currentStreamingMessage = null;
              }
            );
          } catch(err) {
            isStreaming = false;
            updateSendButton(false);
            if (currentStreamingMessage) {
              finalizeStreamingMessage(currentStreamingMessage, '[错误] ' + err.message);
            }
            currentStreamingMessage = null;
          }

          // 不隐藏示例，保持显示
        });
      });
    }

    // 将气泡添加到消息组
    messageGroup.appendChild(bubble);

    // 如果是用户消息，应用当前主题色
    if (role === 'user' && currentTheme !== 'default') {
      const theme = themes[currentTheme];
      if (theme && theme.primary) {
        bubble.style.background = theme.primary;
        bubble.style.borderColor = theme.primary;
      }
    }

    // 添加消息组到消息容器
    console.log(`[ChatAssistant] 正在添加消息组到容器，当前容器子元素数量: ${messagesContainer.children.length}`);
    messagesContainer.appendChild(messageGroup);
    console.log(`[ChatAssistant] 消息组已添加，容器子元素数量: ${messagesContainer.children.length}`);

    // 调试：检查添加的消息组
    console.log('[ChatAssistant] 添加的messageGroup:', messageGroup);
    console.log('[ChatAssistant] messageGroup.className:', messageGroup.className);
    console.log('[ChatAssistant] messageGroup.innerHTML:', messageGroup.innerHTML);
    console.log('[ChatAssistant] messageGroup.offsetHeight:', messageGroup.offsetHeight);
    console.log('[ChatAssistant] messageGroup.style.cssText:', messageGroup.style.cssText);

    // 滚动到底部
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // 如果是流式消息，返回消息元素以便后续更新
    if (isStreaming) {
      return messageGroup;
    }

    // 保存消息到localStorage（非流式消息，且不跳过保存）
    if (!skipSave) {
      savePersistedData();
    }

    // 返回消息元素（用于调试和其他用途）
    return messageGroup;
  }

  // 简易默认回复库
  const WELCOME_MSG='你好哇🐈，我是你的学习伙伴，我会和你一起思考各种有趣的问题。尤其擅长帮你训练批判性思维，除此之外，无论是学习上的疑问，还是生活中的思考，我们都可以聊聊。你有什么想探讨的吗？';
  const defaultReplies=[
    '这个观点很有意思，值得深入思考。',
    '你提出了一个重要的问题。',
    '这个发现很不错，我们可以继续探索。',
    '你的思考角度很独特。',
    '这里有个值得注意的地方。',
    '你注意到了一个关键点。',
    '我们可以从这个角度继续分析。',
    '这个想法有一定的道理。'
  ];
  function getDefaultReply(){return defaultReplies[Math.floor(Math.random()*defaultReplies.length)];}

  // 格式化时间的辅助函数
  function formatTime(date) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  // 更新悬浮球字体的函数
  function updateBallFont(fontFamily) {
    const ballLogo = shadow.querySelector('.ca-ball-logo');
    if (ballLogo) {
      ballLogo.style.fontFamily = `'${fontFamily}', 'Comic Sans MS', 'Marker Felt', cursive`;
      console.log(`悬浮球字体已更新为: ${fontFamily}`);
    }
  }

  // 显示悬浮球的函数 - 解决主题闪烁问题
  function showBallAfterLoaded() {
    console.log('[ChatAssistant] 准备显示悬浮球...');

    // 确保主题和所有资源都已加载完成
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // 延迟300ms确保页面完全稳定
        setTimeout(() => {
          if (ball) {
            ball.classList.add('loaded');
            console.log('[ChatAssistant] 悬浮球已显示 - 渐显动画开始');
          }
        }, 300);
      });
    });
  }

  // 隐藏悬浮球的函数 - 页面切换时使用
  function hideBallForNavigation() {
    console.log('[ChatAssistant] 页面切换 - 隐藏悬浮球');
    if (ball) {
      ball.classList.remove('loaded');
    }
  }

  // 监听页面切换事件
  window.addEventListener('beforeunload', (e) => {
    // 在页面卸载前保存数据
    console.log('[ChatAssistant] 页面即将卸载，保存数据...');
    savePersistedData();
    hideBallForNavigation();
  });

  window.addEventListener('pagehide', (e) => {
    // 在页面隐藏时也保存数据（移动端）
    console.log('[ChatAssistant] 页面隐藏，保存数据...');
    savePersistedData();
    hideBallForNavigation();
  });

  // 主题配置
  const themes = {
    default: { name: '默认蓝紫', primary: '#4f46e5', solidColor: '#4f46e5', shadow: 'rgba(79, 70, 229, 0.4)' },
    orange: { name: '神奇橙猫', primary: 'linear-gradient(135deg, #ff7f50 0%, #ff6347 100%)', solidColor: '#ff7f50', shadow: 'rgba(255, 127, 80, 0.4)' },
    pink: { name: '梦幻粉猫', primary: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', solidColor: '#ff9a9e', shadow: 'rgba(255, 154, 158, 0.4)' },
    green: { name: '翡翠绿猫', primary: 'linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%)', solidColor: '#56ab2f', shadow: 'rgba(86, 171, 47, 0.4)' },
    blue: { name: '天空蓝猫', primary: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)', solidColor: '#74b9ff', shadow: 'rgba(116, 185, 255, 0.4)' },
    rainbow: { name: '彩虹渐变', primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)', solidColor: '#667eea', shadow: 'rgba(102, 126, 234, 0.4)' },
    dark: { name: '深夜黑猫', primary: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)', solidColor: '#2c3e50', shadow: 'rgba(44, 62, 80, 0.6)' },
    gold: { name: '日落金猫', primary: 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)', solidColor: '#f39c12', shadow: 'rgba(243, 156, 18, 0.5)' },
    purple: { name: '薰衣草紫', primary: 'linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)', solidColor: '#9b59b6', shadow: 'rgba(155, 89, 182, 0.4)' },
    sakura: { name: '樱花粉猫', primary: 'linear-gradient(135deg, #fd79a8 0%, #fdcb6e 100%)', solidColor: '#fd79a8', shadow: 'rgba(253, 121, 168, 0.4)' },
    aurora: { name: '极光猫', primary: 'linear-gradient(135deg, #00b894 0%, #00cec9 50%, #74b9ff 100%)', solidColor: '#00b894', shadow: 'rgba(0, 184, 148, 0.4)' },
    fire: { name: '火焰红猫', primary: 'linear-gradient(135deg, #e17055 0%, #d63031 100%)', solidColor: '#e17055', shadow: 'rgba(225, 112, 85, 0.5)' },
    starry: { name: '星空猫', primary: 'linear-gradient(135deg, #2d3436 0%, #636e72 100%)', solidColor: '#2d3436', shadow: 'rgba(45, 52, 54, 0.6)' }
  };

  // 立即加载保存的主题，避免闪烁
  let currentTheme = 'default';
  try {
    const savedTheme = localStorage.getItem('ca-theme');
    if (savedTheme && themes[savedTheme]) {
      currentTheme = savedTheme;
    }
  } catch (error) {
    console.warn('加载主题失败:', error);
  }

  // 立即应用当前主题，确保glow变量正确设置
  updateTheme(currentTheme);

  // 从localStorage加载消息历史
  function loadPersistedData() {
    console.log('[ChatAssistant] 开始加载持久化数据...');

    try {
      // 确保messagesContainer已经初始化
      if (!messagesContainer) {
        console.error('[ChatAssistant] messagesContainer未初始化，延迟重试...');
        setTimeout(loadPersistedData, 100);
        return;
      }

      // 检查主题是否已经被提前应用
      const isThemePreApplied = window.caThemePreApplied === currentTheme;

      if (currentTheme !== 'default') {
        if (isThemePreApplied) {
          console.log('[ChatAssistant] 主题已提前应用，直接继承:', currentTheme);
          // 从根元素继承已应用的CSS变量到Shadow DOM host
          const root = document.documentElement;
          const host = shadow.host;
          const primaryValue = getComputedStyle(root).getPropertyValue('--ca-primary');
          const solidValue = getComputedStyle(root).getPropertyValue('--ca-primary-solid');
          const shadowValue = getComputedStyle(root).getPropertyValue('--ca-primary-shadow');

          if (primaryValue) host.style.setProperty('--ca-primary', primaryValue);
          if (solidValue) {
            host.style.setProperty('--ca-primary-solid', solidValue);
            host.style.setProperty('--ca-primary-dark', solidValue);
            host.style.setProperty('--ca-primary-light', solidValue);
          }
          if (shadowValue) host.style.setProperty('--ca-primary-shadow', shadowValue);

          // 继承其他变量
          const borderLight = getComputedStyle(root).getPropertyValue('--ca-border-light');
          const hoverBg = getComputedStyle(root).getPropertyValue('--ca-hover-bg');
          const focusShadow = getComputedStyle(root).getPropertyValue('--ca-focus-shadow');
          if (borderLight) host.style.setProperty('--ca-border-light', borderLight);
          if (hoverBg) host.style.setProperty('--ca-hover-bg', hoverBg);
          if (focusShadow) host.style.setProperty('--ca-focus-shadow', focusShadow);
        } else {
          console.log('[ChatAssistant] 应用保存的主题:', currentTheme);
          updateTheme(currentTheme);
        }
      }

      // 加载消息历史
      const savedMessages = localStorage.getItem('ca-messages');
      console.log('[ChatAssistant] 从localStorage读取消息:', savedMessages);

      if (savedMessages) {
        const messages = JSON.parse(savedMessages);
        console.log('[ChatAssistant] 解析的消息数量:', messages.length);
        console.log('[DEBUG] 解析的消息内容:', JSON.stringify(messages, null, 2));

        if (messages.length > 0) {
          // 清除默认的空状态，加载历史消息
          console.log('[ChatAssistant] messagesContainer:', messagesContainer);
          console.log('[ChatAssistant] messagesContainer.innerHTML:', messagesContainer.innerHTML);

          messagesContainer.innerHTML = '';
          console.log('[ChatAssistant] 开始恢复历史消息...');

          messages.forEach((msg, index) => {
            const showExamples = msg.hasExamples || (msg.role === 'assistant' && msg.content.includes('你可以试试'));
            console.log(`[ChatAssistant] 恢复消息 ${index + 1}:`, msg.role, msg.content.substring(0, 50) + '...');
            console.log(`[ChatAssistant] 准备调用appendMsg，参数:`, {
              role: msg.role,
              content: msg.content.substring(0, 50) + '...',
              showExamples: showExamples,
              isStreaming: false,
              skipSave: true
            });

            // 检查appendMsg函数是否存在
            console.log(`[ChatAssistant] appendMsg函数类型:`, typeof appendMsg);

            try {
              // 恢复消息时，助手消息会自动通过formatMessage重新渲染
              const result = appendMsg(msg.role, msg.content, showExamples, false, true); // 跳过保存
              console.log(`[ChatAssistant] appendMsg调用结果:`, result);
            } catch (error) {
              console.error(`[ChatAssistant] appendMsg调用出错:`, error);
            }
          });

          console.log('[ChatAssistant] 历史消息恢复完成');
          console.log('[ChatAssistant] messagesContainer.innerHTML:', messagesContainer.innerHTML);
          console.log('[ChatAssistant] messagesContainer.children.length:', messagesContainer.children.length);
          console.log('[ChatAssistant] messagesContainer.style:', messagesContainer.style.cssText);
          console.log('[ChatAssistant] messagesContainer.offsetHeight:', messagesContainer.offsetHeight);
          console.log('[ChatAssistant] messagesContainer.scrollHeight:', messagesContainer.scrollHeight);

          // 为所有历史消息中的代码块添加复制按钮监听器
          addCodeCopyListeners(messagesContainer);

          // 检查第一个子元素
          if (messagesContainer.children.length > 0) {
            const firstChild = messagesContainer.children[0];
            console.log('[ChatAssistant] 第一个子元素:', firstChild);
            console.log('[ChatAssistant] 第一个子元素.className:', firstChild.className);
            console.log('[ChatAssistant] 第一个子元素.style:', firstChild.style.cssText);
            console.log('[ChatAssistant] 第一个子元素.offsetHeight:', firstChild.offsetHeight);
          }

          return; // 有历史消息就不显示欢迎消息了
        }
      }

      // 没有历史消息时显示欢迎消息
      console.log('[ChatAssistant] 没有历史消息，显示欢迎消息');
      appendMsg('assistant', WELCOME_MSG, true, false, true); // 跳过保存
    } catch (error) {
      console.error('[ChatAssistant] 加载持久化数据失败:', error);
      // 出错时显示欢迎消息
      appendMsg('assistant', WELCOME_MSG, true, false, true); // 跳过保存
    }
  }

  // 保存数据到localStorage
  function savePersistedData() {
    console.log('[DEBUG] savePersistedData 函数被调用');
    try {
      // 保存主题
      localStorage.setItem('ca-theme', currentTheme);
      console.log('[ChatAssistant] 保存主题:', currentTheme);

      // 保存消息历史
      const messages = [];
      console.log('[ChatAssistant] messagesContainer:', messagesContainer);
      console.log('[ChatAssistant] messagesContainer.innerHTML:', messagesContainer.innerHTML);
      const messageElements = messagesContainer.querySelectorAll('.ca-message-group');
      console.log('[ChatAssistant] 找到消息元素数量:', messageElements.length);
      console.log('[ChatAssistant] 所有子元素:', messagesContainer.children);

      messageElements.forEach((group, index) => {
        const role = group.querySelector('.ca-bubble-user') ? 'user' : 'assistant';
        const hasExamples = group.querySelector('.ca-chat-examples');
        let content = '';

        if (role === 'user') {
          // 用户消息：从bubble中获取文本内容
          const userBubble = group.querySelector('.ca-bubble-user');
          if (userBubble) {
            content = userBubble.textContent || userBubble.innerText || '';
          }
        } else {
          // 助手消息：从message-content获取原始文本（保存原始markdown）
          const contentElement = group.querySelector('.ca-message-content');
          if (contentElement) {
            // 保存原始内容，而不是渲染后的HTML
            content = contentElement.getAttribute('data-original-content') ||
                     contentElement.textContent || contentElement.innerText || '';
          }
        }

        if (content.trim()) {
          const messageData = {
            role,
            content: content.trim()
          };
          // 标记是否包含示例，用于恢复时判断
          if (hasExamples) {
            messageData.hasExamples = true;
          }
          messages.push(messageData);
          console.log(`[ChatAssistant] 保存消息 ${index + 1}:`, role, content.substring(0, 50) + '...');
        }
      });

      localStorage.setItem('ca-messages', JSON.stringify(messages));
      console.log('[ChatAssistant] 总共保存消息数量:', messages.length);
      console.log('[DEBUG] 保存的消息内容:', JSON.stringify(messages, null, 2));
    } catch (error) {
      console.error('[ChatAssistant] 保存持久化数据失败:', error);
    }
  }

  // Tooltip管理系统
  let currentTooltip = null;

  function createTooltip(text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'ca-tooltip';
    tooltip.textContent = text;
    shadow.appendChild(tooltip);
    return tooltip;
  }

  function showTooltip(element, text) {
    hideTooltip();

    currentTooltip = createTooltip(text);

    // 计算位置
    const rect = element.getBoundingClientRect();
    const tooltipRect = currentTooltip.getBoundingClientRect();

    // 位置在元素上方居中
    const left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
    const top = rect.top - tooltipRect.height - 8; // 8px间距

    currentTooltip.style.left = Math.max(8, left) + 'px';
    currentTooltip.style.top = Math.max(8, top) + 'px';

    // 显示动画
    requestAnimationFrame(() => {
      currentTooltip.classList.add('show');
    });
  }

  function hideTooltip() {
    if (currentTooltip) {
      currentTooltip.classList.remove('show');
      setTimeout(() => {
        if (currentTooltip && currentTooltip.parentNode) {
          currentTooltip.parentNode.removeChild(currentTooltip);
        }
        currentTooltip = null;
      }, 200);
    }
  }

  function addTooltipToElement(element, text) {
    element.setAttribute('data-tooltip', text);

    let hoverTimer = null;

    element.addEventListener('mouseenter', () => {
      hoverTimer = setTimeout(() => {
        // 读取当前的data-tooltip属性值，支持动态更新
        const currentText = element.getAttribute('data-tooltip') || text;
        showTooltip(element, currentText);
      }, 500); // 500ms延迟显示
    });

    element.addEventListener('mouseleave', () => {
      if (hoverTimer) {
        clearTimeout(hoverTimer);
        hoverTimer = null;
      }
      hideTooltip();
    });
  }

  // 提取颜色的RGB值
  function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  // 更新主题色的函数
  function updateTheme(themeKey) {
    const theme = themes[themeKey];
    if (!theme) return;

    // 更新CSS变量，这样所有使用var(--ca-primary)的元素都会自动更新
    const host = shadow.host;
    host.style.setProperty('--ca-primary', theme.primary);
    host.style.setProperty('--ca-primary-solid', theme.solidColor); // 纯色版本，用于边框和文字颜色
    host.style.setProperty('--ca-primary-dark', theme.solidColor);
    host.style.setProperty('--ca-primary-light', theme.solidColor);

    // 更新RGB值，用于预设消息样式
    const rgb = hexToRgb(theme.solidColor);
    if (rgb) {
      host.style.setProperty('--ca-primary-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
    }

    // 更新 glow 变量，让悬浮球所有发光效果跟随主题
    if (theme.shadow) {
      const glowColor = theme.shadow.replace(/[\d\.]+\)$/, '0.3)'); // 调整透明度为0.3 (普通)
      const glowStrongColor = theme.shadow.replace(/[\d\.]+\)$/, '0.4)'); // 调整透明度为0.4 (强化)
      const glowHoverColor = theme.shadow.replace(/[\d\.]+\)$/, '0.5)'); // 调整透明度为0.5 (hover)
      const glowDragColor = theme.shadow.replace(/[\d\.]+\)$/, '0.6)'); // 调整透明度为0.6 (拖动)
      host.style.setProperty('--ca-primary-glow', glowColor);
      host.style.setProperty('--ca-primary-glow-strong', glowStrongColor);
      host.style.setProperty('--ca-primary-glow-hover', glowHoverColor);
      host.style.setProperty('--ca-primary-glow-drag', glowDragColor);
    }

    // 为输入框设置主题色边框（可选，让输入框也有主题色调）
    const lightThemeColor = theme.shadow || 'rgba(79, 70, 229, 0.2)';
    host.style.setProperty('--ca-border-light', lightThemeColor.replace(/[\d\.]+\)$/, '0.2)'));

    // 设置助手消息悬浮背景色
    const hoverBgColor = theme.shadow || 'rgba(79, 70, 229, 0.02)';
    host.style.setProperty('--ca-hover-bg', hoverBgColor.replace(/[\d\.]+\)$/, '0.02)'));

    if (theme.shadow) {
      host.style.setProperty('--ca-primary-shadow', theme.shadow);
    }

    // 对于渐变主题，需要单独处理某些元素
    const ball = shadow.querySelector('.ca-ball');
    const header = shadow.querySelector('.ca-header');
    const sendBtn = shadow.querySelector('.ca-send');
    const userBubbles = shadow.querySelectorAll('.ca-bubble-user');
    const inputField = shadow.querySelector('.ca-input');

    // 更新悬浮球 - 只更新背景，让boxShadow使用CSS变量和动画
    if (ball && theme.primary) {
      ball.style.background = theme.primary;
      // 移除直接设置boxShadow，让CSS动画和变量生效
    }

    // 更新面板头部
    if (header && theme.primary) {
      header.style.background = theme.primary;
    }

    // 更新发送按钮
    if (sendBtn && theme.primary) {
      sendBtn.style.background = theme.primary;
    }

    // 更新用户消息气泡
    userBubbles.forEach(bubble => {
      bubble.style.background = theme.primary;
      bubble.style.borderColor = theme.primary;
    });

    // 更新输入框焦点颜色和阴影
    if (inputField && theme.solidColor) {
      // 为焦点阴影生成对应的半透明颜色
      const shadowColor = theme.shadow || 'rgba(79, 70, 229, 0.1)';
      host.style.setProperty('--ca-focus-shadow', shadowColor.replace(/[\d\.]+\)$/, '0.1)'));
    }

    currentTheme = themeKey;
    console.log('主题已更新:', theme.name);

    // 保存主题到localStorage
    savePersistedData();
  }

  // 生成主题选择消息
  function createThemeSelectionMessage() {
    const themeOptions = Object.entries(themes).map(([key, theme]) => {
      const isActive = key === currentTheme;
      return `
        <button class="ca-theme-option ${isActive ? 'active' : ''}" data-theme="${key}">
          <div class="ca-theme-preview-small" style="background: ${theme.primary}; box-shadow: 0 2px 6px ${theme.shadow};"></div>
          <span class="ca-theme-label">${theme.name}</span>
          ${isActive ? '<span class="ca-current-badge">当前</span>' : ''}
        </button>
      `;
    }).join('');

    return `
      <div class="ca-theme-selection">
        <div class="ca-theme-intro">🎨 选择你喜欢的主题颜色：</div>
        <div class="ca-theme-options">
          ${themeOptions}
        </div>
      </div>
    `;
  }

  // Expose toggle & hook
  window.ChatAssistant={
    toggle,
    updateBallFont,
    updateTheme: (themeData) => {
      // 兼容外部调用的主题数据格式
      if (typeof themeData === 'string') {
        updateTheme(themeData);
      } else if (themeData && themeData.primary) {
        // 如果是从theme-preview.html传来的主题对象，找到匹配的主题
        const matchedTheme = Object.entries(themes).find(([, theme]) =>
          theme.primary === themeData.primary
        );
        if (matchedTheme) {
          updateTheme(matchedTheme[0]);
        }
      }
    },
    sendMessageHook:async(msg, onProgress, onComplete)=>{
      console.info('[ChatAssistant] 收到用户消息：',msg);
      console.log('[ChatAssistant] 检查依赖状态...');
      console.log('- window.configManager:', !!window.configManager);
      console.log('- window.apiClient:', !!window.apiClient);

      try {
        // 检查是否为特殊命令
        if (msg.includes('主题') || msg.includes('颜色')) {
          const reply = createThemeSelectionMessage();
          if (onComplete) {
            onComplete(reply);
          }
          return reply;
        }

        // 检查配置是否已加载
        if (!window.configManager || !window.configManager.isConfigLoaded()) {
          return '⚠️ AI模型配置加载中，请稍后重试...';
        }

        // 检查API客户端是否已初始化
        if (!window.apiClient) {
          console.error('ApiClient 未初始化');
          return '⚠️ AI客户端未初始化，请刷新页面重试...';
        }

        // 使用流式API调用
        const response = await window.apiClient.sendMessage(msg, {
          stream: true,
          onProgress: onProgress
        });

        // 检查是否是用户主动取消
        if (response && response.cancelled) {
          console.log('🛑 [HOOK-DEBUG] 用户主动取消了请求，保留已输出的内容');
          // 不调用onComplete，保留当前已输出的内容
          return null; // 返回null表示取消操作
        }

        console.log('✅ [HOOK-DEBUG] 正常完成，调用 onComplete');
        if (onComplete) {
          onComplete(response);
        }
        return response;

      } catch (error) {
        console.error('API调用失败:', error);

        // 降级到本地回复
        let fallbackResponse = '';
        if (msg.includes('信息') && msg.includes('可信')) {
          fallbackResponse = '判断信息可信度是很重要的技能。我们可以从几个角度分析：\n\n1. 信息来源是否权威可靠\n2. 是否有多个独立来源证实\n3. 信息是否符合逻辑和常识\n4. 是否存在明显的偏见或利益冲突\n\n你平时是怎么判断网上信息真假的？';
        } else if (msg.includes('游戏') && msg.includes('影响')) {
          fallbackResponse = '这是个很好的分析话题。网络游戏对学习的影响确实是多方面的：\n\n可能的负面影响：\n- 占用学习时间\n- 分散注意力\n- 可能影响作息\n\n可能的正面影响：\n- 训练反应能力和手眼协调\n- 某些游戏能培养策略思维\n- 团队合作类游戏能提升协作能力\n\n关键在于如何平衡和选择。你觉得最重要的是什么？';
        } else {
          fallbackResponse = `❌ 抱歉，AI服务暂时不可用：${error.message}\n\n请检查网络连接或稍后重试。`;
        }

        if (onComplete) {
          onComplete(fallbackResponse);
        }
        return fallbackResponse;
      }
    }
  };

  // 回车发送（Shift+Enter换行）
  textarea.addEventListener('keydown',(e)=>{
    if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendBtn.click();}
  });

  // 新对话功能
  function resetConversation(){
    messagesContainer.innerHTML='';
    appendMsg('assistant',WELCOME_MSG, true); // 显示聊天示例

    // 清除持久化的消息，但保留主题
    try {
      localStorage.removeItem('ca-messages');
    } catch (error) {
      console.warn('清除消息历史失败:', error);
    }
  }

  // 初始化模型选择器
  async function initializeModelSelector() {
    try {
      console.log('开始初始化模型选择器...');

      // 检查依赖并创建实例
      if (typeof ConfigManager === 'undefined') {
        throw new Error('ConfigManager 类未找到');
      }
      if (typeof ApiClient === 'undefined') {
        throw new Error('ApiClient 类未找到');
      }

      // 创建实例
      if (!window.configManager) {
        window.configManager = new ConfigManager();
        console.log('✅ ConfigManager 实例已创建');
      }
      if (!window.apiClient) {
        window.apiClient = new ApiClient();
        console.log('✅ ApiClient 实例已创建');
      }

      // 加载配置
      console.log('正在加载配置...');
      await window.configManager.loadConfig();
      console.log('配置加载完成');

      // 获取模型选择器元素
      const modelSelector = shadow.querySelector('.ca-model-selector');
      const modelDropdown = shadow.querySelector('.ca-model-dropdown');
      const modelList = shadow.querySelector('.ca-model-list');

      if (!modelSelector || !modelDropdown || !modelList) {
        console.warn('模型选择器元素未找到');
        return;
      }

      // 生成模型列表
      const models = window.configManager.getAvailableModels();
      const currentModel = window.configManager.getCurrentModel();

      modelList.innerHTML = models.map(model => {
        const status = window.configManager.getModelStatus(model.id);
        const isActive = model.id === currentModel.id;

        return `
          <button class="ca-model-item ${isActive ? 'active' : ''}" data-model-id="${model.id}">
            <div class="ca-model-item-name">
              ${model.name}
              ${isActive ? '<span class="ca-model-current-indicator">当前</span>' : ''}
            </div>
            <div class="ca-model-item-desc">${model.description}</div>
            <div class="ca-model-item-status">
              <span class="ca-model-status-badge ca-model-status-speed">${getStatusText(status.speed)}</span>
              <span class="ca-model-status-badge ca-model-status-quality">${getStatusText(status.quality)}</span>
              <span class="ca-model-status-badge ca-model-status-cost">${getStatusText(status.cost)}</span>
            </div>
          </button>
        `;
      }).join('');

      // 添加点击事件
      modelSelector.addEventListener('click', (e) => {
        e.stopPropagation();
        modelDropdown.classList.toggle('show');
      });

      // 模型选择事件
      modelList.addEventListener('click', (e) => {
        const modelItem = e.target.closest('.ca-model-item');
        if (modelItem) {
          const modelId = modelItem.getAttribute('data-model-id');
          window.configManager.setCurrentModel(modelId);

          // 更新UI
          updateModelSelector();
          modelDropdown.classList.remove('show');
        }
      });

      // 点击外部关闭下拉菜单
      document.addEventListener('click', () => {
        modelDropdown.classList.remove('show');
      });

      console.log('模型选择器初始化成功');

      // 为模型选择器添加自定义tooltip
      addTooltipToElement(modelSelector, '切换AI模型');

      // 添加测试函数（仅用于调试）
      window.testAPI = async function() {
        try {
          console.log('开始测试API...');
          const response = await window.apiClient.sendMessage('你好，请简单回复一下');
          console.log('API测试成功:', response);
          alert('API测试成功: ' + response.substring(0, 100));
        } catch (error) {
          console.error('API测试失败:', error);
          alert('API测试失败: ' + error.message);
        }
      };

    } catch (error) {
      console.error('模型选择器初始化失败:', error);
    }
  }

  // 更新模型选择器显示
  function updateModelSelector() {
    const modelList = shadow.querySelector('.ca-model-list');
    if (!modelList) return;

    const currentModel = window.configManager.getCurrentModel();

    // 更新活动状态
    modelList.querySelectorAll('.ca-model-item').forEach(item => {
      const modelId = item.getAttribute('data-model-id');
      const isActive = modelId === currentModel.id;

      item.classList.toggle('active', isActive);

      // 更新当前指示器
      const indicator = item.querySelector('.ca-model-current-indicator');
      const nameDiv = item.querySelector('.ca-model-item-name');

      if (isActive && !indicator) {
        nameDiv.innerHTML = nameDiv.innerHTML + '<span class="ca-model-current-indicator">当前</span>';
      } else if (!isActive && indicator) {
        indicator.remove();
      }
    });
  }

  // 状态文本映射
  function getStatusText(status) {
    const statusMap = {
      fast: '快速',
      medium: '中等',
      slow: '较慢',
      excellent: '优秀',
      good: '良好',
      low: '经济',
      high: '较贵'
    };
    return statusMap[status] || status;
  }

  // 等待所有依赖加载完成后初始化
  function waitForDependencies() {
    return new Promise((resolve) => {
      const checkDependencies = () => {
        if (typeof ConfigManager !== 'undefined' && typeof ApiClient !== 'undefined') {
          console.log('✅ 所有依赖已加载完成');
          resolve();
        } else {
          console.log('⏳ 等待依赖加载...', {
            ConfigManager: typeof ConfigManager !== 'undefined',
            ApiClient: typeof ApiClient !== 'undefined'
          });
          setTimeout(checkDependencies, 100);
        }
      };
      checkDependencies();
    });
  }

  // 页面完全加载后初始化
  window.addEventListener('load', async () => {
    try {
      await waitForDependencies();
      await initializeModelSelector();

      // 延迟加载持久化数据，确保所有资源都加载完成
      setTimeout(() => {
        console.log('[ChatAssistant] 开始初始化持久化数据...');
        loadPersistedData();

        // 数据加载完成后显示悬浮球
        setTimeout(() => {
          showBallAfterLoaded();
        }, 100);
      }, 200);
    } catch (error) {
      console.error('[ChatAssistant] 初始化失败:', error);
      // 即使初始化失败也要显示悬浮球
      showBallAfterLoaded();
    }
  });

  // 备用初始化（防止window.load事件未触发）
  document.addEventListener('DOMContentLoaded', async () => {
    setTimeout(async () => {
      // 检查是否已经初始化过
      if (!messagesContainer.querySelector('.ca-bubble') && !messagesContainer.querySelector('.ca-empty')) {
        console.log('[ChatAssistant] 备用初始化触发...');
        try {
          await waitForDependencies();
          await initializeModelSelector();
          loadPersistedData();

          // 备用初始化完成后也要显示悬浮球
          setTimeout(() => {
            showBallAfterLoaded();
          }, 100);
        } catch (error) {
          console.error('[ChatAssistant] 备用初始化失败:', error);
          // 即使备用初始化失败也要显示悬浮球
          showBallAfterLoaded();
        }
      } else {
        // 如果已经初始化过，直接显示悬浮球
        showBallAfterLoaded();
      }
    }, 500);
  });

})();