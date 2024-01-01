import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Input,
  Stack,
  Typography,
} from "@mui/material";
import "./Profile.css";
import { useEffect, useState } from "react";
import { auth, storage } from "../../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import Moment from "react-moment";
import { Edit, Error, HourglassBottom } from "@mui/icons-material";
import { deleteUser, updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Helmet } from "react-helmet-async";
const Profile = () => {
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

  const [user, loading, error] = useAuthState(auth);
  const [image, setimage] = useState(null);
  const [loadingg, setloadingg] = useState(null);
  const [photoUrl, setphotoUrl] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg"
  );
  useEffect(() => {
    if (user && user.photoURL) {
      setphotoUrl(user.photoURL);
    }
  }, [user]);
  const [submit, setsubmit] = useState("none");
  const deleteProfile = () => {
    deleteUser(user)
      .then(() => {
        navigate("/signin");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handle = (eo) => {
    if (eo.target.files[0]) {
      setimage(eo.target.files[0]);
      setsubmit("flex");
    }
  };

  const upload = async (file, user) => {
    const fileRef = ref(storage, user.uid + ".png");
    // setloadingg(true);
    const snapshot = await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);
    updateProfile(user, { photoURL });
    // setloadingg(false);
    // alert("uploaded");
  };

  const handlevalue = () => {
    upload(image, user);
    setsubmit("none");
  };

  if (user) {
    if (user.emailVerified) {
      return (
        <Card sx={{ width: 400, mt: 4 }}>
            <Helmet>
  <title>expendence | Profile</title>
  <link rel="canonical" href="https://www.tacobell.com/" />
</Helmet>
          <div className="avatar-upload">
            <div className="avatar-edit">
              <Input type="file" id="imageUpload" onChange={handle} />
              <label htmlFor="imageUpload">
                <Edit sx={{ ml: "3.6px" }} />
              </label>
            </div>
          </div>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <CardMedia
              sx={{
                height: 200,
                width: 200,
                objectFit: "cover",
                borderRadius: "50%",
              }}
              image={photoUrl}
              title={user.displayName}
              component="img"
              alt={user.displayName}
            />
            <Button
              disabled={loadingg || !image}
              onClick={handlevalue}
              sx={{ display: submit, mt: 1 }}
            >
              submit your photo{" "}
            </Button>
            <Typography gutterBottom variant="h5" component="div" mt={1}>
              {user.displayName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.email}
            </Typography>
          </Box>

          <CardContent>
            <Stack direction={"row"} mt={3} justifyContent={"space-between"}>
              <Typography gutterBottom variant="subtitle1" component="div">
                Creation Time:
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={0.5}>
                <Moment fromNow>{user.metadata.creationTime}</Moment>
              </Typography>
            </Stack>

            <Stack direction={"row"} justifyContent={"space-between"}>
              <Typography gutterBottom variant="subtitle1" component="div">
                Last Signin Time:
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={0.5}>
                <Moment fromNow>{user.metadata.lastSignInTime}</Moment>
              </Typography>
            </Stack>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button
                color="error"
                onClick={() => {
                  deleteProfile();
                }}
              >
                Delete My Account
              </Button>
            </Box>
          </CardContent>
        </Card>
      );
    }
  }
  if (loading) {
    return (
      <Box>
        <Typography
          className="typoColor"
          mt="30px"
          textAlign="center"
          variant="h4"
          sx={{ my: "50%" }}
        >
          Loading...
          <HourglassBottom sx={{ fontSize: "30px" }} color="warning" />
        </Typography>
      </Box>
    );
  }
  if (error) {
    return (
      <Box>
        <Typography
          className="typoColor"
          mt="30px"
          textAlign="center"
          variant="h4"
          sx={{ my: "50%" }}
        >
          Error
          <Error sx={{ fontSize: "30px" }} color="error" />
        </Typography>
      </Box>
    );
  }
};

export default Profile;
