import { Flex,Image, Tag, Typography } from 'antd';
import React from 'react'
import { useSelector } from 'react-redux';
import './ViewPost.css'
import { useParams } from 'react-router-dom'
const {Title,Text}=Typography;

const colors = ['#874242ff', '#558155ff', '#7777c2ff'];
const ViewPost = () => {
    const {id}=useParams();
      const { allUserLoading, AllPostData, total, modalValue,loading,loadingId } = useSelector(
    (state) => state.auth
  );
  const postById=AllPostData.find((post)=> post.id==id);
   const getRandomColr = (colorArray) => {
  const randomIndex = Math.floor(Math.random() * colorArray.length);
  return colorArray[randomIndex];
};
  return (
    <div className='view-post'>
        <Flex vertical className='view-post-details'gap={10} >
            <Title style={{margin:0}}>{postById?.title}</Title>
      <Image src='https://cdn.pixabay.com/photo/2018/08/04/11/30/draw-3583548_1280.png'
      className='post-image'
      ></Image>
      <Flex gap={5}>
                    {postById?.tags?.map((tag)=>(
                      <Tag color={getRandomColr(colors)}>{tag}</Tag>
                    ))}</Flex>
      <Text  className='post-body'>{postById?.body}</Text>
        </Flex>
    </div>
  )
}
export default ViewPost
