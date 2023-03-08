import {defineStore} from "pinia";

interface articleInfo {
    arId: number,
    noId: number,
    paId: number,
    arTitle: string,
    arContent: string,
    arTime: Date,
    arView: number,
    arStatus: number
    auId: number
}

interface State {
    articleList: articleInfo []
}

export const useArticleStore = defineStore('article', {
    state: () => {
        return {
            article: {} as articleInfo,
            articleList: [] as articleInfo []
        }
    },
    getters: {}, actions: {}
})
