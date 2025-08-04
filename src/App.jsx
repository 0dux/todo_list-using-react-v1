import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const App = () => {
  const [Todos, setTodos] = useState([]);
  const [Todo, setTodo] = useState("");

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(Todos));
  }, [Todos]);

  // const save = () => {
  //   localStorage.setItem("todos", JSON.stringify(Todos));
  // };

  const handleAddTodo = () => {
    if (Todo.trim() == "") {
      return alert("Empty todo cannot be added!!!");
    }
    const newTodo = {
      id: Date.now(),
      title: Todo,
      isCompleted: false,
      isEditing: false,
    };
    setTodos([...Todos, newTodo]);
    setTodo("");
    save();
  };

  const handleDeleteTodo = (id) => {
    const newTodos = Todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(newTodos);
    save();
  };

  const handleCompletedTodo = (id) => {
    const updatedTodo = Todos.map((todo) => {
      if (todo.id == id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });

    setTodos(updatedTodo);
    save();
  };

  const handleEditTodo = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isEditing: !todo.isEditing };
        }
        return todo;
      });
    });
    save();
  };

  const updateTodoText = (id, newText) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, title: newText };
        }
        return todo;
      })
    );
  };

  return (
    <div className="bg-[url('/background.gif')] h-screen bg-cover bg-center flex items-center justify-center">
      <div className="bg-black/30 backdrop-blur-sm h-[80%] w-[60%] rounded-2xl border-4 border-blue-900 max-h-[80%] overflow-y-auto">
        <div className="w-full">
          <div className="title font-extrabold text-6xl text-gray-300 m-10 h-fit text-center">
            To-do List
          </div>

          <div className="flex justify-center">
            <input
              type="text"
              placeholder="Enter a todo..."
              onKeyDown={(e) => {
                e.key === "Enter" ? handleAddTodo() : null;
              }}
              onChange={(e) => {
                setTodo(e.target.value);
              }}
              value={Todo}
              className="p-2 px-2 bg-sky-200/15 rounded-2xl w-[75%]  text-white border-gray-300 focus:border-blue-500 focus:border-2 focus:outline-none focus:shadow-md transition duration-200"
            />
            <button
              onClick={handleAddTodo}
              className="mx-7 p-3 font-bold text-md bg-indigo-900 hover:bg-indigo-800 rounded-2xl text-white cursor-pointer"
            >
              Add +
            </button>
          </div>

          <div className="mt-10">
            <div className="font-bold text-4xl pl-4 text-white">
              Your tasks:
            </div>

            <div className="flex justify-center items-center">
              {Todos.length == 0 ? (
                <div className="text-4xl font-bold text-red-900">
                  No Todos to display
                </div>
              ) : (
                <>
                  <div className="w-screen mt-3 bg-black/15 shadow-[0_-8px_15px_rgba(0,0,0,0.8),0_8px_15px_rgba(0,0,0,0.8)] shadow-black/50 rounded-xl">
                    {Todos.map((todo) => {
                      return (
                        <div
                          key={todo.id}
                          className="mt-4 pb-4 flex items-center justify-between text-lg text-white font-medium"
                        >
                          <div className="flex items-center gap-3 ml-2">
                            <button
                              onClick={() => handleCompletedTodo(todo.id)}
                              className={
                                todo.isCompleted
                                  ? "w-5 h-5 bg-[url('/tick.svg')] bg-center bg-contain bg-no-repeat"
                                  : "w-5 h-5 border-2 border-white rounded-full hover:border-4 hover:border-green-600 cursor-pointer"
                              }
                            ></button>
                            {todo.isEditing ? (
                              <>
                                <input
                                  type="text"
                                  value={todo.title}
                                  onChange={(e) =>
                                    updateTodoText(todo.id, e.target.value)
                                  }
                                  onBlur={() => handleEditTodo(todo.id)}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      handleEditTodo(todo.id);
                                    }
                                  }}
                                  autoFocus
                                  className="bg-transparent border-b border-white text-white focus:outline-none"
                                />
                                <button
                                  className="cursor-pointer"
                                  onClick={() => handleEditTodo(todo.id)}
                                >
                                  save
                                </button>
                              </>
                            ) : (
                              <p
                                onClick={() => handleCompletedTodo(todo.id)}
                                className={
                                  todo.isCompleted
                                    ? "col-span-7 line-through cursor-pointer"
                                    : "col-span-7 cursor-pointer"
                                }
                              >
                                {todo.title}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-3 mr-2">
                            <button
                              onClick={() => handleEditTodo(todo.id)}
                              className="col-span-1 text-yellow-700 hover:text-yellow-300 cursor-pointer"
                            >
                              <FaEdit size={25} />
                            </button>
                            <button
                              onClick={() => handleDeleteTodo(todo.id)}
                              className="col-span-1 cursor-pointer text-red-900 hover:text-red-600"
                            >
                              <MdDeleteForever size={30} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
