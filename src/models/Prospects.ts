export interface ProspectPaging {
    totalRecords: number,
    totalPages: number,
    pageSize: number,
    currentPageNo: number,
    result: Prospect[] 
  }

  export interface Prospect {
    id: string,
    name: string,
    mobileContact: string,
    email: string,
    profileStatusId: number,
    profileStatusName: string,
    recruiterCode: string,
    recruiterName: string,
    loaderCode: string,
    loaderName: string,
    regionId: number,
    regionName: string,
    branchId: number,
    branchName: string,
    hasMet: boolean,
    statusId: number,
    statusName: string,
    registeredDate: Date
  }