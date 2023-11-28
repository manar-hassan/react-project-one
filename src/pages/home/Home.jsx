import { React, useState, useEffect } from "react";
import "./Home.css";
import { Box, Paper, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Home = () => {
  const [mydata, setmydata] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3100/mydata")
      .then((response) => response.json())
      .then((data) => setmydata(data));
  }, []);
  const handleDelete = (item) => {
    fetch(`http://localhost:3100/mydata/${item.id}`, {
      method: "DELETE",
    });
    const newArr = mydata.filter((myObj) => {
      return myObj.id !== item.id;
    });
    setmydata(newArr);
  };
  let totalPrice = 0;
  return (
    <Box sx={{ width: "366px" }}>
      {mydata.map((item) => {
        totalPrice += item.price;
        return (
          <Paper
            key={item.id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: "22px",
              pt: "27px",
              bm: "7px",
              position: "relative",
            }}
          >
            <Typography variant="h6" sx={{ ml: "16px", fontSize: "1.3em" }}>
              {item.title}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mr: "33px",
                fontSize: "1.4em",
                opacity: "0.8",
                fontWeight: 500,
              }}
            >
              ${item.price}
            </Typography>
            <IconButton
              onClick={() => {
                handleDelete(item);
              }}
              sx={{ position: "absolute", top: "0", right: "0" }}
            >
              <CloseIcon sx={{ fontSize: "20px" }} />
            </IconButton>
          </Paper>
        );
      })}
      <Typography mt="30px" textAlign="center" variant="h5">
        &#128073; You spend ${totalPrice}
      </Typography>
    </Box>
  );
};

export default Home;
