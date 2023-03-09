import {defineStore} from "pinia";

interface auditorInfo {
    auId: number,
    auUsername: string,
    auUserPassword: string,
    acode: number
}
interface State {
    auditorList: auditorInfo []
}
export const useAuditorStore = defineStore('auditor', {
    state: () => {
        return {
            auditor: {} as auditorInfo,
            auditorList: [] as auditorInfo []
        }
    },
    getters: {}, actions: {}
})