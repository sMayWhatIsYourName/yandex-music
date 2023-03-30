export interface Id {
    type: string;
    tag: string;
}

export interface ParentId {
    type: string;
    tag: string;
}

export interface Icon {
    backgroundColor: string;
    imageUrl: string;
}

export interface MtsIcon {
    backgroundColor: string;
    imageUrl: string;
}

export interface PossibleValue {
    value: string;
    name: string;
}

export interface Language {
    type: string;
    name: string;
    possibleValues: PossibleValue[];
}

export interface Min {
    value: number;
    name: string;
}

export interface Max {
    value: number;
    name: string;
}

export interface Mood {
    type: string;
    name: string;
    min: Min;
    max: Max;
}

export interface Min2 {
    value: number;
    name: string;
}

export interface Max2 {
    value: number;
    name: string;
}

export interface Energy {
    type: string;
    name: string;
    min: Min2;
    max: Max2;
}

export interface PossibleValue2 {
    value: string;
    name: string;
}

export interface Diversity {
    type: string;
    name: string;
    possibleValues: PossibleValue2[];
}

export interface Restrictions {
    language: Language;
    mood: Mood;
    energy: Energy;
    diversity: Diversity;
}

export interface PossibleValue3 {
    value: string;
    name: string;
    imageUrl: string;
    serializedSeed: string;
    unspecified?: boolean;
}

export interface Diversity2 {
    type: string;
    name: string;
    possibleValues: PossibleValue3[];
}

export interface PossibleValue4 {
    value: string;
    name: string;
    imageUrl: string;
    serializedSeed: string;
    unspecified?: boolean;
}

export interface MoodEnergy {
    type: string;
    name: string;
    possibleValues: PossibleValue4[];
}

export interface PossibleValue5 {
    value: string;
    name: string;
    unspecified: boolean;
    serializedSeed: string;
}

export interface Language2 {
    type: string;
    name: string;
    possibleValues: PossibleValue5[];
}

export interface Restrictions2 {
    diversity: Diversity2;
    moodEnergy: MoodEnergy;
    language: Language2;
}

export interface Station2 {
    id: Id;
    parentId?: ParentId;
    name: string;
    icon: Icon;
    mtsIcon: MtsIcon;
    fullImageUrl: string;
    mtsFullImageUrl: string;
    idForFrom: string;
    restrictions: Restrictions;
    restrictions2: Restrictions2;
}

export interface Settings {
    language: string;
    mood: number;
    energy: number;
    diversity: string;
}

export interface Settings2 {
    language: string;
    moodEnergy: string;
    diversity: string;
}

export interface AdParams {
    partnerId: string;
    categoryId: string;
    pageRef: string;
    targetRef: string;
    genreId: number;
    genreName: string;
    otherParams: string;
    adVolume: number;
}

export interface Station {
    station: Station2;
    settings: Settings;
    settings2: Settings2;
    adParams: AdParams;
    explanation: string;
    rupTitle: string;
    rupDescription: string;
}

export default interface StationDashboardInterface {
    dashboardId: string;
    stations: Station[];
    pumpkin: boolean;
};
