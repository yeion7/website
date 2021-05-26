import { SubmissionTestsStatus } from '../types'

export type Submission = {
  testsStatus: SubmissionTestsStatus
  id: string
  links: SubmissionLinks
  testRun?: TestRun
}

type SubmissionLinks = {
  cancel: string
  submit: string
  testRun: string
  initialFiles: string
}

export type TestRun = {
  id: number | null
  submissionUuid: string
  version: number
  status: TestRunStatus
  message: string
  messageHtml: string
  output: string
  outputHtml: string
  tests: Test[]
  highlightjsLanguage: string
  links: {
    self: string
  }
}

export type Test = {
  name: string
  status: TestStatus
  testCode: string
  message: string
  messageHtml: string
  output: string
  outputHtml: string
  index?: number
}

export enum TestStatus {
  PASS = 'pass',
  FAIL = 'fail',
  ERROR = 'error',
}

export enum TestRunStatus {
  PASS = 'pass',
  FAIL = 'fail',
  ERROR = 'error',
  OPS_ERROR = 'ops_error',
  QUEUED = 'queued',
  TIMEOUT = 'timeout',
  CANCELLING = 'cancelling',
  CANCELLED = 'cancelled',
}

export enum Keybindings {
  DEFAULT = 'default',
  VIM = 'vim',
  EMACS = 'emacs',
}

export type WrapSetting = 'off' | 'on'

export enum Themes {
  LIGHT = 'light',
  DARK = 'material-ocean',
}

export type TabBehavior = 'default' | 'captured'

export type Assignment = {
  overview: string
  generalHints: string[]
  tasks: AssignmentTask[]
}

export type AssignmentTask = {
  title: string
  text: string
  hints: string[]
}
