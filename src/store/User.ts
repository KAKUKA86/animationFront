import {defineStore} from "pinia";

interface userInfo {
    noId: number,
    noUsername: string,
    noUserPassword: string,
    noGender: string,
    noBirthday: Date,
    noEmail: string,
    aCode: number
}

interface State {
    userList: userInfo []
}

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            user: {} as userInfo,
            userList: [] as userInfo []
        }
    },
    getters: {}, actions: {}
})