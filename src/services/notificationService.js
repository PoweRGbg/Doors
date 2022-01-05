import { url } from '../config/configuration.js'

export const addNotification = async (notification) => {
    // notification = [
    //     {
    //         who: "User name",
    //         dateString: Date.now().toString(),
    //         date: Date.now(),
    //         text: "Addied ",
    //         recipe: "recipeId",
    //         recipeName: "recipe.name",
    //     }
    // ]
    try {
        let response = await fetch(url + "/notifications", {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(notification)
        });
        let result = await response.json();
        return result;
    } catch (error) {
        console.error(error)
    };

}

export async function getNotifications () {
    try {
        let notifications = await fetch(url + "/notifications", {
            method: 'GET'
        });
        let result = await notifications.json();
        return Object.values(result);
    } catch (error) {
        console.error("Failed fetching notifications from database!");
    }

}