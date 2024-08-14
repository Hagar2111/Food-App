import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
  })
export class SidebarService {

  public isExpandedSubject: BehaviorSubject<boolean> =
  new BehaviorSubject<boolean>(false);
isExpanded$: Observable<boolean> = this.isExpandedSubject.asObservable();

constructor() {}

toggleSidebar(isExpanded: boolean): void {
  this.isExpandedSubject.next(isExpanded);
}

}
