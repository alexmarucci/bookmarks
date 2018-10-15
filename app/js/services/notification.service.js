/**
 * @class NotificationService
 * @description It will create an $notification Observable to subscribe to for getting the notifications;
 * 
 * @see https://github.com/zenparsing/es-observable
 */
export default class NotificationService {

    constructor() {
        this.stream = null;
        this.$notification = new Observable((observer) => {this.stream = observer});
        this.MSG_ERROR = 'msg-error';
    }

    /**
     * 
     * @param {callable} mainCallback The main callable for the observable's subscription
     * @param {callable} errCallback The callable on error (optional)
     */
    subscribe(mainCallback, errCallback) {
        this.$notification.subscribe({ next: mainCallback, error: errCallback });
    }

    /**
     * @param {Object} message Contains the notification message
     * @param {string} type Contains the message type
     * @description It will push the next value in the stream
     */
    show(message, type="") {
        this.stream.next(message);
    }

    /**
     * @description It will push a new value in the stream but with a null response;
     */
    hide() {
        this.stream.next(null);
    }
}