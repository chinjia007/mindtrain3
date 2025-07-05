// 主要JavaScript功能
class ThinkingLabApp {
    constructor() {
        this.isLoaded = false;
        this.scrollPosition = 0;
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.initAnimations();
        this.initCounters();
        this.initScrollEffects();
        this.initNavigation();
        this.initModuleCards();
    }
    
    setupEventListeners() {
        // 页面加载完成
        window.addEventListener('load', () => {
            this.isLoaded = true;
            this.startEntryAnimations();
        });
        
        // 滚动事件
        window.addEventListener('scroll', this.throttle(() => {
            this.handleScroll();
        }, 16));
        
        // 窗口大小改变
        window.addEventListener('resize', this.throttle(() => {
            this.handleResize();
        }, 250));
    }
    
    // 节流函数
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
    
    // 入场动画
    startEntryAnimations() {
        const heroContent = document.querySelector('.hero-content');
        const heroVisual = document.querySelector('.hero-visual');
        
        if (heroContent) {
            heroContent.style.animation = 'fadeInLeft 1s ease forwards';
        }
        
        if (heroVisual) {
            heroVisual.style.animation = 'fadeInRight 1s ease 0.3s forwards';
            heroVisual.style.opacity = '0';
            setTimeout(() => {
                heroVisual.style.opacity = '1';
            }, 300);
        }
    }
    
    // 数字计数动画
    initCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        const animateCounter = (counter) => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        };
        
        // 使用Intersection Observer触发动画
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            observer.observe(counter);
        });
    }
    
    // 滚动效果
    initScrollEffects() {
        const elements = document.querySelectorAll('.module-card, .feature-card');
        
        elements.forEach(el => {
            el.classList.add('animate-on-scroll');
        });
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        elements.forEach(el => {
            observer.observe(el);
        });
    }
    
    // 导航栏效果
    initNavigation() {
        const nav = document.querySelector('.main-nav');
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        // 滚动时导航栏效果
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                nav.style.background = 'rgba(255, 255, 255, 0.98)';
                nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                nav.style.background = 'rgba(255, 255, 255, 0.95)';
                nav.style.boxShadow = 'none';
            }
        });
        
        // 移动端菜单切换
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
        }
        
        // 平滑滚动
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // 模块卡片交互 - 整张卡片可点击
    initModuleCards() {
        const moduleCards = document.querySelectorAll('.module-card');

        moduleCards.forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const module = card.getAttribute('data-module');
                const button = card.querySelector('.journey-button');
                this.handleJourneyStart(module, button);
            });
        });
    }

    // 处理思维之旅开始
    handleJourneyStart(module, button) {
        // 添加点击反馈
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);

        // 直接导航到对应的模块页面
        setTimeout(() => {
            window.location.href = `module-${module}.html`;
        }, 200);
    }

    // 移除卡片动画方法，保持简洁
    
    // 滚动处理
    handleScroll() {
        this.scrollPosition = window.pageYOffset;
        
        // 视差效果
        const heroVisual = document.querySelector('.hero-visual');
        if (heroVisual) {
            const offset = this.scrollPosition * 0.5;
            heroVisual.style.transform = `translateY(${offset}px)`;
        }
        
        // 浮动元素动画
        const floatingElements = document.querySelectorAll('.float-element');
        floatingElements.forEach((element, index) => {
            const speed = parseFloat(element.getAttribute('data-speed')) || 1;
            const offset = this.scrollPosition * speed * 0.1;
            element.style.transform = `translateY(${offset}px) rotate(${offset * 0.1}deg)`;
        });
    }
    
    // 窗口大小改变处理
    handleResize() {
        // 重新计算布局
        if (window.neuralArt) {
            window.neuralArt.resize();
        }
    }
    
    // 动画初始化
    initAnimations() {
        // 为所有按钮添加波纹效果
        document.querySelectorAll('.cta-button').forEach(button => {
            button.addEventListener('click', this.createRippleEffect);
        });
    }
    
    // 波纹效果
    createRippleEffect(e) {
        const button = e.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // 移除滑动功能，保持简单的模块卡片展示
}

// 添加苹果风格动画CSS
const appleStyle = document.createElement('style');
appleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    @keyframes fadeInScale {
        0% {
            opacity: 0;
            transform: scale(0.8);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }

    .journey-loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(251, 251, 253, 0.95);
        backdrop-filter: blur(20px) saturate(180%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        animation: fadeInScale 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    .loader-content {
        text-align: center;
        background: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(20px);
        border-radius: 24px;
        padding: 48px 40px;
        box-shadow:
            0 20px 60px rgba(0, 0, 0, 0.1),
            0 8px 25px rgba(0, 0, 0, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
        border: 0.5px solid rgba(255, 255, 255, 0.6);
        max-width: 400px;
    }

    .loader-icon {
        font-size: 4rem;
        margin-bottom: 20px;
        display: block;
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
    }

    .loader-spinner {
        width: 32px;
        height: 32px;
        border: 3px solid rgba(0, 122, 255, 0.2);
        border-left: 3px solid #007AFF;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 24px;
    }

    .loader-content h3 {
        font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
        font-size: 1.3rem;
        font-weight: 600;
        color: #1d1d1f;
        margin: 0 0 12px 0;
        letter-spacing: -0.02em;
    }

    .loader-content p {
        font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
        color: #86868b;
        font-size: 0.9rem;
        margin: 0;
        font-weight: 400;
        letter-spacing: -0.01em;
        line-height: 1.4;
    }
`;
document.head.appendChild(appleStyle);

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new ThinkingLabApp();
});
