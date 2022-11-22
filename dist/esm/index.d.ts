export interface Message<C> {
    code: string;
    sender: string;
    context: C;
}
export type MessageHandler<C> = (message: Message<C>) => void;
export declare class MessageManager {
    private static subscriptionLists;
    /**
     * Attach a subscriber to listen to all Messages of a certain Message code
     *
     * @static
     * @param {string} code Message code
     * @param {MessageHandler} handler Callback function to execute upon receiving a message
     * @memberof Message
     */
    static subscribe<C>(code: string, handler: MessageHandler<C>): void;
    /**
     * Remove a subscriber from a certain Message code
     *
     * @static
     * @param {string} code Message code
     * @param {MessageHandler} handler Callback function to be unsubscribed
     * @memberof Message
     */
    static unsubscribe<C>(code: string, handler: MessageHandler<C>): void;
    /**
     * Sends the message, by executing all the subscribed callback functions
     *
     * @static
     * @param {string} code Message code
     * @param {string} sender Sender of the message
     * @param {C} context Extra data to send with the message
     * @memberof Message
     */
    static send<C>(code: string, sender: string, context: C): void;
}
