// import Alert from "@material-ui/core/Alert";

const Message = ({ children, variant = "info" }) => {
  return <div className="alert">{children}</div>;
  // return <Alert severity={variant}>{children}</Alert>;
};

export default Message;
