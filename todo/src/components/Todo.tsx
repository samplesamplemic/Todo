import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import useFetch from "./hooks/useFetch";
import usePreview from "./hooks/usePreview";
import { Todos } from "./interface/input";
import "./sass/todo.css";
import $ from "jquery";
import useCrud from "./hooks/useCrud";

const Todo = (props) => {
  const { getData } = useFetch();
  const { preview, handlePreview } = usePreview();
  const { register, handleSubmit } = useForm<Todos>();
  const { handleCrud } = useCrud();

  //animation
  const handleShow = () => {
    $(".anim").toggleClass("animshow");
    $(".list").toggleClass("list-height");
  };

  const onSubmit: SubmitHandler<Todos> = (data) => {
    handleCrud(null, "http://localhost:4000/upload", data, preview);

    console.log(data);
  };

  //automatically update list?
  useEffect(() => {
    getData();
  }, [register]);

  return (
    <>
      <div
        className="btn mb-2 !w-36 cursor-pointer"
        onClick={() => handleShow()}
      >
        Add Todo...
      </div>
      <div className="glass-component anim !p-3 !w-full">
        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className=" flex flex-col sm:h-full sm:justify-between"
        >
          <div className="mb-2">
            <label htmlFor="todos">
              <input
                type="text"
                placeholder="todo..."
                className="todo-shadow pl-4 mr-4 h-9 w-[88%] rounded-md "
                {...register("todo")}
              />
            </label>

            <label htmlFor="checkbox">
              <input
                type="checkbox"
                className="w-4 h-4 accent-[#F2EFE6]  hover:ring-[#F2EFE6] hover:ring-2 rounded transition duration-[0.3s] ease-out"
                {...register("checkbox")}
              />
            </label>
          </div>
          <hr />
          <div className="flex gap-2 mt-2">
            <img
              src={preview}
              alt=""
              className="w-20 h-20 rounded-md mb-2 sm:hidden"
            />

            <label htmlFor="description" className="w-full">
              <textarea
                placeholder="description..."
                className="todo-shadow pl-4 w-full h-24 max-h-24 mr-4 rounded-md"
                {...register("description")}
              />
            </label>
          </div>
          <div>
            <label htmlFor="image">
              <input
                type="file"
                className="rounded-md mb-4 w-24 sm:hidden"
                onChangeCapture={(e) => handlePreview(e)}
                {...register("image")}
              />
            </label>
          </div>
          <div>
            <button type="submit" className="btn w-full">
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Todo;
