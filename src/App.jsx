import { useEffect } from "react";
import { useState } from "react";
import classes from "./styles.module.css";
import TodoItem from "./components/todoItem";
import TodoDetails from "./components/todoDetails/todoDetails";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [todoDetails, setToDoDetails] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  //3.18.27
  async function fetchListOfTodos() {
    try {
      setLoading(true);
      const apiResponse = await fetch("https://dummyjson.com/todos");
      const result = await apiResponse.json();
      if (result?.todos && result?.todos?.length > 0) {
        setTodoList(result?.todos);
        setLoading(false);
        setErrorMsg("");
      } else {
        setTodoList([]);
        setLoading(false);
        setErrorMsg("");
      }
    } catch (error) {
      setErrorMsg("some error occured");
    }
  }

  async function fetchDetailsOfCurrentTodo(getCurrentTodoId) {
    console.log(getCurrentTodoId);
    try {
      const apiResponse = await fetch(
        `https://dummyjson.com/todos/${getCurrentTodoId}`
      );
      const details = await apiResponse.json();
      // console.log(details);
      if (details) {
        setToDoDetails(details);
        setOpenDialog(true);
      } else {
        setToDoDetails(null);
        setOpenDialog(false);
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchListOfTodos();
  }, []);

  return (
    <div className={classes.mainwrapper}>
      <h1 className={classes.header}>Simple TODO App with material UI</h1>
      <div className={classes.todoListWrapper}>
        {todoList && todoList.length > 0
          ? todoList.map((todoItem) => (
              <TodoItem
                fetchDetailsOfCurrentTodo={fetchDetailsOfCurrentTodo}
                todo={todoItem}
              />
            ))
          : null}
      </div>
      <TodoDetails
        setOpenDialog={setOpenDialog}
        openDialog={openDialog}
        todoDetails={todoDetails}
        setToDoDetails={setToDoDetails}
      />
    </div>
  );
}

export default App;
