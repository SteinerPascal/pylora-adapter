export default class PyLoraAdapter {
    private sensor;
    private listeners;
    constructor();
    private startListening;
    listen(messageCB: ({}: {
        [key: string]: any;
    }) => void): void;
    end(): void;
}
