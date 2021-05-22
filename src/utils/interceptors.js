module.exports = function (instance) {
  instance.interceptors.request.use(
    (request) => {
      if (localStorage.getItem("authUser")) {
        request.headers.Authorization =
          "Bearer " + JSON.parse(localStorage.getItem("authUser")).token;
      }
      return request;
    },
    (error) => {
      console.log(error);
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error);
      if (error.response.status === 401) {
        return Promise.reject("Not authorized");
      }
      if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
      }
      if (error.message === "Network Error") {
        console.log(error, error.status, error.response.status);
        return Promise.reject("Server Error");
      }
      return Promise.reject(error.message);
    }
  );
};
