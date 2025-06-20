// client/src/pages/ProfileSettingsPage.js
import React, { useState, useEffect, useRef } from 'react'; // Add useRef
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import './ProfileSettingsPage.css';

const ProfileSettingsPage = () => {
    const { user, login, loading: authLoading } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [profilePictureUrl, setProfilePictureUrl] = useState(''); // Will hold existing URL or new preview URL
    const [selectedFile, setSelectedFile] = useState(null); // For the new file object
    const [previewSource, setPreviewSource] = useState(''); // For the image preview src

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const fileInputRef = useRef(null); // To trigger file input click

    useEffect(() => {
        if (!authLoading && !user) {
            navigate('/signin');
        } else if (user) {
            setName(user.name || '');
            setUsername(user.username || '');
            setEmail(user.email || '');
            setBio(user.bio || '');
            const initialPicUrl = user.profilePictureUrl || '/images/default-avatar.png';
            setProfilePictureUrl(initialPicUrl); // Keep track of the persisted URL
            setPreviewSource(initialPicUrl);     // Set initial preview
        }
    }, [user, authLoading, navigate]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file); // Store the file object (for actual upload later)
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setPreviewSource(reader.result); // Show local preview
            };
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');

        // FOR MVP with NO backend image upload:
        // We are only updating the text fields. The profilePictureUrl on the backend
        // would only be updated if we actually uploaded the image and got a new URL.
        // If a new file was selected (selectedFile is not null), but we are not uploading,
        // the profilePictureUrl in the DB will NOT change to the local previewSource.
        // You would need a backend endpoint for file uploads for that.

        const updatedProfileData = {
            name,
            username,
            bio,
            // profilePictureUrl: profilePictureUrl, // Send the *existing* URL or an updated one if you had a system for it
            // If selectedFile exists and you had an upload mechanism:
            // you would upload selectedFile, get a new URL, then send that URL here.
            // For now, if user selected a file, it's only a preview, DB URL isn't changing via this form
            // unless you manually type a URL into a (now hidden) input.
            // We will send the current `profilePictureUrl` state, which could be an old one, or one typed manually if we revert the input type.
        };
        
        // If you want to allow clearing the image by setting profilePictureUrl to default (and selectedFile is null)
        // updatedProfileData.profilePictureUrl = (selectedFile || previewSource === '/images/default-avatar.png') ? profilePictureUrl : '/images/default-avatar.png';

        // For simplicity in MVP, let's assume the profilePictureUrl doesn't change via this form
        // unless you build the file upload. We only update text fields here.
        // If you had a separate text input for profilePictureUrl and the user changed THAT, then it would update.

        // To truly update picture: You would normally use FormData if sending `selectedFile`
        // For MVP simplicity and just sending text fields:
        // If user selected a new picture for preview, but we aren't uploading, we send existing DB url.
        // OR, if you just want to save the URL for now:
        // updatedProfileData.profilePictureUrl = previewSource; // This sends the base64 preview or the existing URL


        // *** Current Simplified MVP approach for this form: ***
        // Backend's PUT /api/auth/profile expects `profilePictureUrl` as a string.
        // If we aren't uploading the `selectedFile`, we're not changing the `profilePictureUrl` on the backend
        // with this specific submit action unless the user types into a URL field.
        // The preview is client-side only.
        // We need to decide what to send for profilePictureUrl.
        // Let's assume if they previewed, they intend for IT to be saved if there WAS an upload mechanism.
        // For now, let's keep the functionality of sending a URL if available (even if it's a base64 preview string which is not ideal for DB).
        if (previewSource && previewSource !== user.profilePictureUrl && previewSource !== '/images/default-avatar.png' && !previewSource.startsWith('http')) {
             // This means previewSource is likely a base64 string from local file.
             // For a REAL app, DO NOT save base64 to DB directly for profile pics.
             // For this MVP, if we want to show that a change *could* happen:
             // setError("MVP: File preview shown. Actual file upload to server not implemented.");
             // We won't send the base64 string to the profilePictureUrl field that expects a URL.
             // We only send a URL if the user manually types into a URL input, which we are removing.
             // So, `profilePictureUrl` field sent to backend will be the original one unless backend can handle uploads.
        } else {
            // If previewSource is a URL (starts with http or /), use it.
            updatedProfileData.profilePictureUrl = previewSource;
        }


        try {
            const { data } = await api.put('/auth/profile', updatedProfileData);
            login(data, data.token);
            setMessage('Profile updated successfully! (Profile picture preview is client-side for this MVP)');
            if (selectedFile && !updatedProfileData.profilePictureUrl?.startsWith('http')) { // If local file was selected
                // In a real app, here you'd also trigger the actual file upload to get a real URL.
                // For now, we'll just acknowledge the preview.
            }

        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update profile.');
        } finally {
            setLoading(false);
        }
    };

    if (authLoading || !user) {
        return <div className="profile-settings-container page-wrapper-contained" style={{ paddingTop: '90px' }}><p>Loading profile...</p></div>;
    }

    return (
        <div className="profile-settings-container page-wrapper-contained" style={{ paddingTop: '90px' }}>
            <h2>Profile Settings</h2>
            <form onSubmit={handleSubmit} className="profile-form">
                {/* ... messages ... */}

                <div className="form-group profile-picture-section">
                    <img src={previewSource || '/images/default-avatar.png'} alt="Profile Preview" className="profile-preview" />
                    {/* Hidden file input, triggered by button */}
                    <input
                        type="file"
                        accept="image/png, image/jpeg, image/gif" // Accept common image types
                        onChange={handleFileChange}
                        style={{ display: 'none' }} // Hide the default input
                        ref={fileInputRef}
                        id="profilePictureInput"
                    />
                    {/* Button to trigger file input */}
                    <button type="button" onClick={() => fileInputRef.current.click()} className="upload-pic-button">
                        Change Picture
                    </button>
                    <small>Select an image to preview. Actual upload not implemented in MVP.</small>
                </div>
                {/* ... other form groups for name, username, email, bio ... */}
                <div className="form-group">
                    <label htmlFor="name">Display Name:</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={email} readOnly disabled />
                </div>

                <div className="form-group">
                    <label htmlFor="bio">Bio:</label>
                    <textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} maxLength="200" />
                </div>

                <button type="submit" disabled={loading} className="save-profile-button">
                    {loading ? 'Saving...' : 'Save Profile'}
                </button>
            </form>
        </div>
    );
};

export default ProfileSettingsPage;