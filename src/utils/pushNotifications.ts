/**
 * @description functions to implement recieving push notifications
 */


/**
 * subscribe browser's user to push notification
 * @returns created push notification registration
 */
export async function subscribeUser(): Promise<PushSubscription | null> {

    try {

        // ! Check if serviceWorker exists in navigator
        if (!('serviceWorker' in navigator)) return null;

        // -> Get service worker registration
        const swRegistration: ServiceWorkerRegistration = await navigator.serviceWorker.ready;

        // -> Subscribe to push notifications
        const pnSubscription: PushSubscription = await swRegistration.pushManager.subscribe({ userVisibleOnly: true });

        // End
        return pnSubscription;

    }
    catch (e: unknown) {

        // () Notification Permission Denied
        if (Notification.permission === 'denied') {
            console.warn('Permission for notifications was denied', e);
        }
        // () Generic Error
        else {
            console.error('Unable to subscribe to push', e);
        }

        // End [failed]
        return null;
    }
}

/**
 * Get user's push notification subscription.\
 * If it does not exist, then subscribes the user.\
 * In case this operation fails, null is returned.
 * @returns user's push notification subscription
 */
export async function getPushSubscription(): Promise<PushSubscription | null> {

    try {

        // ! Check if serviceWorker exists in navigator
        if (!('serviceWorker' in navigator)) return null;
    
        // -> Get service worker registration
        const swRegistration: ServiceWorkerRegistration = await navigator.serviceWorker.register('sw.js');
        console.log('Service Worker Registered!', swRegistration);
    
        // -> Get push notification subscription
        let pnSubscription: PushSubscription | null = await swRegistration.pushManager.getSubscription();
    
        // -> If push notification subscription not found, subscribe user
        if(pnSubscription === null) pnSubscription = await subscribeUser();
        
        // End
        return pnSubscription;

    }
    catch(e: unknown) {
        console.error('failed to get push notification subscription', e);
        return null;
    }

}