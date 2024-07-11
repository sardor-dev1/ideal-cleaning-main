import React, { useEffect, useState } from "react";
import GlobalTable from "../../components/ui/globalTable";
import useClientStore from "../../store/clients";
import GlobalPagination from "../../components/ui/globalPogination";
const index = () => {
  const { getClient, client, totalCount, deleteClient } = useClientStore();
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
  });
  const headers = [
    { title: "№", value: "index" },
    { title: "Client name", value: "full_name" },
    { title: "Phone number", value: "phone_number" },
    { title: "Action", value: "action" },
  ];
  useEffect(() => {
    getClient(params);
  }, [params, getClient]);
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = params.get("page");
    const pageNumber = page ? parseInt(page) : 1;
    setParams((prevParams) => ({
      ...prevParams,
      page: pageNumber,
    }));
  }, [location.search]);
  const changePage = (value) => {
    setParams((prevParams) => ({
      ...prevParams,
      page: value,
    }));
  };
  const deleteData = async (id) => {
    await deleteClient(id, localStorage.getItem("user_id"));
  }
  return (
    <>
      <GlobalTable headers={headers} body={client} noneEdit={true} deleteItem={deleteData} />
      <GlobalPagination
        totalCount={totalCount}
        page={params.page}
        setParams={changePage}
        path="/clients"
      />
    </>
  );
};

export default index;
