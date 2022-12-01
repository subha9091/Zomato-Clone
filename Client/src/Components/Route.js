import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Filter from "./Filter";
import Details from './Details';
import Header from './Headers'
import { useEffect, useState } from "react";

const Router = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:8000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  return (
    <BrowserRouter>
      <Header user={user} />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/filter" element={<Filter />} />
        <Route path="/details" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
