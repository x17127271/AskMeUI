import { IAnswer } from './answer';

export interface IQuestionExam {
  id: number;
  title: string;
  answers: IAnswer[];
}
