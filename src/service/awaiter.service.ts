import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AwaiterService {

  public isLoading = new BehaviorSubject(false);
  constructor() { }
}