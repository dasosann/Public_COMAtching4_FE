import React from 'react';
import ProfileCard from '../Mainpage/ProfileCard';
import '../../css/components/ProfileModal.css';

function ProfileModal({ profileData, onClose }) {
  return (
    <div className="profile-modal-overlay" onClick={onClose}>
      <div className="profile-modal-container" onClick={(e) => e.stopPropagation()}>
        <ProfileCard profile={profileData} />
      </div>
      <button className="profile-modal-close-button" onClick={onClose}>
        <img src="/assets/Chat/x.svg" alt="close" />
      </button>
    </div>
  );
}

export default ProfileModal;
