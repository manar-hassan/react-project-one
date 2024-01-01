import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Stack,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  Button,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "/react/react-project-one/src/firebase/config";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import ForgotPassword from "pages/forgotPassword/forgotPassword";

const Signin = () => {
  const [user] = useAuthState(auth);
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [hasError, sethasError] = useState("");
  const navigate = useNavigate();
  return (
    <Box component={"form"} autoComplete="off">
      <Stack className="sign-form">
        <FormControl sx={{ width: "35ch" }}>
          <InputLabel htmlFor="my-input">Email address</InputLabel>
          <Input
            id="my-input"
            aria-describedby="my-helper-text"
            onChange={(eo) => {
              setemail(eo.target.value);
            }}
          />
        </FormControl>

        <FormControl sx={{ mt: 4, width: "35ch" }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            onChange={(eo) => {
              setpassword(eo.target.value);
            }}
            id="standard-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  sx={{ display: "flex" }}
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Box textAlign="center">
          <Button
            sx={{ mt: 5, width: "50%" }}
            variant="contained"
            onClick={(eo) => {
              eo.preventDefault();
              signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                  const user = userCredential.user;
                  navigate("/");
                })
                .catch((error) => {
                  const errorCode = error.code;
                  console.log(error.message);

                  if (errorCode) {
                    sethasError("Wrong email or password");
                  }
                });
            }}
          >
            Sign in
          </Button>

          <Typography mt="30px" variant="body1" color="red">
            {hasError}
          </Typography>
          <Typography className="typoColor" mt="30px" variant="h5">
            Don't hava an account? <span />
            <Link to="/signup" className="link">
              sign-up <span />
            </Link>
          </Typography>
          <ForgotPassword />
        </Box>
      </Stack>
    </Box>
  );
};

export default Signin;
