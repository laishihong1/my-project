const Mock=require('mockjs')

  function name() {
     const Array=[]
    for (let index = 0; index < 24; index++) {
        Array[index]=Mock.mock({
             'time':Mock.Random.time('HH:mm:ss'),
             'replyPeople':Mock.Random.natural( 1000, 10000 ),
             'onLinePeople':Mock.Random.natural( 1000, 10000 ),
       })  
    }
    return Array
  }

  const Array=name()

  Mock.mock(/text\/mockDayData/,'get',()=>{
    return Array
})
