export class PSEvent {
    constructor(
        public type: string,
        public amount: number,
        public category: number,
        public data: string,
        public description: string,
        public id?: string,
        public catName?: string
    ) {}
}
