import "./Home.css";
import { Box, Typography, Stack, Button } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "/react/react-project-one/src/firebase/config";
import { Link } from "react-router-dom";
import { Favorite, Warning } from "@mui/icons-material";
import { sendEmailVerification } from "firebase/auth";
import Items from "./items";
import Loading from "../loading/Loading";
import ErrorComponent from "../error/ErrorComponent";
import { Helmet } from "react-helmet-async";

const Home = () => {
  const [user, loading, error] = useAuthState(auth);

  if (!user && !loading) {
    return (
      <Box sx={{ my: "10%" }}>
        <Stack direction={"row"}>
          <Typography className="typoColor" textAlign="center" variant="h4">
            please{" "}
            <Link to="/signin" className="link">
              sign-in
            </Link>{" "}
            to continue
          </Typography>
          <Favorite sx={{ fontSize: "35px" }} color="error" />
        </Stack>
      </Box>
    );
  }
  if (loading) {
    return <Loading />;
  }

  if (user) {
    if (!user.emailVerified) {
      return (
        <Box sx={{ my: "10%" }}>
          <Stack direction={"row"}>
            <Typography className="typoColor" textAlign="center" variant="h4">
              please verfied your email to continue
            </Typography>
            <Warning sx={{ fontSize: "35px", ml: 1 }} color="warning" />
          </Stack>
          <Button
            variant="contained"
            sx={{ bgcolor: "red", color: "white", mx: "40%", mt: 3 }}
            onClick={() => {
              sendEmailVerification(auth.currentUser).then(() => {
                console.log("email done");
              });
            }}
          >
            Send Again
          </Button>
        </Box>
      );
    }
    if (user.emailVerified) {
      
      return (
        <Box>
<Helmet>
  <title>expendence | Home</title>
  <link rel="canonical" href="https://www.tacobell.com/" />
</Helmet>
      <Items user={user} />
        </Box>
        
      );
    }
  }

  if (error) {
    return <ErrorComponent />;
  }
};

export default Home;
