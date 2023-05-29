import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TasksStorageService} from "../../tasks/tasks-storage.service";
import {AuthData, AuthenticationService} from "../../../authentication/authentication.service";
import {UserAssignService} from "../../../shared/user-assign.service";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent {
  constructor(private tasksStorageService:TasksStorageService,
              private authentication: AuthenticationService,
              private userAssignService: UserAssignService,) {
  }
  editTaskForm!: FormGroup;

  userCtrl = this.userAssignService.userCtrl;
  selected: AuthData[] = [];

  separatorKeysCodes = this.userAssignService.separatorKeysCodes;
  filteredUsers = this.userAssignService.filteredUsers;

  @ViewChild('userInput') userInput!: ElementRef<HTMLInputElement>;


  ngOnInit() {
    this.authentication.getUsers();
    this.editTaskForm = new FormGroup({
      "taskTitle": new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      "taskDescription": new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z ]*')])
    });
  }

  onAddUser(event: MatChipInputEvent){
    this.userAssignService.add(event,this.selected);
  }

  onDeleteUser(index:string){
    this.userAssignService.remove(index, this.selected);

  }

  onSelectUser(event: MatAutocompleteSelectedEvent){
    this.userAssignService.selected(
        event,
        this.userInput,
        this.selected);
  }

  onSubmit(){
    const users = this.selected.map( obj => obj._id)
    const title: string = this.editTaskForm.value.taskTitle;
    const description: string = this.editTaskForm.value.taskDescription;
    this.tasksStorageService.putTask(title, description, users);
  }

  onError(value: any, valueName: string){
    return this.authentication.getErrorMessage(value, valueName)
  }
}
