import { Component, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { Exercise } from './exercise';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';

import { zoomInRight, zoomOutLeft, ZOOM_OUT_LEFT } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('exerciseState', [
      transition('hide => show', [
        animate(1000, keyframes(zoomInRight()))
      ]),
      transition('show => hide', [
        animate(1000, ZOOM_OUT_LEFT)
      ])
    ]),
  ]
})
export class AppComponent {
  exercises: Exercise[];
  messages: string[] = [
    'Молодец!',
    'Великолепно!',
    'Здорово!',
    'Чудесно!',
    'Прекрасно!',
    'Супер!',
    'Правильно!',
    'Класс!',
    'Совершенно!',
    'Чудно!',
    'Замечательно!',
    'Отлично!',
    'Грандиозно!',
    'Превосходно!',
    'Умница!',
    'Гениально!',
    'Фантастично!',
    'Удивительно!',
    'Потрясающе!',
    'Незабываемо!',
    'Я знал, что у тебя получится!',
    'Никто не справился бы с этим лучше тебя!',
    'Я горжусь тобой!',
    'Ты на правильном пути!',
    'Это высший класс!',
    'Сердечно рад за тебя!',
    'С каждым днём у тебя получается всё лучше!',
    'Я ни на минуту в тебе не сомневался!',
    'Это твоя победа!',
    'Так держать!',
    'Ты добился успехов в этом деле!',
    'Ты прав!',
    'Прекрасное начало!',
    'Ты смог в этом разобраться!',
    'Ты всё делаешь правильно!',
    'Ещё лучше, чем было!',
    'Продолжай в том же духе!',
    'Мне нравится ход твоих мыслей!',
    'Большое тебе спасибо!',
    'Я в тебя верю!'
  ];
  finishMessage: string;
  current: Exercise;
  index: number = 0;
  isRunning: boolean = false;

  state: string = 'show';
  timelineWidth: number = 100;

  @ViewChild('exercises')
  private exercisesElem: ElementRef;

  constructor() { }


  ngOnInit() {

    this.exercises = this.prepareExerciseText();

  	this.current = this.cloneCurrentExercise();
  	this.isRunning = true;

  	const timerID = setInterval(() => {

      if (this.current.seconds === 1) {
        this.setState('hide');
      }
      if (this.current.seconds === 0) {
        const exercise =  this.nextExercise();

  			if (exercise === null) {
  				clearInterval(timerID);
  				this.isRunning = false;
  				return;
  			}

  			this.current = exercise;
  		}
  		else {
  			this.current.seconds--;
  		}

      this.calcTimeline();
  	}, 1000);

    this.selectRandowmMessage();

  }

  prepareExerciseText(): Exercise[] {
    return Array.prototype.map.call(this.exercisesElem.nativeElement.children, ((elem: HTMLDivElement, index, arr) => ({
      title: `${index + 1}/${arr.length}.  ${elem.textContent}`,
      seconds: +elem.dataset.seconds
    })));
  }


  nextExercise() {
  	if ( this.exercises.length - this.index === 1) {
  		return null;
  	}

  	this.index++;

  	return this.cloneCurrentExercise();
  }

  cloneCurrentExercise() {
  	return { ...this.exercises[this.index] };
  }

  setState(state) {
    this.state = state;
  }

  exerciseStateDone($event) {
    if (this.state === 'hide') {
      this.state = 'show';
    }
  }

  calcTimeline() {
    // console.log(this.current.seconds, this.exercises[this.index].seconds);
    this.timelineWidth = this.current.seconds / this.exercises[this.index].seconds * 100;
  }

  selectRandowmMessage() {
    const array = this.messages;
    this.finishMessage = array[Math.floor(Math.random()*array.length)];
  }

}
