import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { toggleDeleteModal, toggleModal } from "../store/todoSlice";

export const useModal = (isDeleteModal) => {
  const dispatch = useDispatch();
  const { showModal, showDeleteModal } = useSelector((state) => state.todo);
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const modalState = isDeleteModal ? showDeleteModal : showModal;
    setIsOpen(modalState);
  }, [showDeleteModal, showModal, isDeleteModal]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const closeModal = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (isDeleteModal) {
        dispatch(toggleDeleteModal());
      } else {
        dispatch(toggleModal());
      }
    }, 100);
  };

  const openModal = () => {
    if (isDeleteModal) {
      dispatch(toggleDeleteModal());
    } else {
      dispatch(toggleModal());
    }
  };

  return {
    isOpen,
    isVisible,
    closeModal,
    openModal,
  };
};
