import { useParams } from "react-router-dom";

import { auth } from "../../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import Edit from "./Edit";
import Loading from "pages/loading/Loading";
import ErrorComponent from "pages/error/ErrorComponent";
const EditItem = () => {
  const [user, loading, error] = useAuthState(auth);
  let stringId = useParams();
  if (user) {
    return <Edit user={user} stringId={stringId} />;
  }
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorComponent />;
  }
};

export default EditItem;
