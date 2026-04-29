# Lyn Novel

<div align="center">

**一款智能小说创作工具**

[English](#english) | [中文](#chinese)

</div>

---

## Chinese

### 软件介绍

Lyn Novel 是一款基于 Vue 3 和 Vite 构建的智能小说创作工具，专为小说创作者设计。它集成了 AI 辅助写作功能，支持多种大语言模型（Ollama、Llama），帮助您更高效地完成小说创作。

### 主要功能

- **小说设定管理**：创建和管理小说的基本信息，包括名称、类型、简介等
- **人物角色管理**：添加、编辑和删除小说中的人物角色及其描述
- **故事情节管理**：规划和组织小说的情节发展
- **章节内容管理**：编写和管理小说的各个章节内容
- **AI 辅助写作**：支持 AI 自动生成小说设定、人物描述、情节内容和章节文字
- **流式输出**：AI 生成内容实时显示，无需等待
- **本地服务器存储**：数据自动保存到本地服务器，支持数据持久化
- **实时字数统计**：自动统计章节字数和段落数

### 技术栈

- **前端**：Vue 3 + Vite
- **后端**：Node.js + Express
- **AI 集成**：支持 Ollama 和 Llama 大语言模型

### 安装步骤

#### 环境要求

- Node.js 16+ 
- npm 或 yarn

#### 安装

1. 克隆项目到本地：

```bash
git clone https://github.com/lyngie-studio/lyn-novel
cd lyn-novel
```

2. 安装依赖：

```bash
npm install
```

3. 启动后端服务：

```bash
npm run server
```

4. 启动前端开发服务器：

```bash
npm run dev
```

5. 打开浏览器访问：http://localhost:5173/

#### 配置 AI 模型

1. 进入设置页面
2. 选择 AI 模型调用方式（Ollama 或 Llama）
3. 配置 API 地址和模型名称
4. 点击"测试连接"验证配置

### 项目结构

```
lyn-novel/
├── server/          # 后端服务
│   ├── index.js     # Express 服务器
│   └── data/        # 数据存储目录
├── src/             # 前端源码
│   ├── views/       # 页面组件
│   ├── store/       # 状态管理
│   ├── router/      # 路由配置
│   └── App.vue      # 根组件
├── package.json     # 项目配置
└── vite.config.js   # Vite 配置
```

---

## English

### Introduction

Lyn Novel is an intelligent novel writing tool built with Vue 3 and Vite, designed specifically for novel creators. It integrates AI-assisted writing capabilities and supports multiple large language models (Ollama, Llama) to help you complete novel writing more efficiently.

### Key Features

- **Novel Settings Management**: Create and manage basic novel information including name, genre, synopsis, etc.
- **Character Management**: Add, edit, and delete characters and their descriptions
- **Plot Management**: Plan and organize novel plot development
- **Chapter Content Management**: Write and manage novel chapters
- **AI-Assisted Writing**: Support AI automatic generation of novel settings, character descriptions, plot content, and chapter text
- **Streaming Output**: AI-generated content displays in real-time without waiting
- **Local Server Storage**: Data automatically saved to local server with persistence support
- **Real-time Word Count**: Automatic statistics for chapter word count and paragraph count

### Tech Stack

- **Frontend**: Vue 3 + Vite
- **Backend**: Node.js + Express
- **AI Integration**: Supports Ollama and Llama large language models

### Installation

#### Prerequisites

- Node.js 16+
- npm or yarn

#### Setup

1. Clone the repository:

```bash
git clone https://github.com/lyngie-studio/lyn-novel.git
cd lyn-novel
```

2. Install dependencies:

```bash
npm install
```

3. Start the backend server:

```bash
npm run server
```

4. Start the frontend development server:

```bash
npm run dev
```

5. Open your browser and visit: http://localhost:5173/

#### Configure AI Model

1. Navigate to the Settings page
2. Select AI model provider (Ollama or Llama)
3. Configure API address and model name
4. Click "Test Connection" to verify configuration

### Project Structure

```
lyn-novel/
├── server/          # Backend service
│   ├── index.js     # Express server
│   └── data/        # Data storage directory
├── src/             # Frontend source code
│   ├── views/       # Page components
│   ├── store/       # State management
│   ├── router/      # Route configuration
│   └── App.vue      # Root component
├── package.json     # Project configuration
└── vite.config.js   # Vite configuration
```
