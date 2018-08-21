import { Option, Question, QuizConfig } from './index';
export class Quiz {
	id: number;
	url:string;
	name: string;
	description: string;
	config: QuizConfig;
	questions: Question[];
	constructor(data: any) {
        if (data) {
            this.id = data.id;
            this.name = data.name;
            this.description = data.description;
            this.config = new QuizConfig(data.config);
            this.questions = [];
            data.questions.forEach(q => {
                this.questions.push(new Question(q));
            });
        }
    }
}
