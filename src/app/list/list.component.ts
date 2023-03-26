import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Todo, User } from '@prisma/client';
import { TodoService } from '../todo.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  authid!: number;
  todos: Todo[] = [];
  description: string | undefined;
  due: string | undefined;
  priority: string | undefined;
  user: UserWithTodos | undefined;
  searchTerm: string | undefined;

  constructor(
    private todoService: TodoService,
    private userService: UserService,
    private router: Router
  ) {
    this.authid = parseInt(localStorage.getItem('authid') as string);
  }

  ngOnInit() {
    // this.todoService.getTodosByAuthorId(this.authid).subscribe((result) => {
    //   this.todos = result as Todo[];
    // });
    this.userService.getUsersById(this.authid).subscribe((result) => {
      this.user = result as UserWithTodos;
      this.todos = this.user.posts;
    });
  }

  onSubmit() {
    if (this.description && this.due) {
      const newTodo = {
        description: this.description,
        due: this.due,
        priority: !!this.priority,
        authorId: this.authid,
      };
      this.todoService.createTodo(newTodo).subscribe((result) => {
        this.todos.push(result as Todo);
      });
    }
  }

  sortDate() {
    this.todos.sort((a, b) => {
      var dateA = new Date(a.due as string).getTime();
      var dateB = new Date(b.due as string).getTime();
      return dateA > dateB ? 1 : -1;
    });
  }

  sortPriority() {
    this.todos.sort((a, b) => {
      return a.priority ? -1 : 1;
    });
  }

  delete(id: number) {
    if (confirm('Delete this todo?')) {
      this.todoService.deleteTodo(id).subscribe(() => {
        this.todos = this.todos.filter((todo) => todo.id !== id);
      });
    }
  }

  search(clear = false) {
    if (clear) {
      this.searchTerm = undefined;
    }
    if (this.searchTerm) {
      this.todoService
        .getTodosByAuthorId(this.authid, this.searchTerm)
        .subscribe((result) => {
          this.todos = result as Todo[];
        });
    } else {
      this.todoService.getTodosByAuthorId(this.authid).subscribe((result) => {
        this.todos = result as Todo[];
      });
    }
  }

  logout() {
    if (confirm('Logout?')) {
      localStorage.clear();
      this.router.navigate(['/login']);
    }
  }
}

export interface UserWithTodos extends User {
  posts: Todo[];
}
