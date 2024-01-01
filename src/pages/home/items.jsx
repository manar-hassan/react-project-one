import {
  Box,
  Card,
  CardContent,
  Typography,
  Paper,
  Link
} from "@mui/material";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "../../firebase/config";
import Loading from "pages/loading/Loading";
import ErrorComponent from "pages/error/ErrorComponent";
const Items = ({ user }) => {
  const [value, loading, error] = useCollection(collection(db, user.uid));

  let totalPrice = 0;
  if (value) {
    return (
      <Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {value.docs.map((item, index) => {
            return (
              <Card sx={{ width: 345, m: 5, position: "relative" }} key={index}>
                <Link
                    underline="none"
                  href={`/edit-item/${item.data().id}`}
                  style={{ color:"inherit"}}
                >
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.data().month}
                    </Typography>

                    {item.data().details.map((item, index) => {
                      totalPrice += item.price;

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
                            ${item.price}
                          </Typography>
                        </Paper>
                      );
                    })}
                  </CardContent>
                </Link>
              </Card>
            );
          })}
        </Box>
        <Typography mt="30px" textAlign="center" variant="h5">
          &#128073; You spend ${totalPrice}
        </Typography>
      </Box>
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

export default Items;
