import Controller from "../base.controller";

/**
 * @class GlobalNotificationsController
 * @description Responsible to handle the notification view
 */
export default class GlobalNotificationsController extends Controller {
    
    /**
     * @param  {NotificationService} notification
     * @param  {Timeout} $timeout
     */
    constructor(notification, $timeout) {
        super();
        this.notification = notification;
        this.message = "";
        this.error = false;
        this.$timeout = $timeout;
    }
    
    /**
     * @description We are subscribing to an internal Observable in the NotificationService.
     *      - When a new notification has been pushed then update the message;
     -*     - By default, the notification disappear after 2000ms;
     */
    $onInit() {
        this.notification.subscribe(({msg, type} = {}) => {
                this.$timeout(() => {
                    this.message = msg;
                    this.error = type === this.notification.MSG_ERROR;
                    //this.$scope.$digest();
                    this.startCountdown();
                }, 0)
            });
        }
        
    startCountdown() {
        if (this.timeout) {
            this.$timeout.cancel(this.timeout);
        }
        this.timeout = this.$timeout(() => this.message = "", 2000);
    }

    static getTemplateUrl() {
        return 'app/js/controllers/global-notifications/global-notifications.html';
    }
}