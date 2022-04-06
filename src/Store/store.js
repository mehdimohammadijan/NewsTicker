import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state:{
        news:[],
        loading: false,
        category:'',
        keyword:'',
        page:1,
        paginationLen:0,
        pageSize:10,
        parameters:'',
        endpoint:''

    },
    mutations:{
        setEndpoint(state, payload){
            state.endpoint=payload
        },
        populateParameters(state,payload){
            state.parameters=''
            Object.keys(payload).map((key)=>{
                if(payload[key]!="")
                state.parameters+=`${key}=${payload[key]}&`;
            })
            
        },
        setLoading(state,payload){
            state.loading=payload
        },
        setPages(state,payload){
            
            if(payload>100){
            payload=100
            }
            if((payload/10)<1){
                state.paginationLen=1
            }
            else if(payload%10 != 0){
                state.paginationLen= parseInt(payload/10)+1
            }
            else{
                state.paginationLen=parseInt(payload/10)
            }
            
         },
          setPage(state,payload){
             state.page=payload
          },
         resetPage(state,{page,paginationLen}){
            state.page=page,
            state.paginationLen=paginationLen
         },
        updateNews(state,payload){
            state.news=payload.filter((item)=>{
                if((item.urlToImage!=null)&&(item.title!=null)&&(item.description!=null)
                &&(item.publishedAt!=null)&&(item.content!=null)){
                return item
                }
            })
        }
    },
    getters:{
        getNews: state => state.news,
        loading: state=> state.loading,
        page: state=>state.page,
        paginationLen: state=> state.paginationLen,
        parameters: state=> state.parameters,
        pageSize: state=> state.pageSize,
        endpoint: state=> state.endpoint,
        news: state=> state.news

    },
    actions:{
        async fetchdata(state, category){
            state.commit('setLoading', true)
            const url=`https://newsapi.org/v2/top-headlines?pageSize=20&category=${category}&language=en&apiKey=yourApiKey`
            
            var req = new Request(url);
            const response=await fetch(req)
            const data = await response.json()
            state.commit("updateNews",data.articles)
            state.commit('setLoading', false)
        },
        async searchdata(state, keyword){
            state.commit('setLoading', true) 
            state.commit('resetPage',{page:1,paginationLen:0})
            state.commit('populateParameters',{q: keyword})
            const url=`https://newsapi.org/v2/everything?${state.getters.parameters}pageSize=${state.getters.pageSize}&apiKey=yourApiKey`
           
            var req = new Request(url);
            const response=await fetch(req)
            const data = await response.json()
            state.commit("updateNews",data.articles)
            state.commit('setPages',data.totalResults)
            
            state.commit('setEndpoint',"everything")
            state.commit('setLoading', false)
            },
        async advancedsearchdata(state, {params, endpoint}){
            state.commit('setLoading', true) 
            state.commit('populateParameters',params)
            state.commit('resetPage',{page:1,paginationLen:0})
            let url=''
            const parameter=state.getters.parameters+`pageSize=${state.getters.pageSize}&page=${state.getters.page}&`
            if(endpoint=="everything"){
                url='https://newsapi.org/v2/everything?'+parameter+'apiKey=yourApiKey'
            }
            else{
            url='https://newsapi.org/v2/top-headlines?'+parameter+'apiKey=yourApiKey'
            }
            
            var req = new Request(url);
            const response=await fetch(req)
            const data = await response.json()
            state.commit('updateNews',data.articles)
            state.commit('setPages',data.totalResults)
            state.commit('setEndpoint',endpoint)
            state.commit('setLoading', false)
            
            
            },
            async paginateData(state){
                state.commit('setLoading', true) 
                
                const parameter=state.getters.parameters+`pageSize=${state.getters.pageSize}&page=${state.getters.page}&`
                
                let url=''
                if(state.getters.endpoint=="everything"){
                    url='https://newsapi.org/v2/everything?'+parameter+'apiKey=yourApiKey'
                   
                }
                else{
                url='https://newsapi.org/v2/top-headlines?'+parameter+'apiKey=yourApiKey'
                
                }              
                var req = new Request(url);
                const response=await fetch(req)
                const data = await response.json()
                
                state.commit('updateNews',data.articles)
                state.commit('setLoading', false)
            },
             setPage(state, {page}){
              
                 state.commit('setPage',page)
             }
    }
})