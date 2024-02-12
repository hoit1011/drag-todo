import { useState } from "react";
import { DragDropContext, Draggable, Droppable, OnDragEndResponder } from "react-beautiful-dnd"
import "./App.css"

export default function App() {

  const [weekTodos, setWeekTodos] = useState([
    { id: 1, title: "공부" },
    { id: 2, title: "헬스" },
    { id: 3, title: "독서" },
    { id: 4, title: "산책" },
    { id: 5, title: "요리" }
  ]);

  const [todayTodos, setTodayTodos] = useState<{ id: number; title: string; }[]>([

  ]);

  const handleWeekChange: OnDragEndResponder = (result) => {
    if (!result.destination) return;
    const droppableIdMap: { [key: string]: { id: number; title: string; }[] } = {
      weekTodos: weekTodos,
      todayTodos: todayTodos,
    };

    const sourceIndex = result.source.droppableId;
    const destinationIndex = result.destination.droppableId;
    const items: { id: number; title: string; }[] = [...droppableIdMap[sourceIndex]];

    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    console.log("Source Index:", sourceIndex);
    console.log("Destination Index:", destinationIndex);

    if(destinationIndex === "weekTodos") {
      setWeekTodos(items);
    } else
    if(destinationIndex === "todayTodos") {
      setTodayTodos(items.filter(x => x.id !== result.destination!.index));
    }
  };
  
  const handleTodayChange: OnDragEndResponder = (result) => {
    
  }

  return (
      <div className="listcontainer">
        <div className="weeklist">
          <div className="title">이번주 해야할일</div>
          <DragDropContext onDragEnd={handleWeekChange}>
            <Droppable droppableId="weekTodos">
              {(provided) => (
                <div
                  className="todos"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {weekTodos.map(({ id, title }, index) => (
                    <Draggable key={id.toString()} draggableId={id.toString()} index={index}>
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
          </DragDropContext>
        </div>
        <div className="todaylist">
          <div className="title">오늘 해야할 일</div>
          <DragDropContext onDragEnd={handleTodayChange}>
          <Droppable droppableId="todayTodos">
            {(provided) => (
              <div
                className="todos"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {todayTodos.map(({ id, title }, index) => (
                  <Draggable key={id.toString()} draggableId={id.toString()} index={index}>
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
          </DragDropContext>
        </div>
        <div className="donelist">
          <div className="title">완료한 일</div>  
        </div>
      </div>
  )
}
