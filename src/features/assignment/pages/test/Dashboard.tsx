import React from "react";
import { ClassList, AssignmentList, AssignmentDetail } from "../../features/test/classes";

const Dashboard = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <ClassList />
      <AssignmentList />
      <AssignmentDetail />
    </div>
  );
};

export default Dashboard;
