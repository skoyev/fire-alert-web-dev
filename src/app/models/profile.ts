export class Profile {
    id:number;
    business: BusinessProfile = new BusinessProfile();
    personal: PesonalProfile = new PesonalProfile();
    name:string;
    type:string;
    location:string;
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
    firstName:string;
    lastName:string;
    gender:string;
    age:number;
    birthday:string;
    homePhone:string;
    cellPhone:string;
    address:string;
    email:string;
    website:string;

}