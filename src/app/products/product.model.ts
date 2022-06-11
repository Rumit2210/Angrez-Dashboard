export class Products {
    index: number;
    constructor(
        public id?: number,
        public name?: string,
        public image?:string,
        public category?: string,
        public price?:number,
        public quantity?: number,
        public purchasedate?: Date,
        public vendorname?: string,
        public vendorcontact?: number,
        public descripition?: string,
        public isactive?: boolean,
        public createddate?: Date,
        public updateddate?: Date,
    ) {
    }
}
