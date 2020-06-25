import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class SessionStore {

    loading$: BehaviorSubject<boolean>;

    constructor() {
        this.loading$ = new BehaviorSubject(true);
    }

}