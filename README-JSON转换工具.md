# 📚 课程文档JSON转换工具

## 🎯 功能概述

这个工具可以将项目中的所有Markdown格式的课程文档和题库文档批量转换为JSON格式，实现动态加载和结构化数据处理。

## ✨ 主要特性

### 🔄 **批量转换功能**
- **课程文档转换**：将140个课程的Markdown文件转换为结构化JSON
- **题库文档转换**：将6个题库的Markdown文件转换为结构化JSON  
- **心灯密语转换**：将心灯密语库转换为可动态加载的JSON格式

### 📊 **智能解析能力**
- **课程结构解析**：自动识别课程标题、模块、章节、子章节
- **题目内容解析**：自动提取题目、选项、答案、解析等信息
- **元数据提取**：自动提取课程信息（年级、时长、目标等）

### 🗂️ **文件组织结构**
```
json-data/
├── index.json                    # 主索引文件
├── courses-index.json           # 课程索引
├── quizzes-index.json          # 题库索引  
├── heart-lamps-index.json      # 心灯密语索引
├── courses/                    # 课程JSON文件
│   ├── course-001.json
│   ├── course-002.json
│   └── ...
├── quizzes/                    # 题库JSON文件
│   ├── quiz-1.json
│   ├── quiz-2.json
│   └── ...
└── heart-lamps/               # 心灯密语JSON文件
    ├── heart-lamps-complete.json
    ├── heart-lamp-001.json
    ├── heart-lamp-002.json
    └── ...
```

## 🚀 使用方法

### **方法1：直接运行**
```bash
node convert-to-json.js
```

### **方法2：作为模块使用**
```javascript
const DocumentConverter = require('./convert-to-json.js');

const converter = new DocumentConverter();
converter.convertAll();
```

### **方法3：单独转换某类文档**
```javascript
const converter = new DocumentConverter();

// 只转换课程文档
await converter.convertCourses();

// 只转换题库文档  
await converter.convertQuizzes();

// 只转换心灯密语
await converter.convertHeartLamps();
```

## 📋 输出格式说明

### **课程JSON格式**
```json
{
  "id": 1,
  "filename": "第01课-区分事实与观点-批判性思维入门.md",
  "title": "第01课：区分事实与观点",
  "module": "批判性思维入门",
  "grade": "4年级及以上",
  "duration": "20分钟",
  "objective": "学会准确区分事实与观点，为批判性思维打下基础",
  "sections": [
    {
      "id": "概念导入",
      "title": "📖 概念导入（3分钟）",
      "type": "introduction",
      "content": "...",
      "subsections": []
    }
  ],
  "moduleDir": "02-入门模块",
  "moduleName": "入门模块",
  "metadata": {
    "convertedAt": "2024-01-01T00:00:00.000Z",
    "originalFile": "第01课-区分事实与观点-批判性思维入门.md"
  }
}
```

### **题库JSON格式**
```json
{
  "id": 1,
  "filename": "题库1-批判性思维题库.md",
  "title": "题库1：批判性思维题库",
  "description": "",
  "totalQuestions": 100,
  "questions": [
    {
      "id": 1,
      "difficulty": 2,
      "type": "信息分析题",
      "scenario": "微信健康分享",
      "question": "这条信息中包含哪些问题？",
      "options": [
        {"key": "A", "text": "虚假精确"},
        {"key": "B", "text": "诉诸权威"}
      ],
      "correctAnswers": ["A", "B", "C"],
      "explanation": "...",
      "content": "..."
    }
  ],
  "metadata": {
    "convertedAt": "2024-01-01T00:00:00.000Z",
    "originalFile": "题库1-批判性思维题库.md"
  }
}
```

### **心灯密语JSON格式**
```json
{
  "id": 1,
  "title": "事实观点",
  "wisdom": "事实是冰冷的刀刃，观点是温暖的毒药...",
  "heartLamp": "冷眼看世界",
  "application": "面对任何信息，先问自己：这能被验证吗？",
  "content": "..."
}
```

## 🔧 技术特性

### **智能解析算法**
- **Markdown结构识别**：自动识别标题层级和内容结构
- **代码块保护**：正确处理代码块，避免误解析
- **元数据提取**：智能提取课程信息和题目信息
- **内容分类**：自动识别章节类型（介绍、案例、练习等）

### **错误处理机制**
- **文件缺失处理**：优雅处理不存在的文件和目录
- **解析错误恢复**：单个文件解析失败不影响整体转换
- **详细日志输出**：提供详细的转换进度和错误信息

### **性能优化**
- **批量处理**：高效处理大量文件
- **内存管理**：合理控制内存使用
- **文件IO优化**：优化文件读写操作

## 🎯 动态加载应用

转换后的JSON文件可以用于：

### **前端动态加载**
```javascript
// 加载课程索引
const coursesIndex = await fetch('./json-data/courses-index.json').then(r => r.json());

// 动态加载特定课程
const courseId = 1;
const course = await fetch(`./json-data/courses/course-${courseId.toString().padStart(3, '0')}.json`).then(r => r.json());

// 渲染课程内容
renderCourse(course);
```

### **搜索和筛选**
```javascript
// 按模块筛选课程
const criticalThinkingCourses = coursesIndex.modules['批判性思维入门'];

// 按难度筛选题目
const easyQuestions = quiz.questions.filter(q => q.difficulty === 1);
```

### **缓存优化**
```javascript
// 实现课程缓存
const courseCache = new Map();

async function loadCourse(id) {
    if (courseCache.has(id)) {
        return courseCache.get(id);
    }
    
    const course = await fetch(`./json-data/courses/course-${id.toString().padStart(3, '0')}.json`).then(r => r.json());
    courseCache.set(id, course);
    return course;
}
```

## ⚡ 性能优势

### **相比静态HTML的优势**
1. **按需加载**：只加载当前需要的课程内容
2. **缓存友好**：JSON文件可以被浏览器有效缓存
3. **搜索优化**：结构化数据便于实现高效搜索
4. **动态渲染**：可以根据用户偏好动态调整显示样式

### **相比直接读取Markdown的优势**
1. **解析性能**：预处理的JSON避免了重复的Markdown解析
2. **结构化访问**：可以直接访问特定章节或题目
3. **类型安全**：明确的数据结构便于开发和维护
4. **扩展性强**：便于添加新的元数据和功能

## 🔄 更新和维护

### **增量更新**
当Markdown文件更新时，只需重新运行转换脚本：
```bash
node convert-to-json.js
```

### **版本控制**
每次转换都会在metadata中记录转换时间，便于版本管理：
```json
{
  "metadata": {
    "convertedAt": "2024-01-01T00:00:00.000Z",
    "version": "1.0.0",
    "converter": "DocumentConverter v1.0.0"
  }
}
```

## 🎉 总结

这个JSON转换工具为您的思维训练项目提供了：
- ✅ **完整的数据结构化**：140个课程 + 6个题库 + 140个心灯密语
- ✅ **高效的动态加载**：按需加载，提升用户体验
- ✅ **便于维护的架构**：清晰的文件组织和索引结构
- ✅ **强大的扩展能力**：便于添加新功能和优化

您的想法完全正确！JSON格式确实是实现动态加载的最佳选择。🚀
