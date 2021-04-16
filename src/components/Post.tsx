import { Avatar, styled } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import styles from "./Post.module.css";
import MessageIcon from "@material-ui/icons/Message";
import SendIcon from "@material-ui/icons/Send";
import { db } from "../firebase";
import firebase from "firebase/app";

interface POSTS {
  postId: string;
  avatar: string;
  image: string;
  text: string;
  timestamp: any;
  username: string;
}

interface COMMENTS {
  id: string;
  avatar: string;
  text: string;
  timestamp: any;
  username: string;
}

const Post: React.FC<POSTS> = (props) => {
  const user = useSelector(selectUser);
  const [opendSend, setOpenSend] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<COMMENTS[]>([]);
  const date = new Date();

  useEffect(() => {
    const unSub = db
      .collection("posts")
      .doc(props.postId)
      .collection("comments")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setComments(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            avatar: doc.data().avatar,
            text: doc.data().text,
            username: doc.data  ().username,
            timestamp: doc.data().timestamp,
          }))
        );
      });
    return () => {
      unSub();
    };
  }, [props.postId]);

  console.log(comments);
  const newComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    db.collection("posts")
      .doc(props.postId)
      .collection("comments")
      .add({
        avatar: user.photoUrl,
        text: comment,
        username: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .catch((error) => {
        alert(error.message);
      });
    setComment("");
  };

  return (
    <div className={styles.post}>
      <div className={styles.post_avatar}>
        <Avatar src={props.avatar} />
      </div>
      <div className={styles.post_body}>
        <div>
          <h3 className={styles.post_header}>
            <span className={styles.post_headerUser}>@{props.username}</span>
            <span className={styles.post_headerTime}>
              {new Date(props.timestamp?.toDate()).toLocaleString()}
            </span>
          </h3>
          <p className={styles.post_tweet}>{props.text}</p>
        </div>
        <div className={styles.post_image}>
          <img src={props.image} />
        </div>
        <MessageIcon
          className={styles.post_commentIcon}
          onClick={() => setOpenSend(!opendSend)}
        />
        {opendSend && (
          <>
            <form onSubmit={newComment}>
              <div className={styles.post_form}>
                <input
                  className={styles.post_input}
                  type="text"
                  placeholder="コメントを追加"
                  value={comment}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setComment(e.target.value)
                  }
                />
                <button
                  disabled={!comment}
                  type="submit"
                  className={
                    comment ? styles.post_button : styles.post_buttonDisable
                  }
                >
                  <SendIcon />
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Post;
