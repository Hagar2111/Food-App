export interface IUserResponse {
    id:number;
    userName:string;
    email:string;
    country:string;
    phoneNumber:string;
    imagePath:string;
    group: Igroup;
    creationDate:string;
    modificationDate:string;
}

export interface Igroup{
    id:number;
    name:string;
    creationDate:string;
    modificationDate:string;
}

export interface IAllUsers{
    userName?:string;
    email?:string;
    country?:string;
    groups?:number[];
    pageSize:number;
    pageNumber:number;
}

export interface IAllUsersResponse{
    pageNumber:number;
    pageSize:number;
    data:IUserResponse[],
    totalNumberOfRecords:number;
    totalNumberOfPages:number;
}
