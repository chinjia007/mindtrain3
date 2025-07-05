import json
import re
import os

def extract_field_content(text, field_name, next_field_pattern=None):
    """
    Extract content for a specific field using non-greedy matching.
    """
    pattern = f"【{field_name}】\\s*(.+?)(?=【|$)"
    if next_field_pattern:
        pattern = f"【{field_name}】\\s*(.+?)(?={next_field_pattern})"
    
    match = re.search(pattern, text, re.DOTALL)
    if match:
        content = match.group(1).strip()
        # Remove any trailing content that looks like options
        content = re.sub(r'\n[A-Z]\.\s.*$', '', content, flags=re.DOTALL)
        return content
    return None

def extract_options(text):
    """
    Extract options from the text, looking for lines that start with A., B., C., etc.
    """
    options = []
    # Find the area between 【问题】 and 【正确答案】
    question_match = re.search(r'【问题】(.+?)【正确答案】', text, re.DOTALL)
    if question_match:
        options_area = question_match.group(1)
        # Find all option lines
        option_matches = re.findall(r'^([A-Z])\.\s*(.+?)(?=\n[A-Z]\.|$)', options_area, re.MULTILINE | re.DOTALL)
        for key, text_content in option_matches:
            options.append({
                "key": key,
                "text": text_content.strip()
            })
    return options

def extract_correct_answers(text):
    """
    Extract correct answers and convert to array format.
    """
    content = extract_field_content(text, "正确答案")
    if content:
        # Split by comma and clean up
        answers = [answer.strip() for answer in content.replace('、', ',').split(',')]
        return [answer for answer in answers if answer]
    return []

def parse_question_block(block, question_id):
    """
    Parse a single question block into a JSON object.
    """
    question = {
        "id": question_id,
        "difficulty": 1,  # Default difficulty
        "type": "",
        "scenario": "",
        "question": "",
        "options": [],
        "correctAnswers": [],
        "content": ""
    }
    
    # Extract title with star-based difficulty and type
    title_match = re.search(r'^###\s*第(\d+)题\s*([⭐★]+)\s+(.+?)\s*$', block, re.MULTILINE)
    if title_match:
        star_str = title_match.group(2)
        question["difficulty"] = len(star_str)
        question["type"] = title_match.group(3).strip()
    
    # Extract scenario (optional field)
    # 先匹配【场景：xxx】这种形式
    scen_match_inline = re.search(r'【场景[：:]\s*(.+?)】', block)
    if scen_match_inline:
        scenario = scen_match_inline.group(1).strip()
    else:
        scenario = extract_field_content(block, "场景")
    if scenario:
        question["scenario"] = scenario
    
    # Extract question
    question_content = extract_field_content(block, "问题")
    if question_content:
        question["question"] = question_content
    else:
        print(f"Warning: Question {question_id} missing 【问题】 field")
        return None
    
    # Extract options
    question["options"] = extract_options(block)
    
    # Extract correct answers
    question["correctAnswers"] = extract_correct_answers(block)
    
    # Build detailed content (analysis + learning + application)
    analysis = extract_field_content(block, "详细解析") or ""
    learning = extract_field_content(block, "学习要点") or ""
    application = extract_field_content(block, "应用参考") or extract_field_content(block, "应对参考") or ""
    
    content_parts = []
    if analysis:
        content_parts.append(f"详细解析：\n{analysis}")
    if learning:
        content_parts.append(f"学习要点：\n{learning}")
    if application:
        content_parts.append(f"应用参考：\n{application}")
    
    question["content"] = "\n\n".join(content_parts)
    
    return question

def parse_markdown_to_json(md_file_path, json_file_path):
    """
    Parse the entire Markdown file and convert to JSON.
    """
    try:
        with open(md_file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except FileNotFoundError:
        print(f"Error: Markdown file not found at {md_file_path}")
        return
    
    # Extract title
    title_match = re.search(r'#\s*(.+)', content)
    title = title_match.group(1).strip() if title_match else "题库2-逻辑思维题库"
    
    # Split into question blocks
    question_blocks = re.split(r'\n---+\n', content)
    
    # Remove header block (contains title and metadata)
    question_blocks = [block.strip() for block in question_blocks if block.strip() and '###' in block]
    
    questions = []
    for i, block in enumerate(question_blocks, 1):
        parsed_question = parse_question_block(block, i)
        if parsed_question:
            questions.append(parsed_question)
        else:
            print(f"Skipped question {i} due to parsing errors")
    
    # Create the final JSON structure
    quiz_data = {
        "id": 2,
        "filename": "题库2-逻辑思维题库.md",
        "title": title,
        "description": "",
        "totalQuestions": len(questions),
        "questions": questions
    }
    
    # Write to JSON file
    os.makedirs(os.path.dirname(json_file_path), exist_ok=True)
    with open(json_file_path, 'w', encoding='utf-8') as f:
        json.dump(quiz_data, f, ensure_ascii=False, indent=2)
    
    print(f"Successfully parsed {len(questions)} questions and saved to {json_file_path}")
    print(f"Sample question 22 type: {questions[21]['type'] if len(questions) > 21 else 'N/A'}")
    print(f"Sample question 22 has scenario: {bool(questions[21]['scenario']) if len(questions) > 21 else 'N/A'}")

if __name__ == "__main__":
    # Define file paths
    md_file = os.path.join('09-训练题库', '题库2-逻辑思维题库.md')
    json_file = os.path.join('json-data', 'quizzes', 'quiz-2.json')
    
    parse_markdown_to_json(md_file, json_file) 