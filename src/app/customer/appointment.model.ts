export class Appointment {
    constructor(
        public index?: number,
        public id?: number,
        public custid?: number,
        public emp?: string,
        public selectedService?: any,
        public totalprice?: bigint,
        public totalpoint?: string,
        public totaltime?: string,
        public isactive?: boolean,
        public createddate?: Date,
        public updateddate?: Date,

    ) {
    }
}
