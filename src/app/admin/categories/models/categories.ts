export interface ICategory {
    id: number;
    name: string;
    creationDate: string;
    modificationDate: string;
  }
  
  export interface ICategoryDataResponse {
    pageNumber: number;
    pageSize: number;
    data: ICategory[];
    totalNumberOfRecords: number;
    totalNumberOfPages: number;
  }
  
  export interface ICategoryRequestParams {
    name?: string;
    pageSize: number;
    pageNumber: number;
    [key: string]: any;
  }
  