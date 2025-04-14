import React, { useEffect, useState } from "react";
import { Select } from "@headlessui/react";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addNewTodo, toggleModal, updateTodo } from "../store/todoSlice";
import { categories } from "../lib/utils";

export default function TodoForm() {
  const dispatch = useDispatch();
  const { selectedTodo } = useSelector((state) => state.todo);
  const [isVisible, setIsVisible] = useState(false);
  const [todoForm, setTodoForm] = useState(() => {
    return {
      title: "",
      type: "Work",
      description: "",
    };
  });

  console.log(todoForm);

  useEffect(() => {
    if (selectedTodo) {
      setTodoForm(selectedTodo);
    }
  }, [selectedTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedTodo) {
      dispatch(updateTodo(todoForm));
    } else {
      dispatch(addNewTodo(todoForm));
    }
    closeModal();
  };

  const closeModal = () => {
    setIsVisible(!isVisible);
    setTimeout(() => dispatch(toggleModal()), 100);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(!isVisible), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="fixed w-full inset-0 min-h-screen overflow-y-auto flex flex-col items-center justify-start p-8 bg-white/10 z-10 backdrop-blur-sm transition duration-100 ease-in-out opacity-0 data-[visible=true]:opacity-100"
      data-visible={isVisible}
    >
      <div
        className={`w-6/12 rounded-xl mx-auto p-8 bg-black border-2 border-white/10 transition-all duration-300 ease-out transform ${
          isVisible ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Create a new todo</h3>
          <button
            onClick={closeModal}
            type="button"
            className="bg-transparent cursor-pointer text-gray-500 hover:text-white/80 font-bold rounded-lg"
          >
            <X size={30} />
          </button>
        </div>
        <form className="space-y-4 mt-5" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <div className="font-bold text-gray-400">Todo Title</div>
            <input
              type="text"
              required
              value={todoForm.title}
              onChange={(e) =>
                setTodoForm({ ...todoForm, title: e.target.value })
              }
              placeholder="Add a title for your Todo..."
              className="bg-white/20 rounded-md p-3 text-sm w-full focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-transparent placeholder:text-gray-400 transition duration-100"
            />
          </div>
          <div className="space-y-1">
            <div className="font-bold text-gray-400">Todo Type</div>
            <Select
              type="text"
              required
              value={todoForm.type}
              onChange={(e) =>
                setTodoForm({ ...todoForm, type: e.target.value })
              }
              placeholder="Add a type for your Todo..."
              className="bg-white/20 rounded-md p-3 text-sm w-full focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-transparent placeholder:text-gray-400 transition duration-100"
            >
              {categories.map((type) => (
                <option key={type} value={type} className="text-black">
                  {type}
                </option>
              ))}
            </Select>
          </div>
          <div className="space-y-1">
            <div className="font-bold text-gray-400">Description</div>
            <textarea
              type="text"
              required
              value={todoForm.description}
              onChange={(e) =>
                setTodoForm({ ...todoForm, description: e.target.value })
              }
              placeholder="Add a title for your Todo..."
              className="bg-white/20 rounded-md resize-none h-48 p-3 text-sm w-full focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-transparent placeholder:text-gray-400 transition duration-100"
            />
          </div>
          <div className="space-y-1">
            <button
              type="submit"
              className="mt-2 w-full py-3 bg-white text-black font-lg uppercase font-bold rounded-md hover:bg-white/80 transition duration-100 cursor-pointer"
            >
              {selectedTodo ? "Update Todo" : "Create Todo"}
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="mt-2 w-full py-3 bg-white/20 text-white/60 font-lg
              uppercase font-bold rounded-md hover:bg-white/30 transition
              duration-100 cursor-pointer"
            >
              {" "}
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
