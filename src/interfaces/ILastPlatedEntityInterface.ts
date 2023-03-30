export type LastPlayedEntityType = 'playlist' | 'track';

export interface ILastPlatedEntityInterface {
    tag: string;
    type: LastPlayedEntityType;
}
