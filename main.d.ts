export default class PyLoraAdapter {
    sensor: any;
    constructor();
    listen(messageCB: ({ id, value }: {
        id: number;
        value: number;
    }) => void): void;
    end(): void;
}
