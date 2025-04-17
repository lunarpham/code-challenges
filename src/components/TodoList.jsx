import React from "react";
import TodoItem from "./TodoItem";
import { useList } from "../hooks";

export default function TodoList() {
  const {
    filteredTodos,
    expandItem,
    doneTodoCount,
    totalTodoCount,
    handleChangeStatus,
    openDeleteModal,
    openEditModal,
    handleExpandItem,
  } = useList();

  return (
    <div className="space-y-4 w-full container mx-auto p-8">
      <h3>
        {doneTodoCount} of total {totalTodoCount} done. Found{" "}
        {filteredTodos.length} todos matched the filters.
      </h3>
      <div className="space-y-4">
        {filteredTodos.length > 0 ? (
          filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              changeStatus={() => handleChangeStatus(todo.id)}
              deleteTodo={() => openDeleteModal(todo.id)}
              editTodo={() => openEditModal(todo.id)}
              handleExpandItem={() => handleExpandItem(todo.id)}
              expandItem={expandItem}
            />
          ))
        ) : (
          <div className="flex items-center justify-center p-4 bg-white/10 rounded-lg text-sm font-semibold text-gray-500">
            No todos found
          </div>
        )}
      </div>
    </div>
  );
}
