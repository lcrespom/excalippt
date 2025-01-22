import { Excalidraw } from '@excalidraw/excalidraw'
import './App.css'

function App() {
  return (
    <main>
      <header>
        <h2 style={{ textAlign: 'center', margin: '0px' }}>Excalidraw Example</h2>
      </header>
      <article>
        <Excalidraw />
      </article>
    </main>
  )
}

export default App
