/**
 * 学习进度管理系统
 * 神奇喵喵思维训练实验室
 */

class ProgressManager {
    constructor() {
        this.storageKey = 'thinking_lab_progress';
        this.moduleConfig = {
            'critical': { totalCourses: 30, name: '批判性思维' },
            'logical': { totalCourses: 32, name: '逻辑思维' },
            'system': { totalCourses: 30, name: '系统思维' },
            'design': { totalCourses: 30, name: '设计思维' },
            'trap': { totalCourses: 8, name: '一叶知秋' },
            'personality': { totalCourses: 7, name: '识人辨言' }
        };
        this.init();
    }

    init() {
        // 初始化进度数据
        if (!this.getProgressData()) {
            this.initializeProgress();
        }
        this.updateAllModuleProgress();
    }

    // 初始化进度数据结构
    initializeProgress() {
        const progressData = {};
        
        Object.keys(this.moduleConfig).forEach(moduleId => {
            progressData[moduleId] = {};
            const totalCourses = this.moduleConfig[moduleId].totalCourses;
            
            for (let i = 1; i <= totalCourses; i++) {
                progressData[moduleId][i] = {
                    visited: false,    // 是否点击进入过课程
                    completed: false   // 是否点击了"完成学习"按钮
                };
            }
        });

        this.saveProgressData(progressData);
    }

    // 获取进度数据
    getProgressData() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('获取进度数据失败:', error);
            return null;
        }
    }

    // 保存进度数据
    saveProgressData(data) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(data));
        } catch (error) {
            console.error('保存进度数据失败:', error);
        }
    }

    // 记录学生点击进入课程（50%完成度）
    markCourseVisited(moduleId, courseNumber) {
        const progressData = this.getProgressData();
        if (!progressData || !progressData[moduleId] || !progressData[moduleId][courseNumber]) {
            console.error('无效的模块或课程编号:', moduleId, courseNumber);
            return;
        }

        progressData[moduleId][courseNumber].visited = true;
        this.saveProgressData(progressData);
        this.updateModuleProgress(moduleId);
        
        console.log(`课程 ${moduleId}-${courseNumber} 已标记为访问过`);
    }

    // 记录学生完成学习（100%完成度）
    markCourseCompleted(moduleId, courseNumber) {
        const progressData = this.getProgressData();
        if (!progressData || !progressData[moduleId] || !progressData[moduleId][courseNumber]) {
            console.error('无效的模块或课程编号:', moduleId, courseNumber);
            return;
        }

        progressData[moduleId][courseNumber].visited = true;
        progressData[moduleId][courseNumber].completed = true;
        this.saveProgressData(progressData);
        this.updateModuleProgress(moduleId);
        
        console.log(`课程 ${moduleId}-${courseNumber} 已标记为完成`);
    }

    // 计算单个课程的进度百分比
    getCourseProgress(moduleId, courseNumber) {
        const progressData = this.getProgressData();
        if (!progressData || !progressData[moduleId] || !progressData[moduleId][courseNumber]) {
            return 0;
        }

        const course = progressData[moduleId][courseNumber];
        if (course.completed) {
            return 100; // 完成学习 = 100%
        } else if (course.visited) {
            return 50;  // 仅访问 = 50%
        } else {
            return 0;   // 未访问 = 0%
        }
    }

    // 计算模块总进度
    getModuleProgress(moduleId) {
        const progressData = this.getProgressData();
        if (!progressData || !progressData[moduleId]) {
            return { percentage: 0, completed: 0, total: 0, status: '未开始' };
        }

        const moduleData = progressData[moduleId];
        const totalCourses = this.moduleConfig[moduleId].totalCourses;
        let totalProgress = 0;
        let completedCourses = 0;
        let visitedCourses = 0;

        for (let i = 1; i <= totalCourses; i++) {
            const courseProgress = this.getCourseProgress(moduleId, i);
            totalProgress += courseProgress;
            
            if (courseProgress === 100) {
                completedCourses++;
            } else if (courseProgress === 50) {
                visitedCourses++;
            }
        }

        const percentage = Math.round(totalProgress / totalCourses);
        
        let status;
        if (percentage === 0) {
            status = '未开始';
        } else if (percentage === 100) {
            status = '已完成';
        } else {
            status = `进行中 ${completedCourses}/${totalCourses}`;
        }

        return {
            percentage,
            completed: completedCourses,
            visited: visitedCourses,
            total: totalCourses,
            status
        };
    }

    // 更新首页模块卡片的进度显示
    updateModuleProgress(moduleId) {
        const progress = this.getModuleProgress(moduleId);
        const moduleCard = document.querySelector(`[data-module="${moduleId}"]`);
        
        if (moduleCard) {
            const progressFill = moduleCard.querySelector('.progress-fill');
            const progressText = moduleCard.querySelector('.progress-text');
            
            if (progressFill) {
                progressFill.style.width = `${progress.percentage}%`;
            }
            
            if (progressText) {
                progressText.textContent = progress.status;
            }
        }
    }

    // 更新所有模块的进度显示
    updateAllModuleProgress() {
        Object.keys(this.moduleConfig).forEach(moduleId => {
            this.updateModuleProgress(moduleId);
        });
    }

    // 获取所有模块的进度统计
    getAllModulesProgress() {
        const result = {};
        Object.keys(this.moduleConfig).forEach(moduleId => {
            result[moduleId] = this.getModuleProgress(moduleId);
        });
        return result;
    }

    // 重置所有进度（调试用）
    resetAllProgress() {
        localStorage.removeItem(this.storageKey);
        this.initializeProgress();
        this.updateAllModuleProgress();
        console.log('所有进度已重置');
    }

    // 重置特定模块进度
    resetModuleProgress(moduleId) {
        const progressData = this.getProgressData();
        if (progressData && progressData[moduleId]) {
            const totalCourses = this.moduleConfig[moduleId].totalCourses;
            
            for (let i = 1; i <= totalCourses; i++) {
                progressData[moduleId][i] = {
                    visited: false,
                    completed: false
                };
            }
            
            this.saveProgressData(progressData);
            this.updateModuleProgress(moduleId);
            console.log(`模块 ${moduleId} 的进度已重置`);
        }
    }
}

// 全局实例
window.progressManager = new ProgressManager();

// 导出供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProgressManager;
}
