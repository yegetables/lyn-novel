import express from 'express'
import cors from 'cors'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

const DATA_FILE = join(__dirname, 'data/novels.json')

function loadNovels() {
  try {
    if (existsSync(DATA_FILE)) {
      const data = readFileSync(DATA_FILE, 'utf-8')
      return JSON.parse(data)
    }
  } catch (e) {
    console.error('Failed to load novels:', e)
  }
  return { novels: [] }
}

function saveNovels(data) {
  try {
    writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8')
    return true
  } catch (e) {
    console.error('Failed to save novels:', e)
    return false
  }
}

app.get('/api/novels', (req, res) => {
  const data = loadNovels()
  res.json(data)
})

app.get('/api/novels/:id', (req, res) => {
  const data = loadNovels()
  const novel = data.novels.find(n => n.id === req.params.id)
  if (novel) {
    res.json(novel)
  } else {
    res.status(404).json({ error: 'Novel not found' })
  }
})

app.post('/api/novels', (req, res) => {
  const data = loadNovels()
  const novel = req.body
  const index = data.novels.findIndex(n => n.id === novel.id)
  if (index >= 0) {
    data.novels[index] = novel
  } else {
    data.novels.push(novel)
  }
  if (saveNovels(data)) {
    res.json({ success: true })
  } else {
    res.status(500).json({ error: 'Failed to save' })
  }
})

app.delete('/api/novels/:id', (req, res) => {
  const data = loadNovels()
  const index = data.novels.findIndex(n => n.id === req.params.id)
  if (index >= 0) {
    data.novels.splice(index, 1)
    if (saveNovels(data)) {
      res.json({ success: true })
    } else {
      res.status(500).json({ error: 'Failed to save' })
    }
  } else {
    res.status(404).json({ error: 'Novel not found' })
  }
})

app.delete('/api/novels', (req, res) => {
  if (saveNovels({ novels: [] })) {
    res.json({ success: true })
  } else {
    res.status(500).json({ error: 'Failed to delete' })
  }
})

// Serve frontend static files (built with `npm run build`)
const distPath = join(__dirname, '..', 'dist')
if (existsSync(distPath)) {
  app.use(express.static(distPath))
  app.get('*', (req, res) => {
    res.sendFile(join(distPath, 'index.html'))
  })
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`)
})
