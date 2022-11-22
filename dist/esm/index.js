export class MessageManager {
    static subscriptionLists = new Map();
    /**
     * Attach a subscriber to listen to all Messages of a certain Message code
     *
     * @static
     * @param {string} code Message code
     * @param {MessageHandler} handler Callback function to execute upon receiving a message
     * @memberof Message
     */
    static subscribe(code, handler) {
        if (!MessageManager.subscriptionLists.get(code)) {
            MessageManager.subscriptionLists.set(code, []);
        }
        MessageManager.subscriptionLists.get(code)?.push(handler);
    }
    /**
     * Remove a subscriber from a certain Message code
     *
     * @static
     * @param {string} code Message code
     * @param {MessageHandler} handler Callback function to be unsubscribed
     * @memberof Message
     */
    static unsubscribe(code, handler) {
        const subscriptionList = MessageManager.subscriptionLists.get(code);
        if (!subscriptionList) {
            console.warn(`Cannot unsubscribe from code ${code} as it is not currently registered`);
        }
        else {
            const index = subscriptionList?.indexOf(handler);
            if (index) {
                subscriptionList?.splice(index, 1);
                if (subscriptionList?.length === 0) {
                    MessageManager.subscriptionLists.delete(code);
                }
            }
        }
    }
    /**
     * Sends the message, by executing all the subscribed callback functions
     *
     * @static
     * @param {string} code Message code
     * @param {string} sender Sender of the message
     * @param {C} context Extra data to send with the message
     * @memberof Message
     */
    static send(code, sender, context) {
        const subscriptionList = MessageManager.subscriptionLists.get(code);
        if (subscriptionList) {
            const message = { code, sender, context };
            subscriptionList.forEach((handler) => handler(message));
        }
    }
}
//# sourceMappingURL=index.js.map