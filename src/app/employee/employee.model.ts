export class Employee {
    constructor(

        public id?: number,
        public firstname?: string,
        // public middlename?: string,
        public contact?: string,
        public whatsapp?: number,
        public address?: string,
        public city?: string,
        public pincode?: number,
        public gender?: any,
        public services?: string,
        public isactive?: boolean,
        public createddate?: Date,
        public updateddate?: Date
        // public dateofbirth?: string
    ) {
    }
}
