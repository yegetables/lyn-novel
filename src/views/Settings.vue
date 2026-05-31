<template>
  <div class="settingsContainer">
    <header class="settingsHeader">
      <button class="backButton" @click="goBack">
        <span class="settingsIcon">←</span>
      </button>
      <h1 class="settingsTitle">设置</h1>
    </header>
    <main class="settingsContent">
      <div class="settingsSection">
        <h2 class="settingsSectionTitle">大模型设置</h2>
        <div class="settingsItem">
          <label class="settingsLabel">调用方式</label>
          <select v-model="modelSettings.provider" class="settingsSelect">
            <option value="ollama">Ollama</option>
            <option value="llama">Llama</option>
          </select>
        </div>
        
        <!-- Ollama 设置 -->
        <div v-if="modelSettings.provider === 'ollama'" class="providerSettings">
          <div class="settingsItem">
            <label class="settingsLabel">API地址</label>
            <input 
              v-model="modelSettings.ollama.apiUrl" 
              class="settingsInput" 
              type="text"
              placeholder="http://localhost:11434/api/generate"
            />
          </div>
          <div class="settingsItem">
            <label class="settingsLabel">模型名称</label>
            <input 
              v-model="modelSettings.ollama.model" 
              class="settingsInput" 
              type="text"
              placeholder="gemma3:1b"
            />
          </div>
        </div>
        
        <!-- Llama 设置 -->
        <div v-if="modelSettings.provider === 'llama'" class="providerSettings">
          <div class="settingsItem">
            <label class="settingsLabel">API地址</label>
            <input 
              v-model="modelSettings.llama.apiUrl" 
              class="settingsInput" 
              type="text"
              placeholder="http://localhost:8080/v1/chat/completions"
            />
            <div class="settingsHint">llama.cpp 的默认地址是 http://localhost:8080/v1/chat/completions</div>
          </div>
          <div class="settingsItem">
            <label class="settingsLabel">模型路径</label>
            <input 
              v-model="modelSettings.llama.modelPath" 
              class="settingsInput" 
              type="text"
              placeholder="/path/to/model"
            />
            <div class="settingsHint">请提供 Llama 模型的完整路径（llama.cpp 可能不需要此设置）</div>
          </div>
        </div>
      </div>
      
      <div class="settingsSection">
        <h2 class="settingsSectionTitle">Prompt设置</h2>
        <div class="settingsItem">
          <label class="settingsLabel">关键字设置</label>
          <textarea 
            v-model="modelSettings.promptKeywords" 
            class="settingsTextarea" 
            placeholder="输入prompt关键字，每行一个"
            rows="4"
          ></textarea>
        </div>
      </div>
      
      <div class="settingsActions">
        <button class="btn btnPrimary" @click="saveSettings">保存设置</button>
        <button class="btn btnSecondary" @click="resetSettings">恢复默认</button>
        <button class="btn btnTertiary" @click="testConnection">测试连接</button>
        <button class="btn btnAbout" @click="showAbout = true">关于</button>
      </div>
      
      <div class="dangerSection">
        <h2 class="dangerSectionTitle">危险操作</h2>
        <div class="dangerItem">
          <p class="dangerDescription">删除所有小说数据，此操作不可恢复。</p>
          <button class="btn btnDanger" @click="confirmDeleteAll">删除全部内容</button>
        </div>
      </div>
      
      <div v-if="showDeleteConfirm" class="dialogOverlay" @click.self="showDeleteConfirm = false">
        <div class="dialog">
          <h2 class="dialogTitle">确认删除</h2>
          <p class="dialogMessage">确定要删除所有小说数据吗？此操作不可恢复！</p>
          <div class="dialogActions">
            <button class="btn btnSecondary" @click="showDeleteConfirm = false">取消</button>
            <button class="btn btnDanger" @click="deleteAllNovels">确认删除</button>
          </div>
        </div>
      </div>

      <div v-if="showAbout" class="dialogOverlay" @click.self="showAbout = false">
        <div class="dialog aboutDialog">
          <h2 class="dialogTitle">关于 Lyn Novel</h2>
          <div class="aboutContent">
            <div class="aboutName">Lyn Novel</div>
            <div class="aboutVersion">版本 1.0.0</div>
            <div class="aboutDescription">
              Lyn Novel 是一款智能小说创作工具，主要用于本地运行的AI大模型辅助写作、章节管理、人物设定等功能，帮助您更高效地创作小说，不用担心数据安全问题。
            </div>
          </div>
          <div class="dialogActions">
            <button class="btn btnPrimary" @click="showAbout = false">确定</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const modelSettings = ref({
  provider: 'ollama',
  ollama: {
    apiUrl: 'http://localhost:11434/api/generate',
    model: 'gemma3:1b'
  },
  llama: {
    apiUrl: 'http://localhost:8080/v1/chat/completions',
    modelPath: ''
  },
  promptKeywords: ''
})

const showDeleteConfirm = ref(false)
const showAbout = ref(false)

function loadSettings() {
  try {
    const saved = localStorage.getItem('lyn_novel_settings')
    if (saved) {
      modelSettings.value = JSON.parse(saved)
    }
  } catch (e) {
  }
}

function saveSettings() {
  try {
    localStorage.setItem('lyn_novel_settings', JSON.stringify(modelSettings.value))
    alert('设置已保存')
  } catch (e) {
    alert('保存失败')
  }
}

function resetSettings() {
  modelSettings.value = {
    provider: 'ollama',
    ollama: {
      apiUrl: 'http://localhost:11434/api/generate',
      model: 'gemma3:1b'
    },
    llama: {
      apiUrl: 'http://localhost:8080/v1/chat/completions',
      modelPath: ''
    },
    promptKeywords: ''
  }
  saveSettings()
}

function goBack() {
  router.push('/')
}

function testConnection() {
  if (modelSettings.value.provider === 'ollama') {
    testOllamaConnection()
  } else if (modelSettings.value.provider === 'llama') {
    testLlamaConnection()
  }
}

async function testOllamaConnection() {
  try {
    const response = await fetch(modelSettings.value.ollama.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: modelSettings.value.ollama.model,
        prompt: '测试连接',
        stream: false
      })
    })
    
    if (response.ok) {
      alert('Ollama 服务连接成功！')
    } else {
      alert(`Ollama 服务连接失败: ${response.status} ${response.statusText}`)
    }
  } catch (error) {
    alert(`Ollama 服务连接失败: ${error.message}`)
  }
}

async function testLlamaConnection() {
  try {
    const response = await fetch(modelSettings.value.llama.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: '测试连接'
          }
        ],
        temperature: 0.7,
        max_tokens: 10,
        stop: ["\n\n"]
      })
    })
    
    if (response.ok) {
      alert('Llama 服务连接成功！')
    } else {
      alert(`Llama 服务连接失败: ${response.status} ${response.statusText}`)
    }
  } catch (error) {
    alert(`Llama 服务连接失败: ${error.message}`)
  }
}

function confirmDeleteAll() {
  showDeleteConfirm.value = true
}

async function deleteAllNovels() {
  try {
    const response = await fetch('/api/novels', {
      method: 'DELETE'
    })
    
    if (response.ok) {
      alert('所有小说数据已删除')
      showDeleteConfirm.value = false
    } else {
      alert('删除失败，请重试')
    }
  } catch (error) {
    alert(`删除失败: ${error.message}`)
  }
}

onMounted(() => {
  loadSettings()
})
</script>

<style scoped>
.settingsContainer {
  width: 1280px;
  min-height: 720px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #1e1e1e;
  color: #ffffff;
}

.settingsHeader {
  width: 1280px;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  background: #2d2d30;
  border-bottom: 2px solid #3e3e42;
}

.backButton {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #3e3e42;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
  margin-right: 20px;
}

.backButton:hover {
  background: #4a4a4e;
}

.settingsIcon {
  font-size: 18px;
  color: #ffffff;
}

.settingsTitle {
  font-size: 22px;
  font-weight: 600;
  color: #ffffff;
  letter-spacing: 2px;
}

.settingsContent {
  flex: 1;
  padding: 30px;
  overflow-y: auto;
}

.settingsSection {
  background: #252526;
  border: 1px solid #3e3e42;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.settingsSectionTitle {
  font-size: 18px;
  font-weight: 500;
  color: #ffffff;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #3e3e42;
}

.settingsItem {
  margin-bottom: 15px;
}

.settingsLabel {
  display: block;
  font-size: 14px;
  color: #cccccc;
  margin-bottom: 8px;
}

.settingsInput {
  width: 100%;
  height: 36px;
  padding: 0 12px;
  background: #1e1e1e;
  border: 1px solid #3e3e42;
  color: #ffffff;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.settingsInput:focus {
  border-color: #0078d4;
}

.settingsSelect {
  width: 100%;
  height: 36px;
  padding: 0 12px;
  background: #1e1e1e;
  border: 1px solid #3e3e42;
  color: #ffffff;
  font-size: 14px;
  outline: none;
  cursor: pointer;
}

.settingsSelect:focus {
  border-color: #0078d4;
}

.settingsTextarea {
  width: 100%;
  padding: 12px;
  background: #1e1e1e;
  border: 1px solid #3e3e42;
  color: #ffffff;
  font-size: 14px;
  resize: vertical;
  outline: none;
  transition: border-color 0.2s;
}

.settingsTextarea:focus {
  border-color: #0078d4;
}

.settingsHint {
  font-size: 12px;
  color: #888888;
  margin-top: 5px;
  margin-left: 2px;
}

.providerSettings {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #3e3e42;
}

.settingsActions {
  display: flex;
  gap: 15px;
  margin-top: 30px;
}

.btn {
  height: 40px;
  padding: 0 24px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;
  border-radius: 4px;
}

.btnPrimary {
  background: #0078d4;
  color: #ffffff;
}

.btnPrimary:hover {
  background: #1a86d9;
}

.btnSecondary {
  background: #3e3e42;
  color: #ffffff;
}

.btnSecondary:hover {
  background: #4a4a4e;
}

.btnTertiary {
  background: #6e6e73;
  color: #ffffff;
}

.btnTertiary:hover {
  background: #7a7a7f;
}

.btnDanger {
  background: #d32f2f;
  color: #ffffff;
}

.btnDanger:hover {
  background: #e53935;
}

.btnAbout {
  background: #4caf50;
  color: #ffffff;
}

.btnAbout:hover {
  background: #5cbf60;
}

.aboutDialog {
  text-align: center;
}

.aboutContent {
  margin-bottom: 20px;
}

.aboutName {
  font-size: 24px;
  font-weight: 600;
  color: #0078d4;
  margin-bottom: 8px;
}

.aboutVersion {
  font-size: 14px;
  color: #888888;
  margin-bottom: 16px;
}

.aboutDescription {
  font-size: 14px;
  color: #cccccc;
  line-height: 1.6;
}

.dangerSection {
  background: #252526;
  border: 1px solid #d32f2f;
  border-radius: 8px;
  padding: 20px;
  margin-top: 30px;
}

.dangerSectionTitle {
  font-size: 18px;
  font-weight: 500;
  color: #d32f2f;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #3e3e42;
}

.dangerItem {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dangerDescription {
  font-size: 14px;
  color: #cccccc;
  margin: 0;
}

.dialogOverlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.dialog {
  background: #2d2d30;
  border: 1px solid #3e3e42;
  border-radius: 8px;
  padding: 24px;
  min-width: 400px;
  max-width: 500px;
}

.dialogTitle {
  font-size: 18px;
  font-weight: 500;
  color: #ffffff;
  margin-bottom: 16px;
}

.dialogMessage {
  font-size: 14px;
  color: #cccccc;
  margin-bottom: 24px;
  line-height: 1.5;
}

.dialogActions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}
</style>