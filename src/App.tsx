import { Excalidraw } from '@excalidraw/excalidraw'
import { useState } from 'react'

import './App.css'
import { AppState, BinaryFiles, ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types/types'
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types'

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
    }
  }
}

function App() {
  const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI | null>(null)
  if (excalidrawAPI) {
    console.log('Init:', excalidrawAPI.getSceneElements())
    // excalidrawAPI.onChange(elements => console.log('Change:', elements))
  }
  return (
    <main>
      <header>
        <h2 style={{ textAlign: 'center', margin: '0px' }}>Excalidraw Example</h2>
      </header>
      <article>
        <Excalidraw excalidrawAPI={api => setExcalidrawAPI(api)} onChange={changed} />
      </article>
    </main>
  )
}

export default App
