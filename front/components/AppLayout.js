import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col, Affix } from 'antd';
import {
  HomeOutlined,TwitterOutlined,UserOutlined
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import Router from 'next/router';

import UserProfile from './UserProfile';
import LoginForm from './LoginForm';
import useInput from '../hooks/useInput';

const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);
  const [searchInput, onChangeSearchInput] = useInput('');

  const onSearch = useCallback(() => {
    Router.push(`/hashtag/${searchInput}`);
  }, [searchInput]);

  return (
    <div>
      <Row justify="center">
        <Col xs={3} sm={3} md={4} lg={3}>
          <Affix>
            <Menu style={{ minHeight: "100vh"}}>
              <Menu.Item style={{ marginTop: "15px"}}>
                <Link href="/"><a><TwitterOutlined style={{ fontSize: '28px', color: 'skyblue'}}/></a></Link>
              </Menu.Item>
              <Menu.Item>
                <Link href="/"><a><h3><strong><HomeOutlined style={{ fontSize: '20px' }}/>홈</strong></h3></a></Link>
              </Menu.Item>
              <Menu.Item>
                <Link href="/profile"><a><h3><strong><UserOutlined style={{ fontSize: '20px' }}/>프로필</strong></h3></a></Link>
              </Menu.Item>
              {me && <UserProfile />}
            </Menu>
          </Affix>
        </Col>

        <Col 
          xs={21} sm={15} md={11} lg={11} 
          style={{ borderLeft: '0.1px solid lightgray', borderRight: '0.1px solid lightgray', zIndex:10}}
        >
          <Affix>
            <Menu style={{ borderBottom: '0.1px solid lightgray' }}>
              <Menu.Item>
                <Link href="/"><a><h3><strong>홈</strong></h3></a></Link>
              </Menu.Item>
            </Menu>
          </Affix>
          {children}
        </Col>

        <Col xs={0} sm={0} md={4} lg={5}>
          <Affix>
            <Menu>
              <Menu.Item>
                <Input.Search
                  value={searchInput}
                  onChange={onChangeSearchInput}
                  onSearch={onSearch}
                  placeholder="DCU 검색"
                />
              </Menu.Item>
            </Menu>
              {!me&&(
              <Menu style={{ minHeight: "100vh"}}>
                <LoginForm />
              </Menu>
              )}
          </Affix>
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
