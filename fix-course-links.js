const fs = require('fs');

// 修复课程链接脚本
function fixCourseLinks() {
    console.log('🔧 开始修复课程链接...');
    
    // 需要修复的文件列表
    const files = [
        'module-critical.html',
        'module-trap.html'
    ];
    
    files.forEach(file => {
        try {
            console.log(`📝 正在处理: ${file}`);
            
            // 读取文件内容
            let content = fs.readFileSync(file, 'utf8');
            
            if (file === 'module-critical.html') {
                // 批判性思维模块：课程1-30
                for (let i = 1; i <= 30; i++) {
                    const oldPattern = `href="generated-courses/course-${String(i).padStart(2, '0')}.html"`;
                    const newPattern = `href="course-detail.html?id=${i}"`;
                    content = content.replace(new RegExp(oldPattern, 'g'), newPattern);
                }
            } else if (file === 'module-trap.html') {
                // 一叶知秋模块：课程125-132
                for (let i = 125; i <= 132; i++) {
                    const oldPattern = `href="generated-courses/course-${i}.html"`;
                    const newPattern = `href="course-detail.html?id=${i}"`;
                    content = content.replace(new RegExp(oldPattern, 'g'), newPattern);
                }
            }
            
            // 写回文件
            fs.writeFileSync(file, content, 'utf8');
            console.log(`✅ 修复完成: ${file}`);
            
        } catch (error) {
            console.error(`❌ 处理失败 ${file}:`, error.message);
        }
    });
    
    console.log('🎉 所有课程链接修复完成！');
}

// 执行修复
fixCourseLinks();
