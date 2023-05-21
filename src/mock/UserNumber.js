const Mock=require('mockjs')

  function name() {
     const Array=[]
    for (let index = 0; index < 12; index++) {
        Array[index]=Mock.mock({
            'month|1-12':0,
            'onlinePeople|10000-40000':0,
            'replyPeople|1000-2000':0,
            'replyPassNumber|1000-2000':0,
            'failedReplyNumber|100-200':0,
            'totalReplyNumber|50000-100000':0,
            'totalReplyPassNumber|10000-90000':0
       })  
    }
    return Array
  }
    const Array=name()

Mock.mock(/text\/UserNumber/,'get',()=>{
    return Array
})
