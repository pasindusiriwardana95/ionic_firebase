import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

export interface Todo{
  task:string;
  priority:number;
  createdAt:number;
}
@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todosCollection: AngularFirestoreCollection<Todo>;
  private todos: Observable<Todo[]>;

  constructor(db: AngularFirestore) {
    this.todosCollection = db.collection<Todo>('todos'); // this is the database reference

    this.todos = this.todosCollection.snapshotChanges().pipe(
      map(actions =>{
        return actions.map(a => {
          const data= a. payload.doc.data();
          const id= a.payload.doc.id;
          return {id, ...data};
        });
      })
      
    );
    // this above code part maps actions to the id
   }

   // below function returns the observable array with todos
   getTodos(){
     return this.todos;
   }

   // doc -> lets the code to access single documents in the db
   // valueChanges() -> gets the actual value of the document
   getTodo(id){
     return this.todosCollection.doc<Todo>(id).valueChanges();
   }

   // todo: Todo is the new Todo object of the type Todo
   updateTodo(todo: Todo ,id: string){
     return this.todosCollection.doc(id).update(todo);
   }

   addTodo(todo: Todo){
     return this.todosCollection.add(todo);
   }

   removeTodo(id){
     return this.todosCollection.doc(id).delete();
   }
}
