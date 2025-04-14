import React, { useEffect, useState } from "react";
import { X, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, toggleDeleteModal } from "../store/todoSlice";

export default function DeleteModal() {
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const { selectedTodo } = useSelector((state) => state.todo);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(!isVisible), 50);
    return () => clearTimeout(timer);
  }, []);

  const closeModal = () => {
    setIsVisible(!isVisible);
    setTimeout(() => dispatch(toggleDeleteModal()), 100);
  };

  const handleDelete = () => {
    if (selectedTodo) {
      dispatch(deleteTodo(selectedTodo.id));
      closeModal();
    }
  };

  if (!selectedTodo) return null; // Ensure selectedTodo is not null

  return (
    <div
      className="fixed w-full inset-0 min-h-screen overflow-y-auto flex flex-col items-center justify-center p-8 bg-white/10 z-10 backdrop-blur-sm transition duration-100 ease-in-out opacity-0 data-[visible=true]:opacity-100"
      data-visible={isVisible}
    >
      <div
        className={`w-6/12 rounded-xl mx-auto p-8 bg-black border-2 border-white/10 transition-all duration-300 ease-out transform ${
          isVisible ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Delete</h3>
          <button
            onClick={closeModal}
            type="button"
            className="bg-transparent cursor-pointer text-gray-500 hover:text-white/80 font-bold rounded-lg"
          >
            <X size={30} />
          </button>
        </div>
        <div className="space-y-4 mt-3">
          <p className="mt-2">Are you sure want to delete this Todo?</p>
          <div className="flex flex-col items-start justify-start p-3 bg-white/10 rounded-lg text-sm font-semibold text-gray-500">
            <div>
              Todo ID: <span className="text-white">{selectedTodo.id}</span>{" "}
            </div>
            <div>
              Todo Title:{" "}
              <span className="text-white">{selectedTodo.title}</span>
            </div>
          </div>
          <div className="flex items-center justify-end space-x-4 mt-5">
            <button
              type="button"
              onClick={handleDelete}
              className="inline-flex items-center gap-1 bg-red-900/20 text-red-500 font-bold py-2 px-4 rounded-lg hover:bg-red-900/30 transition duration-150 ease-in-out cursor-pointer"
            >
              <Trash2 size={16} />
              Delete
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="inline-flex items-center gap-1 bg-white/20 text-white/60 font-bold py-2 px-4 rounded-lg hover:bg-white/30 transition duration-150 ease-in-out cursor-pointer"
            >
              <X size={20} />
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
