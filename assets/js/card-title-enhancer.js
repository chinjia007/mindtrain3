// card-title-enhancer.js
// 自动将课程标题中括号内容拆分为副标题，并插入 .course-subtitle 元素
// 适用于所有模块导航页

(function(){
    function enhanceTitles(){
        document.querySelectorAll('.course-title').forEach(el=>{
            // 如果已存在副标题，直接跳过
            if(el.nextElementSibling && el.nextElementSibling.classList.contains('course-subtitle')){
                return; // 已处理
            }

            const text = el.textContent.trim();
            // 匹配中文全角或英文半角括号中的内容
            const match = text.match(/[（(]([^）)]+)[）)]/);
            if(match){
                const main = text.replace(/[（(][^）)]+[）)]/,'').trim();
                const sub = match[1].trim();
                el.textContent = main;
                const subEl = document.createElement('p');
                subEl.className = 'course-subtitle';
                subEl.textContent = sub;
                el.after(subEl);
            } else {
                // 尝试以全角/半角冒号拆分
                const colonSplit = text.split(/[:：]/);
                if(colonSplit.length>1){
                    const main = colonSplit[0].trim();
                    const sub = colonSplit.slice(1).join('：').trim();
                    if(main && sub){
                        el.textContent = main;
                        const subEl = document.createElement('p');
                        subEl.className = 'course-subtitle';
                        subEl.textContent = sub;
                        el.after(subEl);
                        return;
                    }
                }

                // 最后 fallback: 使用相邻 difficulty-label 的文本作为副标题
                const card = el.closest('.course-card');
                if(card){
                    const diffLabel = card.querySelector('.difficulty-label');
                    if(diffLabel){
                        const subEl = document.createElement('p');
                        subEl.className = 'course-subtitle';
                        subEl.textContent = diffLabel.textContent.trim();
                        el.after(subEl);
                    }
                }
            }
        });
    }

    if(document.readyState==='loading'){
        document.addEventListener('DOMContentLoaded', enhanceTitles);
    } else {
        enhanceTitles();
    }

    // 监听课程网格的子元素变化（动态渲染支持）
    const containers = document.querySelectorAll('.learning-path');
    containers.forEach(container=>{
        let debounce;
        const observer = new MutationObserver(()=>{
            clearTimeout(debounce);
            debounce = setTimeout(enhanceTitles,50);
        });
        observer.observe(container,{childList:true,subtree:true});
    });
})(); 