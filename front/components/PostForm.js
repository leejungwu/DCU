import React, { useCallback, useEffect, useRef } from 'react';
import { Button, Card, Avatar, Form, Input } from 'antd';
import { FileImageOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import { ADD_POST_REQUEST, UPLOAD_IMAGES_REQUEST, REMOVE_IMAGE } from '../reducers/post';
import useInput from '../hooks/useInput';
import { backUrl } from '../config/config';

const PostForm = () => {
  const { imagePaths, addPostDone } = useSelector((state) => state.post);
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [text, onChangeText, setText] = useInput('');

  useEffect(() => {
    if (addPostDone) {
      setText('');
    }
  }, [addPostDone]);

  const onSubmit = useCallback(() => {
    if (!text || !text.trim()) {
      return alert('게시글을 작성하세요.');
    }
    const formData = new FormData();
    imagePaths.forEach((p) => {
      formData.append('image', p);
    });
    formData.append('content', text);
    return dispatch({
      type: ADD_POST_REQUEST,
      data: formData,
    });
  }, [text, imagePaths]);

  const imageInput = useRef();
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImages = useCallback((e) => {
    console.log('images', e.target.files);
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f);
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  });

  const onRemoveImage = useCallback((index) => () => {
    dispatch({
      type: REMOVE_IMAGE,
      data: index,
    });
  });

  return (
    <Card>
      <Form encType="multipart/form-data" onFinish={onSubmit}>
        <div style={{ display: 'flex'}}>
          <Card.Meta style={{ marginTop: '5px' }}
            avatar={<Avatar>{me.nickname[0]}</Avatar>}
          />
          <Input.TextArea
            value={text}
            onChange={onChangeText}
            maxLength={140}
            placeholder="무슨 일이 일어나고 있나요?"
          />
        </div>
        <div style={{ marginTop: '5px'}}>
          <input type="file" name="image" multiple hidden ref={imageInput} onChange={onChangeImages} />
          <FileImageOutlined onClick={onClickImageUpload} style={{ marginLeft: '48px', fontSize: '20px' }} />
          <Button type="primary" style={{ float: 'right' }} shape="round" htmlType="submit">공유</Button>
        </div>
        <div>
          {imagePaths.map((v, i) => (
            <div key={v} style={{ display: 'inline-block' }}>
              <img src={`${backUrl}/${v}`} style={{ width: '200px' }} alt={v} />
              <div>
                <Button onClick={onRemoveImage(i)}>제거</Button>
              </div>
            </div>
          ))}
        </div>
      </Form>
    </Card>
  );
};

export default PostForm;
