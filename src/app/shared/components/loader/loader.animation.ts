import { animate, style, transition, trigger } from "@angular/animations";


export const loaderAnimation = trigger('loaderAnimation',
    [
        transition(':enter', [
            style({ transform: 'translateX(0%)', opacity: 0 }),
            animate('300ms', style({ transform: 'translateX(100)', opacity: 1 }))
        ]),
        transition(':leave', [
            style({ transform: 'translateX(100)', opacity: 1 }),
            animate('200ms', style({ transform: 'translateX(0%)', opacity: 0 }))
        ])
    ]
);