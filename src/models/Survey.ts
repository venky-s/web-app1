export interface ISurveyResponse {
    refId: string;
}

export interface ISurveyContact {
    userCode: string;
    userName: string;
    mobileNo: string;
    email: string;
    avatarImage64: string;
}

export class SurveyContact implements ISurveyContact {
    constructor(
        public userCode: string,
        public userName: string,
        public mobileNo: string,
        public email: string,
        public avatarImage64: string
    ) { }
}

export interface IQuestionAnswer {
    questionId: number;
    QuestionStr: string;
    AnswerValue: number;
    AnswerStr: string;
}

export class QuestionAnswer {
    constructor(
        public questionId: number,
        public AnswerValue: number
    ) { }
}