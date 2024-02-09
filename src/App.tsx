import { useState } from "react";
import { DragDropContext, Draggable, Droppable, OnDragEndResponder } from "react-beautiful-dnd"
import "./App.css"

export default function App() {

  const [weekTodos, setWeekTodos] = useState([
    { id: "1", title: "공부" },
    { id: "2", title: "헬스" },
    { id: "3", title: "독서" },
    { id: "4", title: "산책" },
    { id: "5", title: "요리" }
  ]);

  const handleWeekChange: OnDragEndResponder = (result) => {
    if (!result.destination) return;
    const items = [...weekTodos];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setWeekTodos(items);
  };

  return (
    <DragDropContext onDragEnd={handleWeekChange}>
      <div className="listcontainer">
        <div className="weeklist">
          <div className="title">이번주 해야할일</div>
          <Droppable droppableId="weekTodos">
            {(provided) => (
              <div
                className="todos"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {weekTodos.map(({ id, title }, index) => (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <div
                        key={index}
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                      >
                        {title}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
        <div className="todaylist">
          <div className="title">오늘 해야할 일</div>
        </div>
        <div className="donelist">
          <div className="title">완료한 일</div>  
        </div>
      </div>
    </DragDropContext>
  )
}
                 