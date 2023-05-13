const Mock=require('mockjs')

  function name() {
     const Array=[]
    for (let index = 0; index < 10; index++) {
        Array[index]=Mock.mock({
             'province':Mock.Random.province(),
             'replyPeople':Mock.Random.natural( 1000, 10000 ),
             'onLinePeople':Mock.Random.natural( 10000, 50000 ),
             'totalPeople':Mock.Random.natural(100000, 200000 )
       })  
    }
    return Array
  }

  const Array=name()

  Mock.mock(/text\/lineTable1/,'get',()=>{
    return Array
})