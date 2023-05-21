const Mock=require('mockjs')

  function name() {
     const Array=[]
    for (let index = 0; index < 10; index++) {
        Array[index]=Mock.mock({
          
             'userAccount':Mock.Random.word(6,8),
             'userName':Mock.Random.cname(),
             'userOnlineTime':Mock.Random.now(),
             'userTotalTime|0-100':0,
             'userLocation':Mock.Random.city(true),
             'userUsedEquipment':'手机',
    
       })  
    }
    return Array
  }
    const Array=name()

Mock.mock(/text\/comManage/,'get',()=>{
    return Array
})
