const Mock=require('mockjs')


Mock.mock(/text\/user/,'post',(option)=>{
        return {
               flag:'true',
               data:{
                'userAccount':Mock.Random.word(6,8),
                'userName':Mock.Random.cname(),
                'userOnlineTime':Mock.Random.now(),
                'userLocation':Mock.Random.city(true),
                'userUsedEquipment':'手机',
               }
        }
})