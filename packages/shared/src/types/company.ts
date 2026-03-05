import { EWorkType } from "../enums/company.js";

export interface ICompany {
    name: string;
    logo: string;
    position: string;
    startDate: string;
    endDate: string;
    workType: EWorkType;
    description: string;
}