import React from "react";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Plus, RotateCcw, ChevronDown, MoveDown, MoveUp } from "lucide-react";
import { categories, filters } from "../lib/utils";
import { useFilters } from "../hooks";

export default function Header({ handleNewTodo }) {
  const { filter, handleFilterChange, handleSortChange, handleResetFilter } =
    useFilters();

  return (
    <div className="flex items-center justify-between w-full container mx-auto p-8">
      <h1 className="text-3xl font-bold">Todo List</h1>
      <div className="flex items-center justify-end space-x-4">
        <Button
          type="button"
          onClick={handleResetFilter}
          className="inline-flex items-center justify-center w-30 space-x-2 cursor-pointer"
        >
          <span className="text-white">Reset Filter</span>
          <RotateCcw size={20} className="text-white" />
        </Button>
        <Menu>
          {({ open }) => (
            <div>
              <MenuButton className="relative inline-flex items-center justify-between w-28 space-x-2 cursor-pointer">
                <div className="text-white flex-col items-start justify-start text-start">
                  <div className="text-sm uppercase text-gray-400">Status</div>
                  <div className="text-white">
                    {filter.isDone === null
                      ? "All"
                      : filter.isDone
                      ? "Done"
                      : "On Going"}
                  </div>
                </div>
                <ChevronDown
                  size={20}
                  className={`text-white transition-transform duration-200 ${
                    open ? "[transform:rotateX(180deg)]" : ""
                  }`}
                />
              </MenuButton>
              <MenuItems
                transition
                anchor="bottom end"
                className="bg-black text-sm rounded-lg p-1 mt-1 w-36 z-10 absolute origin-top-right rounded-xl border-2 border-white/15 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 data-[closed]:translate-y-1 data-[state=open]:animate-slide-in data-[state=closed]:animate-slide-out"
              >
                {filters.map((filter) => (
                  <MenuItem key={filter}>
                    <Button
                      type="button"
                      onClick={() => handleFilterChange("status", filter)}
                      className="bg-transparent hover:bg-white/10 py-1 rounded-md w-full text-white"
                    >
                      {filter}
                    </Button>
                  </MenuItem>
                ))}
              </MenuItems>
            </div>
          )}
        </Menu>
        <Menu>
          {({ open }) => (
            <div>
              <MenuButton className="relative inline-flex items-center justify-between w-38 space-x-2 cursor-pointer">
                <div className="text-white flex-col items-start justify-start text-start">
                  <div className="text-sm uppercase text-gray-400">Type</div>
                  <div className="text-white">{filter.type || "All"}</div>
                </div>
                <ChevronDown
                  size={20}
                  className={`text-white transition-transform duration-200 ${
                    open ? "[transform:rotateX(180deg)]" : ""
                  }`}
                />
              </MenuButton>
              <MenuItems
                transition
                anchor="bottom end"
                className="bg-black text-sm rounded-lg p-1 mt-1 w-36 z-10 absolute origin-top-right rounded-xl border-2 border-white/15 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 data-[closed]:translate-y-1 data-[state=open]:animate-slide-in data-[state=closed]:animate-slide-out"
              >
                <MenuItem>
                  <Button
                    type="button"
                    onClick={() => handleFilterChange("type", "All")}
                    className="bg-transparent hover:bg-white/10 py-1 rounded-md w-full text-white"
                  >
                    All
                  </Button>
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category}>
                    <Button
                      type="button"
                      onClick={() => handleFilterChange("type", category)}
                      className="bg-transparent hover:bg-white/10 py-1 rounded-md w-full text-white"
                    >
                      {category}
                    </Button>
                  </MenuItem>
                ))}
              </MenuItems>
            </div>
          )}
        </Menu>

        <Button
          type="button"
          onClick={handleSortChange}
          className="inline-flex items-center gap-2 cursor-pointer"
        >
          <div className="text-white flex-col items-start justify-start text-start">
            <div className="text-sm uppercase text-gray-400">Date added</div>
            {filter.sortByDate === "asc" ? (
              <div className="flex items-center justify-start space-x-2">
                {" "}
                <span>Oldest</span>
                <MoveUp size={18} />
              </div>
            ) : filter.sortByDate === "desc" ? (
              <div className="flex items-center justify-start space-x-2">
                {" "}
                <span>Newest</span>
                <MoveDown size={18} />
              </div>
            ) : (
              ""
            )}
          </div>
        </Button>
        <Button
          onClick={handleNewTodo}
          className="bg-white inline-flex space-x-2 items-center text-black hover:bg-white/80 cursor-pointer transition-color duration-100 font-bold py-2 px-4 rounded-lg"
        >
          <Plus size={28} />
          <span>Add new Todo</span>
        </Button>
      </div>
    </div>
  );
}
