import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';
import { fetchAlbums } from "../../store/albums";
import './404Page.css'

const NotFoundPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(fetchAlbums());
    }, [dispatch]);

    return(
        <div className="PageNotPage">
            <NavLink exact to="/"><img src='/favicon.ico' width="60px" alt="img" /></NavLink>
            <h1>Page not found</h1>
            <h3>We can't seem to find the page you are looking for.</h3>
            <button onClick={()=>history.push("/")}>Home</button>
        </div>
    )
}

export default NotFoundPage;