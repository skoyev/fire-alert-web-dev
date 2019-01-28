export class Profile {
    business: BusinessProfile;
    personal: PesonalProfile;
}

export class BusinessProfile{
    legalName:string;
    businessRegNum:string;
    ownership:number;
    taxes:string;
    agrStartDate:string;
    agrRenewalDate:string;
    royaltyFee:number;
    marketingFee:number;
}

export class PesonalProfile{
    
}