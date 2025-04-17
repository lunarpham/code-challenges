import React from "react";
import Header from "./Header";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import DeleteModal from "./DeleteModal";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../store/todoSlice";

export default function AppContent({ state }) {
  const dispatch = useDispatch();
  const { showModal, showDeleteModal, selectedTodo } = useSelector(
    (state) => state.todo
  );
  const handleNewTodo = () => {
    dispatch(toggleModal());
  };

  return (
    <div className="bg-black text-white min-h-screen max-w-full flex flex-col items-center justify-start">
      <Header handleNewTodo={handleNewTodo} />
      <TodoList />
      {showModal && <TodoForm selectedTodo={selectedTodo} />}
      {showDeleteModal && <DeleteModal />}
    </div>
  );
}
