import {
  style, AnimationStyleMetadata, keyframes
} from '@angular/animations';


export function zoomOutLeft(): AnimationStyleMetadata[] {
  return [
    style({opacity: 1, transform: 'scale3d(.475, .475, .475) translate3d(42px, 0, 0)', offset: .4}),
    style({opacity: 0, transform: 'scale(.1) translate3d(-2000px, 0, 0)', transformOrigin: 'left center',  offset: 1}),
  ]
}

export function zoomInRight(): AnimationStyleMetadata[] {
  return [
    style({opacity: 0, transform: 'scale3d(.1, .1, .1) translate3d(1000px, 0, 0)', animationTimingFunction: 'cubic-bezier(0.550, 0.055, 0.675, 0.190)', offset: 0}),
    style({opacity: 1, transform: 'scale3d(.475, .475, .475) translate3d(-10px, 0, 0)', animationTimingFunction: 'cubic-bezier(0.175, 0.885, 0.320, 1)',  offset: .6}),
  ]
}

export const ZOOM_OUT_LEFT = keyframes([
	style({opacity: 1, transform: 'scale3d(.475, .475, .475) translate3d(42px, 0, 0)', offset: .4}),
	style({opacity: 0, transform: 'scale(.1) translate3d(-2000px, 0, 0)', transformOrigin: 'left center',  offset: 1}),
]);