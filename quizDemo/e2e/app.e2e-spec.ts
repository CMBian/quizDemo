import { QuizDemoPage } from './app.po';

describe('quiz-demo App', () => {
  let page: QuizDemoPage;

  beforeEach(() => {
    page = new QuizDemoPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
