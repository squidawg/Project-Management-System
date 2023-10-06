import { Pipe, PipeTransform } from '@angular/core';
import {UserAssignService} from "../../authentication/services/user-assign.service";

@Pipe({
    name: 'transform',
    pure: false
})
export class TranformPipe implements PipeTransform {
    constructor(private userAssignService: UserAssignService) {}

    transform(key: string) {
        const users = this.userAssignService.getUsers()
        return users.map(user => key.includes(user._id)? user.name: '').join('')
    }
}
