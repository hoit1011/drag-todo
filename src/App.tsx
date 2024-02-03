import { useEffect, useState } from 'react'
import './App.css'

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {

  return (
    <div>
      <div className='listcontainer'>
        <div className='weeklist'>
          <div className='title'>이번주 해야할 일</div>
            <div className='addlist'>추가</div>
        </div>
        <div className='todaylist'>
          <div className='title'>오늘 해야할 일</div>
        </div>
        <div className='donelist'>
          <div className='title'>끝낸일</div>
        </div>
      </div>
    </div>
  )
}

export default App
