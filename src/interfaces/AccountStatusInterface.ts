export default interface AccountStatusInterface {
    account: {
        now: string;
        uid: number;
        login: string;
        region: number;
        fullName: string;
        secondName: string;
        firstName: string;
        displayName: string;
        serviceAvailable: boolean;
        hostedUser: boolean;
        passportPhones: any; // todo: получить типы данных
        registeredAt: string;
    };
    permissions: {
        until: string;
        values: Array<string>;
        default: Array<string>;
    };
    subscription: {
        operator: any; // todo: получить типы данных
        nonAutoRenewable: {
            start: string;
            end: string;
        };
        hadAnySubscription: boolean;
        canStartTrial: boolean;
        mcdonalds: boolean;
    };
    subeditor: boolean;
    subeditorLevel: number;
    pretrialActive: boolean;
    masterhub: {
        activeSubscriptions: Array<any>; // todo: узнать что тут может лежать
        availableSubscriptions: Array<any>; // todo: узнать что тут может лежать
    };
    plus: {
        hasPlus: boolean;
        isTutorialCompleted: boolean;
    };
    defaultEmail: string;
    userhash: string;
};
