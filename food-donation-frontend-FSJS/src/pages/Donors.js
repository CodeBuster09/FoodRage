import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import UserList from "../components/UserList";
import UserInfo from "../components/UserInfo";
import { useParams } from "react-router-dom";

function Donors() {
  const [currentAgent, setCurrentAgent] = useState({ page: 1, user: {} });
  const [search, setSearch] = useState("");
  const { userId } = useParams();

  const URL = process.env.REACT_APP_URL;
  const userUrl = `${URL}/api/users?role=DONOR`;

  return (
    <div className="flex  h-full md:gap-1">
      <Sidebar />
      <div className="scroll h-full  relative flex-1 bg-blue-50  dark:bg-gray-800 overflow-scroll">
        {userId ? (
          <UserInfo
            currentUser={currentAgent}
            setCurrentUser={setCurrentAgent}
            role="DONOR"
          />
        ) : (
          <UserList
            role="DONOR"
            search={search}
            userUrl={userUrl}
            setSearch={setSearch}
            setCurrentUser={setCurrentAgent}
          />
        )}
      </div>
    </div>
  );
}

export default Donors;
