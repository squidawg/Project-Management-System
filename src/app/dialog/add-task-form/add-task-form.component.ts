import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TasksStorageService} from "../../board/tasks/tasks-storage.service";
import {AuthData, AuthenticationService} from "../../authentication/authentication.service";
import {UserAssignService} from "../../shared/user-assign.service";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";

@Component({
  selector: 'app-add-task-form',
  templateUrl: './add-task-form.component.html',
  styleUrls: ['./add-task-form.component.css']
})

export class AddTaskFormComponent implements OnInit{
  createTaskForm!: FormGroup;

  userCtrl = this.userAssignService.userCtrl;


  selected: AuthData[] = [];

  separatorKeysCodes = this.userAssignService.separatorKeysCodes;
  filteredUsers = this.userAssignService.filteredUsers;

  @ViewChild('userInput') userInput!: ElementRef<HTMLInputElement>;

  constructor(private tasksStorageService: TasksStorageService,
              private authentication: AuthenticationService,
              private userAssignService: UserAssignService,
              ) {}

  ngOnInit() {
    this.createTaskForm = new FormGroup({
      "taskTitle": new FormControl(null, [Validators.required, Validators.pattern('^[A-Za-z0-9\\s\\W]+$')]),
      "taskDescription": new FormControl(null, [Validators.required, Validators.pattern('^[A-Za-z0-9\\s\\W]+$')])
    });
  }

  onAddUser(event: MatChipInputEvent) {
    this.userAssignService.add(event,this.selected);
  }

  onDeleteUser(index:string){
    this.userAssignService.remove(index, this.selected);
  }

  onSelectUser(event: MatAutocompleteSelectedEvent) {
    this.userAssignService.selected(
        event,
        this.userInput,
        this.selected);
  }

  onSubmit(){
    const users = this.selected.map( obj => obj._id);
    const title: string = this.createTaskForm.value.taskTitle;
    const description: string = this.createTaskForm.value.taskDescription;
    this.tasksStorageService.postTasks(title, description, users);
  }

  onError(value: any){
    return this.authentication.getErrorMessage(value);
  }
}
