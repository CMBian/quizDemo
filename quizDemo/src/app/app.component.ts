import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz-service.service';
import { HelperService } from './helper-service.service';
import { Option, Question, Quiz, QuizConfig } from './index';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [QuizService]
})
export class AppComponent implements OnInit{
	quizes:any;
	quizName:string;
	quizUrl:string;
	quiz:Quiz = new Quiz(null);;
	mode:string;
	config: QuizConfig = new QuizConfig(null);
	pager = {
    index: 0,
    size: 1,
    count: 1
  };
  timer: any = null;
  startTime: Date;
  endTime: Date;
  ellapsedTime = '00:00';
  duration = '';
	//config:QuizConfig;
  constructor(private quizService:QuizService){}
  //get diagnostic() { return JSON.stringify(this.); }
  
  ngOnInit(){
	  this.quizes = this.quizService.getAll();
	  this.quizUrl = this.quizes[0].Url;
	  this.loadQuiz(this.quizUrl);
  }
  loadQuiz(quizUrl:string){
	  this.quizService.get(quizUrl).subscribe(res =>{
		  this.quiz = new Quiz(res);
		  this.pager.count = this.quiz.questions.length;
		  this.startTime = new Date();
		  this.timer = setInterval(() => { this.tick(); }, 1000);
		  this.duration = this.parseTime(this.quiz.config.duration);
		  this.config = this.quiz.config;
	  }
	);
	this.mode = 'quiz';
  }
  tick() {
    const now = new Date();
    const diff = (now.getTime() - this.startTime.getTime()) / 1000;
    if (diff >= this.quiz.config.duration) {
      this.onSubmit();
    }
    this.ellapsedTime = this.parseTime(diff);
  }
  parseTime(totalSeconds: number) {
    let mins: string | number = Math.floor(totalSeconds / 60);
    let secs: string | number = Math.round(totalSeconds % 60);
    mins = (mins < 10 ? '0' : '') + mins;
    secs = (secs < 10 ? '0' : '') + secs;
    return `${mins}:${secs}`;
  }
  
  get filteredQuestions() {
    return (this.quiz.questions) ?
      this.quiz.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }
  
  onSelect(question: Question, option: Option) {
    if (question.questionTypeId === 1) {
      question.options.forEach((x) => { if (x.id !== option.id) x.selected = false; });
    }

    if (this.quiz.config.autoMove) {
      this.goTo(this.pager.index + 1);
    }
  }

  goTo(index: number) {
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
      this.mode = 'quiz';
    }
  }
  
  isAnswered(question: Question) {
    return question.options.find(x => x.selected) ? 'Answered' : 'Not Answered';
  };

  isCorrect(question: Question) {
    return question.options.every(x => x.selected === x.isAnswer) ? 'correct' : 'wrong';
  };
onSubmit() {
    let answers = [];
    this.quiz.questions.forEach(x => answers.push({ 'quizId': this.quiz.id, 'questionId': x.id, 'answered': x.answered }));

    // Post your data to the server here. answers contains the questionId and the users' answer.
    console.log(this.quiz.questions);
    this.mode = 'result';
  }
  
}
