import React from 'react';
import { createPortal } from 'react-dom'; //createPortal - e vendos krejt kete contentin(e modalit) ne index.html ne divin me id modal dhe jo ne divin me id root(prandaj e shfaq modalin ne rregull t boostrapit(ne gjith pagen))

const MovieModal = ({ open, setOpen, movie }) => {
    return (
        <>
            {createPortal(
                <div className={`modal fade movieModal ${open && 'show'}`} id="movieModal" tabindex="-1" aria-labelledby="movieModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="movieModalLabel">{movie?.title}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setOpen(false)}>
                                    <img src='/images/close-icon-blue.svg' alt='close' />
                                </button>
                            </div>
                            <div className="modal-body">
                                <iframe
                                    width="100%"
                                    height="515"
                                    src={movie?.videoLink}
                                    title="YouTube video player"
                                    frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowfullscreen
                                />
                            </div>
                        </div>
                    </div>
                </div>, document?.getElementById('modal'))}
        </>
    )
}

export default MovieModal;
