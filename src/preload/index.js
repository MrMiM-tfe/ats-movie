import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
const os = require('os')
const path = require('path')
import fs from 'fs'

const openLinkInChrome = (url) => {
  const { shell } = require('electron')
  shell.openExternal(url)
}

const homeDir = os.homedir()
const documentsPath = path.join(homeDir, 'Documents')
const atsMoviePath = path.join(documentsPath, 'ATS_Movie')
const filePath = path.join(atsMoviePath, 'user_data.json')

if (!fs.existsSync(atsMoviePath)) {
  fs.mkdirSync(atsMoviePath, { recursive: true });
}

const dataTemplate = { favorites: [], watched: [] }

const addFav = (id) => {
  try {
    if (fs.existsSync(filePath)) {
      let file = fs.readFileSync(filePath, 'utf8')
      let data = JSON.parse(file)
      data.favorites.push(id)
      fs.writeFileSync(filePath, JSON.stringify(data))
      return data
    } else {
      let data = dataTemplate
      data.favorites.push(id)
      fs.writeFileSync(filePath, JSON.stringify(data))
      return data
    }
  } catch (error) {
    console.log(error)
    return null
  }
}

const delFav = (id) => {
  try {
    if (fs.existsSync(filePath)) {
      let file = fs.readFileSync(filePath, 'utf8')
      let data = JSON.parse(file)
      data.favorites = data.favorites.filter((item) => item !== id)
      fs.writeFileSync(filePath, JSON.stringify(data))
      return data
    } else {
      return true
    }
  } catch (error) {
    console.log(error)
    return null
  }
}

const getUserData = () => {
  try {
    if (fs.existsSync(filePath)) {
      let file = fs.readFileSync(filePath, 'utf8')
      let data = JSON.parse(file)
      return data
    } else {
      let data = dataTemplate
      fs.writeFileSync(filePath, JSON.stringify(data))
      return data
    }
  } catch (error) {
    console.log(error);
  }
}

const markAsWatched = (id) => {
  try {
    if (fs.existsSync(filePath)) {
      let file = fs.readFileSync(filePath, 'utf8')
      let data = JSON.parse(file)
      data.watched.push(id)
      console.log(data);
      fs.writeFileSync(filePath, JSON.stringify(data))
      return data
    } else {
      let data = dataTemplate
      data.watched.push(id)
      fs.writeFileSync(filePath, JSON.stringify(data))
      return data
    }
  } catch (error) {
    console.log(error)
    return null
  }
}
const markAsUnwatched = (id) => {
  console.log(`deleting ${id}`);
  try {
    if (fs.existsSync(filePath)) {
      let file = fs.readFileSync(filePath, 'utf8')
      let data = JSON.parse(file)
      data.watched = data.watched.filter((i)=>i != id)
      fs.writeFileSync(filePath, JSON.stringify(data))
      return data
    } else {
      return true
    }
  } catch (error) {
    console.log(error)
    return null
  }
}

// Custom APIs for renderer
const api = {
  openLinkInChrome,
  addFav,
  delFav,
  markAsUnwatched,
  markAsWatched,
  getUserData
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
