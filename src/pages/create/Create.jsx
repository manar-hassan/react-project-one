import {
  Box,
  InputAdornment,
  TextField,
  Button,
  styled,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import { purple } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
import { AddCircleOutline, ArrowForward } from "@mui/icons-material";

import UserCreate from "./UserCreate";
import Loading from "pages/loading/Loading";
import ErrorComponent from "pages/error/ErrorComponent";
import { Helmet } from "react-helmet-async";
const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: theme.palette.mode,
  "&:hover": {
    backgroundColor: theme.palette.mode,
    scale: "0.99",
  },
}));

const Create = ({
  title,
  settitle,
  price,
  setprice,
  month,
  setmonth,
  array,
  setarray,
}) => {
  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();
  useEffect(() => {
    if (!user && !loading) {
      navigate("/");
    }
    if (user) {
      if (!user.emailVerified) {
        navigate("/");
      }
    }
  });

  const [titleError, settitleError] = useState(false);

  const [priceError, setpriceError] = useState(false);

  const [monthError, setmonthError] = useState(false);
  const [showLoading, setshowLoading] = useState(false);

  const addBtn = () => {
    settitleError(true);
    setpriceError(true);
    if (title) {
      settitleError(false);
    }

    if (price) {
      setpriceError(false);
    }
    if (title.trim() && price) {
      const obj = { title, price };
      // const findTitle = array.find((array) => array.title === obj.title);
      // if (!findTitle) {
      //   array.title=""
      array.push(obj);
      // }
      settitle("");
      setprice(0);
    }
  };

  if (user) {
    if (user.emailVerified) {
      return (
        <Box
          sx={{ width: "380px", display: "inline-block" }}
          component={"form"}
          autoComplete="off"
        >
          <Helmet>
  <title>expendence | Create</title>
  <link rel="canonical" href="https://www.tacobell.com/" />
</Helmet>
      
          <FormControl sx={{ width: "180px" }} variant="filled">
            <InputLabel id="demo-simple-select-label">Month</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={month}
              label="Month"
              onChange={(eo) => {
                setmonth(eo.target.value);
              }}
              error={monthError}
            >
              <MenuItem value={"January"}>January</MenuItem>
              <MenuItem value={"February"}>February</MenuItem>
              <MenuItem value={"March"}>March</MenuItem>
              <MenuItem value={"April"}>April</MenuItem>
              <MenuItem value={"May"}>May</MenuItem>
              <MenuItem value={"June"}>June</MenuItem>
              <MenuItem value={"July"}>July</MenuItem>
              <MenuItem value={"August"}>August</MenuItem>
              <MenuItem value={"September"}>September</MenuItem>
              <MenuItem value={"October"}>October</MenuItem>
              <MenuItem value={"November"}>November</MenuItem>
              <MenuItem value={"December"}>December</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Title"
            id="filled-start-adornment"
            value={title}
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
            value={price}
            sx={{ mt: "22px", display: "block" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            variant="filled"
            onChange={(eo) => {
              setprice(Number(eo.target.value));
            }}
            error={priceError}
            type="number"
          />

          <ColorButton
            className="createutton"
            onClick={(eo) => {
              eo.preventDefault();
              addBtn();
            }}
            variant="contained"
            sx={{ mt: "22px", mr: 5 }}
          >
            Add <AddCircleOutline sx={{ ml: 0.5 }} />
          </ColorButton>

          <UserCreate
            {...{
              user,
              array,
              month,
              setshowLoading,
              setmonthError,
              setarray,
              navigate,
              showLoading,
              setmonth,
            }}
          />
          <div>
            {array.map((item, index) => (
              <ul key={index}>
                <li>
                  <span style={{ fontSize: "25px", marginRight: "5px" }}>
                    {item.title}
                  </span>
                  <ArrowForward style={{ fontSize: "20px" }} />
                  <span style={{ fontSize: "25px", marginLeft: "5px" }}>
                    {item.price}
                  </span>
                </li>
                {/* <h1>{item.price}</h1> */}
              </ul>
            ))}
          </div>
        </Box>
      );
    }
  }
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorComponent />;
  }
};

export default Create;
