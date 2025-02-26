import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import Welcome from "./components/Welcome";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import DetailedView from "./components/DetailedView";
import Messaging from "./components/Messaging";
import VeiwAndSendMsg from "./components/ViewAndSendMsg";
import Reply from "./components/Reply";
import "./App.css";
import Meet from "./components/Meet";

export default function App() {
  return (
    <div>
      <SignedIn>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            cursor:"pointer"
          }}
        >
          <Meet />
          <UserButton />
        </div>

        <Routes>
          <Route path="/" element={<Welcome />} />
        </Routes>
        <Routes>
          <Route path="/userDetailedView" element={<DetailedView />} />
        </Routes>
        <Routes>
          <Route path="/message" element={<Messaging />} />
        </Routes>
        <Routes>
          <Route path="/veiwAndSendMsg" element={<VeiwAndSendMsg />} />
        </Routes>
        <Routes>
          <Route path="/reply" element={<Reply />} />
        </Routes>
      </SignedIn>
      <SignedOut>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </SignedOut>
    </div>
  );
}
