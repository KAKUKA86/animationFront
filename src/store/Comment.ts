import {defineStore} from "pinia";

interface commentInfo {
    coId: number,
    noId: number,
    coContent: string,
    coTime: Date,
}

interface State {
    commentList: commentInfo []
}

export const useCommentStore = defineStore('comment', {
        state: () => {
            return {
                comment: {} as commentInfo,
                commentList: [] as commentInfo []
            }
        },
        getters: {}, actions: {}
    }
)

