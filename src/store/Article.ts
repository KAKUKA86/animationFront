import {defineStore} from "pinia";

interface articleInfo{
    arId : number,
    arTitle : string,
    arContent : string,
    arTime: Date,
}
interface State{
    articleList:articleInfo []
}
export const useArticleStore = defineStore('article',{
    state:()=>{
        return{
            articleList:[] as articleInfo []
        }
    },
    getters:{

    },actions:{

    }
})
