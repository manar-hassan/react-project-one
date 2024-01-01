import { db } from "../../firebase/config";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, doc, setDoc } from "firebase/firestore";
import { Button, styled } from "@mui/material";
import { purple } from "@mui/material/colors";
import ReactLoading from "react-loading";
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

const UserCreate = ({
  user,
  array,
  month,
  setshowLoading,
  setmonthError,
  setarray,
  navigate,
  showLoading,
  setmonth,
}) => {
  const [value, loading, error] = useCollection(collection(db, user.uid));
  if (value) {
    return (
      <ColorButton
        className="createutton"
        onClick={async () => {
          const findMonth = value.docs.find(
            (mydata) => mydata.data().month === month
          );
          setmonthError(true);
          const findArray = array.find((array) => array);

          if (month && findArray && !findMonth) {
            setshowLoading(true);
            setmonthError(false);
            setarray(array);

            const taskId = new Date().getTime();
            await setDoc(doc(db, user.uid, `${taskId}`), {
              month: month,
              details: array,
              id: taskId,
            });
            setshowLoading(false);
            setmonth("");
            setarray([]);
            navigate("/");
          }
        }}
        variant="contained"
        sx={{ mt: "22px" }}
      >
        {showLoading ? (
          <ReactLoading type={"spin"} color={"white"} height={25} width={25} />
        ) : (
          "Submit"
        )}
      </ColorButton>
    );
  }
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorComponent />;
  }
};

export default UserCreate;
