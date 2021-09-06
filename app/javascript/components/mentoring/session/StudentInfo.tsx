import React from 'react'
import { Student } from '../../types'
import { Avatar, Reputation, GraphicalIcon } from '../../common'
import { FavoritableStudent, FavoriteButton } from './FavoriteButton'
import { PreviousSessionsLink } from './PreviousSessionsLink'

export const StudentInfo = ({
  student,
  setStudent,
}: {
  student: Student
  setStudent: (student: Student) => void
}): JSX.Element => {
  return (
    <div className="student-info">
      <div className="info">
        <div className="subtitle">Who you&apos;re mentoring</div>
        <div className="handle-block">
          <div className="handle">{student.handle}</div>
          <Reputation
            value={student.reputation.toString()}
            type="primary"
            size="small"
          />
        </div>
        <div className="name">{student.name}</div>
        {/*<div className="bio">{student.bio}</div>*/}
        <div className="options">
          {student.links ? (
            <StudentInfoActions student={student} setStudent={setStudent} />
          ) : null}
          <PreviousSessionsLink student={student} setStudent={setStudent} />
        </div>
        {student.trackObjectives ? (
          <details className="track-objectives c-details">
            <summary>
              <div className="--summary-inner">
                Explore {student.handle}'s track goal(s)
                <GraphicalIcon icon="chevron-right" className="--closed-icon" />
                <GraphicalIcon icon="chevron-down" className="--open-icon" />
              </div>
            </summary>
            <p>{student.trackObjectives}</p>
          </details>
        ) : null}
      </div>
      <Avatar src={student.avatarUrl} handle={student.handle} />
    </div>
  )
}

const StudentInfoActions = ({
  student,
  setStudent,
}: {
  student: Student
  setStudent: (student: Student) => void
}) => {
  return (
    <React.Fragment>
      {student.links.favorite ? (
        <FavoriteButton
          student={student as FavoritableStudent}
          onSuccess={(student) => setStudent(student)}
        />
      ) : null}
    </React.Fragment>
  )
}
