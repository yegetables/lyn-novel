// 检查 localStorage 中的设置
const fs = require('fs');
const path = require('path');

// 模拟 localStorage
const localStorage = {
  data: {},
  getItem(key) {
    return this.data[key];
  },
  setItem(key, value) {
    this.data[key] = value;
  }
};

// 检查是否存在设置文件
const settingsPath = path.join(__dirname, 'settings.json');
if (fs.existsSync(settingsPath)) {
  const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
  localStorage.setItem('lyn_novel_settings', JSON.stringify(settings));
  console.log('从 settings.json 加载设置:', settings);
} else {
  console.log('未找到 settings.json 文件，使用默认设置');
}

// 测试设置加载
let modelSettings = {
  provider: 'ollama',
  ollama: {
    apiUrl: 'http://localhost:11434/api/generate',
    model: 'gemma3:1b'
  },
  llama: {
    apiUrl: 'http://localhost:8000/api/generate',
    modelPath: ''
  },
  promptKeywords: ''
};

try {
  const saved = localStorage.getItem('lyn_novel_settings');
  if (saved) {
    modelSettings = JSON.parse(saved);
  }
} catch (e) {
  console.error('Failed to load settings:', e);
}

console.log('最终设置:', modelSettings);

// 模拟 API 地址选择
let apiUrl = modelSettings.ollama.apiUrl;

if (modelSettings.provider === 'llama') {
  apiUrl = modelSettings.llama.apiUrl;
}

console.log('选择的 API 地址:', apiUrl);