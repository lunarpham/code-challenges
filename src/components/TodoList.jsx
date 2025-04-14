import React, { useMemo } from "react";
import TodoItem from "./TodoItem";
import { useSelector, useDispatch } from "react-redux";
import {
  changeStatus,
  selectedTodo,
  toggleDeleteModal,
  toggleModal,
  setExpandItem,
} from "../store/todoSlice";

export default function TodoList() {
  const dispatch = useDispatch();
  const { todos, filter, expandItem } = useSelector((state) => state.todo);
  const todoList = todos.filter((todo) => todo.isDone === false);
  const todoCount = todoList.length;

  const filteredTodos = useMemo(() => {
    return todos
      .filter((todo) => {
        if (filter.isDone !== null) {
          if (filter.isDone !== todo.isDone) {
            return false;
          }
        }

        if (filter.type !== null) {
          if (filter.type !== todo.type) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);

        if (filter.sortByDate === "asc") {
          return dateA - dateB;
        } else if (filter.sortByDate === "desc") {
          return dateB - dateA;
        }
      });
  }, [todos, filter]);

  const collapsePanel = () => {
    if (expandItem) {
      dispatch(setExpandItem(null));
    }
  };

  const handleChangeStatus = (id) => {
    collapsePanel();
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      const updatedTodo = { ...todo, isDone: !todo.isDone };
      dispatch(changeStatus(updatedTodo));
    }
  };

  const openDeleteModal = (id) => {
    collapsePanel();
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      dispatch(selectedTodo(todo));
      dispatch(toggleDeleteModal());
    }
  };

  const openEditModal = (id) => {
    collapsePanel(); // Close panel before action
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      dispatch(selectedTodo(todo));
      dispatch(toggleModal());
    }
  };

  const handleExpandItem = (id) => {
    dispatch(setExpandItem(expandItem === id ? null : id));
  };

  return (
    <div className="space-y-4 w-full container mx-auto p-8">
      <h3>
        {todos.length - todoCount} of total {todos.length} done. Found{" "}
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
