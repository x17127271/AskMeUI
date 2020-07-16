import { ExamAnswerResult } from './examAnswerResult';

export class ExamResult {
  examId: number;
  questionId: number;
  answers: ExamAnswerResult[];
}
