import React from "react";
import { Draggable } from "react-beautiful-dnd";

import * as styles from "./styles.module.css";

// const propsAreEqual = (prevProps, nextProps) => {
// 	// console.log(JSON.stringify(prevProps.task) === JSON.stringify(nextProps.task))
// 	return JSON.stringify(prevProps.task) === JSON.stringify(nextProps.task) || prevProps.index === nextProps.index
// 	// return prevProps === nextProps //.task || prevProps.index === nextProps.index
// }

export const Task = props => {
  const random = Math.random()
    .toString()
    .substr(10, 3);
  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided, snapshot) => (
        <div
          className={styles.taskContainer}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          // isDragging={snapshot.isDragging}
        >
          <strong>{props.task.content}</strong>
          <span style={{ marginLeft: "1rem" }}>{random}</span>
        </div>
      )}
    </Draggable>
  );
}; //, propsAreEqual)
