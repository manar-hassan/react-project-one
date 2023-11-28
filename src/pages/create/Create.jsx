import { Box, InputAdornment, TextField, Button, styled } from "@mui/material";
import { React, useState } from "react";
import { purple } from "@mui/material/colors";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useNavigate } from "react-router-dom";
const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: theme.palette.createBtn.main,
  "&:hover": {
    backgroundColor: theme.palette.createBtn.main,
    scale: "0.99",
  },
}));

const Create = () => {
  const [title, settitle] = useState("");
  const [titleError, settitleError] = useState(false);
  const [price, setprice] = useState(0);
  const [priceError, setpriceError] = useState(false);
  const navigate = useNavigate();
  return (
    <Box sx={{ width: "380px" }} component={"form"} autoComplete="off">
      <TextField
        fullWidth
        label="Title"
        id="filled-start-adornment"
        sx={{ mt: "22px", display: "block" }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">&#128073;</InputAdornment>
          ),
        }}
        variant="filled"
        onChange={(eo) => {
          settitle(eo.target.value);
        }}
        error={titleError}
      />
      <TextField
        fullWidth
        label="Amount"
        id="filled-start-adornment"
        sx={{ mt: "22px", display: "block" }}
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        variant="filled"
        onChange={(eo) => {
          setprice(Number(eo.target.value));
        }}
        error={priceError}
        type="number"
      />
      <ColorButton
        onClick={() => {
          settitleError(true);
          setpriceError(true);

          if (title) {
            settitleError(false);
          }

          if (price) {
            setpriceError(false);
          }
          if (title.trim()&&price) {
            fetch(" http://localhost:3100/mydata", {
              method: "POST",

              headers: {
                "Content-Type": "application/json",
              },

              body: JSON.stringify({ title, price }),
            }).then(() => {
              navigate("/");
            });
          }
        }}
        variant="contained"
        sx={{ mt: "22px" }}
      >
        Submit <KeyboardArrowRightIcon />
      </ColorButton>
    </Box>
  );
};

export default Create;
