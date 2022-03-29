const taskCount = 20;

const getTaskIds = taskCount => {
  const taskIds = [];
  for (let i = 0; i < taskCount; i++) {
    taskIds.push({ id: `task${i}`, index: i });
  }
  return taskIds;
};

const getTasks = taskCount => {
  let taskIds = {};
  for (let i = 0; i < taskCount; i++) {
    taskIds[`task${i}`] = { id: `task${i}`, content: `Task ${i}` };
  }
  return taskIds;
};

const taskIds = getTaskIds(taskCount);
const tasks = getTasks(taskCount);

const initialData = {
  tasks,
  columns: {
    "column-1": {
      id: "column-1",
      title: "Column 1",
      taskIds // : ['task-1', 'task-2', 'task-3', 'task-4'],
    },
    "column-2": {
      id: "column-2",
      title: "Column 2",
      taskIds: []
    },
    "column-3": {
      id: "column-3",
      title: "Column 3",
      taskIds: []
    }
  },
  // Facilitate reordering of the columns
  columnOrder: ["column-1", "column-2", "column-3"]
};

export default initialData;
