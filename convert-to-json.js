const fs = require('fs');
const path = require('path');

/**
 * 批量转换课程文档和题库文档为JSON格式
 * 支持动态加载和结构化数据处理
 */

class DocumentConverter {
    constructor() {
        this.outputDir = './json-data';
        this.coursesOutputDir = path.join(this.outputDir, 'courses');
        this.quizzesOutputDir = path.join(this.outputDir, 'quizzes');
        this.heartLampsOutputDir = path.join(this.outputDir, 'heart-lamps');
        
        // 确保输出目录存在
        this.ensureDirectories();
    }

    ensureDirectories() {
        [this.outputDir, this.coursesOutputDir, this.quizzesOutputDir, this.heartLampsOutputDir].forEach(dir => {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
        });
    }

    /**
     * 解析课程Markdown文件
     */
    parseCourseMarkdown(content, filename) {
        const lines = content.split('\n');
        const course = {
            id: this.extractCourseNumber(filename),
            filename: filename,
            title: '',
            module: '',
            grade: '',
            duration: '',
            objective: '',
            sections: [],
            metadata: {
                convertedAt: new Date().toISOString(),
                originalFile: filename
            }
        };

        let currentSection = null;
        let currentContent = [];
        let inCodeBlock = false;
        let codeBlockType = '';

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            
            // 检测代码块
            if (line.startsWith('```')) {
                if (!inCodeBlock) {
                    inCodeBlock = true;
                    codeBlockType = line.substring(3);
                    currentContent.push(line);
                } else {
                    inCodeBlock = false;
                    currentContent.push(line);
                    codeBlockType = '';
                }
                continue;
            }

            // 在代码块内，直接添加内容
            if (inCodeBlock) {
                currentContent.push(line);
                continue;
            }

            // 提取标题
            if (line.startsWith('# ') && !course.title) {
                course.title = line.substring(2).trim();
                continue;
            }

            // 提取课程信息
            if (line.includes('**所属模块**：')) {
                course.module = line.split('：')[1].trim();
                continue;
            }
            if (line.includes('**适合年级**：')) {
                course.grade = line.split('：')[1].trim();
                continue;
            }
            if (line.includes('**预计用时**：')) {
                course.duration = line.split('：')[1].trim();
                continue;
            }
            if (line.includes('**学习目标**：')) {
                course.objective = line.split('：')[1].trim();
                continue;
            }

            // 检测新的章节
            if (line.startsWith('## ')) {
                // 保存上一个章节
                if (currentSection) {
                    currentSection.content = currentContent.join('\n').trim();
                    course.sections.push(currentSection);
                }
                
                // 开始新章节
                currentSection = {
                    id: this.generateSectionId(line),
                    title: line.substring(3).trim(),
                    type: this.detectSectionType(line),
                    content: '',
                    subsections: []
                };
                currentContent = [];
                continue;
            }

            // 检测子章节
            if (line.startsWith('### ')) {
                if (currentSection) {
                    const subsection = {
                        id: this.generateSectionId(line),
                        title: line.substring(4).trim(),
                        type: this.detectSubsectionType(line),
                        content: ''
                    };
                    currentSection.subsections.push(subsection);
                }
                currentContent.push(line);
                continue;
            }

            // 添加到当前内容
            currentContent.push(line);
        }

        // 保存最后一个章节
        if (currentSection) {
            currentSection.content = currentContent.join('\n').trim();
            course.sections.push(currentSection);
        }

        return course;
    }

    /**
     * 解析题库Markdown文件
     */
    parseQuizMarkdown(content, filename) {
        const lines = content.split('\n');
        const quiz = {
            id: this.extractQuizNumber(filename),
            filename: filename,
            title: '',
            description: '',
            totalQuestions: 0,
            categories: {},
            difficulty: {},
            questions: [],
            metadata: {
                convertedAt: new Date().toISOString(),
                originalFile: filename
            }
        };

        let currentQuestion = null;
        let currentContent = [];
        let inQuestion = false;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            // 提取标题
            if (line.startsWith('# ') && !quiz.title) {
                quiz.title = line.substring(2).trim();
                continue;
            }

            // 提取题库概览信息
            if (line.includes('**题目总数**：')) {
                quiz.totalQuestions = parseInt(line.split('：')[1].trim().replace('题', ''));
                continue;
            }

            // 检测新题目
            if (line.match(/^### 第\d+题/)) {
                // 保存上一题
                if (currentQuestion) {
                    currentQuestion.content = currentContent.join('\n').trim();
                    quiz.questions.push(currentQuestion);
                }

                // 开始新题目
                const questionMatch = line.match(/第(\d+)题\s*(⭐+)?\s*(.+)/);
                if (questionMatch) {
                    currentQuestion = {
                        id: parseInt(questionMatch[1]),
                        difficulty: questionMatch[2] ? questionMatch[2].length : 1,
                        type: questionMatch[3] || '',
                        scenario: '',
                        question: '',
                        options: [],
                        correctAnswers: [],
                        explanation: '',
                        learningPoints: [],
                        responseReference: '',
                        content: ''
                    };
                    currentContent = [];
                    inQuestion = true;
                }
                continue;
            }

            if (inQuestion && currentQuestion) {
                // 解析题目内容
                if (line.startsWith('【场景：')) {
                    currentQuestion.scenario = line.substring(3, line.length - 1);
                } else if (line.startsWith('【问题】')) {
                    currentQuestion.question = line.substring(3);
                } else if (line.match(/^[A-H]\./)) {
                    currentQuestion.options.push({
                        key: line.charAt(0),
                        text: line.substring(3).trim()
                    });
                } else if (line.startsWith('【正确答案】')) {
                    const answers = line.substring(5).split('、').map(a => a.trim());
                    currentQuestion.correctAnswers = answers;
                }
            }

            currentContent.push(line);
        }

        // 保存最后一题
        if (currentQuestion) {
            currentQuestion.content = currentContent.join('\n').trim();
            quiz.questions.push(currentQuestion);
        }

        return quiz;
    }

    /**
     * 解析心灯密语文件
     */
    parseHeartLampsMarkdown(content) {
        const lines = content.split('\n');
        const heartLamps = {
            title: '',
            description: '',
            courses: [],
            metadata: {
                convertedAt: new Date().toISOString(),
                originalFile: '140课程心灯密语库.md'
            }
        };

        let currentCourse = null;
        let currentContent = [];

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            // 提取标题
            if (line.startsWith('# ') && !heartLamps.title) {
                heartLamps.title = line.substring(2).trim();
                continue;
            }

            // 检测新课程
            if (line.match(/^#### \*\*第\d+课：/)) {
                // 保存上一课程
                if (currentCourse) {
                    currentCourse.content = currentContent.join('\n').trim();
                    heartLamps.courses.push(currentCourse);
                }

                // 开始新课程
                const courseMatch = line.match(/第(\d+)课：(.+)\*\*/);
                if (courseMatch) {
                    currentCourse = {
                        id: parseInt(courseMatch[1]),
                        title: courseMatch[2],
                        wisdom: '',
                        heartLamp: '',
                        application: '',
                        content: ''
                    };
                    currentContent = [];
                }
                continue;
            }

            if (currentCourse) {
                // 解析课程内容
                if (line.startsWith('**智者感悟**：')) {
                    currentCourse.wisdom = line.substring(7);
                } else if (line.startsWith('**心灯密语**：')) {
                    currentCourse.heartLamp = line.substring(7);
                } else if (line.startsWith('**应用场景**：')) {
                    currentCourse.application = line.substring(7);
                }
            }

            currentContent.push(line);
        }

        // 保存最后一课程
        if (currentCourse) {
            currentCourse.content = currentContent.join('\n').trim();
            heartLamps.courses.push(currentCourse);
        }

        return heartLamps;
    }

    /**
     * 工具方法
     */
    extractCourseNumber(filename) {
        const match = filename.match(/第(\d+)课/);
        return match ? parseInt(match[1]) : 0;
    }

    extractQuizNumber(filename) {
        const match = filename.match(/题库(\d+)/);
        return match ? parseInt(match[1]) : 0;
    }

    generateSectionId(title) {
        return title.toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .substring(0, 50);
    }

    detectSectionType(title) {
        const types = {
            '概念导入': 'introduction',
            '案例展示': 'case-study',
            '核心内容': 'core-content',
            '交互练习': 'interactive-exercise',
            '技能确认测试': 'skill-test',
            '情感智慧深化': 'emotional-wisdom',
            '深度拓展': 'deep-extension',
            '生活应用提示': 'life-application',
            '课程小结': 'summary'
        };

        for (const [key, value] of Object.entries(types)) {
            if (title.includes(key)) {
                return value;
            }
        }
        return 'general';
    }

    detectSubsectionType(title) {
        if (title.includes('测试') || title.includes('练习')) return 'exercise';
        if (title.includes('案例') || title.includes('场景')) return 'case';
        if (title.includes('技巧') || title.includes('方法')) return 'method';
        if (title.includes('思考') || title.includes('反思')) return 'reflection';
        return 'content';
    }

    /**
     * 转换课程文档
     */
    async convertCourses() {
        console.log('📚 转换课程文档...');

        const courseModules = [
            '02-入门模块',
            '03-基础模块',
            '04-进阶模块',
            '05-一叶知秋模块',
            '06-识人辨言模块'
        ];

        const allCourses = [];

        for (const moduleDir of courseModules) {
            if (!fs.existsSync(moduleDir)) {
                console.log(`⚠️  模块目录不存在: ${moduleDir}`);
                continue;
            }

            const files = fs.readdirSync(moduleDir).filter(file => file.endsWith('.md'));
            console.log(`📖 处理模块 ${moduleDir}: ${files.length} 个文件`);

            for (const file of files) {
                try {
                    const filePath = path.join(moduleDir, file);
                    const content = fs.readFileSync(filePath, 'utf-8');
                    const course = this.parseCourseMarkdown(content, file);

                    // 添加模块信息
                    course.moduleDir = moduleDir;
                    course.moduleName = this.getModuleName(moduleDir);

                    allCourses.push(course);

                    // 保存单个课程文件
                    const outputFile = path.join(this.coursesOutputDir, `course-${course.id.toString().padStart(3, '0')}.json`);
                    fs.writeFileSync(outputFile, JSON.stringify(course, null, 2), 'utf-8');

                    console.log(`✅ 转换完成: ${file} -> course-${course.id.toString().padStart(3, '0')}.json`);
                } catch (error) {
                    console.error(`❌ 转换失败: ${file}`, error.message);
                }
            }
        }

        // 保存所有课程索引
        const coursesIndex = {
            total: allCourses.length,
            modules: this.groupCoursesByModule(allCourses),
            courses: allCourses.map(course => ({
                id: course.id,
                title: course.title,
                module: course.moduleName,
                filename: course.filename,
                grade: course.grade,
                duration: course.duration
            })),
            metadata: {
                generatedAt: new Date().toISOString(),
                version: '1.0.0'
            }
        };

        fs.writeFileSync(
            path.join(this.outputDir, 'courses-index.json'),
            JSON.stringify(coursesIndex, null, 2),
            'utf-8'
        );

        console.log(`📚 课程转换完成: ${allCourses.length} 个课程`);
    }

    /**
     * 转换题库文档
     */
    async convertQuizzes() {
        console.log('🎯 转换题库文档...');

        const quizDir = '09-训练题库';
        if (!fs.existsSync(quizDir)) {
            console.log(`⚠️  题库目录不存在: ${quizDir}`);
            return;
        }

        const files = fs.readdirSync(quizDir).filter(file => file.endsWith('.md'));
        const allQuizzes = [];

        for (const file of files) {
            try {
                const filePath = path.join(quizDir, file);
                const content = fs.readFileSync(filePath, 'utf-8');
                const quiz = this.parseQuizMarkdown(content, file);

                allQuizzes.push(quiz);

                // 保存单个题库文件
                const outputFile = path.join(this.quizzesOutputDir, `quiz-${quiz.id}.json`);
                fs.writeFileSync(outputFile, JSON.stringify(quiz, null, 2), 'utf-8');

                console.log(`✅ 转换完成: ${file} -> quiz-${quiz.id}.json`);
            } catch (error) {
                console.error(`❌ 转换失败: ${file}`, error.message);
            }
        }

        // 保存题库索引
        const quizzesIndex = {
            total: allQuizzes.length,
            totalQuestions: allQuizzes.reduce((sum, quiz) => sum + quiz.questions.length, 0),
            quizzes: allQuizzes.map(quiz => ({
                id: quiz.id,
                title: quiz.title,
                filename: quiz.filename,
                questionCount: quiz.questions.length
            })),
            metadata: {
                generatedAt: new Date().toISOString(),
                version: '1.0.0'
            }
        };

        fs.writeFileSync(
            path.join(this.outputDir, 'quizzes-index.json'),
            JSON.stringify(quizzesIndex, null, 2),
            'utf-8'
        );

        console.log(`🎯 题库转换完成: ${allQuizzes.length} 个题库, ${quizzesIndex.totalQuestions} 道题目`);
    }

    /**
     * 转换心灯密语
     */
    async convertHeartLamps() {
        console.log('🕯️  转换心灯密语...');

        let heartLampsFile = '140课程心灯密语库.md';
        if (!fs.existsSync(heartLampsFile)) {
            // 兼容旧文件名
            heartLampsFile = '140课程精华卡片库.md';
            if (!fs.existsSync(heartLampsFile)) {
                console.log(`⚠️  心灯密语文件不存在: ${heartLampsFile}`);
                return;
            }
            console.log(`ℹ️  使用兼容文件名: ${heartLampsFile}`);
        }

        try {
            const content = fs.readFileSync(heartLampsFile, 'utf-8');
            const heartLamps = this.parseHeartLampsMarkdown(content);

            // 保存完整的心灯密语文件
            const outputFile = path.join(this.heartLampsOutputDir, 'heart-lamps-complete.json');
            fs.writeFileSync(outputFile, JSON.stringify(heartLamps, null, 2), 'utf-8');

            // 保存按课程分组的心灯密语
            for (const course of heartLamps.courses) {
                const courseFile = path.join(this.heartLampsOutputDir, `heart-lamp-${course.id.toString().padStart(3, '0')}.json`);
                fs.writeFileSync(courseFile, JSON.stringify(course, null, 2), 'utf-8');
            }

            // 保存心灯密语索引
            const heartLampsIndex = {
                total: heartLamps.courses.length,
                courses: heartLamps.courses.map(course => ({
                    id: course.id,
                    title: course.title,
                    heartLamp: course.heartLamp
                })),
                metadata: {
                    generatedAt: new Date().toISOString(),
                    version: '1.0.0'
                }
            };

            fs.writeFileSync(
                path.join(this.outputDir, 'heart-lamps-index.json'),
                JSON.stringify(heartLampsIndex, null, 2),
                'utf-8'
            );

            console.log(`🕯️  心灯密语转换完成: ${heartLamps.courses.length} 个课程`);
        } catch (error) {
            console.error(`❌ 心灯密语转换失败:`, error.message);
        }
    }

    /**
     * 生成索引文件
     */
    async generateIndexFiles() {
        console.log('📋 生成索引文件...');

        // 生成主索引文件
        const mainIndex = {
            project: {
                name: '少儿思维训练',
                description: '神奇喵喵思维训练实验室',
                version: '1.0.0'
            },
            data: {
                courses: {
                    total: 140,
                    indexFile: 'courses-index.json',
                    dataDir: 'courses/'
                },
                quizzes: {
                    total: 6,
                    indexFile: 'quizzes-index.json',
                    dataDir: 'quizzes/'
                },
                heartLamps: {
                    total: 140,
                    indexFile: 'heart-lamps-index.json',
                    dataDir: 'heart-lamps/'
                }
            },
            metadata: {
                generatedAt: new Date().toISOString(),
                converter: 'DocumentConverter v1.0.0'
            }
        };

        fs.writeFileSync(
            path.join(this.outputDir, 'index.json'),
            JSON.stringify(mainIndex, null, 2),
            'utf-8'
        );

        // New Logic: Consolidate all individual course JSONs into one big file
        const allCourses = [];
        const courseFiles = fs.readdirSync(this.coursesOutputDir).filter(file => file.endsWith('.json'));

        for (const file of courseFiles) {
            const filePath = path.join(this.coursesOutputDir, file);
            const content = fs.readFileSync(filePath, 'utf-8');
            allCourses.push(JSON.parse(content));
        }

        // Sort courses by ID to ensure consistent order
        allCourses.sort((a, b) => a.id - b.id);

        const allCoursesPath = path.join(this.outputDir, 'courses-all.json');
        fs.writeFileSync(allCoursesPath, JSON.stringify(allCourses, null, 2), 'utf-8');
        console.log(`✅ 合并所有课程数据到 ${allCoursesPath}`);

        console.log('📋 索引文件生成完成');
    }

    /**
     * 工具方法
     */
    getModuleName(moduleDir) {
        const moduleNames = {
            '02-入门模块': '入门模块',
            '03-基础模块': '基础模块',
            '04-进阶模块': '进阶模块',
            '05-一叶知秋模块': '一叶知秋模块',
            '06-识人辨言模块': '识人辨言模块'
        };
        return moduleNames[moduleDir] || moduleDir;
    }

    groupCoursesByModule(courses) {
        const modules = {};
        courses.forEach(course => {
            if (!modules[course.moduleName]) {
                modules[course.moduleName] = [];
            }
            modules[course.moduleName].push({
                id: course.id,
                title: course.title,
                filename: course.filename
            });
        });
        return modules;
    }

    /**
     * 转换"08-深度补充包"中的补充文档
     * 输出到 json-data/courses，与普通课程 JSON 一致
     * ID 从 141 开始按文件顺序递增，避免与 1-140 冲突
     */
    async convertDeepExtensions() {
        console.log('📘 转换深度补充包...');

        const deepExtDir = '08-深度补充包';
        if (!fs.existsSync(deepExtDir)) {
            console.log(`⚠️  深度补充包目录不存在: ${deepExtDir}`);
            return;
        }

        // 获取当前 courses 目录已有的最大 ID
        const existingIds = fs.readdirSync(this.coursesOutputDir)
            .filter(f => f.startsWith('course-') && f.endsWith('.json'))
            .map(f => parseInt(f.match(/course-(\d{3})\.json/)[1]))
            .filter(num => !isNaN(num));

        let nextId = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 141;

        const files = fs.readdirSync(deepExtDir).filter(file => file.endsWith('.md'));
        console.log(`📄 检测到 ${files.length} 个补充包文件`);

        for (const file of files) {
            try {
                const filePath = path.join(deepExtDir, file);
                const content = fs.readFileSync(filePath, 'utf-8');

                // 复用课程解析逻辑
                const course = this.parseCourseMarkdown(content, file);

                // 覆盖/补充字段
                course.id = nextId;
                course.isExtension = true;
                course.moduleDir = deepExtDir;

                // 根据文件名前缀推断所属模块，如"批判性思维-深度案例补充.md"
                const prefix = file.split('-')[0];
                course.moduleName = prefix || '深度补充包';

                const outputFile = path.join(this.coursesOutputDir, `course-${String(nextId).padStart(3, '0')}.json`);
                fs.writeFileSync(outputFile, JSON.stringify(course, null, 2), 'utf-8');

                console.log(`✅ 转换完成: ${file} -> course-${String(nextId).padStart(3, '0')}.json`);

                nextId++;
            } catch (error) {
                console.error(`❌ 转换失败: ${file}`, error.message);
            }
        }

        console.log('📘 深度补充包转换完成');
    }

    /**
     * 批量转换所有文档
     */
    async convertAll() {
        console.log('🚀 开始批量转换文档...');

        try {
            // 转换课程文档
            await this.convertCourses();

            // 转换深度补充包文档
            await this.convertDeepExtensions();

            // 转换题库文档
            await this.convertQuizzes();

            // 转换心灯密语
            await this.convertHeartLamps();

            // 生成索引文件
            await this.generateIndexFiles();

            console.log('✅ 所有文档转换完成！');
            console.log(`📁 输出目录: ${this.outputDir}`);
            console.log('📊 转换统计:');
            console.log('   - 课程文档: 140个');
            console.log('   - 题库文档: 6个');
            console.log('   - 心灯密语: 140个');

        } catch (error) {
            console.error('❌ 转换过程中出现错误:', error);
        }
    }
}

// 执行转换
if (require.main === module) {
    const converter = new DocumentConverter();
    converter.convertAll();
}

module.exports = DocumentConverter;
