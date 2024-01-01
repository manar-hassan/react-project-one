import { Box, Button, Input, Modal, Typography } from "@mui/material";
import  { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "/react/react-project-one/src/firebase/config";
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
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
const ForgotPassword = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [showSendMail, setshowSendMail] = useState(false);
  const [email, setemail] = useState("");
  return (
    <>
      <Button
        onClick={() => {
          handleOpen();
        }}
        color="primary"
      >
        Forgot Password
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Input
            placeholder="E-mail"
            // variant="standard"
            sx={{ mt: "22px", width: "100%" }}
            onChange={(eo) => {
              setemail(eo.target.value);
            }}
          />

          <Button
            variant="contained"
            sx={{ mt: 3, width: "50%" }}
            onClick={(eo) => {
              eo.preventDefault();
              setshowSendMail(true);
              sendPasswordResetEmail(auth, email)
                .then(() => {})
                .catch((error) => {
                  console.log(error.message);
                });
            }}
          >
            Reset Password
          </Button>

          {showSendMail && (
            <Typography variant="h6" textAlign={"center"} mt={3}>
              Please Check Your Email to Reset Your Password
            </Typography>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default ForgotPassword;
