export interface CoverWithoutText {
    type: string;
    dir: string;
    version: string;
    uri: string;
    custom: boolean;
}

export interface Owner {
    uid: number;
    login: string;
    name: string;
    sex: string;
    verified: boolean;
}

export interface Cover {
    type: string;
    dir: string;
    version: string;
    uri: string;
    custom: boolean;
}

export interface UserInfo {
    uid: number;
    login: string;
    name: string;
    sex: string;
    verified: boolean;
}

export interface CaseForms {
    nominative: string;
    genitive: string;
    dative: string;
    accusative: string;
    instrumental: string;
    prepositional: string;
}

export interface MadeFor {
    userInfo: UserInfo;
    caseForms: CaseForms;
}

export interface Tag {
    id: string;
    value: string;
}

export interface PlayCounter {
    value: number;
    description: string;
    descriptionNext: string;
    updated: boolean;
}

export interface PlaylistInterface {
    uid: number;
    kind: number;
    title: string;
    description: string;
    descriptionFormatted: string;
    revision: number;
    snapshot: number;
    visibility: string;
    collective: boolean;
    created: Date;
    modified: Date;
    available: boolean;
    isBanner: boolean;
    isPremiere: boolean;
    idForFrom: string;
    everPlayed: boolean;
    generatedPlaylistType: string;
    coverWithoutText: CoverWithoutText;
    owner: Owner;
    trackCount: number;
    ogImage: string;
    durationMs: number;
    cover: Cover;
    madeFor: MadeFor;
    tags: Tag[];
    backgroundColor: string;
    textColor: string;
    image: string;
    animatedCoverUri: string;
    playCounter: PlayCounter;
}

export default interface PersonalPlaylistInterface {
    id: string;
    type: string;
    data: {
        type: string;
        notify: boolean;
        previewDescription: string;
        ready: boolean;
        description: any[];
        data: PlaylistInterface;
    };
}
