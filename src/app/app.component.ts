import { animate, keyframes, transition, trigger } from "@angular/animations";
import { Component, ElementRef, ViewChild } from "@angular/core";
import { zoomInRight, ZOOM_OUT_LEFT } from "./animations";
import { MESSAGES_EN } from "./data/messages.en";
import { MESSAGES_RU } from "./data/messages.ru";
import { Exercise } from "./exercise";
import { LocaleService } from "./locale.service";

declare var ga;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  animations: [
    trigger("exerciseState", [
      transition("hide => show", [animate(1000, keyframes(zoomInRight()))]),
      transition("show => hide", [animate(1000, ZOOM_OUT_LEFT)]),
    ]),
  ],
})
export class AppComponent {
  exercises: Exercise[];
  finishMessage: string;
  current: Exercise;
  index: number = 0;
  isRunning: boolean = false;

  state: string = "show";
  timelineWidth: number = 100;

  @ViewChild("exercises")
  private exercisesElem: ElementRef;

  constructor() {}

  get currentLocale() {
    return LocaleService.getLocale();
  }

  contactAuthorClick() {
    ga("send", "event", "Contact Author", "click");
  }

  changeLocale(locale) {
    ga("send", "event", "Locale", "change", locale);
    LocaleService.changeLocale(locale);
  }

  ngOnInit() {
    this.exercises = this.prepareExerciseText();

    this.current = this.cloneCurrentExercise();
    this.isRunning = true;

    const timerID = setInterval(() => {
      if (this.current.seconds === 1) {
        this.setState("hide");
      }
      if (this.current.seconds === 0) {
        const exercise = this.nextExercise();

        if (exercise === null) {
          clearInterval(timerID);
          this.isRunning = false;
          return;
        }

        this.current = exercise;
      } else {
        this.current.seconds--;
      }

      this.calcTimeline();
    }, 1000);

    this.selectRandowmMessage();
  }

  prepareExerciseText(): Exercise[] {
    return Array.prototype.map.call(
      this.exercisesElem.nativeElement.children,
      (elem: HTMLDivElement, index, arr) => ({
        title: `${index + 1}/${arr.length}.  ${elem.textContent}`,
        seconds: +elem.dataset.seconds,
      })
    );
  }

  nextExercise() {
    if (this.exercises.length - this.index === 1) {
      ga("send", "event", "Exercise", "change", "finish");
      return null;
    }

    this.index++;
    ga("send", "event", "Exercise", "change", this.index);

    return this.cloneCurrentExercise();
  }

  cloneCurrentExercise() {
    return { ...this.exercises[this.index] };
  }

  setState(state) {
    this.state = state;
  }

  exerciseStateDone($event) {
    if (this.state === "hide") {
      this.state = "show";
    }
  }

  calcTimeline() {
    // console.log(this.current.seconds, this.exercises[this.index].seconds);
    this.timelineWidth =
      (this.current.seconds / this.exercises[this.index].seconds) * 100;
  }

  selectRandowmMessage() {
    const array = this.currentLocale === "ru" ? MESSAGES_RU : MESSAGES_EN;

    this.finishMessage = array[Math.floor(Math.random() * array.length)];
  }
}
