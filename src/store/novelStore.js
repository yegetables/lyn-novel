import { reactive } from 'vue'

const STORAGE_KEY = 'lyn_novel_data'

const defaultNovelData = {
  novels: []
}

function loadFromStorage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (e) {
  }
  return { ...defaultNovelData }
}

function saveToStorage(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (e) {
  }
}

const state = reactive(loadFromStorage())

export function useNovelStore() {
  function saveNovel(novel) {
    const index = state.novels.findIndex(n => n.id === novel.id)
    if (index >= 0) {
      state.novels[index] = novel
    } else {
      state.novels.push(novel)
    }
    saveToStorage({ novels: state.novels })
  }

  function getNovel(id) {
    return state.novels.find(n => n.id === id)
  }

  function deleteNovel(id) {
    const index = state.novels.findIndex(n => n.id === id)
    if (index >= 0) {
      state.novels.splice(index, 1)
      saveToStorage({ novels: state.novels })
    }
  }

  function getNovels() {
    return state.novels
  }

  return {
    state,
    saveNovel,
    getNovel,
    deleteNovel,
    getNovels
  }
}
