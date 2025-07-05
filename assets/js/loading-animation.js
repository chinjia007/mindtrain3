/**
 * 高级艺术感加载动画控制器
 * 神奇喵喵思维训练实验室
 */

class LoadingController {
    constructor() {
        this.loadingScreen = null;
        this.progressBar = null;
        this.loadingText = null;
        this.isLoading = true;
        this.minLoadingTime = 2000; // 最小加载时间2秒
        this.startTime = Date.now();
        
        this.init();
    }
    
    init() {
        this.createLoadingScreen();
        this.startLoading();
    }
    
    createLoadingScreen() {
        // 创建加载屏幕HTML结构
        const loadingHTML = `
            <div class="loading-screen" id="loadingScreen">
                <div class="loading-brand">
                    <h1>神奇喵喵</h1>
                    <p>思维训练实验室</p>
                </div>
                
                <div class="loading-animation">
                    <div class="geometric-shape shape-1"></div>
                    <div class="geometric-shape shape-2"></div>
                    <div class="geometric-shape shape-3"></div>
                </div>
                
                <div class="loading-text" id="loadingText">正在加载思维训练内容...</div>
                
                <div class="loading-progress">
                    <div class="progress-bar" id="progressBar"></div>
                </div>
                
                <div class="loading-particles">
                    <div class="particle"></div>
                    <div class="particle"></div>
                    <div class="particle"></div>
                    <div class="particle"></div>
                    <div class="particle"></div>
                    <div class="particle"></div>
                </div>
            </div>
        `;
        
        // 插入到页面开头
        document.body.insertAdjacentHTML('afterbegin', loadingHTML);
        
        // 获取元素引用
        this.loadingScreen = document.getElementById('loadingScreen');
        this.progressBar = document.getElementById('progressBar');
        this.loadingText = document.getElementById('loadingText');
    }
    
    startLoading() {
        // 模拟加载过程
        this.simulateProgress();
        
        // 监听页面加载完成
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.onContentLoaded();
            });
        } else {
            this.onContentLoaded();
        }
        
        // 监听所有资源加载完成
        window.addEventListener('load', () => {
            this.onAllResourcesLoaded();
        });
    }
    
    simulateProgress() {
        const messages = getLoadingMessages();

        let messageIndex = 0;
        let progress = 0;
        
        const updateProgress = () => {
            if (!this.isLoading) return;
            
            // 更新进度条
            progress += Math.random() * 15 + 5;
            progress = Math.min(progress, 90);
            this.progressBar.style.width = progress + '%';
            
            // 更新加载文字
            if (messageIndex < messages.length - 1 && progress > (messageIndex + 1) * 20) {
                messageIndex++;
                this.loadingText.textContent = messages[messageIndex];
            }
            
            if (progress < 90) {
                setTimeout(updateProgress, 200 + Math.random() * 300);
            }
        };
        
        updateProgress();
    }
    
    onContentLoaded() {
        // DOM内容加载完成
        // console.log('DOM content loaded');
    }
    
    onAllResourcesLoaded() {
        // 所有资源加载完成
        const elapsedTime = Date.now() - this.startTime;
        const remainingTime = Math.max(0, this.minLoadingTime - elapsedTime);
        
        setTimeout(() => {
            this.completeLoading();
        }, remainingTime);
    }
    
    completeLoading() {
        if (!this.isLoading) return;
        
        this.isLoading = false;
        
        // 完成进度条
        this.progressBar.style.width = '100%';
        this.loadingText.textContent = '加载完成！';
        
        // 延迟一下再隐藏加载屏幕
        setTimeout(() => {
            this.hideLoadingScreen();
        }, 500);
    }
    
    hideLoadingScreen() {
        if (this.loadingScreen) {
            this.loadingScreen.classList.add('fade-out');
            
            // 动画完成后移除元素
            setTimeout(() => {
                if (this.loadingScreen && this.loadingScreen.parentNode) {
                    this.loadingScreen.parentNode.removeChild(this.loadingScreen);
                }
            }, 800);
        }
    }
    
    // 手动完成加载（用于调试）
    forceComplete() {
        this.completeLoading();
    }
}

// 根据页面类型设置不同的加载文案
function getLoadingMessages() {
    const pageTitle = document.title;
    
    if (pageTitle.includes('批判性思维')) {
        return [
            '正在加载批判性思维训练...',
            '准备逻辑分析工具...',
            '初始化思辨环境...',
            '即将开始理性思考之旅...'
        ];
    } else if (pageTitle.includes('逻辑思维')) {
        return [
            '正在加载逻辑思维训练...',
            '准备推理分析系统...',
            '初始化逻辑环境...',
            '即将开始逻辑推理之旅...'
        ];
    } else if (pageTitle.includes('系统思维')) {
        return [
            '正在加载系统思维训练...',
            '准备系统分析工具...',
            '初始化整体思维环境...',
            '即将开始系统思考之旅...'
        ];
    } else if (pageTitle.includes('设计思维')) {
        return [
            '正在加载设计思维训练...',
            '准备创新思维工具...',
            '初始化创意环境...',
            '即将开始创新设计之旅...'
        ];
    } else if (pageTitle.includes('一叶知秋')) {
        return [
            '正在加载陷阱识别训练...',
            '准备洞察分析系统...',
            '初始化识别环境...',
            '即将开始洞察智慧之旅...'
        ];
    } else if (pageTitle.includes('识人辨言')) {
        return [
            '正在加载人际智慧训练...',
            '准备人格分析系统...',
            '初始化识人环境...',
            '即将开始人际智慧之旅...'
        ];
    }
    
    return [
        '正在加载思维训练内容...',
        '准备课程数据...',
        '初始化学习环境...',
        '即将进入学习模式...'
    ];
}

// 页面加载时自动启动加载动画
document.addEventListener('DOMContentLoaded', () => {
    // 只在模块导航页面显示加载动画
    if (document.querySelector('.module-main') ||
        document.title.includes('思维') ||
        window.location.pathname.includes('module-')) {
        new LoadingController();
    }
});

// 导出供外部使用
window.LoadingController = LoadingController;
