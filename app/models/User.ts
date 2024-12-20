


export interface UserGet {
    uuid: string;

    name: {
        title: string;
        first: string;
        last: string;
    };
    email: string;
    picture: {
        medium: string;
    };
    location: {
        country: string;
        city: string;
        street: {
            number: number;
            name: string;
        };
    };
}


export interface UserIns {
    uuid?: string;
    name: { 
        first: string;
        last: string;
        title: string;
    };
    email: string;
    location: {
        country: string;
        city: string;
        street: {
            name: string;
            number: number
        }
    };
    picture: { medium: string };
}
