import { useState } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';

function App() {
  const [boxes, setBoxes] = useState<{ id: number; text: string }[]>([]);

  const handleAddBox = () => {
    const newBox = { id: boxes.length + 1, text: `박스 ${boxes.length + 1}` };
    setBoxes([...boxes, newBox]);
  };

  const Box = ({ id, text }: { id: number; text: string }) => {
    const [{ isDragging }, drag] = useDrag({
      type: 'box',
      item: { id, text },
      collect: monitor => ({
        isDragging: monitor.isDragging(),
      }),
    });

    return (
      <div ref={drag} className='box' style={{ opacity: isDragging ? 0.5 : 1 }}>
        {text}
      </div>
    );
  };

  const DropZone = ({ listName }: { listName: string }) => {
    const [, drop] = useDrop({
      accept: 'box',
      drop: (item: { id: number; text: string }) => {
        const newBox = { id: item.id, text: item.text };
        setBoxes(prevBoxes => [...prevBoxes, newBox]);
      },
    });
  
    return <div ref={drop} className={`drop-zone ${listName}-list`}></div>;
  };
  

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <div className='listcontainer'>
          <div className='weeklist'>
            <div className='title'>이번주 해야할 일</div>
            <div className='addlist' onClick={handleAddBox}>
              추가
            </div>
            {boxes.map(box => (
              <Box key={box.id} id={box.id} text={box.text} />
            ))}
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
  );
}

export default App;
