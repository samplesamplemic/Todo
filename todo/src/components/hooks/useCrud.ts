//hook for POST, PUT, DELETE request
const useCrud = () => {
  const handleCrud = (id?: any, url?: string, data?: any, preview?: any) => {
    const formData = new FormData();
    formData.append("image", preview);
    formData.append(`data`, JSON.stringify(data));
    formData.append("id", id);
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        console.log(response);
      })
      .catch();
    //better??
    // async function delupdate(formData) {
    //   const response = await fetch(url, {
    //     method: "POST",
    //     body: formData,
    //   });
    //   if (!response.ok) {
    //     throw new Error(`Error response code: ${response.status}`);
    //   }
    // }
    // delupdate(formData);
  };
  return { handleCrud };
};

export default useCrud;
