// QuestionTab.tsx - Question tab content

import React, { useState } from 'react'
import type { MockChallenge } from '../inused/challengesData'

interface QuestionTabProps {
  challenge: MockChallenge
}

const QuestionTab: React.FC<QuestionTabProps> = ({ challenge }) => {
  const [title, setTitle] = useState(challenge.title)
  const [description, setDescription] = useState(challenge.description)

  return (
    <div className="tab-content-area">
      {/* Title */}
      <div className="form-group">
        <label className="form-label">Title</label>
        <input 
          type="text" 
          className="form-input" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter challenge title"
        />
      </div>

      {/* Description */}
      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea 
          className="form-textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter challenge description"
          rows={10}
        />
      </div>
    </div>
  )
}

export default QuestionTab
