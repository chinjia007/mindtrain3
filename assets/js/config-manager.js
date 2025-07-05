/**
 * 配置管理器 - 负责加载和管理AI模型配置
 * 从喵喵助手0630/config.json读取配置信息
 */

console.log('ConfigManager 脚本已加载');

class ConfigManager {
  constructor() {
    this.config = null;
    this.currentModel = null;
    this.isLoaded = false;
  }

  /**
   * 加载配置文件
   */
  async loadConfig() {
    try {
      console.log('开始加载配置文件...');
      const response = await fetch('config.json');
      if (!response.ok) {
        throw new Error(`配置文件加载失败: ${response.status}`);
      }
      
      this.config = await response.json();
      this.isLoaded = true;
      
      // 设置默认模型
      this.currentModel = this.config.defaultModel || Object.keys(this.config.models)[0];
      
      // 从localStorage恢复用户上次选择的模型
      const savedModel = localStorage.getItem('selectedModel');
      if (savedModel && this.config.models[savedModel]) {
        this.currentModel = savedModel;
      }
      
      console.log('配置加载成功:', this.config);
      return this.config;
    } catch (error) {
      console.error('配置加载失败:', error);
      throw error;
    }
  }

  /**
   * 获取所有可用模型
   */
  getAvailableModels() {
    if (!this.isLoaded) {
      throw new Error('配置尚未加载，请先调用 loadConfig()');
    }
    
    return Object.entries(this.config.models).map(([key, model]) => ({
      id: key,
      name: model.name,
      description: model.description,
      provider: model.provider
    }));
  }

  /**
   * 获取当前选中的模型配置
   */
  getCurrentModel() {
    if (!this.isLoaded) {
      throw new Error('配置尚未加载，请先调用 loadConfig()');
    }
    
    return {
      id: this.currentModel,
      ...this.config.models[this.currentModel]
    };
  }

  /**
   * 切换模型
   */
  setCurrentModel(modelId) {
    if (!this.isLoaded) {
      throw new Error('配置尚未加载，请先调用 loadConfig()');
    }
    
    if (!this.config.models[modelId]) {
      throw new Error(`模型 ${modelId} 不存在`);
    }
    
    this.currentModel = modelId;
    
    // 保存用户选择到localStorage
    localStorage.setItem('selectedModel', modelId);
    
    console.log('模型已切换到:', this.getCurrentModel().name);
    
    // 触发模型切换事件
    window.dispatchEvent(new CustomEvent('modelChanged', {
      detail: { modelId, model: this.getCurrentModel() }
    }));
  }

  /**
   * 获取系统提示词
   */
  getSystemPrompt() {
    if (!this.isLoaded) {
      throw new Error('配置尚未加载，请先调用 loadConfig()');
    }
    
    return this.config.systemPrompt;
  }

  /**
   * 获取全局设置
   */
  getGlobalSettings() {
    if (!this.isLoaded) {
      throw new Error('配置尚未加载，请先调用 loadConfig()');
    }
    
    return { ...this.config.globalSettings };
  }

  /**
   * 获取特定模型的完整API配置
   */
  getModelApiConfig(modelId = null) {
    const targetModel = modelId || this.currentModel;
    
    if (!this.isLoaded) {
      throw new Error('配置尚未加载，请先调用 loadConfig()');
    }
    
    if (!this.config.models[targetModel]) {
      throw new Error(`模型 ${targetModel} 不存在`);
    }
    
    const model = this.config.models[targetModel];
    const globalSettings = this.getGlobalSettings();
    
    return {
      apiKey: model.apiKey,
      apiUrl: model.apiUrl,
      modelId: model.modelId,
      provider: model.provider,
      settings: globalSettings,
      systemPrompt: this.getSystemPrompt()
    };
  }

  /**
   * 检查配置是否已加载
   */
  isConfigLoaded() {
    return this.isLoaded;
  }

  /**
   * 获取模型状态信息（用于UI显示）
   */
  getModelStatus(modelId = null) {
    const targetModel = modelId || this.currentModel;
    const model = this.config.models[targetModel];
    
    // 根据模型类型返回状态信息
    let status = {
      speed: 'medium',
      quality: 'medium',
      cost: 'medium'
    };
    
    // 根据模型名称判断特性
    if (model.name.includes('轻量') || model.name.includes('lite')) {
      status = { speed: 'fast', quality: 'good', cost: 'low' };
    } else if (model.name.includes('pro') || model.name.includes('DeepSeek')) {
      status = { speed: 'medium', quality: 'excellent', cost: 'medium' };
    }
    
    return {
      id: targetModel,
      name: model.name,
      description: model.description,
      ...status
    };
  }
}

// 创建全局配置管理器实例
window.configManager = new ConfigManager();

// 导出供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ConfigManager;
}
