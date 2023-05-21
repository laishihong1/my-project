const Mock=require('mockjs')

Mock.mock(/text\/login/,'post',(option)=>{
       console.log(option)
})