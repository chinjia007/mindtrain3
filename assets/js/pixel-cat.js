/**
 * 像素小猫行为控制系统 - 来自juhe.html的增强版本
 * 让小猫在页眉渐变线上来回走动，并执行各种可爱的动作
 */

class PixelCat {
    constructor() {
        this.element = null;
        this.catEl = null;
        this.position = -80;
        this.direction = 1; // 1: 向右, -1: 向左
        this.baseSpeed = 1; // 降低基础速度
        this.speed = this.baseSpeed;
        this.isRunning = true;
        this.windowWidth = window.innerWidth;
        this.actionTimeout = null;
        this.bubbleTimeout = null;
        this.mouseInteractionTimeout = null;
        this.maxPosition = 0;
        this.randomPauseTimeout = null;
        this.lastSpeedChange = 0;
        this.lastEarTwitch = 0;
        this.modePanelVisible = false;
        this.currentColorScheme = 'classic';
        this.lastBlink = 0;

        // 学习陪伴功能
        this.learningMode = true; // 是否开启学习陪伴模式
        this.studyStartTime = null; // 学习开始时间
        this.studyDuration = 0; // 累计学习时长
        this.pomodoroTimer = null; // 番茄钟计时器
        this.pomodoroState = 'stopped'; // stopped, studying, break
        this.pomodoroCount = 0; // 完成的番茄钟数量
        this.lastStudyReminder = 0; // 上次学习提醒时间

        // 猫咪的所有可能状态
        this.states = [
            'sitting', 'licking', 'sleeping', 'happy', 'excited',
            'curious', 'playing', 'running', 'laughing', 'angry',
            'surprised', 'thinking', 'scared', 'sleepy'
        ];

        // 模式分类
        this.modeCategories = {
            'basic': {
                title: '🎯 基础动作',
                description: '日常基本行为',
                modes: {
                    'running': '跑动',
                    'sitting': '坐着',
                    'licking': '舔毛',
                    'playing': '玩耍'
                }
            },
            'emotions': {
                title: '😊 情绪表达',
                description: '各种情绪状态',
                modes: {
                    'happy': '开心',
                    'excited': '兴奋',
                    'laughing': '大笑',
                    'angry': '生气',
                    'surprised': '惊讶',
                    'scared': '害怕'
                }
            },
            'special': {
                title: '💤 特殊状态',
                description: '特殊行为模式',
                modes: {
                    'sleeping': '睡觉(5秒)',
                    'sleepy': '困倦',
                    'curious': '好奇',
                    'thinking': '思考'
                }
            }
        };

        // 颜色配置方案
        this.colorSchemes = {
            'classic': {
                name: '🔴 经典红',
                body: '#e74c3c',
                head: '#000',
                eyes: '#000',
                nose: '#222',
                mouth: '#222',
                legs: '#000',
                tail: '#e74c3c',
                innerEar: '#d63031'
            },
            'orange': {
                name: '🧡 活力橙',
                body: '#ff6b35',
                head: '#2c3e50',
                eyes: '#2c3e50',
                nose: '#34495e',
                mouth: '#34495e',
                legs: '#2c3e50',
                tail: '#ff6b35',
                innerEar: '#e55039'
            },
            'blue': {
                name: '💙 海洋蓝',
                body: '#3498db',
                head: '#2c3e50',
                eyes: '#2c3e50',
                nose: '#34495e',
                mouth: '#34495e',
                legs: '#2c3e50',
                tail: '#3498db',
                innerEar: '#2980b9'
            },
            'green': {
                name: '💚 森林绿',
                body: '#27ae60',
                head: '#2c3e50',
                eyes: '#2c3e50',
                nose: '#34495e',
                mouth: '#34495e',
                legs: '#2c3e50',
                tail: '#27ae60',
                innerEar: '#229954'
            },
            'purple': {
                name: '💜 梦幻紫',
                body: '#9b59b6',
                head: '#2c3e50',
                eyes: '#2c3e50',
                nose: '#34495e',
                mouth: '#34495e',
                legs: '#2c3e50',
                tail: '#9b59b6',
                innerEar: '#8e44ad'
            },
            'pink': {
                name: '🩷 甜美粉',
                body: '#ff6b9d',
                head: '#2c3e50',
                eyes: '#2c3e50',
                nose: '#34495e',
                mouth: '#34495e',
                legs: '#2c3e50',
                tail: '#ff6b9d',
                innerEar: '#e84393'
            },
            'yellow': {
                name: '💛 阳光黄',
                body: '#f1c40f',
                head: '#f39c12',
                eyes: '#2c3e50',
                nose: '#e67e22',
                mouth: '#d35400',
                legs: '#f39c12',
                tail: '#f1c40f',
                innerEar: '#e67e22'
            },
            'cyan': {
                name: '🩵 清新青',
                body: '#1abc9c',
                head: '#2c3e50',
                eyes: '#2c3e50',
                nose: '#34495e',
                mouth: '#34495e',
                legs: '#2c3e50',
                tail: '#1abc9c',
                innerEar: '#16a085'
            },
            'dark': {
                name: '🖤 酷黑',
                body: '#34495e',
                head: '#2c3e50',
                eyes: '#ecf0f1',
                nose: '#bdc3c7',
                mouth: '#bdc3c7',
                legs: '#2c3e50',
                tail: '#34495e',
                innerEar: '#e74c3c'
            },
            'rainbow': {
                name: '🌈 彩虹',
                body: 'linear-gradient(45deg, #ff6b35, #f7931e, #ffd700, #32cd32, #1e90ff, #9370db)',
                head: '#2c3e50',
                eyes: '#2c3e50',
                nose: '#34495e',
                mouth: '#34495e',
                legs: '#2c3e50',
                tail: 'linear-gradient(45deg, #ff6b35, #f7931e, #ffd700, #32cd32, #1e90ff, #9370db)',
                innerEar: '#e74c3c'
            }
        };

        // 页面配色方案
        this.pageColors = {
            'home': '#e74c3c',           // 经典红 - 主页
            'critical': '#ff6b35',       // 活力橙 - 批判性思维
            'logical': '#f1c40f',        // 阳光黄 - 逻辑思维
            'system': '#ff7f50',         // 珊瑚橙 - 系统思维
            'design': '#ff8c69',         // 蜜桃橙 - 设计思维
            'trap': '#ffa500',           // 金橙色 - 一叶知秋
            'personality': '#ff4500',    // 暖红橙 - 识人辨言
            'course': '#e67e22'          // 课程金 - 课程详情页
        };

        // 模块性格话语库
        this.modulePersonalities = {
            'critical': {
                name: '批判性思维',
                themeColor: '#ff6b35',
                idioms: [
                    "兼听则明，偏信则暗", "去伪存真", "明辨是非", "实事求是", "追根溯源",
                    "条分缕析", "深思熟虑", "慎思明辨", "求真务实", "洞察秋毫"
                ],
                poetry: [
                    "不畏浮云遮望眼，只缘身在最高层", "路漫漫其修远兮，吾将上下而求索",
                    "学而时习之，不亦说乎", "知之为知之，不知为不知", "博学之，审问之，慎思之",
                    "尽信书，则不如无书", "疑是思之始，学之端", "学贵有疑，小疑则小进",
                    "真理越辩越明", "实践是检验真理的唯一标准"
                ],
                thinking: [
                    "这个说法的证据在哪里？", "换个角度想想看~", "真的是这样吗？", "还有其他可能吗？",
                    "信息来源可靠吗？", "逻辑推理对吗？", "有没有反例呢？", "前提假设成立吗？",
                    "结论是否过于绝对？", "多问几个为什么~"
                ]
            },
            'logical': {
                name: '逻辑思维',
                themeColor: '#f1c40f',
                idioms: [
                    "条分缕析", "丝丝入扣", "环环相扣", "井然有序", "循序渐进",
                    "按部就班", "有条不紊", "层次分明", "逻辑清晰", "推理严密"
                ],
                poetry: [
                    "山重水复疑无路，柳暗花明又一村", "千里之行，始于足下", "工欲善其事，必先利其器",
                    "凡事预则立，不预则废", "磨刀不误砍柴工", "一步一个脚印", "积土成山，积水成渊",
                    "九层之台，起于累土", "合抱之木，生于毫末", "滴水穿石，非一日之功"
                ],
                thinking: [
                    "先想前提，再看结论~", "逻辑链条要完整哦~", "推理过程对吗？", "因果关系清楚吗？",
                    "条件充分吗？", "步骤有遗漏吗？", "归纳合理吗？", "演绎正确吗？",
                    "假设成立吗？", "结论必然吗？"
                ]
            },
            'system': {
                name: '系统思维',
                themeColor: '#ff7f50',
                idioms: [
                    "统筹兼顾", "见微知著", "牵一发而动全身", "全局观念", "整体规划",
                    "协调发展", "相互依存", "动态平衡", "系统优化", "综合治理"
                ],
                poetry: [
                    "不识庐山真面目，只缘身在此山中", "一叶知秋", "窥一斑而知全豹",
                    "蝴蝶效应，牵一发而动全身", "木桶效应，短板决定容量", "系统之美，在于整体大于部分之和",
                    "万物相连，息息相关", "平衡之道，在于动态调节", "整体思维，局部优化", "系统思考，全面分析"
                ],
                thinking: [
                    "整体和部分的关系~", "这会影响到什么？", "系统的边界在哪？", "反馈回路是什么？",
                    "杠杆点在哪里？", "时间延迟有多长？", "系统的目的是什么？", "结构决定行为吗？",
                    "涌现特性是什么？", "如何优化整个系统？"
                ]
            },
            'design': {
                name: '设计思维',
                themeColor: '#ff8c69',
                idioms: [
                    "别出心裁", "推陈出新", "独具匠心", "标新立异", "创意无限",
                    "巧思妙想", "因地制宜", "因材施教", "量体裁衣", "精益求精"
                ],
                poetry: [
                    "山不在高，有仙则名", "天工人巧日争新", "创新是设计的灵魂", "用户体验至上",
                    "简约而不简单", "形式追随功能", "设计改变生活", "美观实用并重",
                    "人性化设计", "细节决定成败"
                ],
                thinking: [
                    "用户真正需要什么？", "还有更好的方法吗？", "如何让体验更好？", "痛点在哪里？",
                    "如何简化流程？", "美观实用吗？", "创新点是什么？", "如何测试想法？",
                    "用户会怎么想？", "如何持续改进？"
                ]
            },
            'trap': {
                name: '一叶知秋',
                themeColor: '#ffa500',
                idioms: [
                    "明察秋毫", "洞若观火", "防微杜渐", "见微知著", "察言观色",
                    "明辨是非", "火眼金睛", "慧眼识珠", "一叶知秋", "见端知末"
                ],
                poetry: [
                    "路漫漫其修远兮，吾将上下而求索", "害人之心不可有，防人之心不可无",
                    "言多必失，沉默是金", "听其言而观其行", "谎言重复千遍也不会成为真理",
                    "真话不一定动听，动听不一定是真话", "小心驶得万年船", "明枪易躲，暗箭难防",
                    "知己知彼，百战不殆", "兵不厌诈，商不厌智"
                ],
                thinking: [
                    "话里有话要小心~", "这句话的真意是什么？", "有什么隐含信息？", "逻辑陷阱在哪里？",
                    "情感操控了吗？", "数据真实吗？", "权威可信吗？", "样本代表性如何？",
                    "因果关系对吗？", "有偷换概念吗？"
                ]
            },
            'personality': {
                name: '识人辨言',
                themeColor: '#ff4500',
                idioms: [
                    "察言观色", "知人知面不知心", "人心如面", "见人说人话，见鬼说鬼话", "画虎画皮难画骨",
                    "路遥知马力，日久见人心", "人不可貌相", "金玉其外，败絮其中", "表里如一", "言行一致"
                ],
                poetry: [
                    "世事洞明皆学问，人情练达即文章", "听其言，观其行", "路遥知马力，日久见人心",
                    "人心隔肚皮", "知人者智，自知者明", "相由心生，境随心转", "真诚是人际交往的基石",
                    "品格决定命运", "行为胜过言语", "人格魅力源于内在修养"
                ],
                thinking: [
                    "行为背后的动机是什么？", "真诚还是伪装？", "言行一致吗？", "人格特征是什么？",
                    "有什么行为模式？", "价值观是什么？", "可信度如何？", "有什么隐藏目的？",
                    "情绪状态如何？", "如何保护自己？"
                ]
            }
        };

        // 当前模块性格
        this.currentModule = null;

        // 表情系统
        this.currentExpression = null;
        this.expressionTimeout = null;

        // 猫咪可能的对话内容
        this.messages = [
            '喵~', '我好可爱~', '喵喵喵~',
            '好困~..', '我要去抓老鼠啦！', '快夸我可爱！',
            '厉害~', '好厉害！', '真聪明！',
            '咕噜咕噜~', '我想玩毛线球...', '蝴蝶结好看吗~',
            '喵星人最可爱~', '点我有惊喜哦~', '今天天气真好~',
            '别工作太累了，休息一下~', '工作效率UP~',
            '我会保护屏幕的！', '提前祝你周末愉快~',
            '我悄悄告诉你一个秘密..', '(‾◡◝)', '(｡･ω･｡)',
            '(=^･ω･^=)', '(≧▽≦)', '(´･ω･`)', 'ฅ՞•ﻌ•՞ฅ',
            '喵喵喵~', '小鱼干好好吃~', '阳光真温暖~',
            '你真棒！', '加油哦！', '喵~开心！', '喵~舒服~',
            '喵~漂亮~', '你真厉害~', '你超棒的~', '喵~加油~',
            '喜欢我吗~', '喵~很可爱吧~', '喵~~', '看我可爱吗？',
            '(づ￣ 3￣)づ', '(๑•̀ㅂ•́)و✧', '٩(๑❛ᴗ❛๑)۶', '(｡◕‿◕｡)',
            '(•ω•`)o', '(っ•̀ω•́)っ✎⁾⁾', '૮₍ ˶ᵔ ᵕ ᵔ˶ ₎ა', '( •̀ ω •́ )✧',
            // 新增表情对话
            '哈哈哈~好开心！', '笑死我了~', '太有趣了！', '(*≧▽≦)',
            '哼！不理你了~', '生气气！', '喵呜~不开心', '(｀皿´)ﾉ',
            '哇！吓我一跳！', '什么情况？！', '惊呆了~', '(⊙o⊙)',
            '让我想想...', '嗯...思考中', '这个问题很深奥', '(｡･ω･｡)ﾉ♡',
            '呜呜~好害怕', '不要吓我啦', '躲起来~', '(>﹏<)',
            '好困呀...', 'zzZ...', '想睡觉了', '眼皮好重..', '(´-ω-`)'
        ];

        // 学习陪伴相关消息
        this.learningMessages = {
            // 课程提醒
            courseReminder: [
                '该上课啦~今天学什么呢？', '新的课程在等你哦~',
                '学习时间到！一起来思维训练吧~', '喵~该充电学习了！',
                '今天的思维训练开始啦！', '准备好迎接新知识了吗？'
            ],
            // 番茄钟相关
            pomodoroStart: [
                '开始25分钟专注学习！', '番茄钟启动~专心学习吧！',
                '集中注意力，开始学习！', '25分钟学习时间开始！'
            ],
            pomodoroBreak: [
                '休息5分钟~放松一下！', '学习辛苦了，休息会儿~',
                '番茄钟休息时间！', '喝口水，活动活动~'
            ],
            pomodoroComplete: [
                '完成一个番茄钟！真棒！', '25分钟学习完成~你很棒！',
                '又完成一轮学习！继续加油！', '学习进度+1！'
            ],
            // 学习鼓励
            studyEncouragement: [
                '学习让你更聪明~', '思维训练很有趣吧？',
                '你的大脑在成长！', '每天进步一点点~',
                '批判性思维很重要哦~', '逻辑思维让你更理性~',
                '系统思维帮你看全局~', '设计思维激发创造力~'
            ],
            // 课程完成祝贺
            courseComplete: [
                '课程完成！学到新知识了~', '又掌握一个新技能！',
                '思维能力提升了！', '你真是学习小能手~',
                '知识+1！继续努力~', '学习成果满满！'
            ]
        };

        // 鼠标碰触时的特殊对话
        this.mouseInteractionMessages = [
            '你碰到我啦！','你碰我干嘛啦~','呜喵？被发现了~',
            '嘿嘿，我在这里！','不要逗我啦~',
            '被抓住尾巴啦~','喵呜~被撞到了','被你发现藏猫猫啦~',
            '别碰我的小爪爪~','咦？你看到我啦？','喵喵喵？被发现了~',
            '干嘛戳我呀~','我超凶的哦！喵~',
            '啊哦~被抓到啦','喵星人警告⚠️',
            '我躲不掉你的鼠标呢~','偷偷摸猫被发现了',
            '喵喵？你想跟我玩吗？','想吃小鱼干~喵呜~'
        ];

        // 点击次数计数
        this.clickCount = 0;

        this.init();
    }

    init() {
        this.loadCatHTML();
        this.setupEventListeners();
        this.startAnimation();
    }

    async loadCatHTML() {
        try {
            // 找到页眉容器
            const header = document.querySelector('.split-brand-header');
            if (header) {
                // 直接创建小猫HTML结构
                const catHTML = this.createCatHTML();
                header.insertAdjacentHTML('beforeend', catHTML);

                this.element = header.querySelector('.pixel-cat-container');
                this.catEl = header.querySelector('.pixel-cat');

                // 计算最大移动范围
                this.maxPosition = header.offsetWidth - 70; // 70px是小猫宽度

                // 应用样式
                this.applyCatStyles();

                // 设置初始位置
                this.position = -80;
                this.updatePosition();

                console.log('像素小猫已成功加载！🐱');
            }
        } catch (error) {
            console.error('加载像素小猫失败:', error);
        }
    }

    createCatHTML() {
        return `
        <div class="pixel-cat-container">
            <div class="pixel-cat running">
                <div class="pixel-cat-body">
                    <!-- 身体 -->
                    <div class="cat-body"></div>

                    <!-- 头部 -->
                    <div class="cat-head">
                        <!-- 猫咪高亮 -->
                        <div class="cat-highlight"></div>

                        <!-- 耳朵 -->
                        <div class="cat-ear left">
                            <div class="cat-inner-ear left"></div>
                        </div>
                        <div class="cat-ear right">
                            <div class="cat-inner-ear right"></div>
                        </div>

                        <!-- 脸部 -->
                        <div class="cat-face">
                            <div class="cat-eye left"></div>
                            <div class="cat-eye right"></div>
                            <div class="cat-nose"></div>
                            <div class="cat-mouth"></div>
                            <div class="cat-tongue"></div>

                            <!-- 胡须 -->
                            <div class="cat-whisker left-top"></div>
                            <div class="cat-whisker left-bottom"></div>
                            <div class="cat-whisker right-top"></div>
                            <div class="cat-whisker right-bottom"></div>
                        </div>
                    </div>

                    <!-- 尾巴 -->
                    <div class="cat-tail"></div>

                    <!-- 腿部 -->
                    <div class="cat-leg front-left"></div>
                    <div class="cat-leg front-right"></div>
                    <div class="cat-leg back-left"></div>
                    <div class="cat-leg back-right"></div>
                </div>
            </div>
            <!-- 对话泡泡 -->
            <div class="cat-bubble" id="catBubble"></div>
        </div>`;
    }

    // 确保像素猫样式正确应用
    applyCatStyles() {
        // 设置像素猫容器样式
        this.element.style.position = 'absolute';
        this.element.style.bottom = '0';
        this.element.style.left = '-80px';
        this.element.style.width = '70px';
        this.element.style.height = '60px';
        this.element.style.zIndex = '10';
        this.element.style.pointerEvents = 'auto';
        this.element.style.transform = 'scale(1.2)';
        this.element.style.filter = 'drop-shadow(0 3px 5px rgba(0, 0, 0, 0.2))';
        this.element.style.cursor = 'pointer';
        this.element.style.imageRendering = 'pixelated';
        this.element.style.display = 'block';
    }

    setupEventListeners() {
        // 监听窗口大小变化
        window.addEventListener('resize', () => {
            this.windowWidth = window.innerWidth;
            const header = document.querySelector('.split-brand-header');
            if (header) {
                this.maxPosition = header.offsetWidth - 70;
            }
        });

        // 监听点击事件
        this.element.addEventListener('click', () => {
            this.clickCount++;

            // 根据点击次数执行不同操作
            if (this.clickCount % 10 === 0) {
                // 每10次点击执行特殊动作
                this.doSpecialAction();
            } else {
                // 普通点击显示随机消息
                this.showRandomMessage();
            }

            // 如果正在移动，50%的几率停下来做动作
            if (this.isRunning && Math.random() < 0.5) {
                this.stopAndDoAction();
            }
        });

        // 监听右键点击事件，显示模式看板
        this.element.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            this.showModePanel();
        });

        // 监听双击事件，显示模式看板（备用方案）
        this.element.addEventListener('dblclick', (e) => {
            e.preventDefault();
            this.showModePanel();
        });

        // 监听鼠标移动事件，检测与猫咪的碰撞
        document.addEventListener('mousemove', (e) => {
            this.checkMouseInteraction(e);
        });
    }

    // 检测鼠标与猫咪的碰撞
    checkMouseInteraction(e) {
        // 如果已经在交互冷却中，则跳过
        if (this.mouseInteractionTimeout) {
            return;
        }

        // 获取猫咪元素的位置和尺寸
        const catRect = this.element.getBoundingClientRect();

        // 判断鼠标是否在猫咪元素区域内
        if (
            e.clientX >= catRect.left &&
            e.clientX <= catRect.right &&
            e.clientY >= catRect.top &&
            e.clientY <= catRect.bottom
        ) {
            // 从特殊的鼠标交互消息中随机选择一条
            const message = this.mouseInteractionMessages[
                Math.floor(Math.random() * this.mouseInteractionMessages.length)
            ];

            // 显示消息
            this.showMessage(message);

            // 50%的几率停下来做动作
            if (this.isRunning && Math.random() < 0.5) {
                this.stopAndDoAction();
            }

            // 设置交互冷却，2秒内不再响应鼠标碰触
            this.mouseInteractionTimeout = setTimeout(() => {
                this.mouseInteractionTimeout = null;
            }, 2000);
        }
    }

    startAnimation() {
        const animate = () => {
            this.update();
            requestAnimationFrame(animate);
        };
        animate();
    }

    update() {
        if (!this.element || !this.catEl) return;

        if (this.isRunning) {
            this.move();
        }
    }

    move() {
        // 随机变速和停顿逻辑
        const now = Date.now();

        // 每2-5秒随机改变一次行为（更频繁）
        if (now - this.lastSpeedChange > 2000 + Math.random() * 3000) {
            this.randomBehaviorChange();
            this.lastSpeedChange = now;
        }

        // 每5-15秒随机摆动耳朵
        if (now - this.lastEarTwitch > 5000 + Math.random() * 10000) {
            this.twitchEars();
            this.lastEarTwitch = now;
        }

        // 每2-6秒随机眨眼
        if (now - this.lastBlink > 2000 + Math.random() * 4000) {
            this.randomBlink();
            this.lastBlink = now;
        }

        // 学习陪伴功能检查
        if (this.learningMode) {
            this.checkStudyReminders();
        }

        // 模块性格检查（每次移动时检查一次）
        this.switchModulePersonality();

        // 更新位置
        this.position += this.speed * this.direction;

        // 检查边界并转身
        if (this.position <= -80) {
            this.position = -80;
            this.direction = 1;
            this.turn();
        } else if (this.position >= this.maxPosition) {
            this.position = this.maxPosition;
            this.direction = -1;
            this.turn();
        }

        this.updatePosition();
    }

    // 新增：随机行为变化
    randomBehaviorChange() {
        const behaviors = [
            () => {
                // 随机停顿 1-3 秒
                this.pauseRandomly();
            },
            () => {
                // 随机变速
                this.changeSpeed();
            },
            () => {
                // 随机做动作（提高概率）
                if (Math.random() < 0.6) {
                    this.stopAndDoAction();
                }
            }
        ];

        // 50% 的概率触发随机行为（提高活跃度）
        if (Math.random() < 0.5) {
            const randomBehavior = behaviors[Math.floor(Math.random() * behaviors.length)];
            randomBehavior();
        }
    }

    // 新增：随机停顿
    pauseRandomly() {
        if (!this.isRunning) return; // 如果已经停止，不再停顿

        this.isRunning = false;
        this.catEl.className = 'pixel-cat sitting';

        // 随机停顿 1-3 秒
        const pauseDuration = 1000 + Math.random() * 2000;

        if (this.randomPauseTimeout) {
            clearTimeout(this.randomPauseTimeout);
        }

        this.randomPauseTimeout = setTimeout(() => {
            this.isRunning = true;
            this.catEl.className = 'pixel-cat running';
            this.randomPauseTimeout = null;
        }, pauseDuration);
    }

    // 新增：随机变速
    changeSpeed() {
        // 速度在 0.5 到 1.8 之间随机变化
        this.speed = this.baseSpeed * (0.5 + Math.random() * 1.3);
    }

    // 新增：耳朵摆动
    twitchEars() {
        const leftEar = this.element.querySelector('.cat-ear.left');
        const rightEar = this.element.querySelector('.cat-ear.right');

        if (leftEar && rightEar) {
            // 随机选择摆动模式
            const twitchType = Math.random();

            if (twitchType < 0.3) {
                // 只摆动左耳
                leftEar.style.animation = 'ear-twitch 0.5s ease-in-out 2';
                setTimeout(() => {
                    leftEar.style.animation = '';
                }, 1000);
            } else if (twitchType < 0.6) {
                // 只摆动右耳
                rightEar.style.animation = 'ear-twitch 0.5s ease-in-out 2';
                setTimeout(() => {
                    rightEar.style.animation = '';
                }, 1000);
            } else {
                // 两只耳朵一起摆动
                leftEar.style.animation = 'ear-twitch 0.5s ease-in-out 2';
                rightEar.style.animation = 'ear-twitch 0.5s ease-in-out 2';
                setTimeout(() => {
                    leftEar.style.animation = '';
                    rightEar.style.animation = '';
                }, 1000);
            }
        }
    }

    // 新增：随机眨眼
    randomBlink() {
        const leftEye = this.element.querySelector('.cat-eye.left');
        const rightEye = this.element.querySelector('.cat-eye.right');

        if (leftEye && rightEye) {
            // 随机选择眨眼模式
            const blinkType = Math.random();

            if (blinkType < 0.1) {
                // 10% 概率只眨左眼（眨眼）
                this.blinkEye(leftEye);
            } else if (blinkType < 0.2) {
                // 10% 概率只眨右眼（眨眼）
                this.blinkEye(rightEye);
            } else if (blinkType < 0.3) {
                // 10% 概率快速双眨
                this.doubleBlink(leftEye, rightEye);
            } else {
                // 70% 概率正常双眼眨眼
                this.blinkBothEyes(leftEye, rightEye);
            }
        }
    }

    // 单眼眨眼
    blinkEye(eye) {
        eye.style.animation = 'quick-blink 0.3s ease-in-out';
        setTimeout(() => {
            eye.style.animation = '';
        }, 300);
    }

    // 双眼眨眼
    blinkBothEyes(leftEye, rightEye) {
        leftEye.style.animation = 'quick-blink 0.4s ease-in-out';
        rightEye.style.animation = 'quick-blink 0.4s ease-in-out';
        setTimeout(() => {
            leftEye.style.animation = '';
            rightEye.style.animation = '';
        }, 400);
    }

    // 快速双眨
    doubleBlink(leftEye, rightEye) {
        // 第一次眨眼
        this.blinkBothEyes(leftEye, rightEye);
        // 0.2秒后第二次眨眼
        setTimeout(() => {
            this.blinkBothEyes(leftEye, rightEye);
        }, 200);
    }

    turn() {
        // 只翻转猫咪本身，不翻转整个容器
        if (this.direction === 1) {
            // 向右移动，正常方向
            this.catEl.style.transform = 'scaleX(1)';
            this.catEl.style.transformOrigin = 'center center';
            this.element.classList.remove('cat-facing-left');
            console.log('小猫转向右，移除cat-facing-left类');
        } else {
            // 向左移动，水平翻转 - 设置正确的翻转中心
            this.catEl.style.transform = 'scaleX(-1)';
            this.catEl.style.transformOrigin = 'center center';
            this.element.classList.add('cat-facing-left');
            console.log('小猫转向左，添加cat-facing-left类');
        }

        // 关键修复：如果气泡正在显示，立即调整位置
        const bubble = this.element.querySelector('.cat-bubble');
        if (bubble && bubble.classList.contains('visible')) {
            console.log('检测到气泡正在显示，立即调整位置');
            this.adjustBubblePosition(bubble);
        }
    }

    updatePosition() {
        if (this.element) {
            this.element.style.left = `${this.position}px`;
        }
    }

    showRandomMessage() {
        let message;

        // 如果在特定模块页面，70%概率显示模块特色话语
        if (this.currentModule && Math.random() < 0.7) {
            message = this.getModuleMessage();
        }
        // 在学习模式下，30%概率显示学习相关消息
        else if (this.learningMode && Math.random() < 0.3) {
            const learningMsgs = this.learningMessages.studyEncouragement;
            message = learningMsgs[Math.floor(Math.random() * learningMsgs.length)];
        }
        // 否则显示普通消息
        else {
            message = this.messages[Math.floor(Math.random() * this.messages.length)];
        }

        this.showMessage(message);
    }

    // 获取当前模块的特色话语
    getModuleMessage() {
        if (!this.currentModule) return null;

        const personality = this.modulePersonalities[this.currentModule];
        if (!personality) return null;

        // 随机选择话语类型：成语、古诗词、引导思考
        const messageTypes = ['idioms', 'poetry', 'thinking'];
        const randomType = messageTypes[Math.floor(Math.random() * messageTypes.length)];

        const messages = personality[randomType];
        return messages[Math.floor(Math.random() * messages.length)];
    }

    // 根据当前状态显示对应的对话
    showStateMessage(state) {
        const stateMessages = {
            'laughing': ['哈哈哈~好开心！', '笑死我了~', '太有趣了！', '(*≧▽≦)'],
            'angry': ['哼！不理你了~', '生气气！', '喵呜~不开心', '(｀皿´)ﾉ'],
            'surprised': ['哇！吓我一跳！', '什么情况？！', '惊呆了~', '(⊙o⊙)'],
            'thinking': ['让我想想...', '嗯...思考中', '这个问题很深奥', '(｡･ω･｡)ﾉ♡'],
            'scared': ['呜呜~好害怕', '不要吓我啦', '躲起来~', '(>﹏<)'],
            'sleepy': ['好困呀...', 'zzZ...', '想睡觉了', '眼皮好重..', '(´-ω-`)'],
            'sleeping': ['zzZ...', '呼噜噜~', '做了个好梦~', '睡得好香~']
        };

        const messages = stateMessages[state];
        if (messages && messages.length > 0) {
            const message = messages[Math.floor(Math.random() * messages.length)];
            this.showMessage(message);
        } else {
            this.showRandomMessage();
        }
    }

    showMessage(message) {
        console.log('showMessage被调用，消息:', message);
        const bubble = this.element.querySelector('.cat-bubble');
        console.log('找到的气泡元素:', bubble);
        if (bubble) {
            bubble.textContent = message;

            // 根据小猫方向动态调整气泡位置
            console.log('调用adjustBubblePosition前，当前方向:', this.direction);
            this.adjustBubblePosition(bubble);

            bubble.classList.add('visible');

            // 根据消息内容触发表情
            this.triggerExpressionByMessage(message);

            // 清除之前的超时
            if (this.bubbleTimeout) {
                clearTimeout(this.bubbleTimeout);
            }

            // 3秒后隐藏消息
            this.bubbleTimeout = setTimeout(() => {
                bubble.classList.remove('visible');
            }, 3000);
        }
    }

    // 隐藏气泡
    hideBubble() {
        const bubble = this.element.querySelector('.cat-bubble');
        if (bubble) {
            bubble.classList.remove('visible');
            // 清除气泡超时
            if (this.bubbleTimeout) {
                clearTimeout(this.bubbleTimeout);
                this.bubbleTimeout = null;
            }
        }
    }

    // 动态调整气泡位置 - 用小学数学重新计算
    adjustBubblePosition(bubble) {
        // 小猫容器宽度：70px
        // 头部：left: 24px, width: 28px
        // 头部中心：24 + 14 = 38px

        if (this.direction === 1) {
            // 向右移动
            bubble.style.setProperty('left', '15px', 'important');
            console.log('气泡位置：向右，left=15px');
        } else {
            // 向左移动 - 对准头部
            bubble.style.setProperty('left', '15px', 'important');
            console.log('气泡位置：向左，left=5px');
        }

        // 验证是否生效
        console.log('设置后的left值:', bubble.style.left);
        console.log('计算后的left值:', window.getComputedStyle(bubble).left);
    }

    stopAndDoAction() {
        this.isRunning = false;

        // 随机选择一个状态
        const randomState = this.states[Math.floor(Math.random() * this.states.length)];
        this.catEl.className = `pixel-cat ${randomState}`;

        // 显示对应状态的对话
        this.showStateMessage(randomState);

        // 根据不同状态设置不同的持续时间
        let duration = 2000 + Math.random() * 2000; // 默认2-4秒

        if (randomState === 'sleeping') {
            duration = 5000; // 睡觉固定5秒
        } else if (randomState === 'laughing') {
            duration = 3000; // 笑3秒
        }

        setTimeout(() => {
            this.isRunning = true;
            this.catEl.className = 'pixel-cat running';
        }, duration);
    }

    doSpecialAction() {
        this.catEl.classList.add('special-action');
        this.showMessage('喵星人特技！✨');

        setTimeout(() => {
            this.catEl.classList.remove('special-action');
        }, 1000);
    }

    // 公共方法：暂停/恢复小猫
    pause() {
        this.isRunning = false;
    }

    resume() {
        this.isRunning = true;
        this.catEl.className = 'pixel-cat running';
    }

    // 公共方法：设置小猫基础速度
    setSpeed(speed) {
        this.baseSpeed = Math.max(0.1, Math.min(3, speed)); // 限制基础速度范围
        this.speed = this.baseSpeed; // 重置当前速度为基础速度
    }

    // 公共方法：让小猫执行特定动作
    doAction(action) {
        this.stopAndDoAction();
    }

    // ==================== 表情系统 ====================

    // 显示表情
    showExpression(expressionType, duration = 3000) {
        // 清除之前的表情
        this.clearExpression();

        // 设置新表情
        this.currentExpression = expressionType;
        this.element.classList.add(expressionType);

        // 设置表情持续时间
        this.expressionTimeout = setTimeout(() => {
            this.clearExpression();
        }, duration);

        console.log(`小猫表情：${expressionType}`);
    }

    // 清除表情
    clearExpression() {
        if (this.currentExpression) {
            this.element.classList.remove(this.currentExpression);
            this.currentExpression = null;
        }

        if (this.expressionTimeout) {
            clearTimeout(this.expressionTimeout);
            this.expressionTimeout = null;
        }
    }

    // 根据消息内容触发相应表情
    triggerExpressionByMessage(message) {
        // 开心相关的消息
        if (message.includes('开心') || message.includes('哈哈') || message.includes('好棒') ||
            message.includes('真棒') || message.includes('厉害') || message.includes('(*≧▽≦)')) {
            this.showExpression('smile', 2500);
        }
        // 大笑相关的消息
        else if (message.includes('笑死') || message.includes('太有趣') || message.includes('哈哈哈')) {
            this.showExpression('laugh', 3000);
        }
        // 害羞相关的消息
        else if (message.includes('可爱') || message.includes('夸我') || message.includes('(｡◕‿◕｡)')) {
            this.showExpression('shy', 2500);
        }
        // 眨眼相关的消息
        else if (message.includes('惊喜') || message.includes('秘密') || message.includes('(づ￣ 3￣)づ')) {
            this.showExpression('wink', 2000);
        }
        // 无辜相关的消息
        else if (message.includes('不知道') || message.includes('想想') || message.includes('(´･ω･`)')) {
            this.showExpression('innocent', 2500);
        }
        // 惊讶相关的消息
        else if (message.includes('哇') || message.includes('惊呆') || message.includes('什么情况') ||
                 message.includes('(⊙o⊙)')) {
            this.showExpression('surprised', 2000);
        }
        // 思考相关的消息
        else if (message.includes('想想') || message.includes('思考') || message.includes('深奥')) {
            this.showExpression('thinking', 3000);
        }
        // 默认情况下，随机显示积极表情
        else if (Math.random() < 0.3) {
            const positiveExpressions = ['smile', 'squint', 'innocent'];
            const randomExpression = positiveExpressions[Math.floor(Math.random() * positiveExpressions.length)];
            this.showExpression(randomExpression, 2000);
        }
    }

    // 显示模式看板
    showModePanel() {
        if (this.modePanelVisible) return;

        this.modePanelVisible = true;
        this.createModePanel();
    }

    // 创建模式看板HTML
    createModePanel() {
        // 创建遮罩层
        const overlay = document.createElement('div');
        overlay.className = 'panel-overlay';
        overlay.id = 'catModeOverlay';

        // 创建看板
        const panel = document.createElement('div');
        panel.className = 'cat-mode-panel';
        panel.id = 'catModePanel';

        panel.innerHTML = this.generatePanelHTML();

        // 添加到页面
        document.body.appendChild(overlay);
        document.body.appendChild(panel);

        // 显示动画
        setTimeout(() => {
            overlay.classList.add('visible');
            panel.classList.add('visible');
        }, 10);

        // 绑定事件
        this.bindPanelEvents();
    }

    // 生成看板HTML内容
    generatePanelHTML() {
        let html = `
            <div class="panel-header">
                <h3 class="panel-title">🐱 像素猫模式看板</h3>
                <p class="panel-subtitle">选择模式组合和颜色，预览小猫的不同行为</p>
            </div>
            <div class="panel-content">
        `;

        // 添加颜色选择区域
        html += `
            <div class="mode-category">
                <h4 class="category-title">🎨 颜色主题</h4>
                <div class="color-options">
        `;

        for (const [colorKey, colorData] of Object.entries(this.colorSchemes)) {
            const isSelected = colorKey === this.currentColorScheme ? 'checked' : '';
            html += `
                <div class="color-option">
                    <input type="radio" id="color_${colorKey}" name="color_scheme" value="${colorKey}" ${isSelected}>
                    <label for="color_${colorKey}" class="color-label">
                        <div class="color-preview" style="background: ${colorData.body}"></div>
                        <span class="color-name">${colorData.name}</span>
                    </label>
                </div>
            `;
        }

        html += `
                </div>
            </div>
        `;

        // 添加学习陪伴功能区域
        html += `
            <div class="mode-category">
                <h4 class="category-title">📚 学习陪伴</h4>
                <div class="learning-controls">
                    <button class="learning-btn" id="pomodoroBtn">
                        🍅 ${this.pomodoroState === 'stopped' ? '开始番茄钟' : '停止番茄钟'}
                    </button>
                    <button class="learning-btn" id="studyStatsBtn">
                        📊 学习统计
                    </button>
                    <div class="pomodoro-info">
                        <span>今日完成: ${this.pomodoroCount} 个番茄钟</span>
                    </div>
                </div>
            </div>
        `;

        // 生成各个分类
        for (const [categoryKey, category] of Object.entries(this.modeCategories)) {
            html += `
                <div class="mode-category">
                    <h4 class="category-title">${category.title}</h4>
                    <div class="mode-options">
            `;

            for (const [modeKey, modeName] of Object.entries(category.modes)) {
                html += `
                    <div class="mode-option">
                        <input type="radio" id="mode_${modeKey}" name="category_${categoryKey}" value="${modeKey}">
                        <label for="mode_${modeKey}">${modeName}</label>
                    </div>
                `;
            }

            html += `
                    </div>
                </div>
            `;
        }

        html += `
            </div>
            <div class="panel-footer">
                <button class="panel-button btn-preview" id="previewBtn">🎬 预览效果</button>
                <button class="panel-button btn-close" id="closePanelBtn">❌ 关闭</button>
            </div>
        `;

        return html;
    }

    // 绑定看板事件
    bindPanelEvents() {
        const previewBtn = document.getElementById('previewBtn');
        const closeBtn = document.getElementById('closePanelBtn');
        const overlay = document.getElementById('catModeOverlay');

        // 预览按钮
        previewBtn.addEventListener('click', () => {
            this.previewSelectedModes();
        });

        // 颜色选择事件
        const colorRadios = document.querySelectorAll('input[name="color_scheme"]');
        colorRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                if (radio.checked) {
                    this.applyColorScheme(radio.value);
                }
            });
        });

        // 学习陪伴功能事件
        const pomodoroBtn = document.getElementById('pomodoroBtn');
        const studyStatsBtn = document.getElementById('studyStatsBtn');

        if (pomodoroBtn) {
            pomodoroBtn.addEventListener('click', () => {
                if (this.pomodoroState === 'stopped') {
                    this.startPomodoro();
                    pomodoroBtn.textContent = '🍅 停止番茄钟';
                } else {
                    this.stopPomodoro();
                    pomodoroBtn.textContent = '🍅 开始番茄钟';
                }
            });
        }

        if (studyStatsBtn) {
            studyStatsBtn.addEventListener('click', () => {
                this.showStudyStats();
            });
        }

        // 关闭按钮
        closeBtn.addEventListener('click', () => {
            this.closeModePanel();
        });

        // 点击遮罩关闭
        overlay.addEventListener('click', () => {
            this.closeModePanel();
        });
    }

    // 预览选中的模式
    previewSelectedModes() {
        const selectedModes = [];

        // 获取每个分类中选中的模式
        for (const categoryKey of Object.keys(this.modeCategories)) {
            const selectedRadio = document.querySelector(`input[name="category_${categoryKey}"]:checked`);
            if (selectedRadio) {
                selectedModes.push(selectedRadio.value);
            }
        }

        if (selectedModes.length === 0) {
            this.showMessage('请先选择一个模式哦~');
            return;
        }

        // 关闭看板
        this.closeModePanel();

        // 执行预览
        this.executePreview(selectedModes);
    }

    // 执行预览效果
    executePreview(modes) {
        // 停止当前动作
        this.isRunning = false;

        // 如果只有一个模式，直接执行
        if (modes.length === 1) {
            const mode = modes[0];
            this.catEl.className = `pixel-cat ${mode}`;
            this.showStateMessage(mode);

            // 根据模式设置持续时间
            let duration = 3000;
            if (mode === 'sleeping') duration = 5000;

            setTimeout(() => {
                this.isRunning = true;
                this.catEl.className = 'pixel-cat running';
            }, duration);
        } else {
            // 多个模式依次执行
            this.executeSequentialPreview(modes);
        }
    }

    // 依次执行多个模式
    executeSequentialPreview(modes) {
        let currentIndex = 0;

        const executeNext = () => {
            if (currentIndex >= modes.length) {
                // 所有模式执行完毕，恢复跑动
                this.isRunning = true;
                this.catEl.className = 'pixel-cat running';
                this.showMessage('预览完成！喵~');
                return;
            }

            const mode = modes[currentIndex];
            this.catEl.className = `pixel-cat ${mode}`;
            this.showStateMessage(mode);

            // 设置持续时间
            let duration = 2000;
            if (mode === 'sleeping') duration = 3000; // 睡觉缩短到3秒

            currentIndex++;
            setTimeout(executeNext, duration);
        };

        executeNext();
    }

    // 应用颜色方案
    applyColorScheme(schemeKey) {
        this.currentColorScheme = schemeKey;
        const scheme = this.colorSchemes[schemeKey];

        if (!scheme) return;

        console.log('应用颜色方案:', schemeKey, scheme); // 调试信息

        // 更新CSS变量 - 这会自动应用到所有使用var(--accent-color)的元素
        document.documentElement.style.setProperty('--accent-color', scheme.body);
        document.documentElement.style.setProperty('--tail-color', scheme.tail);

        // 手动设置那些不使用CSS变量的元素
        if (this.element) {
            // 应用到眼睛
            const eyes = this.element.querySelectorAll('.cat-eye');
            eyes.forEach(eye => eye.style.setProperty('background-color', scheme.eyes, 'important'));

            // 应用到鼻子
            const nose = this.element.querySelector('.cat-nose');
            if (nose) nose.style.setProperty('background-color', scheme.nose, 'important');

            // 应用到嘴巴
            const mouth = this.element.querySelector('.cat-mouth');
            if (mouth) mouth.style.setProperty('background-color', scheme.mouth, 'important');

            // 应用到内耳
            const innerEars = this.element.querySelectorAll('.cat-inner-ear');
            innerEars.forEach(ear => ear.style.setProperty('background-color', scheme.innerEar, 'important'));

            // 应用到耳朵外部
            const ears = this.element.querySelectorAll('.cat-ear');
            ears.forEach(ear => ear.style.setProperty('background-color', scheme.head, 'important'));
        }

        // 颜色变化不显示消息，保持安静
    }

    // 关闭模式看板
    closeModePanel() {
        const panel = document.getElementById('catModePanel');
        const overlay = document.getElementById('catModeOverlay');

        if (panel && overlay) {
            panel.classList.remove('visible');
            overlay.classList.remove('visible');

            setTimeout(() => {
                document.body.removeChild(panel);
                document.body.removeChild(overlay);
                this.modePanelVisible = false;
            }, 300);
        }
    }

    // ==================== 学习陪伴功能 ====================

    // 检测当前页面类型和模块
    getCurrentPageType() {
        const path = window.location.pathname;
        if (path.includes('course-detail.html')) {
            return 'course';
        } else if (path.includes('module-') || path.includes('course-index.html')) {
            return 'module';
        } else {
            return 'home';
        }
    }

    // 检测当前模块类型
    getCurrentModule() {
        const path = window.location.pathname;

        if (path.includes('module-critical.html')) {
            return 'critical';
        } else if (path.includes('module-logical.html')) {
            return 'logical';
        } else if (path.includes('module-system.html')) {
            return 'system';
        } else if (path.includes('module-design.html')) {
            return 'design';
        } else if (path.includes('module-trap.html')) {
            return 'trap';
        } else if (path.includes('module-personality.html')) {
            return 'personality';
        }

        // 也可以通过课程ID判断模块
        const urlParams = new URLSearchParams(window.location.search);
        const courseId = parseInt(urlParams.get('id'));

        if (courseId >= 1 && courseId <= 42) {
            if (courseId <= 10) return 'critical';
            else if (courseId <= 22) return 'logical';
            else if (courseId <= 32) return 'system';
            else return 'design';
        } else if (courseId >= 43 && courseId <= 84) {
            if (courseId <= 52) return 'critical';
            else if (courseId <= 64) return 'logical';
            else if (courseId <= 74) return 'system';
            else return 'design';
        } else if (courseId >= 85 && courseId <= 124) {
            if (courseId <= 94) return 'critical';
            else if (courseId <= 106) return 'logical';
            else if (courseId <= 114) return 'system';
            else return 'design';
        } else if (courseId >= 125 && courseId <= 132) {
            return 'trap';
        } else if (courseId >= 133 && courseId <= 140) {
            return 'personality';
        }

        return null;
    }

    // 切换页面配色和模块性格
    switchModulePersonality() {
        const newModule = this.getCurrentModule();
        const pageType = this.getCurrentPageType();

        // 根据页面类型设置颜色
        let pageColor = this.pageColors.home; // 默认颜色

        if (pageType === 'course') {
            pageColor = this.pageColors.course;
        } else if (newModule && this.pageColors[newModule]) {
            pageColor = this.pageColors[newModule];
        }

        // 更新小猫颜色
        document.documentElement.style.setProperty('--accent-color', pageColor);

        // 如果模块发生变化，显示切换消息和更新性格
        if (newModule && newModule !== this.currentModule) {
            this.currentModule = newModule;
            const personality = this.modulePersonalities[newModule];

            if (personality) {
                // 显示切换消息
                const welcomeMessages = [
                    `进入${personality.name}模块~`,
                    `${personality.name}时间到！`,
                    `开始${personality.name}之旅~`,
                    `${personality.name}模式启动！`
                ];
                const message = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
                this.showMessage(message);

                console.log(`切换到${personality.name}模块，页面配色：${pageColor}`);
            }
        }
    }

    // 学习提醒系统
    checkStudyReminders() {
        const now = Date.now();
        const pageType = this.getCurrentPageType();

        // 在非课程页面，每10-15分钟提醒一次学习
        if (pageType !== 'course' && now - this.lastStudyReminder > 600000 + Math.random() * 300000) {
            this.showLearningReminder();
            this.lastStudyReminder = now;
        }
    }

    // 显示学习提醒
    showLearningReminder() {
        const messages = this.learningMessages.courseReminder;
        const message = messages[Math.floor(Math.random() * messages.length)];
        this.showMessage(message);
    }

    // 番茄钟功能
    startPomodoro() {
        if (this.pomodoroState !== 'stopped') return;

        this.pomodoroState = 'studying';
        this.studyStartTime = Date.now();

        const message = this.learningMessages.pomodoroStart[Math.floor(Math.random() * this.learningMessages.pomodoroStart.length)];
        this.showMessage(message);

        // 25分钟后提醒休息
        this.pomodoroTimer = setTimeout(() => {
            this.pomodoroBreak();
        }, 25 * 60 * 1000); // 25分钟
    }

    // 番茄钟休息
    pomodoroBreak() {
        this.pomodoroState = 'break';
        this.pomodoroCount++;

        const message = this.learningMessages.pomodoroBreak[Math.floor(Math.random() * this.learningMessages.pomodoroBreak.length)];
        this.showMessage(message);

        // 5分钟后可以开始下一轮
        this.pomodoroTimer = setTimeout(() => {
            this.pomodoroState = 'stopped';
            const completeMessage = this.learningMessages.pomodoroComplete[Math.floor(Math.random() * this.learningMessages.pomodoroComplete.length)];
            this.showMessage(completeMessage);
        }, 5 * 60 * 1000); // 5分钟
    }

    // 停止番茄钟
    stopPomodoro() {
        if (this.pomodoroTimer) {
            clearTimeout(this.pomodoroTimer);
            this.pomodoroTimer = null;
        }
        this.pomodoroState = 'stopped';
        this.showMessage('番茄钟已停止~');
    }

    // 显示学习统计
    showStudyStats() {
        const stats = this.getStudyStats();
        const message = `学习统计📊\n今日番茄钟: ${stats.todayPomodoros}个\n总学习时间: ${stats.totalTime}分钟`;
        this.showMessage(message);
    }

    // 获取学习统计
    getStudyStats() {
        const totalTime = parseInt(localStorage.getItem('totalStudyTime') || '0');
        const totalPomodoros = parseInt(localStorage.getItem('totalPomodoros') || '0');
        return {
            totalTime: Math.floor(totalTime / 1000 / 60), // 转换为分钟
            totalPomodoros: totalPomodoros,
            todayPomodoros: this.pomodoroCount
        };
    }


}

// 页面加载完成后初始化小猫
document.addEventListener('DOMContentLoaded', () => {
    // 确保CSS文件已加载
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'assets/css/pixel-cat.css';
    document.head.appendChild(link);

    // 等待CSS加载后初始化小猫
    link.onload = () => {
        window.pixelCat = new PixelCat();
    };
});

// 导出类供其他脚本使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PixelCat;
}