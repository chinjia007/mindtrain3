const fs = require('fs');
const path = require('path');

// This is a new, much more robust markdown parser.
function parseMarkdown(text) {
    if (!text || typeof text !== 'string') return '';
    let html = text.trim();
    
    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Bullets points, handling multi-line lists correctly
    const lines = html.split('\n');
    let inList = false;
    html = lines.map(line => {
        const listMatch = line.match(/^(\*|-|🥇|🔄|🎯|✅|❌)\s(.*)/);
        if (listMatch) {
            const processedLine = `<li>${listMatch[2].trim()}</li>`;
            if (!inList) {
                inList = true;
                return `<ul>${processedLine}`;
            }
            return processedLine;
        } else {
            if (inList) {
                inList = false;
                return `</ul>${line}`;
            }
            return line;
        }
    }).join('\n'); // Keep newlines for now

    if (inList) {
        html += '</ul>';
    }

    // Convert any remaining newlines to <br>
    return html.replace(/\n/g, '<br>');
}

function extractSection(content, sectionName) {
    // Definitive fix: Try both with and without colon, and take whichever is found.
    const tagWithColon = `【${sectionName}：】`;
    const tagWithoutColon = `【${sectionName}】`;

    let startIndex = content.indexOf(tagWithColon);
    let startTag = tagWithColon;

    if (startIndex === -1) {
        startIndex = content.indexOf(tagWithoutColon);
        startTag = tagWithoutColon;
    }

    if (startIndex === -1) {
        return '';
    }

    const contentStart = startIndex + startTag.length;

    // Find the start of the *next* section
    const nextSectionIndex = content.indexOf('【', contentStart);

    if (nextSectionIndex !== -1) {
        return content.substring(contentStart, nextSectionIndex).trim();
    }

    // If no next section, it's the last section in the block.
    return content.substring(contentStart).trim();
}

function parseQuizFile(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const questionBlocks = fileContent.split('---').map(s => s.trim()).filter(block => block.startsWith('### 第'));

    let questions = [];

    for (const block of questionBlocks) {
        const header = block.split('\n')[0];
        const idMatch = header.match(/第(\d+)题/);
        const typeMatch = header.match(/⭐ (.*?)$/);
        const difficulty = (header.match(/⭐/g) || []).length;
        
        const scenario = extractSection(block, '场景');
        const analysis = extractSection(block, '详细解析');
        const learningPoints = extractSection(block, '学习要点');
        const applicationReference = extractSection(block, '应对参考');
        const correctAnswersRaw = extractSection(block, '正确答案');
        
        // Isolate the question area text
        const questionArea = extractSection(block, '问题');

        const linesInQuestionArea = questionArea.split('\n').map(l => l.trim()).filter(Boolean);
        let options = [];
        let questionLines = [];

        for (const line of linesInQuestionArea) {
            if (line.match(/^[A-H]\.\s/)) {
                options.push({
                    key: line.substring(0, 1),
                    text: line.substring(3).trim()
                });
            } else {
                questionLines.push(line);
            }
        }
        
        const questionText = questionLines.join(' ').replace(/（不定项选择）/g, '').trim();

        const question = {
            id: idMatch ? parseInt(idMatch[1], 10) : questions.length + 1,
            type: typeMatch ? typeMatch[1].trim() : '未分类',
            difficulty: difficulty || 1,
            scenario: scenario,
            question: questionText,
            options: options,
            correctAnswers: correctAnswersRaw.split('、').map(a => a.trim()),
            analysis: analysis,
            learningPoints: learningPoints,
            applicationReference: applicationReference
        };
        questions.push(question);
    }
    
    // Final parse of markdown fields for the sections that need it
    questions.forEach(q => {
        q.analysis = parseMarkdown(q.analysis);
        q.learningPoints = parseMarkdown(q.learningPoints);
        q.applicationReference = parseMarkdown(q.applicationReference);
    });

    return questions;
}

function generateQuizzes() {
    const sourceDir = path.join(__dirname, '../09-训练题库');
    const targetDir = path.join(__dirname, '../json-data/quizzes');
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }
    const sourceFiles = fs.readdirSync(sourceDir).filter(file => file.endsWith('.md'));

    sourceFiles.forEach((fileName, index) => {
        console.log(`🚀 Parsing ${fileName}...`);
        const sourcePath = path.join(sourceDir, fileName);
        const questions = parseQuizFile(sourcePath);
        
        const outputObject = {
            id: index + 1,
            filename: fileName,
            title: fileName.replace('：', ' - ').replace('.md', ''),
            description: "",
            totalQuestions: questions.length,
            questions: questions
        };

        const targetFileName = `quiz-${index + 1}.json`;
        const targetPath = path.join(targetDir, targetFileName);
        fs.writeFileSync(targetPath, JSON.stringify(outputObject, null, 2), 'utf-8');
        console.log(`✅ Successfully generated ${targetFileName} with ${questions.length} questions.`);
    });
    console.log('\n🎉 All quizzes generated successfully!');
}

generateQuizzes();