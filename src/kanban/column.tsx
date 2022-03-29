import React from "react";

import { Draggable, Droppable } from "react-beautiful-dnd";
import { Task } from "./task";

import * as styles from "./styles.module.css";

interface InnerListProps {
  taskIds: any;
  tasks: any;
}

class InnerList extends React.Component<InnerListProps> {
  shouldComponentUpdate(nextProps) {
    if (nextProps.tasks === this.props.tasks) {
      return false;
    }
    return true;
  }

  render() {
    // console.log('Column Inner List props', this.props)
    return this.props.tasks.map((task, index) => {
      const t = this.props.taskIds.filter(ta => ta.id === task.id)[0];
      return <Task key={task.id} task={task} index={t.index} />;
      // return <Task key={task.id} task={task} index={index} />
    });
  }
}

interface ColumnProps {
  column: any;
  index: number;
  tasks: any;
}

export default class Column extends React.Component<ColumnProps> {
  render() {
    return (
      <Draggable draggableId={this.props.column.id} index={this.props.index}>
        {(provided, snapshot) => (
          <div
            className={styles.columnContainer}
            ref={provided.innerRef}
            // isDragging={snapshot.isDragging}
            {...provided.draggableProps}
          >
            <h3
              className={styles.title}
              {...provided.dragHandleProps}
              // isDragging={snapshot.isDragging}
            >
              {this.props.column.title}
            </h3>
            <Droppable droppableId={this.props.column.id} type="TASK">
              {(provided, snapshot) => (
                <div
                  className={styles.taskList}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  // isDraggingOver={snapshot.isDraggingOver}
                >
                  <InnerList
                    tasks={this.props.tasks}
                    taskIds={this.props.column.taskIds}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        )}
      </Draggable>
    );
  }
}
