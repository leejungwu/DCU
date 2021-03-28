import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import { Input } from 'antd';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Button } from 'antd';

const PostCardContent = ({ postData, editMode, onChangePost, onCancelUpdate }) => {
  const { updatePostLoading, updatePostDone } = useSelector((state) => state.post);
  const [editText, setEditText] = useState(postData);

  useEffect(() => {
    if (updatePostDone) {
      onCancelUpdate();
    }
  }, [updatePostDone])

  const onChangeText = ((e) => {
    setEditText(e.target.value);
  });

  return ( // 첫 번째 게시글 #해시태그 #해시태그
  <div>
    {editMode
      ? (
        <>
          <Input.TextArea value={editText} onChange={onChangeText}/>
          <Button.Group>
            <Button loading={updatePostLoading} onClick={onChangePost(editText)}>수정</Button>
            <Button type="danger" onClick={onCancelUpdate}>취소</Button>
          </Button.Group>
        </>
      )
      : postData.split(/(#[^\s#]+)/g).map((v, i) => {
        if (v.match(/(#[^\s#]+)/)) {     
          return <Link href={`/hashtag/${v.slice(1)}`} key={i}><a>{v}</a></Link>
        }
        return v;
      })}
  </div>
)};

PostCardContent.propTypes = { 
  postData: PropTypes.string.isRequired,
  editMode: PropTypes.bool,
  onCancelUpdate: PropTypes.func.isRequired,
};

PostCardContent.defaultProps = {
  editMode: false,
};

export default PostCardContent;
