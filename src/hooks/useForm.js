import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNewTodo, updateTodo } from "../store/todoSlice";
import { categories } from "../lib/utils";

const defaultTodoForm = {
  title: "",
  type: categories[0] || "Work",
  description: "",
};

export const useForm = (selectedTodo) => {
  const dispatch = useDispatch();
  const [todoForm, setTodoForm] = useState(defaultTodoForm);

  useEffect(() => {
    if (selectedTodo) {
      setTodoForm({
        id: selectedTodo.id,
        title: selectedTodo.title || "",
        type: selectedTodo.type || defaultTodoForm.type,
        description: selectedTodo.description || "",
        isDone: selectedTodo.isDone,
        createdAt: selectedTodo.createdAt,
      });
    } else {
      setTodoForm(defaultTodoForm);
    }
  }, [selectedTodo]);

  const updateFormField = (field, value) => {
    setTodoForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedTodo) {
      dispatch(updateTodo(todoForm));
    } else {
      dispatch(addNewTodo(todoForm));
    }
  };

  return {
    todoForm,
    updateFormField,
    handleSubmit,
    selectedTodo,
  };
};
