import {defineStore} from "pinia";

interface lexiconInfo {
    leId: number,
    leWord: string,
    leCreationTime: Date,
    leNumber: number,
    adId: number,
}
interface state {
    lexiconList: lexiconInfo []
}

export const useLexiconStore = defineStore('lexicon', {
    state: () => {
        return {
            lexicon: {} as lexiconInfo,
            lexiconList: [] as lexiconInfo []
        }
    }
})