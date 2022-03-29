import React from "react";
import "@atlaskit/css-reset";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import initialData from "./initial-data";
import Column from "./column";

import * as styles from "./styles.module.css";

const reorder = (array, startIndex, endIndex) => {
  const result = Array.from(array);

  const previousItem = result[endIndex];
  const [removed] = result.splice(startIndex, 1);

  if (previousItem) {
    (removed as any).index = (previousItem as any).index;
  }
  result.splice(endIndex, 0, removed);
  return result;
};

class InnerList extends React.PureComponent<{ column; taskMap; index }> {
  render() {
    const { column, taskMap, index } = this.props;
    const tasks = column.taskIds.map(task => taskMap[task.id]);
    return <Column column={column} tasks={tasks} index={index} />;
  }
}

export class Kanban extends React.Component {
  state = initialData;

  onDragEnd = result => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "COLUMN") {
      this.setState({
        ...this.state,
        columnOrder: reorder(
          this.state.columnOrder,
          source.index,
          destination.index
        )
      });
      return;
    }

    const home = this.state.columns[source.droppableId];
    const foreign = this.state.columns[destination.droppableId];

    if (home === foreign) {
      const newColumn = {
        ...home,
        taskIds: reorder(home.taskIds, source.index, destination.index)
      };

      console.log("newColumn", newColumn);

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn
        }
      };

      this.setState(newState);
      return;
    }

    // moving from one list to another
    const homeTaskIds = Array.from(home.taskIds);
    homeTaskIds.splice(source.index, 1);
    const newHome = {
      ...home,
      taskIds: homeTaskIds
    };

    const foreignTaskIds = Array.from(foreign.taskIds);
    foreignTaskIds.splice(destination.index, 0, {
      id: draggableId,
      index: "test"
    });
    const newForeign = {
      ...foreign,
      taskIds: foreignTaskIds
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newHome.id]: newHome,
        [newForeign.id]: newForeign
      }
    };
    this.setState(newState);
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="board" direction="horizontal" type="COLUMN">
          {provided => (
            <div
              className={styles.board}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {this.state.columnOrder.map((columnId, index) => {
                const column = this.state.columns[columnId];

                return (
                  <InnerList
                    key={column.id}
                    column={column}
                    index={index}
                    taskMap={this.state.tasks}
                  />
                );
              })}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}
