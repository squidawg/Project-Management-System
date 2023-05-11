export class DashboardModel {
    constructor(
        public _id: string,
        public title: string,
        public owner: string,
        public user: string[]){}
}
