import { AddCircleOutline, Close } from "@mui/icons-material";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Paper,
  TextField,
  Button,
  styled,
  Box,
  InputAdornment,
  Stack,
} from "@mui/material";

import { useDocument } from "react-firebase-hooks/firestore";
import { arrayRemove, arrayUnion, deleteDoc, doc, updateDoc } from "firebase/firestore";

import { db } from "../../firebase/config";
import { purple } from "@mui/material/colors";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "pages/loading/Loading";
import ErrorComponent from "pages/error/ErrorComponent";
const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: theme.palette.mode,
  "&:hover": {
    backgroundColor: theme.palette.mode,
    scale: "0.99",
  },
}));
const Edit = ({ user, stringId }) => {
  const [showAddNewTask, setshowAddNewTask] = useState(false);
  const [title, settitle] = useState("");
  const [price, setprice] = useState(0);
  const [titleError, settitleError] = useState(false);


  const [priceError, setpriceError] = useState(false);
  const navigate=useNavigate()

  const [value, loading, error] = useDocument(
    doc(db, user.uid, stringId.stringId)
  );
  if (value) {
    return (
      <Stack direction={"column"} sx={{ alignItems: "center" }}>
        <Card sx={{ width: 600, m: 5, position: "relative" }}>
          <CardContent>
            
            <Typography gutterBottom variant="h5" component="div">  {value.data().month}</Typography>
          
            <IconButton
              onClick={async() => {
                // handleDelete(item);
                navigate("/")
                await deleteDoc(doc(db, user.uid, stringId.stringId));
                
              }}
              sx={{ position: "absolute", top: "0", right: "0" }}
            >
              <Close sx={{ fontSize: "20px" }} />
            </IconButton>
            {value.data().details.map((item, index) => {
              return (
                <Paper
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: "22px",
                    pt: "27px",
                    bm: "7px",
                    position: "relative",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ ml: "16px", fontSize: "1.3em" }}
                  >
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
                    {item.price}
                  </Typography>
                  <IconButton
                    onClick={async () => {
                      await updateDoc(doc(db, user.uid, stringId.stringId), {
                        details: arrayRemove(item),
                      });
                    }}
                    sx={{ position: "absolute", top: "0", right: "0" }}
                  >
                    <Close sx={{ fontSize: "20px" }} />
                  </IconButton>
                </Paper>
              );
            })}
          </CardContent>
        </Card>
        {showAddNewTask && (
          <Box width={300}>
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
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              variant="filled"
              onChange={(eo) => {
                setprice(Number(eo.target.value));
              }}
              value={price}
              error={priceError}
              type="number"
            />

<Stack direction={"row"}>
<ColorButton
              className="createutton"
              onClick={async(eo) => {
                eo.preventDefault();
                settitleError(true)
                settitleError(true)
                if (title) {
                  settitleError(false)
                }
                if (price) {
                  setpriceError(false)
                }
                if (title.trim()&&price) {
                  await updateDoc(doc(db, user.uid, stringId.stringId), {
                    details: arrayUnion({title,price}),
                  });
                }
              
              }}
              variant="contained"
              sx={{ mt: "22px", mx: 5 }}
            >
              Add <AddCircleOutline sx={{ ml: 0.5 }} />
            </ColorButton>
            <ColorButton
              className="createutton"
              onClick={(eo) => {
                eo.preventDefault();
                setshowAddNewTask(false);
              }}
              variant="contained"
              sx={{ mt: "22px", mx: 5 }}
            >
              cancel
            </ColorButton>
</Stack>
          </Box>
        )}
        <ColorButton
          className="createutton"
          onClick={(eo) => {
            eo.preventDefault();
            setshowAddNewTask(true);
          }}
          variant="contained"
          sx={{ mt: "22px" }}
        >
          Add more <AddCircleOutline sx={{ ml: 0.5 }} />
        </ColorButton>
      </Stack>
    );
  }
  if (loading) {
    return (
    <Loading/>
    );
  }
  if (error) {
    return (
    <ErrorComponent/>
    );
  }
};

export default Edit;
