import { databaseUrl as url } from '../config/configuration.js'
import { addNotification } from './notificationService.js'
import * as data from "../api/data.js";

export const addHero = async (hero, user) => {
    try {
        console.log(`Adding ${JSON.stringify({
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-Authorization': user.accessToken
            },
            body: JSON.stringify(hero)
        })}`);
        let response = await fetch(url + "create", {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-Authorization': user.accessToken
            },
            body: JSON.stringify(hero)
        });
        let result = await response.json();
        console.log(`response is ${response}`);
        await createNotification(result, user);
        return result;
    } catch (error) {
        console.error(error)
    };

}
export const editHero = async (hero, user) => {
    // console.log(`Updating ${JSON.stringify(hero)}`);
    try {
        let response = await fetch(url + "update", {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'X-Authorization': user.accessToken
            },
            body: JSON.stringify(hero)
        });
        let result = await response.json();
        console.log(`Result is ${result}`);
        return result;
    } catch (error) {
        console.error(error)
    };

}

export const deleteHero = async (hero, user) => {
    try {
        let response = await fetch(url + "data/heroes/"+hero._id, {
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
        let heroes = await data.getHeroes();
        // let result = await heroes.json();
        return heroes;

    } catch (error) {
        console.error('Failed fetching heroes!');
    }
}

export async function getHeroById(id) {
    try {
        let heroes = await fetch(url + "details/"+id, {
            method: 'GET'
        });
        let result = await heroes.json();

        return result;

    } catch (error) {
        console.error(`Failed fetching hero ${id}!`);
    }
}

export async function getHeroesByOwner(ownerId) {
    try {
        let heroes = await data.getMyHeroes(ownerId);
        return heroes;

    } catch (error) {
        console.error('Failed fetching heroes for '+ownerId);
    }
}

export async function searchHeroes(searchText) {
    try {
        let heroes = await data.searchHeroes(searchText);
        return heroes;

    } catch (error) {
        console.error('Failed fetching heroes for text '+searchText);
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