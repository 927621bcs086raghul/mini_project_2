import { Avatar, Button, Flex, Typography } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getLogginedUserDetailsReq } from '../../../redux/utils';
const { Title,Text } = Typography;
import './Profile.css'
const Profile = () => {
  const dispatch=useDispatch()
    const { allUserLoading, AllUser, total, user,userLoading } = useSelector(
    (state) => state.auth
  );
  console.log(user)
  useEffect(()=>{
     if (user?.data?.username == undefined || user.length==0) {
        dispatch(getLogginedUserDetailsReq());
      }
      },[user?.data?.username]);
      console.log(user?.data?.image)
  return (
    <div className='profile'>
      <Flex justify='start' gap={10} align='center' className='profile-header'>
        <Avatar src={user?.data?.image} size={100}></Avatar>
       
        <Flex justify='start' vertical>
          <p className='prfile-details-head'>{user?.data?.firstName} {user?.data?.lastName}</p>
          <p className='prfile-details-head'>{user?.data?.email}</p>
          <p className='prfile-details-head'>{user?.data?.phone}</p>
        </Flex>
      </Flex>
      <hr></hr>
      <Flex vertical  className='profile-details'>
        <Flex vertical className='basic-details'>
        <Title level={2} >Basic Details</Title>
        <Flex gap={100}className='basic-details'>
          <Flex vertical>
          <Title level={4}>First name</Title>
          <Text>{user?.data?.firstName}</Text>
          </Flex>
          <Flex vertical>
          <Title level={4}>Last name</Title>
          <Text>{user?.data?.lastName}</Text>
          </Flex>
          <Flex vertical>
          <Title level={4}>Username</Title>
          <Text>{user?.data?.username}</Text>
          </Flex>
          <Flex vertical>
          <Title level={4}>Username</Title>
          <Text>{user?.data?.username}</Text>
          </Flex>
          <Flex vertical>
          <Title level={4}>Gender</Title>
          <Text>{user?.data?.gender}</Text>
          </Flex>
          <Flex vertical>
          <Title level={4}>Age</Title>
          <Text>{user?.data?.age}</Text>
          </Flex>
          <Flex vertical>
          <Title level={4}>Blood Group</Title>
          <Text>{user?.data?.bloodGroup}</Text>
          </Flex>
           <Flex vertical>
          <Title level={4}>Date of Birth</Title>
          <Text>{user?.data?.birthDate}</Text>
          </Flex>
          <Flex vertical>
          <Title level={4}>Height(cm)</Title>
          <Text>{user?.data?.height}</Text>
          </Flex>
          <Flex vertical>
          <Title level={4}>Weight(kg)</Title>
          <Text>{user?.data?.weight}</Text>
          </Flex>
          <Flex vertical>
          <Title level={4}>Nation</Title>
          <Text>{user?.data?.address?.country}</Text>
          </Flex>
          
        </Flex>
        </Flex>
        <hr></hr>
        <Flex vertical className='company-details'>
        <Title level={2}>Company Details</Title>
        <Flex className='company-details' gap={100}>
        <Flex vertical>
          <Title level={4}>Department</Title>
          <Text>{user?.data?.company?.department}</Text>
          </Flex>
          <Flex vertical>
          <Title level={4}>Company name</Title>
          <Text>{user?.data?.company?.name}</Text>
          </Flex>
          <Flex vertical>
          <Title level={4}>Role</Title>
          <Text>{user?.data?.company?.title}</Text>
          </Flex>
        </Flex>
        </Flex>
      </Flex>
    </div>
  )
}

export default Profile
