import { auth } from "../firebase";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const Protected = (props) => {
  const { children } = props;

  if (auth.currentUser) {
    return children;
  }
  return <Navigate to="/login" replace />;
};

Protected.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Protected;
