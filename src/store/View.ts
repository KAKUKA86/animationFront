import {defineStore} from "pinia";

interface ViewInfo {
    viId : number,
    arId : number,
    noId : number,
    viTime : Date
}
interface State {
    viewList : ViewInfo []
}

export const useViewStore = defineStore('view', {
    state: () => {
        return {
            view: {} as ViewInfo,
            viewList: [] as ViewInfo []
        }
    },
    getters: {}, actions: {}
})