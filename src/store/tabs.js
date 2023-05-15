export default{
    state:{
        isCollapse:false, //控制菜单的展开和收
        icon:'fold',
        tabList:[
            {
                path:'/Home',
                name:'home',
                label:'首页',
                icon:'s-home',
                url:'Home/Home'
               }
        ], //面包屑数据
      hidden:'block'
    },
    mutations:{
        CollapseMenu(state){
          state.isCollapse=!state.isCollapse
          if(state.isCollapse===false){
            state.icon='fold'
          }else{
            state.icon='unfold'
          }
        },
        //更新面包屑数据
        selectMenu(state,val){
            if(val.name!==state.tabList.name){
              const index=state.tabList.findIndex(item=>item.name===val.name)

              if(index===-1){
                state.tabList.push(val)
              }
            }
        },
        closeTag(state,item){
              
                const index= state.tabList.findIndex(val=>val.name===item.name)
                state.tabList.splice(index,1)
  
        },
        //隐藏菜单栏
        //  hiddenTag(state,item){
        //       if(item==='label'&&state.tabList.findIndex(val=>val.path==='/Label')){
        //         state.hidden='none'
        //         state.isCollapse=!state.isCollapse
        //        
        //       }
             
        // },
        // //打开菜单栏
        //  displayTag(state){
        //   state.hidden='block'
        //   console.log(state.hidden)
        //   state.isCollapse=!state.isCollapse
        //   state.icon='icon'
        //  }
    }
}