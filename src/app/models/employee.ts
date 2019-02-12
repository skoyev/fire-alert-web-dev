export class Employee {
    id: number;
    name:string;
    type:string;
    teamId:number;

    constructor(id?:number, name?: string, type?:string, teamId?:number) { 
        this.id = id;
        this.teamId = teamId;
        this.name = name;
        this.type = type;
    }
}