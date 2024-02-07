import { useEffect, useState } from 'react'
import './App.css'

import { useDrag, useDrop,DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  const [boxes, setboxes] = useState<{id : number; text: string;}[]>([])

  const handleAddBox = () => {
    const newBox = { id: boxes.length + 1, text: `박스 ${boxes.length + 1}`}
    console.log("아아")
    setboxes([...boxes, newBox])
  }

  return (
    <DndProvider backend={HTML5Backend}>
    <div>
      <div className='listcontainer'>
        <div className='weeklist'>
          <div className='title'>이번주 해야할 일</div>
            <div className='addlist' onClick={handleAddBox}>추가</div>
            
        </div>
        <div className='todaylist'>
          <div className='title'>오늘 해야할 일</div>
        </div>
        <div className='donelist'>
          <div className='title'>끝낸일</div>
        </div>
      </div>
    </div>
    </DndProvider>
  )
}

export default App
