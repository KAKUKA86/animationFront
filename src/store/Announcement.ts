import {defineStore} from "pinia";
interface announcementInfo {
    anId: number,
    anCreationTime: Date,
    anTitle: string,
    anContent: string,
    anTimeLimit: number,
    adId:number
}
interface state {
    announcementList: announcementInfo []
}
export const useAnnouncementStore = defineStore('announcement', {
    state: () => {
        return {
            announcement: {} as announcementInfo,
            announcementList: [] as announcementInfo []
        }
    }
})