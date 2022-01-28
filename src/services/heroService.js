import {
    databaseUrl as url
} from '../config/configuration.js'
import * as data from "../api/data.js";

export const addHero = async (hero, user) => {
    try {
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
        return result;
    } catch (error) {
        console.error(error)
    };

}
export const editHero = async (hero, user) => {
        return new Promise(function(resolve) {
            console.log(`Updating ${hero.name}`);
            fetch(url + "update", {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                    'X-Authorization': user.accessToken
                },
                body: JSON.stringify(hero)
            }).then(result => {
                result.json()
                .then(result => {
                        console.log(`returned hero is ${result.name}`);
                        resolve(result);
                    });
        
            }).catch(error => {
                console.log(`Error: ${error}`);
            });
        });
    //     let response = await fetch(url + "update", {
    //         method: 'PUT',
    //         headers: {
    //             'content-type': 'application/json',
    //             'X-Authorization': user.accessToken
    //         },
    //         body: JSON.stringify(hero)
    //     });
    //     let result = await response.json();
    //     console.log(`Result after update is ${result}`);
    //     return result;
    // } catch (error) {
    //     console.error(error)
    // };

}

export const deleteHero = async (hero, user) => {
    try {
        let response = await fetch(url + "data/heroes/" + hero._id, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'X-Authorization': user.accessToken
            },
            body: JSON.stringify(hero)
        });
        let result = await response.json();

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

export function getHeroById(id) {
    return new Promise(function(resolve) {
        fetch(url + "details/" + id, {
            method: 'GET'
        }).then(heroes => {
            heroes.json()
            .then(result => {
                    resolve(result);
                });
    
        }).catch(error => {
            console.log(`Error: ${error}`);
        });
    
      });

}

export async function getHeroesByOwner(ownerId) {
    try {
        let heroes = await data.getMyHeroes(ownerId);
        return heroes;

    } catch (error) {
        console.error('Failed fetching heroes for ' + ownerId);
    }
}

export async function searchHeroes(searchText) {
    try {
        let heroes = await data.searchHeroes(searchText);
        return heroes;

    } catch (error) {
        console.error('Failed fetching heroes for text ' + searchText);
    }
}