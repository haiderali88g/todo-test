"use client";

import { useState, FormEventHandler, useRef } from "react";
import Modal from "./components/Modal";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { AiOutlinePlus } from "react-icons/ai";

const Task = [
  {
    id: Math.floor(Math.random() * 100),
    text: "Go to market",
  },
  {
    id: Math.floor(Math.random() * 100),
    text: "Grocery shopping",
  },
  {
    id: Math.floor(Math.random() * 100),
    text: "Walking the dog",
  },
  {
    id: Math.floor(Math.random() * 100),
    text: "Doing laundry",
  },
  {
    id: Math.floor(Math.random() * 100),
    text: "Cooking dinner",
  },
];

export default function Home() {
  const router = useRouter();
  const [tasks, setTasks] = useState(Task);
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>("");
  const [taskToEdit, setTaskToEdit] = useState<string>();

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const newTask = {
      id: Math.floor(Math.random() * 100),
      text: newTaskValue,
    };
    setTasks([...tasks, newTask]);
    setNewTaskValue("");
    setModalOpen(false);
    router.refresh();
  };

  const dragPerson = useRef<number>(0);
  const draggedOverPerson = useRef<number>(0);
  const [deleteId, setDeleteId] = useState(0);
  const handleDeleteTask = async () => {
    setTasks(tasks.filter((task: any) => task.id !== deleteId));
    setOpenModalDeleted(false);
    setDeleteId(0);
    router.refresh();
  };

  const [editId, setEditId] = useState(0);
  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const updatedTasks = tasks.map((task: any) =>
      task.id === editId ? { ...task, text: taskToEdit } : task
    );
    setTasks(updatedTasks);
    setOpenModalEdit(false);
    router.refresh();
  };

  function handleSort() {
    const peopleClone = [...tasks];
    const temp = peopleClone[dragPerson.current];
    peopleClone[dragPerson.current] = peopleClone[draggedOverPerson.current];
    peopleClone[draggedOverPerson.current] = temp;
    setTasks(peopleClone);
  }

  return (
    <main className="max-w-4xl mx-auto mt-4">
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Todo List App</h1>
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
      {tasks.length === 0 ? (
        <tr>
          <td colSpan={2} className="text-center">
            No tasks to show
          </td>
        </tr>
      ) : (
        tasks.map((task: any, index) => (
          // eslint-disable-next-line react/jsx-key
          <div
            key={task.id}
            className="flex mt-6"
            draggable
            onDragStart={() => (dragPerson.current = index)}
            onDragEnter={() => (draggedOverPerson.current = index)}
            onDragEnd={handleSort}
            onDragOver={(e) => e.preventDefault()}
          >
            <p className="w-full ">{task.text}</p>
            <FiEdit
              onClick={() => {
                setEditId(task.id);
                setTaskToEdit(task.text);
                setOpenModalEdit(true);
              }}
              cursor="pointer"
              className="text-blue-500"
              size={25}
            />
            <FiTrash2
              onClick={() => {
                setDeleteId(task.id);
                setOpenModalDeleted(true);
              }}
              cursor="pointer"
              className="text-red-500 ml-10"
              size={25}
            />
          </div>
        ))
      )}
      <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
        <form onSubmit={handleSubmitEditTodo}>
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
      <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
        <h3 className="text-lg">Are you sure, you want to delete this task?</h3>
        <div className="modal-action">
          <button onClick={() => handleDeleteTask()} className="btn">
            Yes
          </button>
        </div>
      </Modal>
    </main>
  );
}
