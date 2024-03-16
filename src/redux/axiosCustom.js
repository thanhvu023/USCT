import axios from "axios";

const instance = axios.create({
  baseURL: "https://usstudy.monoinfinity.net/v3/",
});

instance.defaults.headers.common[
  "Authorization"
] = `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiVXNlcklkIjoxLCJlbWFpbCI6InRoaW5obmRAZ21haWwuY29tIiwiUm9sZSI6IlJPTEVfQ1VTVE9NRVIiLCJpYXQiOjE3MTA1OTk1MDYsImV4cCI6MTcxMTIwNDMwNn0.Eal4kh-ya45yU3BtxVnCvQV4iQ1pDySDy4MSEyEHvhDiTNN3X3obFJIMlCIhcljNvZW7-vyjbjqVcQjhXS1NTg`;
// const cookies = new Cookies();

// instance.interceptors.request.use(
//     function (config) {
//     NProgress.start();
//     const user = cookies.get("user");
//     const token = user?.token;
//     config.headers["Authorization"] = `Bearer ${token}`;
//     return config;
//   },
//   function (error) {
//     NProgress.done();
//     return Promise.reject(error);
//   }
// );

// instance.interceptors.response.use(
//   function (response) {
//     NProgress.done();
//     return response;
//   },
//   function (error) {
//     NProgress.done();
//     return Promise.reject(error);
//   }
// );
export default instance;

// headers: {
//   'Content-Type': 'application/json',
//   'Authorization': 'Bearer ' + token,
// },
