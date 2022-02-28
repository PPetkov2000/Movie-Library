// import Alert from "@material-ui/core/Alert";

const Message = ({ children, variant = "info" }) => {
  return (
    <div className="alert" style={{ color: "red" }}>
      {children}
    </div>
  );
  // For some reason it cannot find the "Alert" component
  // return <Alert severity={variant}>{children}</Alert>;
};

export default Message;
