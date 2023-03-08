import {defineStore} from "pinia";

interface favoriteInfo {
    faId: number,
    noId: number,
    arTitle: string,
    faTime: Date,
}

interface State {
    favoriteList: favoriteInfo []
}

export const useFavoriteStore = defineStore('favorite', {
    state: () => {
        return {
            favoriteList: [] as favoriteInfo []
        }
    },
    getters: {}, actions: {}
})
