import { url } from '../config/configuration.js'
import { addNotification } from './notificationService.js'

export const addComment = async (comment, user) => {
    try {
        let response = await fetch(url + "/comments", {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(comment)
        });
        let result = await response.json();
        createNotification(comment, user);
        return result;
    } catch (error) {
        console.error(error)
    };

}

export async function getComments(mealId) {
    
    const commentsUrl = url + `/comments`;
    // const commentsUrl = url + `/comments`;
    try {

        let comments = await fetch(commentsUrl , {
            method: 'GET'
        });
        console.log(`comments is ${JSON.stringify(comments)}`);
        let result = await comments.json();
        let arrayOfResults = Object.values(result).filter(x=> x.recipe === mealId);
        return arrayOfResults;

    } catch (error) {
        console.log(`Failed fetching comments! ${error}`);
    }
}


export function createNotification(comment, user) {
    let notification =
    {
        who: user.email,
        dateString: Date.now().toString(),
        date: Date.now(),
        text: `Commented `,
        recipe: comment.recipe,
        recipeName: comment.recipeName,
    }
    addNotification(notification);
}