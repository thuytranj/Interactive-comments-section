import { useEffect } from 'react';
import './delete-modal.css'

export default function DeleteModal({ isOpenModal, onDelete, commentId, onClose }) {
  useEffect(() => {
    if (isOpenModal) {
      document.body.style.overflow = 'hidden'; // khóa cuộn
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpenModal]);
  
  if (!isOpenModal) return null
  return (
    <div className="delete-modal-overplay" onClick={() => onClose()}> 
    <div className="delete-modal-content" onClick={e => e.stopPropagation()}>
        <h2 style={{color: 'hsl(212, 24%, 26%)'}}>Delete comment</h2>
        <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
        <div className="comfirm-buttons">
          <button className="cancel-btn" onClick={()=> onClose()}>NO, CANCEL</button>
          <button className="yes-btn" onClick={() => onDelete(commentId)}>YES, DELETE</button>
        </div>
    </div>
  </div>
  ) 
}