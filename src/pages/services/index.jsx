import GlobalTable from "../../components/ui/globalTable";
import { useEffect, useState } from "react";
import { Button, IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Modal from "../../components/modal/services";
import useServiceStore from "../../store/services";
import Notification from "../../utils/notification";
import GlobalPagination from "../../components/ui/globalPogination"
const index = () => {
  const { getData, data, isLoading, deleteData, totalCount } = useServiceStore();
  const [modal, setModal] = useState(false);
  const [item, setItem] = useState({});
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    getData(params);
  }, [params, getData]);
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
  data?.forEach((item, index) => {
    item.index = 
    params.page * params.limit - 
    (params.limit - 1) + index
  })
  const headers = [
    { title: "№", value: "index" },
    { title: "Service name", value: "name" },
    { title: "Service price", value: "price" },
    { title: "Action", value: "action" },
  ];
  const editItem = (item) => {
    setModal(true);
    setItem(item);
  }
  const handleClose = () => {
    setModal(false);
    setItem({});
  }
  
  const deleteItem = async (id) => {
    const status = await deleteData(id);
    if (status === 200) {
      Notification({
        title: "deleted service successfully",
        type: "success",
      });
    } else {
      Notification({
        title: "Failed to delete service",
        type: "error",
      });
    }
  }
  return (
    <div>
      {modal && <Modal open={modal} handleClose={handleClose} item={item}/>}
      <div className="py-3 flex justify-between items-center">
        <div className="w-96">
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: "400",
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
              inputProps={{ "aria-label": "Search google maps" }}
            />
            <IconButton sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>
        <Button variant="contained" color="primary" onClick={()=>setModal(true)}>
        Add new service
      </Button>
      </div>
      <GlobalTable
        headers={headers}
        body={data}
        isLoading={isLoading}
        editItem={editItem}
        deleteItem={deleteItem}
        noneEdit={false}
      />
      <GlobalPagination
        totalCount={totalCount}
        page={params.page}
        setParams={changePage}
        path="/services"
      />
    </div>
  );
};

export default index;
