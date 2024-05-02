"use client";

import { AiOutlinePlus } from "react-icons/ai";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./components/Modal";
import { FormEventHandler, useState } from "react";

export const Task = [
  {
    id: "1",
    text: "Go to market",
  },
];

export default function Home() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>("");
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>("");
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);
  const [Tasks, setTasks] = useState(Task);

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const newTask = {
      id: (Tasks.length + 1).toString(),
      text: newTaskValue,
    };
    setTasks([...Tasks, newTask]);
    setNewTaskValue("");
    setModalOpen(false);
  };

  const handleSubmitEditTodo = async (e: any, id: string) => {
    e.preventDefault();
    const updatedTasks = Tasks.map((task) =>
      task.id === id ? { ...task, text: taskToEdit || "" } : task
    );
    setTasks(updatedTasks);
    setOpenModalEdit(false);
  };

  const handleDeleteTask = async (id: string) => {
    setTasks(Tasks.filter((task) => task.id !== id));
    setDeletingTaskId(null);
  };

  return (
    <main className="max-w-4xl mx-auto mt-4">
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Todo List App</h1>
        <div>
          <button
            onClick={() => setModalOpen(true)}
            className="btn btn-primary w-full"
          >
            Add new task <AiOutlinePlus className="ml-2" size={18} />
          </button>

          <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
            <form onSubmit={handleSubmitNewTodo}>
              <h3 className="font-bold text-lg">Add new task</h3>
              <div className="modal-action">
                <input
                  value={newTaskValue}
                  onChange={(e) => setNewTaskValue(e.target.value)}
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                />
                <button type="submit" className="btn">
                  Submit
                </button>
              </div>
            </form>
          </Modal>
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Tasks</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Tasks.length === 0 ? (
                <tr>
                  <td colSpan={2} className="text-center">
                    No tasks to show
                  </td>
                </tr>
              ) : (
                Tasks.map((task) => (
                  <tr key={task.id}>
                    <td className="w-full">{task.text}</td>
                    <td className="flex gap-5">
                      <FiEdit
                        onClick={() => {
                          setOpenModalEdit(true);
                          setTaskToEdit(task.text);
                        }}
                        cursor="pointer"
                        className="text-blue-500"
                        size={25}
                      />
                      <Modal
                        modalOpen={openModalEdit}
                        setModalOpen={setOpenModalEdit}
                      >
                        <form
                          onSubmit={(e) => handleSubmitEditTodo(e, task.id)}
                        >
                          <h3 className="font-bold text-lg">Edit task</h3>
                          <div className="modal-action">
                            <input
                              value={taskToEdit}
                              onChange={(e) => setTaskToEdit(e.target.value)}
                              type="text"
                              placeholder="Type here"
                              className="input input-bordered w-full"
                            />
                            <button type="submit" className="btn">
                              Submit
                            </button>
                          </div>
                        </form>
                      </Modal>
                      <FiTrash2
                        onClick={() => setDeletingTaskId(task.id)}
                        cursor="pointer"
                        className="text-red-500"
                        size={25}
                      />
                      <Modal
                        modalOpen={deletingTaskId === task.id}
                        setModalOpen={() => setDeletingTaskId(null)}
                      >
                        <h3 className="text-lg">
                          Are you sure, you want to delete this task?
                        </h3>
                        <div className="modal-action">
                          <button
                            onClick={() => handleDeleteTask(task.id)}
                            className="btn"
                          >
                            Yes
                          </button>
                        </div>
                      </Modal>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
