import { BusinessChannelKeyValue } from './BusinessChannelKeyValue';

export interface ScriptGuide {
    id: number;
    title: string;
    description: string;
    businessChannel: BusinessChannelKeyValue[]
    languageId: number;
    language: string;
    fileId: string;
    fileName: string;
    fileExtension: string;
    isArchived: boolean;
    createdDate: string;
    createdBy: string;
    UpdatedDate: string;
  }