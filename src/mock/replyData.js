const Mock=require('mockjs')

  function name() {
     const Array=[]
    for (let index = 0; index < 10; index++) {
        Array[index]=Mock.mock({
            'replyTime':Mock.Random.now(),
            'replyAccount':Mock.Random.word(6,8),
            'replyPassword':Mock.Random.word(6,8),
            'numberPhone':'12345678901',
            'totalTime':Mock.Random.natural(60, 200),
            'replyReason':Mock.Random.cparagraph(2)
       })  
    }
    return Array
  }
    const Array=name()

Mock.mock(/text\/reply/,'get',()=>{
    return Array
})

Mock.mock(/text\/reply/,'delete',(option)=>{
       console.log(option)
       return flag=1
})

Mock.mock(/text\/reply/,'post',(option)=>{
  console.log(option)
  return flag=1
})