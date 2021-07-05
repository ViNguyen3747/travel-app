export interface ILocation {
    name: string;
    local_names: any;
    lat: number;
    lon: number;
    country: string;
    state?: string;
}

export interface IPlace {
    type: string;
    subType: string;
    id: string;
    self: {
        href: string;
        methods: string[];
    };
    geoCode: {
        latitude: number;
        longitude: number;
    }
    name: string;
    category: string;
    rank: number;
    tags: string[]
}

export interface IToken {
    access_token: string;
    applicaiton_name: string;
    client_id: string;
    expires_in: number;
    scope: string;
    state: string;
    token_type: string;
    type: string;
    username:string;
}

export interface IDialog {
    success: boolean;
    place: IPlace;
}

export interface ISearch {
    city: string;
    lat: number;
    lon: number;
    categories: string;
}

export interface IFlickers {
    id: string;
    owner: string;
    secret: string;
    server:string;
    farm: number;
    title: string;
    ispublic: number;
    isfriend: number;
    isfamily: number;
}