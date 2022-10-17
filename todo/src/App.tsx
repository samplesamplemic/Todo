import React from "react";
import Todo from "./components/Todo";
import List from "./components/List";

function App() {
  return (
    <>
      <div className="bg overflow-hidden ">
        <div className="w-fit m-auto pt-4 sm:w-80">
          <h1 className="mb-2 ml-2">
            Todo <sub>byMic</sub>
          </h1>
          <Todo />
          <List />
        </div>
      </div>
    </>
  );
}

export default App;
