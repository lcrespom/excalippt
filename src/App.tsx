import { Excalidraw } from '@excalidraw/excalidraw'
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types'
import { AppState, BinaryFiles, ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types/types'
import { useState } from 'react'

import './App.css'
import slides from './slides'

const SCROLL_OPTIONS = { animate: true, duration: 1000, fitToViewport: true }

let elms: readonly ExcalidrawElement[] = []
let selElems = {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function changed(elements: readonly ExcalidrawElement[], appState: AppState, _files: BinaryFiles) {
  if (elms !== elements) {
    elms = elements
    console.log('Change:', elements)
  }
  if (selElems !== appState.selectedElementIds) {
    selElems = appState.selectedElementIds
    const keys = Object.keys(selElems)
    if (keys.length > 0) {
      const pos = elms.findIndex(e => e.id == keys[0])
      console.log('Selected element at position:', pos)
    } else {
      console.log('No selection')
    }
  }
}

function scrollTo(pos: number, exc: ExcalidrawImperativeAPI) {
  const elems = exc.getSceneElements()
  let selPos: number | number[] = slides[pos]
  if (typeof selPos == 'number') selPos = [selPos]
  const selection = selPos.map(p => elems[p])
  exc.scrollToContent(selection, SCROLL_OPTIONS)
}

function App() {
  const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI>()
  const [current, setCurrent] = useState<number>(-1)

  function changeFocusElement(inc: number) {
    let nextPos = (current + inc) % slides.length
    if (nextPos < 0) nextPos = slides.length - 1
    setCurrent(nextPos)
    scrollTo(nextPos, excalidrawAPI!)
  }

  function checkKey(e: React.KeyboardEvent<HTMLElement>) {
    switch (e.key) {
      case 'ArrowLeft':
        return changeFocusElement(-1)
      case 'ArrowRight':
        return changeFocusElement(1)
      case ' ':
        return excalidrawAPI?.scrollToContent(undefined, SCROLL_OPTIONS)
      case 'Home':
        return setCurrent(0)
    }
  }

  return (
    <main onKeyDown={checkKey}>
      <header>
        <h2 style={{ textAlign: 'center', margin: '0px' }}>Shelp: a Tauri-based shell helper</h2>
      </header>
      <article>
        <Excalidraw excalidrawAPI={api => setExcalidrawAPI(api)} onChange={changed} />
      </article>
    </main>
  )
}

export default App
