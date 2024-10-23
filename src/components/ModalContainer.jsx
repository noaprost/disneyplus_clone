import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function ModalContainer({
  modalIsOpen,
  closeModal,
  selectedMovie,
}) {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className="fixed inset-0 flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-25"
    >
      <div onClick={closeModal} className="absolute inset-0 cursor-pointer" />
      {selectedMovie && (
        <div className="bg-neutral-900 rounded-xl max-w-4xl w-full overflow-hidden z-10">
          <div className="bg-black">
            <img
              src={`https://image.tmdb.org/t/p/w500${selectedMovie.backdrop_path}`}
              alt={selectedMovie.title}
              className="w-2/3 h-72 bg-center mx-auto"
            />
          </div>
          <p className="text-neutral-400 px-6 mt-4">
            {selectedMovie.release_date}
          </p>
          <p className="text-2xl font-bold text-white p-6">
            {selectedMovie.title}
          </p>
          <p className="text-white px-6 pb-6 text-sm">
            평점 : {selectedMovie.vote_average}
          </p>
          <p className="text-white px-6 pb-8">{selectedMovie.overview}</p>
        </div>
      )}
    </Modal>
  );
}
