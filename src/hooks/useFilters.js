import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../store/todoSlice";

export const useFilters = () => {
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state.todo);
  const handleFilterChange = (filterType, value) => {
    const newFilter = { ...filter };
    if (filterType === "status") {
      newFilter.isDone =
        value === "All" ? null : value === "Done" ? true : false;
    } else if (filterType === "type") {
      newFilter.type = value === "All" ? null : value;
    }

    dispatch(setFilter(newFilter));
  };

  const handleSortChange = () => {
    const newFilter = { ...filter };
    newFilter.sortByDate = newFilter.sortByDate === "asc" ? "desc" : "asc";
    dispatch(setFilter(newFilter));
  };

  const handleResetFilter = () => {
    const newFilter = { ...filter };
    newFilter.type = null;
    newFilter.isDone = null;
    newFilter.sortByDate = "desc";
    dispatch(setFilter(newFilter));
  };

  return {
    filter,
    handleFilterChange,
    handleSortChange,
    handleResetFilter,
  };
};
