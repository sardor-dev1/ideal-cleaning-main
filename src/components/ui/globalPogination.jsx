import * as React from "react";
import Stack from "@mui/material/Stack";
import { Pagination } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
export default function GlobalPagination(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const handleChange = (event, value) => {
    props.setParams(value);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", `${value}`);
    navigate(`${props.path}?${searchParams}`)
  };

  return (
    <Stack spacing={2}>
      <Pagination count={props.totalCount} page={props.page} onChange={handleChange} />
    </Stack>
  );
}
