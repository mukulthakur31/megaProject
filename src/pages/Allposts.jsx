import React,{useState,useEffect} from 'react'
import service from '../apperite/database'
import {Container,Postcard} from "../components/index"


function Allposts() {
    const [posts,setposts] =useState([])
    useEffect(()=>{},[])
    service.getactiveposts([]).then((posts)=> {
    if (posts) {
      setposts(posts.documents)
    }
    
  })

  return (
    <div className='w-full py-8'>
      <Container>
        <div className='flex flex-wrap'>
        {posts.map((post)=>(
          <div key={post.$id} className='p-2 w-1/4'>
        <Postcard  {...post}/>
        </div>
      ))}
        </div>
      </Container>
    </div>
  )
}

export default Allposts