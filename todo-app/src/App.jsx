import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaRegEdit } from "react-icons/fa"; // edit icon
import { RiDeleteBin2Line } from "react-icons/ri"; // delete icon

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(false);

  // Clear All button to make
  const clearAll = () => {
    setTodos([]);
  };

  // saving and loading items from Local Storage
  useEffect(() => {
    let tdos = JSON.parse(localStorage.getItem("items"));
    if (tdos) {
      setTodos(tdos);
    }
  }, []);

  const saveToLocalStorage = () => {
    localStorage.setItem("items", JSON.stringify(todos));
  };

  useEffect(() => {
    saveToLocalStorage();
  }, [todos]);

  const handleAdd = (e) => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    let addUpBtn = document.getElementById("addUpBtn");
    if (addUpBtn.innerHTML === "Update") {
      addUpBtn.innerHTML = "Add";
    }
  };

  const handleEdit = (e, id) => {
    let td = todos.filter((item) => item.id === id);
    setTodo(td[0].todo);
    handleDelete(e, id);
    let addUpBtn = document.getElementById("addUpBtn");
    addUpBtn.innerHTML = "Update";
  };

  const handleDelete = (e, id) => {
    const todoId = id;
    setTodos(todos.filter((item) => item.id !== todoId));
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((itm) => itm.id === id);
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  // this will toggle the show finised to true/false
  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  // this todosToDisplay will use to display the todos
  const todosToDisplay = showFinished
    ? todos
    : todos.filter((item) => !item.isCompleted);

  return (
    <>
      <Navbar />

      <div className="container mx-auto md:my-5 p-7 bg-violet-100 w-full m-2 md:w-2/4 rounded-2xl flex flex-col items-center gap-7 min-h-[85vh] shadow-lg shadow-slate-300">
        <h1 className="text-2xl font-bold text-center">
          ToDoEase - Stay on Track, Get Things Done
        </h1>

        <div className="addTodo w-full">
          <label htmlFor="todo" className="text-lg font-semibold">
            Add a Todo
          </label>
          <div className="flex gap-5 items-center">
            <input
              className="w-full p-1 rounded-md my-3 drop-shadow-xl placeholder:text-sm placeholder:font-thin"
              value={todo}
              onChange={handleChange}
              type="text"
              id="todo"
              placeholder="Enter atlest 3 words..."
            />
            <button
              onClick={handleAdd}
              className="bg-violet-900 font-bold rounded-md w-[75px] h-[35px] text-white drop-shadow-xl"
              id="addUpBtn"
              disabled={todo.length < 3}
            >
              Add
            </button>
          </div>
        </div>

        <div className="todos w-full">
          <div className="flex justify-between">
            <h2 className="text-xl my-1 font-bold ">Your Todos</h2>
            <span className="flex items-center justify-center">
              <input
                onChange={toggleFinished}
                type="checkbox"
                checked={showFinished}
                className="mx-1 w-4 h-4 cursor-pointer"
                id="showFinishTasks"
              />{" "}
              <label htmlFor="showFinishTasks" className="select-none cursor-pointer">
                Show Finished
              </label>
            </span>
          </div>
          <div className="line h-[1px] bg-gray-300 my-2"></div>
          {todos.length === 0 && (
            <div className="m-5">All clear. What's next?</div>
          )}
          {todosToDisplay.map((item) => {
            return (
              <div
                key={item.id}
                className="todo flex justify-between my-4 items-center gap-10"
              >
                <div className="flex gap-3 items-center">
                  <input
                    type="checkbox"
                    className="w-[12px] h-[12px] "
                    onChange={handleCheckbox}
                    name={item.id}
                    checked={item.isCompleted}
                  />
                  <div
                    className={`${
                      item.isCompleted ? "line-through" : ""
                    } w-full`}
                  >
                    {item.todo}
                  </div>
                </div>
                <div className="buttons flex gap-5">
                  <button
                    onClick={(e) => {
                      handleEdit(e, item.id);
                    }}
                    className="bg-violet-900 font-bold rounded-md w-[40px] h-[30px] text-white text-sm text-center flex justify-center items-center"
                  >
                    <span>
                      <FaRegEdit className="w-5 h-4" />
                    </span>
                  </button>
                  <button
                    onClick={(e) => {
                      handleDelete(e, item.id);
                    }}
                    className="bg-violet-900 font-bold rounded-md w-[40px] h-[30px] text-white text-sm text-center flex justify-center items-center"
                  >
                    <span>
                      <RiDeleteBin2Line className="w-6 h-5" />
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <button
          className={
            todos.length &&
            "bg-red-200 w-[200px] h-[35px] rounded-[7px] font-semibold"
          }
          onClick={clearAll}
        >
          {todos.length ? "Clear All" : ""}
        </button>
      </div>
    </>
  );
}

export default App;
