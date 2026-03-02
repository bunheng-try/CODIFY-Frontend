import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getChallengeById } from "../inused/challengesData";
import ChallengeHeader from "./ChallengesHeader";
import QuestionTab from "./QuestionTab";
import CodeTab from "./CodeTab";
import TestCaseTab from "./TestCaseTab";
// import "../Challenges.css";

type TabType = "question" | "code" | "testcase";

const Challenge = () => {
  const { challengeId } = useParams<{ challengeId: string }>();
  const [activeTab, setActiveTab] = useState<TabType>("question");

  const challenge = getChallengeById(parseInt(challengeId || "1"));
  if (!challenge) {
    return (
      <div className="challenge-container">
        <div className="error-message">Challenge not found</div>
      </div>
    );
  }

  return (
    <div className="challenge-container">
      {/* Header */}
      <ChallengeHeader
        challengeTitle={challenge.title}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Body */}
      <div className="challenge-body">
        {activeTab === "question" && <QuestionTab challenge={challenge} />}
        {activeTab === "code" && <CodeTab challenge={challenge} />}
        {activeTab === "testcase" && <TestCaseTab challenge={challenge} />}
      </div>
    </div>
  );
};

export default Challenge;
