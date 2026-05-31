# Lyn Novel

<div align="center">

**一款智能小说创作工具**

[English](#english) | [中文](#chinese)

</div>

---

<a id="chinese"></a>

## 中文

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

---

### 🚀 部署（Docker）

#### 环境要求

- Docker 和 Docker Compose
- Ollama（本地大模型服务，需单独安装）

#### 一键部署

1. 创建项目目录并下载配置文件：

```bash
mkdir lyn-novel && cd lyn-novel
curl -O https://raw.githubusercontent.com/yegetables/lyn-novel/main/docker-compose.ghcr.yml
mv docker-compose.ghcr.yml docker-compose.yml
```

2. 启动服务：

```bash
docker compose up -d
```

3. 打开浏览器访问：`http://你的服务器IP:3001`

4. 点击首页右上角 ⚙ 齿轮图标进入设置，配置 Ollama API 地址和模型名称

#### 本地构建部署（可选）

如果你想自行构建镜像而非使用预构建的 ghcr.io 镜像：

```bash
git clone https://github.com/yegetables/lyn-novel.git
cd lyn-novel
docker compose -f docker-compose.yml up -d --build
```

> 默认的 `docker-compose.yml` 会从源码构建。`docker-compose.ghcr.yml` 使用预构建的 GitHub 镜像。

---

### ⚙️ Ollama 配置

Lyn Novel 通过浏览器直接调用 Ollama API，因此需要正确配置 Ollama 的网络和跨域设置。

#### 1. 让 Ollama 监听所有地址

默认情况下 Ollama 只监听 `127.0.0.1`，其他设备无法访问。

```bash
sudo systemctl edit ollama
```

加入以下内容：

```ini
[Service]
Environment="OLLAMA_HOST=0.0.0.0"
```

#### 2. 允许跨域访问（CORS）

由于 Lyn Novel 和 Ollama 运行在不同端口/地址，浏览器会拦截跨域请求。需要在上面的配置中同时加入：

```ini
[Service]
Environment="OLLAMA_ORIGINS=*"
```

完整配置示例：

```ini
[Service]
Environment="OLLAMA_HOST=0.0.0.0"
Environment="OLLAMA_ORIGINS=*"
```

#### 3. 重启 Ollama

```bash
sudo systemctl daemon-reload
sudo systemctl restart ollama
```

#### 4. 在 Lyn Novel 中配置

进入设置页面（首页右上角 ⚙），填写：

| 配置项 | 示例值 |
|---|---|
| 调用方式 | Ollama |
| API 地址 | `http://你的Ollama服务器IP:11434/api/generate` |
| 模型名称 | `qwen3.5:9b` |

点击「测试连接」验证配置是否正确。

---

### 技术栈

- **前端**：Vue 3 + Vite
- **后端**：Node.js + Express
- **AI 集成**：支持 Ollama 和 Llama 大语言模型

---

<a id="english"></a>

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

---

### 🚀 Deployment (Docker)

#### Prerequisites

- Docker and Docker Compose
- Ollama (local LLM service, install separately)

#### Quick Start

1. Create project directory and download config:

```bash
mkdir lyn-novel && cd lyn-novel
curl -O https://raw.githubusercontent.com/yegetables/lyn-novel/main/docker-compose.ghcr.yml
mv docker-compose.ghcr.yml docker-compose.yml
```

2. Start the service:

```bash
docker compose up -d
```

3. Open your browser: `http://YOUR_SERVER_IP:3001`

4. Click the ⚙ gear icon (top-right) to configure Ollama API and model name

#### Build from Source (Optional)

To build the image yourself instead of using the pre-built ghcr.io image:

```bash
git clone https://github.com/yegetables/lyn-novel.git
cd lyn-novel
docker compose -f docker-compose.yml up -d --build
```

---

### ⚙️ Ollama Configuration

Lyn Novel calls Ollama API directly from the browser, so Ollama must be configured for network access and CORS.

#### 1. Listen on All Addresses

By default Ollama only listens on `127.0.0.1`. To allow remote access:

```bash
sudo systemctl edit ollama
```

Add:

```ini
[Service]
Environment="OLLAMA_HOST=0.0.0.0"
```

#### 2. Enable CORS

Since Lyn Novel and Ollama run on different ports/addresses, the browser blocks cross-origin requests. Add to the same config:

```ini
[Service]
Environment="OLLAMA_ORIGINS=*"
```

Full example:

```ini
[Service]
Environment="OLLAMA_HOST=0.0.0.0"
Environment="OLLAMA_ORIGINS=*"
```

#### 3. Restart Ollama

```bash
sudo systemctl daemon-reload
sudo systemctl restart ollama
```

#### 4. Configure in Lyn Novel

Go to Settings (⚙ gear icon, top-right of homepage):

| Setting | Example |
|---|---|
| Provider | Ollama |
| API URL | `http://YOUR_OLLAMA_SERVER_IP:11434/api/generate` |
| Model Name | `qwen3.5:9b` |

Click "Test Connection" to verify.

---

### Tech Stack

- **Frontend**: Vue 3 + Vite
- **Backend**: Node.js + Express
- **AI Integration**: Supports Ollama and Llama large language models

---

### 📦 对开发者 / For Developers

<details>
<summary>点击展开开发相关说明</summary>

#### 环境要求

- Node.js 16+
- npm 或 yarn

#### 本地开发

1. 克隆项目：

```bash
git clone https://github.com/yegetables/lyn-novel.git
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

#### 项目结构

```
lyn-novel/
├── .github/workflows/  # GitHub Actions CI/CD
├── server/             # 后端服务
│   ├── index.js        # Express 服务器
│   └── data/           # 数据存储目录
├── src/                # 前端源码
│   ├── views/          # 页面组件
│   ├── store/          # 状态管理
│   ├── router/         # 路由配置
│   └── App.vue         # 根组件
├── Dockerfile          # Docker 构建文件
├── docker-compose.yml  # 本地构建部署配置
├── docker-compose.ghcr.yml  # ghcr.io 镜像部署配置
├── package.json        # 项目配置
└── vite.config.js      # Vite 配置
```

#### Docker 镜像构建

每次推送到 `main` 分支时，GitHub Actions 会自动构建并推送镜像到 `ghcr.io/yegetables/lyn-novel:main`。

手动构建：

```bash
docker build -t lyn-novel .
docker run -p 3001:3001 -v ./data:/app/server/data lyn-novel
```

</details>
