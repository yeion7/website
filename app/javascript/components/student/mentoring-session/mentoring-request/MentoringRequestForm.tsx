import React, { useRef, useCallback } from 'react'
import {
  CopyToClipboardButton,
  FormButton,
  GraphicalIcon,
} from '../../../common'
import {
  MentorSessionTrack as Track,
  MentorSessionExercise as Exercise,
} from '../../../types'
import { useMutation } from 'react-query'
import { sendRequest } from '../../../../utils/send-request'
import { typecheck } from '../../../../utils/typecheck'
import { MentorSessionRequest as Request } from '../../../types'
import { FetchingBoundary } from '../../../FetchingBoundary'

type Links = {
  learnMoreAboutPrivateMentoring: string
  privateMentoring: string
  mentoringGuide: string
  createMentorRequest: string
}

const DEFAULT_ERROR = new Error('Unable to create mentor request')

export const MentoringRequestForm = ({
  trackObjectives,
  track,
  exercise,
  links,
  onSuccess,
}: {
  trackObjectives: string
  track: Track
  exercise: Exercise
  links: Links
  onSuccess: (mentorRequest: Request) => void
}): JSX.Element => {
  const [mutation, { status, error }] = useMutation<Request>(
    () => {
      const { fetch } = sendRequest({
        endpoint: links.createMentorRequest,
        method: 'POST',
        body: JSON.stringify({
          comment: solutionCommentRef.current?.value,
          track_objectives: trackObjectivesRef.current?.value,
        }),
      })

      return fetch.then((json) => typecheck<Request>(json, 'mentorRequest'))
    },
    {
      onSuccess: onSuccess,
    }
  )

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault()

      mutation()
    },
    [mutation]
  )

  const trackObjectivesRef = useRef<HTMLTextAreaElement>(null)
  const solutionCommentRef = useRef<HTMLTextAreaElement>(null)

  return (
    <div className="mentoring-request-section">
      <div className="direct">
        <h3>
          Send this link to a friend for private mentoring.{' '}
          <a href={links.learnMoreAboutPrivateMentoring}>Learn more</a>.
        </h3>
        <CopyToClipboardButton textToCopy={links.privateMentoring} />
      </div>
      <form data-turbo="false" className="community" onSubmit={handleSubmit}>
        <div className="heading">
          <div className="info">
            <h2>It’s time to deepen your knowledge.</h2>
            <p>
              Start a mentoring discussion on <strong>{exercise.title}</strong>{' '}
              to discover new and exciting ways to approach it. Expand and
              deepen your knowledge.
            </p>
          </div>
          <GraphicalIcon icon="mentoring" category="graphics" />
        </div>
        <div className="question">
          <label htmlFor="request-mentoring-form-track-objectives">
            What are you hoping to learn from this track?
          </label>
          <p id="request-mentoring-form-track-description">
            Tell our mentors a little about your programming background and what
            you’re aiming to learn from {track.title}.
          </p>
          <textarea
            ref={trackObjectivesRef}
            id="request-mentoring-form-track-objectives"
            required
            aria-describedby="request-mentoring-form-track-description"
            defaultValue={trackObjectives}
          />
        </div>
        <div className="question">
          <label htmlFor="request-mentoring-form-solution-comment">
            How can a mentor help you with this solution?
          </label>
          <p id="request-mentoring-form-solution-description">
            Give your mentor a starting point for the conversation. This will be
            your first comment on during the session.
          </p>
          <textarea
            ref={solutionCommentRef}
            id="request-mentoring-form-solution-comment"
            required
            aria-describedby="request-mentoring-form-solution-description"
          />
        </div>
        <FormButton status={status} className="btn-primary btn-m">
          Submit mentoring request
        </FormButton>
        <FetchingBoundary
          status={status}
          error={error}
          defaultError={DEFAULT_ERROR}
        ></FetchingBoundary>
        <p className="flow-explanation">
          Once you submit, your request will be open for a mentor to join and
          start providing feedback. The recent median wait time is ~
          {track.medianWaitTime}
        </p>
      </form>
    </div>
  )
}
