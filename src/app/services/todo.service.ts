import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { Observable } from 'rxjs';

export interface Todo{
  task:string;
  priority:number;
  createdAt:number;
}
@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todoCollection: AngularFirestoreCollection<Todo>;
  private todos: Observable<Todo[]>;

  constructor(db: AngularFirestore) {
    this.todoCollection = db.collection<Todo>('todos');

    // this.todos = this.todoCollection.snapshotChanges().pipe(
      
    // )
   }
}
