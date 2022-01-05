import { databaseUrl as url } from '../config/configuration.js'
import { addNotification } from './notificationService.js'
import * as data from "../api/data.js";

export const addHero = async (hero, user) => {
    try {
        let response = await fetch(url + "hero", {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-Authorization': user.accessToken
            },
            body: JSON.stringify(hero)
        });
        let result = await response.json();
        await createNotification(result, user);
        return result;
    } catch (error) {
        console.error(error)
    };

}
export const editMeal = async (hero, user) => {
    try {
        let response = await fetch(url + "data/heros/"+hero._id, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'X-Authorization': user.accessToken
            },
            body: JSON.stringify(hero)
        });
        let result = await response.json();
        // Notification for Edit
        let notification =
        {
            who: user.email,
            dateString: Date.now().toString(),
            date: Date.now(),
            text: `Editted `,
            recipe: hero._id,
            recipeName: hero.name,
        }
        await addNotification(notification);
        return result;
    } catch (error) {
        console.error(error)
    };

}

export const deleteMeal = async (hero, user) => {
    try {
        let response = await fetch(url + "data/heros/"+hero._id, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'X-Authorization': user.accessToken
            },
            body: JSON.stringify(hero)
        });
        let result = await response.json();
        // Notification for Edit
        let notification =
        {
            who: user.email,
            dateString: Date.now().toString(),
            date: Date.now(),
            text: `Deleted `,
            recipe: hero._id,
            recipeName: hero.name,
        }
        await addNotification(notification);
        return result;
    } catch (error) {
        console.error(error)
    };

}

export async function getHeroes() {
    try {
        let heros = await data.getHeroes();
        // let result = await heros.json();
        return heros;

    } catch (error) {
        console.error('Failed fetching heros!');
    }
}

export async function getHeroById(id) {
    try {
        let heros = await fetch(url + "data/heros/"+id, {
            method: 'GET'
        });
        let result = await heros.json();

        return result;

    } catch (error) {
        console.error(`Failed fetching hero ${id}!`);
    }
}

export async function getHeroesByOwner(ownerId) {
    try {
        let heros = await data.getMyHeroes(ownerId);
        return heros;

    } catch (error) {
        console.error('Failed fetching heros for '+ownerId);
    }
}

export async function searchHeroes(searchText) {
    try {
        let heros = await data.searchHeroes(searchText);
        return heros;

    } catch (error) {
        console.error('Failed fetching heros for text '+searchText);
    }
}

export async function createNotification(hero, user) {
    let notification =
    {
        who: user.email,
        dateString: Date.now().toString(),
        date: Date.now(),
        text: `Added `,
        recipe: hero._id,
        recipeName: hero.name,
    }
    await addNotification(notification);
}