import { useState } from 'react'
import './App.css'
import data from './data.json'
import Comment from './comment.jsx'
import AddComment from './addComment.jsx'

function App() {
  const [comments, setComment] = useState(data.comments)

  function handleReply(idComment, userName, content) {
    const today = new Date();
    const newID = `${idComment}-${Date.now()}`

    const updatedComments = idComment!=='' ? comments.map(function update(comment) {
      if (comment.id === idComment) {
        return {
          ...comment,
          replies: [
            ...comment.replies || [],
            {
              id: newID,
              content: content,
              createdAt: today.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'}),
              score: 0,
              replyingTo: userName,
              user: {
                image: { 
                  png: data.currentUser.image.png,
                  webp: data.currentUser.image.webp
                },
                username: data.currentUser.username
              },
              replies: []
            }
          ]
        };
      }
      return {
        ...comment, 
        replies: (comment.replies||[]).map (update)
      }
      
    }) : [...comments, {
      id: newID,
      content: content,
      createdAt: today.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'}),
      score: 0,
      replyingTo: '',
      user: {
        image: { 
          png: data.currentUser.image.png,
          webp: data.currentUser.image.webp
        },
        username: data.currentUser.username
      },
      replies: []
    }]

    setComment(updatedComments)
  }

  function handleUpdate(commentId, content) {
    const updateComments = comments.map(function updateComment(comment) {
      if (comment.id === commentId) {
        return {
          ...comment,
          content: content
        }
      }
      return {
        ...comment,
        replies: (comment.replies || []).map (updateComment)
      }
    })
    setComment (updateComments)
  }
  
  function handleDelete (commentId) {
    function deleteComment(comments) {
      return comments.filter(comment => comment.id !== commentId).map(comment => ({
        ...comment,
        replies: deleteComment(comment.replies || [])
      }));
    }

    const updatedComments = deleteComment(comments);
    setComment (updatedComments)
  }
  function showComment(comment) {
    return (
      <div key={`${comment.id}-${comment.user.username}-${Date.now()}`} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        
        <Comment comment={comment} currentUser={data.currentUser} onReply={handleReply} onUpdate={handleUpdate} onDelete={handleDelete} />
      
      {comment.replies.length > 0 && <div className="replies">
        {comment.replies.map (reply => showComment(reply))}
        </div>}
      </div>
    )
  }
  
  const allComments = comments.map(comment => showComment(comment))
  
  console.log (comments)
  return (
    <>
      {allComments}
      <AddComment currentUser={data.currentUser} onReply={handleReply}/>
    </>
  )
}

export default App
