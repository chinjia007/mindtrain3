# 🧠 学习进度管理系统

## 📋 系统概述

神奇喵喵思维训练实验室的学习进度管理系统，用于跟踪学生的学习进度和完成情况。

## 🎯 进度计算规则

### 单节课程进度计算
- **0%**: 学生未访问过该课程
- **50%**: 学生点击进入课程页面（自动记录）
- **100%**: 学生点击"完成学习"按钮（手动确认）

### 模块总进度计算
模块进度 = 所有课程进度的平均值

**公式**: `模块进度 = (课程1进度 + 课程2进度 + ... + 课程N进度) / 课程总数`

**示例**:
- 模块有10节课
- 5节课已完成(100%)，3节课已访问(50%)，2节课未开始(0%)
- 模块进度 = (5×100% + 3×50% + 2×0%) / 10 = 65%

## 📊 进度状态显示

### 首页模块卡片显示
- **未开始**: 0% 进度
- **进行中 X/Y**: X为已完成课程数，Y为总课程数
- **已完成**: 100% 进度

### 进度条颜色
- 蓝色进度条显示当前完成百分比
- 实时更新，反映最新学习状态

## 🏗️ 技术架构

### 核心文件
- `assets/js/progress-manager.js`: 进度管理核心逻辑
- `course-detail.html`: 课程详情页面，包含"完成学习"按钮
- `index.html`: 首页，显示模块进度概览

### 数据存储
- 使用 `localStorage` 本地存储进度数据
- 存储键: `thinking_lab_progress`
- 数据结构: JSON格式，按模块和课程编号组织

### 模块配置
```javascript
moduleConfig = {
    'critical': { totalCourses: 30, name: '批判性思维' },
    'logical': { totalCourses: 32, name: '逻辑思维' },
    'system': { totalCourses: 30, name: '系统思维' },
    'design': { totalCourses: 30, name: '设计思维' },
    'trap': { totalCourses: 8, name: '一叶知秋' },
    'personality': { totalCourses: 7, name: '识人辨言' }
}
```

## 🔧 API 接口

### 主要方法

#### 记录课程访问
```javascript
progressManager.markCourseVisited(moduleId, courseNumber)
```

#### 记录课程完成
```javascript
progressManager.markCourseCompleted(moduleId, courseNumber)
```

#### 获取课程进度
```javascript
progressManager.getCourseProgress(moduleId, courseNumber)
// 返回: 0, 50, 或 100
```

#### 获取模块进度
```javascript
progressManager.getModuleProgress(moduleId)
// 返回: { percentage, completed, visited, total, status }
```

#### 更新UI显示
```javascript
progressManager.updateModuleProgress(moduleId)
progressManager.updateAllModuleProgress()
```

## 🧪 测试

### 测试页面
访问 `progress-test.html` 进行功能测试

### 测试功能
- 模拟课程访问和完成
- 批量操作测试
- 进度重置
- 详细数据查看

### 调试命令
```javascript
// 重置所有进度
progressManager.resetAllProgress()

// 重置特定模块
progressManager.resetModuleProgress('critical')

// 查看所有进度
progressManager.getAllModulesProgress()
```

## 📱 用户体验

### 自动记录
- 学生进入课程页面时自动记录访问（50%）
- 无需额外操作，提升用户体验

### 手动确认
- 学生需主动点击"完成学习"按钮确认完成（100%）
- 防止误操作，确保学习质量

### 实时反馈
- 进度条实时更新
- 完成时显示庆祝动画
- 状态文字清晰明确

## 🔄 数据同步

### 本地存储
- 数据保存在浏览器本地
- 跨页面共享进度状态
- 刷新页面后数据保持

### 未来扩展
- 可扩展为云端同步
- 支持多设备数据同步
- 学习分析和报告功能

## 🎨 UI 设计

### 完成学习按钮
- 绿色渐变背景，突出重要性
- 悬停效果增强交互感
- 完成后变为灰色，防止重复点击

### 进度条设计
- 苹果风格的圆角进度条
- 平滑的动画过渡
- 清晰的百分比显示

### 状态提示
- 完成时显示庆祝消息
- 3秒自动消失
- 不干扰用户继续学习
