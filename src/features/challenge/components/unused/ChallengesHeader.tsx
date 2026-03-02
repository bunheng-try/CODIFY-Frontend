import React from 'react'

interface ChallengeHeaderProps {
  challengeTitle: string
  activeTab: 'question' | 'code' | 'testcase'
  onTabChange: (tab: 'question' | 'code' | 'testcase') => void
}

const ChallengeHeader: React.FC<ChallengeHeaderProps> = ({ 
  challengeTitle,
  activeTab, 
  onTabChange 
}) => {
  return (
    <div className="challenge-header">
      <h1 className="challenge-title">{challengeTitle}</h1>
      
      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button
          className={`tab-button ${activeTab === 'question' ? 'active' : ''}`}
          onClick={() => onTabChange('question')}
        >
          Question
        </button>
        <button
          className={`tab-button ${activeTab === 'code' ? 'active' : ''}`}
          onClick={() => onTabChange('code')}
        >
          Code
        </button>
        <button
          className={`tab-button ${activeTab === 'testcase' ? 'active' : ''}`}
          onClick={() => onTabChange('testcase')}
        >
          Test Case
        </button>
      </div>
    </div>
  )
}

export default ChallengeHeader
