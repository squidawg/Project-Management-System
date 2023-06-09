import {Component} from '@angular/core';
import {DashboardStorageService} from "../../dashboard/dashboard-storage.service";
import {SnackbarService} from "../../shared/snackbar.service";


@Component({
  selector: 'app-delete-warning-form',
  templateUrl: './delete-warning-form.component.html',
  styleUrls: ['./delete-warning-form.component.css']
})
export class DeleteWarningFormComponent{

  constructor(private dashboardService: DashboardStorageService,
              private snackBar: SnackbarService) {}


  onSubmit(){
    this.dashboardService.deleteBoard().subscribe(
        () => {},
        errMessage => {
          this.snackBar.openSnackBar(errMessage)
        });
  }
}
