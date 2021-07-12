import { BusinessChannelKeyValue } from './BusinessChannelKeyValue';

export interface Byb {
    id: number;
    title: string;
    description: string;
    businessChannel: BusinessChannelKeyValue[]
    contentTypeId: number;
    contentType: string;
    careerSegmentId: number;
    careerSegment: string;
    fileIdEN: string;
    fileNameEN: string;
    fileExtensionEN: string;
    filePathEN: string;
    fileIdMS: string;
    fileNameMS: string;
    fileExtensionMS: string;
    filePathMS: string;
    isArchived: boolean;
    createdDate: string;
    createdBy: string;
    UpdatedDate: string;
  }