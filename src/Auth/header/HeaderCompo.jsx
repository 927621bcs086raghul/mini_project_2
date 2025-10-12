import React,{useEffect} from 'react';
import { Avatar, Flex, Layout, Popover } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ProfileOutlined, LogoutOutlined,MoonFilled  } from '@ant-design/icons';
import { userLogoutRequest,getLogginedUserDetailsReq } from '../../redux/utils';
import './HeaderCompo.css';

const { Header } = Layout;

const HeaderCompo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(userLogoutRequest());
  };
  useEffect(() => {
    if (user?.data?.username == undefined || user.length == 0) {
      dispatch(getLogginedUserDetailsReq());
    }
  }, [user?.data?.username]);
  useEffect(()=>{
    const userTheme=JSON.parse(localStorage.getItem("userTheme"));
    if(!userTheme || userTheme==undefined ){
        document.body.classList.add('my-body-class');
        localStorage.setItem("userTheme","true");
    }
    else{
        document.body.classList.remove('my-body-class');
        localStorage.setItem("userTheme","false");
    }
  },[])
  const content = (
    <div>
      <p style={{ margin: '0px', cursor: 'pointer' }} onClick={() => navigate('/profile')}>
        <ProfileOutlined style={{ paddingRight: '5px' }} /> Profile
      </p>
      <hr />
      <p style={{ margin: '0px', cursor: 'pointer' }} onClick={handleLogout}>
        <LogoutOutlined style={{ paddingRight: '5px' }} /> logout
      </p>
    </div>
  );
const handleTheme =()=>{
    const userTheme=JSON.parse(localStorage.getItem("userTheme"));
    if(!userTheme || userTheme==undefined ){
        document.body.classList.add('my-body-class');
        localStorage.setItem("userTheme","true");
    }
    else{
        document.body.classList.remove('my-body-class');
        localStorage.setItem("userTheme","false");
    }
}
  return (
    <Header className="header">
      <p style={{ fontSize: '19px', color: 'hsl(0deg 0% 99.22%)' }}>Hello! {user?.data?.username}</p>
      <Flex align="center" gap={'10px'}>
        <MoonFilled style={{color:"white"}} onClick={handleTheme}/>
        <Popover content={content} trigger="hover">
          <Avatar style={{ cursor: 'pointer' }} className="header-avatar" size={37}>
            {user?.data?.username?.[0]?.toUpperCase()}
          </Avatar>
        </Popover>
      </Flex>
    </Header>
  );
};

export default HeaderCompo;
