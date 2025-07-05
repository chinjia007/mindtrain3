document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const elements = {
        moduleTitle: document.getElementById('module-title'),
        progressText: document.getElementById('progress-text'),
        progressBar: document.getElementById('progress-bar'),
        
        // Layout Containers
        mainGrid: document.querySelector('.quiz-main-grid'),
        scenarioContainer: document.getElementById('scenario-container'),
        questionArea: document.getElementById('question-area'),
        optionsArea: document.getElementById('options-area'),
        feedbackContainer: document.getElementById('feedback-container'), // Main container for all feedback

        actionBtn: document.getElementById('action-btn'),
        actionFooter: document.querySelector('.action-footer'),
    };

    // --- State Management ---
    let state = {
        currentQuestionIndex: 0,
        score: 0,
        totalQuestions: 0,
        allQuestions: [],
        isSubmitted: false,
        selectedOptionKeys: [],
    };

    // --- Data Fetching & Initialization ---
    async function initializeQuiz() {
        const urlParams = new URLSearchParams(window.location.search);
        const quizId = urlParams.get('quizId') || '1'; // Default to 1 if not provided
        elements.moduleTitle.textContent = `思维训练场 - 模块 ${quizId}`;
        
        try {
            const response = await fetch(`./json-data/quizzes/quiz-${quizId}.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            // Use questions from the 'questions' key
            state.allQuestions = data.questions.filter(q => q.options && q.options.length > 0);
            state.totalQuestions = state.allQuestions.length;

            if (state.totalQuestions > 0) {
                renderQuestion();
            } else {
                showError("测验数据为空或格式不正确。");
            }
        } catch (error) {
            console.error("加载测验数据失败:", error);
            showError("加载测验数据失败，请检查文件或网络连接。");
        }
    }

    // --- UI Rendering ---
    function renderQuestion() {
        if (state.currentQuestionIndex >= state.totalQuestions) {
            showCompletionScreen();
            return;
        }
        resetForNewQuestion();
        const question = state.allQuestions[state.currentQuestionIndex];
        
        // Render Scenario & Question
        elements.scenarioContainer.innerHTML = createInfoCard('场景描述', question.scenario);
        elements.questionArea.innerHTML = `<h2>${question.question_text}</h2>`;
        
        // Render Options
        elements.optionsArea.innerHTML = '';
        question.options.forEach(option => {
            const optionCard = document.createElement('div');
            optionCard.className = 'option-card';
            optionCard.dataset.key = option.key;
            optionCard.innerHTML = `
                <span class="option-letter">${option.key}</span>
                <span class="option-text">${option.value}</span>
            `;
            optionCard.addEventListener('click', () => selectOption(optionCard, option.key));
            elements.optionsArea.appendChild(optionCard);
        });

        adjustOptionsGrid(question.options);
        updateProgress();
    }

    function adjustOptionsGrid(options) {
        // Reset classes
        elements.optionsArea.classList.remove('cols-2', 'cols-3', 'cols-4');

        // Find the length of the longest option text
        let maxLength = 0;
        if (options && options.length > 0) {
            maxLength = Math.max(...options.map(opt => opt.value.length));
        }

        // Apply class based on the max length
        if (maxLength <= 6) { // Very short options, e.g., "是", "否", single words
            elements.optionsArea.classList.add('cols-4');
        } else if (maxLength <= 15) { // Short to medium phrases
            elements.optionsArea.classList.add('cols-3');
        } else if (maxLength <= 30) { // Longer phrases
            elements.optionsArea.classList.add('cols-2');
        }
        // For very long options, it will default to the 1-column layout.
    }

    function renderFeedback(question) {
        const { analysis, learning_points, response_reference } = question;
        let feedbackHtml = `
            <div class="feedback-grid">
                ${createAnalysisSection(analysis)}
                ${createLearningPointsSection(learning_points)}
                ${createResponseRefSection(response_reference)}
            </div>
        `;
        elements.feedbackContainer.innerHTML = feedbackHtml;
        
        setTimeout(() => {
            elements.feedbackContainer.classList.add('visible');
        }, 100); // Short delay for transition
    }
    
    // --- Feedback Rendering Helpers ---
    function createAnalysisSection(analysis) {
        if (!analysis || analysis.length === 0) return '';
        const items = analysis.map(item => `
            <li class="analysis-item ${item.status === 'correct' ? 'correct' : 'incorrect'}">
                ${item.text}
            </li>
        `).join('');
        return `
            <div class="feedback-card" id="feedback-analysis">
                <h3>详细解析</h3>
                <ul>${items}</ul>
            </div>
        `;
    }

    function createLearningPointsSection(points) {
        if (!points || points.length === 0) return '';
        const items = points.map(point => `<li>${point}</li>`).join('');
        return `
            <div class="feedback-card" id="feedback-learning-points">
                <h3>学习要点</h3>
                <ul>${items}</ul>
            </div>
        `;
    }

    function createResponseRefSection(ref) {
        if (!ref) return '';
        const prefStrategy = ref.preferred_strategy ? `
            <h4>🥇 ${ref.preferred_strategy.title}</h4>
            <ul>${ref.preferred_strategy.points.map(p => `<li>${p}</li>`).join('')}</ul>
        ` : '';

        const altStrategy = ref.alternative_strategy ? `
            <h4>🔄 ${ref.alternative_strategy.title}</h4>
            <div class="strategy-details">
                <p><strong>即时回应:</strong></p>
                <ul>${ref.alternative_strategy.immediate.map(p => `<li>${p}</li>`).join('')}</ul>
                <p><strong>延时回应:</strong></p>
                <ul>${ref.alternative_strategy.delayed.map(p => `<li>${p}</li>`).join('')}</ul>
            </div>
        ` : '';
        
        const otherStrategies = ref.other_strategies && ref.other_strategies.length > 0 ? `
             <h4>🎯 其他策略</h4>
             <ul class="other-strategies-list">${ref.other_strategies.map(p => `<li>${p}</li>`).join('')}</ul>
        ` : '';

        return `
            <div class="feedback-card" id="feedback-response-ref">
                <h3>应对参考</h3>
                ${prefStrategy}
                ${altStrategy}
                ${otherStrategies}
            </div>
        `;
    }
    
    // --- Interaction Logic ---
    function selectOption(optionCard, key) {
        if (state.isSubmitted) return;

        const keyIndex = state.selectedOptionKeys.indexOf(key);
        if (keyIndex > -1) {
            state.selectedOptionKeys.splice(keyIndex, 1);
            optionCard.classList.remove('selected');
        } else {
            // For now, allow multiple selections as some questions are multi-choice
            state.selectedOptionKeys.push(key);
            optionCard.classList.add('selected');
        }
        elements.actionBtn.disabled = state.selectedOptionKeys.length === 0;
    }

    function submitAnswer() {
        if (state.selectedOptionKeys.length === 0) return;
        state.isSubmitted = true;
        elements.actionBtn.disabled = true;

        const question = state.allQuestions[state.currentQuestionIndex];
        const correctAnswers = question.correct_answer.sort();
        const userAnswers = state.selectedOptionKeys.sort();
        
        const isCorrect = JSON.stringify(correctAnswers) === JSON.stringify(userAnswers);
        if(isCorrect) state.score++;

        // Visual feedback for selected options
        Array.from(elements.optionsArea.children).forEach(card => {
            const key = card.dataset.key;
            card.style.pointerEvents = 'none';
            if (correctAnswers.includes(key)) {
                card.classList.add('correct');
            } else if (userAnswers.includes(key)) {
                card.classList.add('incorrect');
            }
        });

        // Show detailed, structured feedback
        renderFeedback(question);
        
        elements.actionBtn.textContent = '下一题';
        elements.actionBtn.disabled = false;
    }

    function handleNextAction() {
        if (state.isSubmitted) {
            state.currentQuestionIndex++;
            renderQuestion();
        } else {
            submitAnswer();
        }
    }

    // --- State & UI Reset ---
    function resetForNewQuestion() {
        state.isSubmitted = false;
        state.selectedOptionKeys = [];
        elements.feedbackContainer.innerHTML = '';
        elements.feedbackContainer.classList.remove('visible');
        elements.actionBtn.textContent = '提交答案';
        elements.actionBtn.disabled = true;
    }

    function updateProgress() {
        const current = state.currentQuestionIndex + 1;
        const total = state.totalQuestions;
        // Prevent showing 11/10 if last question is reached
        const displayCurrent = Math.min(current, total);
        const percentage = total > 0 ? (displayCurrent / total) * 100 : 0;
        
        elements.progressText.textContent = `${displayCurrent}/${total}`;
        elements.progressBar.style.width = `${percentage}%`;
    }

    // --- Helper & Utility Functions ---
    function createInfoCard(title, content) {
        if (!content) return ''; // Don't render card if content is empty
        return `
            <div class="info-card">
                <h3>${title}</h3>
                <div>${content}</div>
            </div>
        `;
    }

    function showCompletionScreen() {
        elements.mainGrid.innerHTML = `
            <div class="completion-container">
                <h2>训练完成!</h2>
                <p>你的最终得分: ${state.score} / ${state.totalQuestions}</p>
                <a href="index.html" class="action-btn">返回主页</a>
                <button id="restart-btn" class="action-btn secondary">重新开始</button>
            </div>
        `;
        elements.actionFooter.style.display = 'none';
        document.getElementById('restart-btn').addEventListener('click', () => window.location.reload());
    }

    function showError(message) {
        if (elements.mainGrid) {
            elements.mainGrid.innerHTML = `<div class="error-message">${message}</div>`;
        }
        elements.actionFooter.style.display = 'none';
    }

    // --- Event Listeners ---
    elements.actionBtn.addEventListener('click', handleNextAction);

    // --- Initial Load ---
    initializeQuiz();
}); 