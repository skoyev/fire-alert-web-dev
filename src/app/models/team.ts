import { Employee } from "./employee";

export class Team {
    id:number;
    name:string;
    employees: Employee[];

    constructor(id?:number, name?: string, employees?: Employee[]) { 
        this.id = id;
        this.name = name;
        this.employees = employees;
    }
}