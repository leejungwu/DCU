import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Avatar, Button, Popover } from 'antd';
import {
  EllipsisOutlined,
} from '@ant-design/icons';
import Link from 'next/link';

import { logoutRequestAction } from '../reducers/user';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { me, logOutLoading } = useSelector((state) => state.user);

  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

  return (
    <Card
      actions={[
        <Popover
            key="more"
            content={(
              <Button loading={logOutLoading} onClick={onLogOut}>로그아웃</Button>
            )}
          >
            <EllipsisOutlined />
          </Popover>
      ]}
    >
      <Card.Meta
        avatar={<Link href={`/user/${me.id}`}><a><Avatar>{me.nickname[0]}</Avatar></a></Link>}
        title={me.nickname}
      />
    </Card>
  );
};

export default UserProfile;
