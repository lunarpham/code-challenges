import React from "react";
import { Trash2, Pencil, Check, RotateCcw, ChevronDown } from "lucide-react";
import { convertISOToDate } from "../lib/utils";
import { Fragment } from "react";

export default function TodoItem({
  todo,
  changeStatus,
  deleteTodo,
  editTodo,
  expandItem,
  handleExpandItem,
}) {
  const isOpen = expandItem === todo.id;
  return (
    <div
      className={`w-full p-4 rounded-lg bg-white/10 grid grid-cols-12 items-center transition duration-200 ${
        todo.isDone ? "opacity-50" : ""
      }`}
    >
      <div className="col-span-8 flex flex-col">
        <span
          className={`font-semibold text-lg ${
            todo.isDone ? "line-through" : ""
          }`}
        >
          {todo.title}
        </span>
        <div className="flex items-center justify-start space-x-2">
          <p className="text-xs uppercase text-gray-500">
            {convertISOToDate(todo.createdAt)}
          </p>
          <span className="text-xs uppercase font-medium h-fit w-fit rounded-sm px-2 bg-white/15 text-gray-400">
            {todo.type === "Do not indicate" ? "" : todo.type}
          </span>
        </div>
      </div>
      <div className="col-span-2 flex items-center justify-center">
        <div
          className={`text-xs inline-flex items-center gap-2 w-fit font-medium uppercase rounded-sm px-2 py-1
            ${
              todo.isDone
                ? "bg-green-500/10 text-green-400"
                : "bg-orange-500/10 text-orange-300"
            }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              todo.isDone ? "bg-green-500" : "bg-orange-500"
            }`}
          ></span>
          <span>{todo.isDone ? "Done" : "On Going"}</span>
        </div>
      </div>
      <div className="col-span-2 flex flex-col items-end justify-center space-y-1">
        <div className="flex justify-end space-x-4 mt-1">
          <button
            type="button"
            onClick={editTodo}
            className="bg-transparent cursor-pointer text-gray-500 hover:text-white/80 font-bold rounded-lg"
          >
            <Pencil size={18} />
          </button>
          <button
            type="button"
            onClick={changeStatus}
            className="bg-transparent cursor-pointer text-gray-500 hover:text-white/80 font-bold rounded-lg"
          >
            {todo.isDone ? <RotateCcw size={20} /> : <Check size={20} />}
          </button>
          <button
            type="button"
            onClick={deleteTodo}
            className="bg-transparent cursor-pointer text-red-700 hover:text-red-900 font-bold rounded-lg"
          >
            <Trash2 size={20} />
          </button>
        </div>
        <button
          onClick={handleExpandItem}
          className="inline-flex items-center gap-1 text-sm uppercase text-gray-500 cursor-pointer hover:text-white/80 font-semibold rounded-lg transition duration-100 ease-in-out"
        >
          <div className="flex items-center justify-between gap-1">
            <span>{isOpen ? "Collapse" : "Expand"}</span>
            <ChevronDown
              size={16}
              className={`transition-transform duration-200 ${
                isOpen ? "[transform:rotateX(180deg)]" : ""
              }`}
            />
          </div>
        </button>
      </div>
      <div
        as={Fragment}
        className={`col-span-12 overflow-hidden origin-top transition-all duration-300 ease-in-out ${
          isOpen
            ? "max-h-96 opacity-100 scale-y-100"
            : "max-h-0 opacity-0 scale-y-90"
        }`}
      >
        <p className="w-full text-sm text-gray-400 mt-4">{todo.description}</p>
      </div>
    </div>
  );
}
