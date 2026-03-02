
import React from 'react'
import type { MockChallenge } from '../inused/challengesData'

interface CodeTabProps {
  challenge: MockChallenge
}

const CodeTab: React.FC<CodeTabProps> = ({ challenge }) => {
  return (
    <div className="tab-content-area">
      <h3 className="section-title">Start Code</h3>
      
      <div className="code-editor">
        <pre className="code-block">
          <code>{challenge.startCode}</code>
        </pre>
      </div>
    </div>
  )
}

export default CodeTab
