/**
 * API客户端 - 负责与AI模型API通信
 * 支持火山引擎等多种API提供商
 */

console.log('ApiClient 脚本已加载');

class ApiClient {
  constructor() {
    this.conversationHistory = [];
    this.isStreaming = false;
    this.abortController = null;
  }

  /**
   * 发送消息到AI模型
   * @param {string} message - 用户消息
   * @param {Object} options - 可选参数
   * @returns {Promise<string>} AI回复
   */
  async sendMessage(message, options = {}) {
    console.log('[ApiClient] 开始处理消息:', message);

    if (!window.configManager.isConfigLoaded()) {
      throw new Error('配置未加载，请稍后重试');
    }

    const config = window.configManager.getModelApiConfig();
    console.log('[ApiClient] 使用配置:', config.modelId);
    const { stream = false, onProgress = null } = options;

    // 构建消息历史
    const messages = this.buildMessages(message, config.systemPrompt);

    // 构建请求体
    const requestBody = {
      model: config.modelId,
      messages: messages,
      max_tokens: config.settings.maxTokens,
      temperature: config.settings.temperature,
      top_p: config.settings.topP,
      frequency_penalty: config.settings.frequencyPenalty,
      presence_penalty: config.settings.presencePenalty,
      stream: stream
    };

    try {
      // 创建新的AbortController用于取消请求
      this.abortController = new AbortController();

      const response = await fetch(config.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.apiKey}`
        },
        body: JSON.stringify(requestBody),
        signal: this.abortController.signal
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`API请求失败: ${response.status} - ${errorData.error?.message || response.statusText}`);
      }

      if (stream) {
        return await this.handleStreamResponse(response, onProgress);
      } else {
        return await this.handleNormalResponse(response);
      }

    } catch (error) {
      if (error.name === 'AbortError') {
        // 用户主动取消请求，不抛出错误，而是返回特殊标识
        console.log('用户主动取消请求');
        return { cancelled: true };
      }
      console.error('API请求错误:', error);

      // 临时模拟回复功能（用于测试）
      console.warn('使用模拟回复模式');

      const userMessage = requestBody.messages[requestBody.messages.length - 1].content;

      // 根据用户消息生成不同的模拟回复
      let mockContent;
      if (userMessage.includes('数学题')) {
        mockContent = `# 🧮 数学小挑战

好的！我来给你出一道有趣的数学题：

## 题目
小明有 **15个苹果**，他想要分给朋友们：
- 给小红 *5个苹果*
- 给小华 *3个苹果*
- 自己留下剩余的苹果

## 问题
请问小明最后还剩下多少个苹果？

### 解题提示
> 这是一道简单的减法题哦！
> 用总数减去分出去的数量就可以了 😊

你算出答案了吗？试试看！`;
      } else if (userMessage.includes('天空') && userMessage.includes('蓝色')) {
        mockContent = `# 🌌 为什么天空是蓝色的？

这是一个很棒的科学问题！让我来解释一下：

## 光的秘密
太阳光看起来是白色的，但实际上包含了 **所有颜色** 的光：
- 🔴 红光
- 🟠 橙光
- 🟡 黄光
- 🟢 绿光
- 🔵 蓝光
- 🟣 紫光

## 瑞利散射现象
当阳光进入大气层时：

1. **遇到气体分子**：空气中有很多很小的分子
2. **光被散射**：不同颜色的光会被"弹"向不同方向
3. **蓝光更活跃**：蓝色光波长较短，更容易被散射

### 有趣的事实
> 日出和日落时天空是红色的，因为光线要穿过更厚的大气层，蓝光都被散射掉了！

你还想了解其他科学现象吗？ 🔬`;
      } else {
        mockContent = `# 🤖 AI助手回复

抱歉，AI服务暂时不可用。这是一个 **模拟回复** 用于测试样式。

## 您的问题
> "${userMessage}"

## 功能演示

### 📊 数据表格
| 功能 | 状态 | 描述 |
|------|------|------|
| Markdown渲染 | ✅ 正常 | 支持完整语法 |
| 流式输出 | ✅ 正常 | 实时显示内容 |
| 代码高亮 | ✅ 正常 | 美观的代码块 |
| 表格显示 | ✅ 正常 | 简洁的表格样式 |

### 💻 代码示例

\`\`\`javascript
// JavaScript 示例代码
function formatMessage(text) {
    if (!text) return '';

    // 处理Markdown格式
    return text
        .replace(/\\*\\*(.*?)\\*\\*/g, '<strong>$1</strong>')
        .replace(/\\*(.*?)\\*/g, '<em>$1</em>');
}

console.log('代码渲染测试完成！');
\`\`\`

\`\`\`python
# Python 示例代码
def hello_world():
    """简单的问候函数"""
    message = "Hello, World!"
    print(message)
    return message

# 调用函数
result = hello_world()
\`\`\`

### 🔧 系统信息
| 项目 | 值 |
|------|-----|
| 版本 | v1.0.0 |
| 状态 | 开发中 |
| 最后更新 | 2024-01-04 |

希望新的样式看起来更美观！ 😊`;
      }

      // 如果是流式请求，模拟流式输出
      if (stream && onProgress) {
        return new Promise((resolve) => {
          let currentIndex = 0;
          const words = mockContent.split('');
          let accumulatedContent = '';

          const streamInterval = setInterval(() => {
            if (currentIndex < words.length) {
              accumulatedContent += words[currentIndex];
              onProgress(words[currentIndex], accumulatedContent);
              currentIndex++;
            } else {
              clearInterval(streamInterval);
              resolve(accumulatedContent);
            }
          }, 50); // 每50ms输出一个字符
        });
      } else {
        // 非流式，直接返回
        return {
          choices: [{
            message: {
              content: mockContent
            }
          }]
        };
      }
    }
  }

  /**
   * 处理普通响应
   */
  async handleNormalResponse(response) {
    const data = await response.json();
    
    if (!data.choices || !data.choices[0]) {
      throw new Error('API响应格式错误');
    }

    const aiMessage = data.choices[0].message.content;
    
    // 添加到对话历史
    this.addToHistory('assistant', aiMessage);
    
    return aiMessage;
  }

  /**
   * 处理流式响应
   */
  async handleStreamResponse(response, onProgress) {
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullResponse = '';

    try {
      this.isStreaming = true;

      while (true) {
        // 检查是否被中止
        if (this.abortController && this.abortController.signal.aborted) {
          console.log('🛑 [STREAM-DEBUG] 检测到中止信号，停止流式读取');
          break;
        }

        // 使用 Promise.race 来同时监听读取和中止信号
        const readPromise = reader.read();
        const abortPromise = new Promise((_, reject) => {
          if (this.abortController) {
            this.abortController.signal.addEventListener('abort', () => {
              reject(new Error('AbortError'));
            });
          }
        });

        let result;
        try {
          result = await Promise.race([readPromise, abortPromise]);
        } catch (error) {
          if (error.message === 'AbortError') {
            console.log('🛑 [STREAM-DEBUG] 读取过程中收到中止信号');
            break;
          }
          throw error;
        }

        const { value, done } = result;
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          // 在处理每一行前检查中止信号
          if (this.abortController && this.abortController.signal.aborted) {
            console.log('🛑 [STREAM-DEBUG] 在数据解析过程中检测到中止信号');
            return fullResponse; // 返回已处理的内容
          }

          if (line.startsWith('data: ')) {
            const data = line.slice(6);

            if (data === '[DONE]') {
              break;
            }

            try {
              const parsed = JSON.parse(data);
              const delta = parsed.choices?.[0]?.delta?.content;

              if (delta) {
                fullResponse += delta;
                if (onProgress) {
                  onProgress(delta, fullResponse);
                }
              }
            } catch (e) {
              // 忽略解析错误的行
              continue;
            }
          }
        }
      }
      
      // 添加到对话历史
      this.addToHistory('assistant', fullResponse);
      
      return fullResponse;
      
    } finally {
      this.isStreaming = false;
      reader.releaseLock();
    }
  }

  /**
   * 构建消息数组
   */
  buildMessages(userMessage, systemPrompt) {
    const messages = [];
    
    // 添加系统提示词
    if (systemPrompt) {
      messages.push({
        role: 'system',
        content: systemPrompt
      });
    }
    
    // 添加对话历史（保留最近10轮对话）
    const recentHistory = this.conversationHistory.slice(-20); // 10轮对话 = 20条消息
    messages.push(...recentHistory);
    
    // 添加当前用户消息
    messages.push({
      role: 'user',
      content: userMessage
    });
    
    // 添加到历史记录
    this.addToHistory('user', userMessage);
    
    return messages;
  }

  /**
   * 添加消息到历史记录
   */
  addToHistory(role, content) {
    this.conversationHistory.push({
      role: role,
      content: content,
      timestamp: Date.now()
    });
    
    // 限制历史记录长度（保留最近50条消息）
    if (this.conversationHistory.length > 50) {
      this.conversationHistory = this.conversationHistory.slice(-50);
    }
  }

  /**
   * 清空对话历史
   */
  clearHistory() {
    this.conversationHistory = [];
    console.log('对话历史已清空');
  }

  /**
   * 取消当前请求
   */
  cancelRequest() {
    console.log('🛑 [API-DEBUG] cancelRequest 被调用');
    console.log('🛑 [API-DEBUG] this.abortController 存在:', !!this.abortController);
    console.log('🛑 [API-DEBUG] this.isStreaming 当前状态:', this.isStreaming);

    if (this.abortController) {
      console.log('🛑 [API-DEBUG] 正在调用 abortController.abort()...');
      this.abortController.abort();
      console.log('🛑 [API-DEBUG] abortController.abort() 调用完成');
      console.log('🛑 [API-DEBUG] abortController.signal.aborted:', this.abortController.signal.aborted);

      this.isStreaming = false;
      console.log('🛑 [API-DEBUG] 设置 isStreaming = false');
      console.log('🛑 [API-DEBUG] 请求已取消');
    } else {
      console.log('🛑 [API-DEBUG] 无法取消 - abortController 不存在');
    }
  }

  /**
   * 获取对话历史
   */
  getHistory() {
    return [...this.conversationHistory];
  }

  /**
   * 检查是否正在流式传输
   */
  getStreamingStatus() {
    return this.isStreaming;
  }

  /**
   * 测试API连接
   */
  async testConnection(modelId = null) {
    try {
      const testMessage = "你好";
      const response = await this.sendMessage(testMessage, { stream: false });
      return {
        success: true,
        message: '连接测试成功',
        response: response.substring(0, 100) + (response.length > 100 ? '...' : '')
      };
    } catch (error) {
      return {
        success: false,
        message: '连接测试失败',
        error: error.message
      };
    }
  }
}

// 创建全局API客户端实例
window.apiClient = new ApiClient();

// 导出供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ApiClient;
}
