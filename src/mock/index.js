const Mock=require('mockjs')

  function name() {
     const Array=[]
    for (let index = 0; index < 10; index++) {
        Array[index]=Mock.mock({
            'month|1-12':0,
            'onLinePeople|10000-40000':0,
            'replyPeople|1000-2000':0,
            'waitTakePeople|1000-2000':0
       })  
    }
    return Array
  }
    const Array=name()

Mock.mock(/text\/textInfo/,'get',()=>{
    return Array
})
