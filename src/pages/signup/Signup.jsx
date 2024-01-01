import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { auth } from "/react/react-project-one/src/firebase/config";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

const Signup = () => {
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

  const [userName, setuserName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const [hasError, sethasError] = useState("");
  return (
    <Box component={"form"} autoComplete="off" className="form">
      <Stack className="sign-form">
        <FormControl sx={{ width: "35ch" }}>
          <InputLabel>User Name</InputLabel>
          <Input
            type="text"
            onChange={(eo) => {
              setuserName(eo.target.value);
      
            }}
          />
        </FormControl>
        <FormControl sx={{ mt: 4, width: "35ch" }}>
          <InputLabel htmlFor="my-input">Email address</InputLabel>
          <Input
            id="my-input"
            aria-describedby="my-helper-text"
            onChange={(eo) => {
              setemail(eo.target.value);
          
            }}
          />
        </FormControl>

        <FormControl sx={{ mt: 4, width: "35ch" }}>
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
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
            onChange={(eo) => {
              setpassword(eo.target.value);
              console.log(eo.target.value);
            }}
          />
        </FormControl>
        <Box textAlign="center">
          <Button
            sx={{ mt: 5, width: "50%" }}
            variant="contained"
            onClick={(eo) => {
              eo.preventDefault();
              createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                  const user = userCredential.user;
                  sendEmailVerification(auth.currentUser).then(() => {
                  });
                  updateProfile(auth.currentUser, {
                    displayName: userName,
                  })
                    .then(() => {})
                    .then(() => {
                      navigate("/");
                    
                    })
                    .catch((error) => {
                    
                    });

                  // ...
                })
                .catch((error) => {
                  const errorMessage = error.message;
                  if (errorMessage) {
                    sethasError("Wrong email or password");
                  }
                });
            }}
          >
            Sign Up
          </Button>

          <Typography mt="30px" variant="body1" color="red">
            {hasError}
          </Typography>
          <Typography className="typoColor" mt="30px" variant="h5">
            Already a member?{" "}
            <Link to="/signin" className="link">
              sign-in
            </Link>
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default Signup;
