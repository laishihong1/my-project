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
        ], 
     
        hidden:'none',       // 步骤条隐藏
        buttonSwitch:false,    //默认选中默认页面
        headerboxShadow:'0px 20px 10px rgba(0, 0, 0,0.4)',  //注册页面头，上阴影
        footerboxShadow:'0px -20px 10px rgba(0,0,0,0.4)' //注册页面低，下阴影
   
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
        
        //更新User面包屑数据
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
       
        modifyMark(state,item){
           state.hidden=item
        } ,
        
        modifySwitch(state,item){
           //console.log(item)
              state.buttonSwitch=item
          // console.log(state.buttonSwitch)   
        },
       modifyShadow(state,item1,item2){
           state.headerboxShadow=item1
           state.footerboxShadow=item2
       }

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