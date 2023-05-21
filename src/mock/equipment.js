const Mock=require('mockjs')

Mock.mock(/text\/textequipment/,'get',()=>{
   
    return {
      'mobilePhone':Mock.Random.natural(1000,10000),
      'pad':Mock.Random.natural(1000,10000),
      'otherEquipment':Mock.Random.natural(1000,10000),
      'desktopComputers':Mock.Random.natural(1000,10000),
      'noteBook':Mock.Random.natural(1000,10000)
    }
})
