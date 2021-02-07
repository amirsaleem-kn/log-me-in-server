export default class Exception extends Error {
    public code: number = null;
    constructor(props: any, code: number, name: string) {
        super(props);
        this.code = code;
        this.name = name;
    }
}
