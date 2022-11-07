import { animate, style, transition, trigger } from "@angular/animations";


export const errorAnimation = trigger('errorAnimation',
    [
        transition(':enter', [
            style({ transform: 'translateX(0%)', opacity: 0 }),
            animate('400ms', style({ transform: 'translateX(100)', opacity: 1 }))
        ])
    ]
);