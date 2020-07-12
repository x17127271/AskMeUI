export interface IExam {
  id: number;
  title: string;
  description: string;
  userId: number;
  questions: number[];
  totalQuestions: number;
  subjectId: number;
}
