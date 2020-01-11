export interface FlagData {
    _id: string;
    name: string;
    groupName: string;
    isEnabled: boolean;
    type: string;
    dateCreated: Date;
    dateArchived?: Date;
    isArchived: boolean;

    currentPercentage?: number;
}
