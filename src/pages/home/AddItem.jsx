import { EmojiEmotions, VideoCameraBack, PersonAdd, DateRange, Add, AddCircleOutline } from '@mui/icons-material';
import { Tooltip, Fab, Modal, Box, Typography, Stack, Avatar, TextField, ButtonGroup, Button, InputAdornment, styled } from '@mui/material';
import { purple } from '@mui/material/colors';
import { db } from '../../firebase/config';
import React, { useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection} from "firebase/firestore";
import { Link, useParams } from 'react-router-dom';
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "97%", sm: "400px" },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: theme.palette.mode,
  "&:hover": {
    backgroundColor: theme.palette.mode,
    scale: "0.99",
  },
}));
const AddItem = ({user,item}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const [value, loading, error] = useCollection(collection(db, user.uid));
  let id=useParams()
  // const id = useParams()
  // console.log(id)
  // const addBtn = () => {
  //   settitleError(true);
  //   setpriceError(true);
  //   if (title) {
  //     settitleError(false);
  //   }

  //   if (price) {
  //     setpriceError(false);
  //   }
  //   if (title.trim() && price) {
  //     const obj = { title, price };
  //     const findTitle = array.find((array) => array.title === obj.title);
  //     if (!findTitle) {
  //       array.push(obj);
  //     }
  //     settitle("");
  //     setprice(0);
  //   }
  // };
  return (
    <>
  <Link to={`/item-item/${item.data().id}`} >
      <Tooltip title="New item">
        
        <Fab
          onClick={() => {
            console.log(id)
            // handleOpen();
          }}
          color="primary"
          sx={{ position:"absolute", left: "5px", top: "5px" , width:"35px" , height:"10px"}}
        >
          <Add/>
        </Fab>
      </Tooltip>
      </Link>
    
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" textAlign={"center"}>
            Create a Post
          </Typography>
          <TextField
            fullWidth
            label="Title"
            id="filled-start-adornment"
            // value={title}
            sx={{ mt: "22px", display: "block" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">&#128073;</InputAdornment>
              ),
            }}
            variant="filled"
            onChange={(eo) => {
              // settitle(eo.target.value);
            }}
            // error={titleError}
          />
          <TextField
            fullWidth
            label="Amount"
            id="filled-start-adornment"
            // value={price}
            sx={{ mt: "22px", display: "block" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            variant="filled"
            onChange={(eo) => {
              // setprice(Number(eo.target.value));
            }}
            // error={priceError}
            type="number"
          />

          <ColorButton
            className="createutton"
            onClick={(eo) => {
              eo.preventDefault();
              // addBtn();
            }}
            variant="contained"
            sx={{ mt: "22px", mr:5}}
          >
            Add <AddCircleOutline sx={{ml:0.5}}/>
          </ColorButton>
          </Box>
      </Modal>
    </>
  );
}

export default AddItem;
