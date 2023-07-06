import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { deletePlaylist } from "../../store/playlists";
import { editCurrentPlayer } from "../../store/player";

const DeletePlaylistModal = ({playlist}) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const {closeModal} =  useModal();

    const handleSubmityes = async (e) => {
        e.preventDefault();
        return dispatch(deletePlaylist(playlist.id))
            .then(dispatch(editCurrentPlayer("", [], {}, NaN, false, "delete playlist")))
            .then(closeModal())
            .then(history.push('/'))
    }
  
    const handleSubmitno = async (e) => {
        e.preventDefault()
        closeModal()
    }

    return (
        <div className="delete-modal">
            <h2>Delete from Library?</h2>
            <h4>This will delete {playlist.title} from Your Library.</h4>
            <div>
                <button onClick={handleSubmitno} className="nobtn">Cancel</button>
                <button onClick={handleSubmityes} className="yesbtn">Delete</button>
            </div>
        </div>
    )
}

export default DeletePlaylistModal