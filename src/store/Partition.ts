import {defineStore} from "pinia";

interface articleInfo {
    paId: number,
    paName: string
}

interface State {
    articleList: articleInfo []
}

export const usePartitionStore = defineStore('partition', {
    state: () => {
        return {
            partition: {} as articleInfo,
            partitionList: [] as articleInfo []
        }
    },
    getters: {}, actions: {}
})