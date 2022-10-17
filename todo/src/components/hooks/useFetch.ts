import { useEffect, useState } from "react";

const useFetch = () => {
  const [data, setData] = useState([]);
  async function getData() {
    const response = await fetch("http://localhost:4000/todos");
    const data = await response.json();
    setData(data);
    //console.log(data);
  }
  useEffect(() => {
    getData();
  }, []);
  return { loading: !data, data, getData };
};

export default useFetch;

// import useSWR from "swr";
// const fetcher = (url) => fetch(url).then((res) => res.json());
// const useFetch = () => {
//   const { data, error, mutate } = useSWR(
//     "http://localhost:4000/todos",
//     fetcher
//   );

//   return { loading: !data && !error, data, mutate };
// };

// export default useFetch;
