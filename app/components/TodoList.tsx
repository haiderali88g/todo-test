import React from "react";
import Task from "./Task";

interface TodoListProps {
  tasks: { id: number; text: string }[];
}

const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Tasks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan={2} className="text-center">
                No tasks to show
              </td>
            </tr>
          ) : (
            tasks.map((task) => <Task key={task.id} task={task} />)
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
