import Navbar from "./components/Navbar"
import Home from "./components/Home";
import About from "./components/About";
import Signup from "./components/Signup";
import Login from "./components/Login";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Alert from "./components/Alert";
import { useState } from "react";


function App() {

  const [alert, setAlert] = useState(null)

  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type
    })
  }

  setTimeout(() => {
    setAlert(null)

  }, 1500);






  return (
    <>
      <Router>
        <Navbar />
        <Alert alert={alert} />
        <div className="container">
          <Routes>

            <Route path="/" element={<Home showAlert={showAlert} />} ></Route>
            <Route path="/about" element={<About />} ></Route>


            <Route path="/signup" element={<Signup showAlert={showAlert} />} ></Route>
            <Route path="/login" element={<Login showAlert={showAlert} />} ></Route>
            

          </Routes>

        </div>
      </Router>


    </>
  )
}

export default App
