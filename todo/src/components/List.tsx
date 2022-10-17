import React, { useEffect, useState } from "react";
import useCrud from "./hooks/useCrud";
import useFetch from "./hooks/useFetch";
import usePreview from "./hooks/usePreview";
import { Todos } from "./interface/input";
import "./sass/todo.css";
import Todo from "./Todo";

const List = () => {
  const { loading, data, getData } = useFetch();
  const { preview, setPreview, handlePreview } = usePreview();
  const { handleCrud } = useCrud();
  const [upData, setUpdata] = useState({});
  const [show, setShow] = useState<boolean>();
  const [id, setId] = useState<number>();

  //modify and set todo data
  const handleShow = (id) => {
    setShow(!show);
    setId(id);
    setUpdata(data.find((el) => el.id == id));
    data.filter((el) => {
      if (el.id == id) setPreview(el.image);
    });
  };

  //update todo
  const update = (id, url, updata, preview) => {
    setShow(!show);
    handleCrud(id, url, updata, preview);
  };

  //automatically update list ?
  useEffect(() => {
    getData();
  }, [handleCrud]);

  return (
    <>
      <div className="list overflow-x-hidden overflow-y-scroll w-fit px-6 pb-4 mt-4 scrollbar-thin  scrollbar-thumb-[#d4c8b8] scrollbar-track-[#F2EFE6] shadow-inner shadow-[#F2EFE6] rounded-md ">
        {loading && <p>Loading...</p>}
        {data &&
          data.map((el: any) => (
            <div
              key={el.id}
              className="m-auto flex flex-col gap-4 mt-4 glass-component !p-3 "
            >
              <div className="flex justify-between gap-4 items-center">
                <div className="flex flex-row-reverse gap-4">
                  <input
                    type="checkbox"
                    defaultChecked={el.checkbox}
                    className="w-4 h-4 peer self-center accent-[#F2EFE6]  hover:ring-[#F2EFE6] hover:ring-2 rounded transition duration-[0.3s] ease-out"
                    onChange={(e) =>
                      setUpdata((prev) => ({
                        ...prev,
                        checkbox: e.target.checked,
                      }))
                    }
                  />
                  <input
                    className="sm:w-[80%] self-center p-1 peer-checked:bg-green-300 peer-checked:line-through peer-checked:transition-all duration-[250ms] font-medium text-lg rounded-md"
                    defaultValue={el.todo}
                    placeholder="todo..."
                    disabled={show && id == el.id ? false : true}
                    onChange={(e) =>
                      setUpdata((prev) => ({ ...prev, todo: e.target.value }))
                    }
                  />
                </div>
                <div className="btn-sm flex sm:flex-col">
                  <button
                    className=" min-w-[1.7rem] h-6 pr-1 border-r border-white sm:p-0 sm:border-r-0 "
                    onClick={() =>
                      handleCrud(el.id, "http://localhost:4000/delete")
                    }
                  >
                    X
                  </button>
                  <button
                    className=" pl-1 border-l border-white sm:p-0 sm:border-l-0 sm:border-t sm:border-white"
                    onClick={() => handleShow(el.id)}
                  >
                    <svg
                      style={{ width: "24px", height: "24px" }}
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M16.84,2.73C16.45,2.73 16.07,2.88 15.77,3.17L13.65,5.29L18.95,10.6L21.07,8.5C21.67,7.89 21.67,6.94 21.07,6.36L17.9,3.17C17.6,2.88 17.22,2.73 16.84,2.73M12.94,6L4.84,14.11L7.4,14.39L7.58,16.68L9.86,16.85L10.15,19.41L18.25,11.3M4.25,15.04L2.5,21.73L9.2,19.94L8.96,17.78L6.65,17.61L6.47,15.29"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <hr />
              <div className="flex gap-2 justify-between">
                <div className="flex gap-2 flex-wrap w-full">
                  {el.image.length > 15 ? (
                    <img
                      src={el.image}
                      alt=""
                      className="rounded-md w-20 h-20 sm:hidden"
                    />
                  ) : null}
                  {show && id == el.id ? (
                    <div className="flex gap-4 order-2 flex-col">
                      <img
                        src={preview}
                        alt="preview"
                        className="w-20 h-20 rounded-md mb-2 sm:hidden"
                      />

                      <label htmlFor="image">
                        <input
                          type="file"
                          className="rounded-md mb-4 w-24 sm:hidden"
                          onChangeCapture={(e) => handlePreview(e)}
                        />
                      </label>
                    </div>
                  ) : null}
                  <label
                    htmlFor="description"
                    className="w-[calc(100%-5.5rem)] sm:w-full"
                  >
                    <textarea
                      placeholder="description..."
                      defaultValue={el?.description}
                      className="todo-shadow p-2 w-full rounded-md"
                      disabled={show && id == el.id ? false : true}
                      onChange={(e) =>
                        setUpdata((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                    />
                  </label>
                </div>
              </div>
              {show && id == el.id ? (
                <button
                  onClick={() =>
                    update(
                      el.id,
                      "http://localhost:4000/update",
                      upData,
                      preview
                    )
                  }
                  className="btn"
                >
                  Save
                </button>
              ) : null}
            </div>
          ))}
      </div>
    </>
  );
};

export default List;
