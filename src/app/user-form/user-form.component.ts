import { Component, Input } from '@angular/core';
import { User } from 'app/user';
@Component({
  selector: "user-form",
  templateUrl: './user-form.component.html'
})
export class UserFormComponent {
  @Input() user: User;
}
