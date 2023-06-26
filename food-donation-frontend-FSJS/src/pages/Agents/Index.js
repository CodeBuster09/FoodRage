import React, { useState } from "react";
import Sidebar from "../../components/Sidebar.js";
import { useParams } from "react-router-dom";
import UserInfo from "../../components/UserInfo.js";
import UserList from "../../components/UserList.js";

function Agents() {
  const [currentAgent, setCurrentAgent] = useState({ page: 1, user: {} });
  const [search, setSearch] = useState("");
  const { userId } = useParams();
  const URL = process.env.REACT_APP_URL;

  const userUrl = `${URL}/api/users?role=AGENT`;

  return (
    <div className="flex  h-full md:gap-1">
      <Sidebar />
      <div className="scroll h-full  relative flex-1 bg-blue-50  dark:bg-gray-800 overflow-scroll">
        {userId ? (
          <UserInfo
            currentUser={currentAgent}
            setCurrentUser={setCurrentAgent}
            role="AGENT"
          />
        ) : (
          <UserList
            role="AGENT"
            search={search}
            setSearch={setSearch}
            userUrl={userUrl}
            setCurrentUser={setCurrentAgent}
          />
        )}
      </div>
    </div>
  );
}

export default Agents;
