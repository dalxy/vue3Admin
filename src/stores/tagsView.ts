import { defineStore } from "pinia";
import { RouteLocationNormalizedLoaded } from "vue-router";

export const useTagsView = defineStore('tag', ()=>{
    const visitedViews = ref<RouteLocationNormalizedLoaded[]>([])
    const addView = (view: RouteLocationNormalizedLoaded)=>{
        if(visitedViews.value.some((v)=>v.path === view.path)) return
        visitedViews.value.push(Object.assign({},view, {
            title: view.meta.title || 'tag-name'
        }))
    }
    const delView = (view: RouteLocationNormalizedLoaded)=>{
        const i = visitedViews.value.indexOf(view)
        if(i>-1){
            visitedViews.value.splice(i, 1)
        }
    }
    return { visitedViews, addView, delView }
})
