import './addComment.css'
import {useState} from 'react'

export default function AddComment({ currentUser, onReply }) {
  const [replyText, setReplyText] = useState('')
  return (
    <div className="addComment-box">
      <img src={currentUser.image.png}></img>
      <textarea onChange={e => setReplyText(e.target.value)} value={replyText} rows={3} placeholder="Add my comment..." ></textarea>
      <button onClick={() => {
        onReply('', '', replyText)
        setReplyText('')
      }}>SEND</button>
    </div>
  )
}