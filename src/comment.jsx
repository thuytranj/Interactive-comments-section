import './comment.css'
import {useState} from 'react'

export default function Comment({ comment: initialComment, currentUser, onReply, onUpdate, onShowDeleteModal }) {
  //for score
  const [comment, setComment] = useState(initialComment)
  // for reply box
  const [isReply, setReply] = useState(false)
  // for comment
  const [replyText, setReplyText] = useState('')
  // for update
  const [isUpdate, setUpdate] = useState(false)
  const [updateText, setUpdateText] = useState (comment.content)
  const baseUrl = import.meta.env.BASE_URL;
  

  function plusScore() {
    setComment(prevComment =>
    {
      return {
        ...prevComment,
        score: prevComment.score + 1
      }
    }
    )
  }

  function minusScore() {
    setComment(prevComment => {
      return {
        ...prevComment,
        score : prevComment.score - 1
      }
    })
  }

  function reply() {
    setReply(prev => !prev) 
    if (isReply) {
      onReply(comment.id, comment.user.username, replyText)
    setReplyText ('')
    }
  }

  function update() {
    onUpdate(comment.id, updateText)
    setUpdate(prev => !prev)
  }

  const buttons = comment.user.username !== currentUser.username ? <div className="reply-btn" onClick={() => setReply(prev => !prev)}><svg width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="currentColor" /></svg>Reply</div> : <div className="button-box">
    <div className="delete-btn" onClick={() => onShowDeleteModal(comment.id)}>
      <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="currentColor" /></svg>
      Delete
    </div>
    <div className="edit-btn" onClick={() => setUpdate(prev => !prev)}>
      <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="currentColor" /></svg>
      Edit
    </div>
  </div>

  const replyTo = comment.replyingTo!=='' ? <span style={{ fontWeight: 'bold', color: 'hsl(238, 40%, 52%)' }}>@{comment.replyingTo}</span> : null

  return (
    <>
    <div className="comment-box">
      <div className="score-box">
        <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg"><path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" fill="currentColor" onClick={plusScore} className="plus"/></svg>
        
        <p style={{ fontWeight: 'bold' }}>{comment.score}</p>
        
        <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg"><path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" fill="currentColor" onClick={minusScore} className="minus"/></svg>
      </div>

      <div className="content-box">
        <div className="info-box">
          <img src={`${baseUrl}${comment.user.image.png}`}></img>
          <div className="user-info">
            <div className="user-info-left">
              <p style={{ fontWeight: 'bold', color: 'hsl(212, 24%, 26%)' }}>{comment.user.username}</p>
              {comment.user.username === currentUser.username && <p style={{fontWeight: 'bold', backgroundColor: 'hsl(238, 40%, 52%)', color: 'white', padding: '0.1rem 0.15rem'}}>you</p>}
            </div>
            
            <p>{comment.createdAt}</p>
          </div>
        </div>
        <p>{replyTo} {comment.content}</p>
      </div>
      {buttons}
    </div>
      
      {isReply && <div className="reply-box">
        <img src={`${baseUrl}${currentUser.image.png}`}></img>
        <textarea onChange={e => setReplyText(e.target.value)} value={replyText} rows={3} placeholder="Add my comment..." ></textarea>
        <button className="reply-btn" onClick={reply}>REPLY</button>
      </div>}

      {isUpdate && <div className="update-box">
        <div className="score-box">
          <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg"><path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" fill="currentColor" onClick={plusScore} className="plus" /></svg>
        
          <p style={{ fontWeight: 'bold' }}>{comment.score}</p>
        
          <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg"><path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" fill="currentColor" onClick={minusScore} className="minus" /></svg>
        </div>

        <div className="content-box">
          <div className="info-box">
            <img src={`${baseUrl}${comment.user.image.png}`}></img>
            <div className="user-info">
              <div className="user-info-left">
                <p style={{ fontWeight: 'bold', color: 'hsl(212, 24%, 26%)' }}>{comment.user.username}</p>
                {comment.user.username === currentUser.username && <p style={{ fontWeight: 'bold', backgroundColor: 'hsl(238, 40%, 52%)', color: 'white', padding: '0.1rem 0.15rem' }}>you</p>}
              </div>
            
              <p>{comment.createdAt}</p>
            </div>
          </div>

          <textarea onChange={e => setUpdateText(e.target.value)} value={updateText} rows={3} ></textarea>
        
          <button className="update-btn" onClick={update}>UPDATE</button>
        </div>
      </div>}
    </>
  )
}