import React, { useEffect, useState } from 'react';
import './Drop.css';
import axios from 'axios';

function Drop({ setApiResponse, change }) {
  const [isActive, setIsActive] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [unreadMessage, setUnreadMessage] = useState(null); // Nouvel état pour stocker le nombre de messages non lus

  const options = ['Inbox', 'Sent', 'Corbeille'];

  useEffect(() => {
    if (selectedOption === 'Inbox') {
      axios
        .get('http://localhost:4100/client/numinbox')
        .then((response) => {
          setUnreadMessage(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [selectedOption]); // Utilisez selectedOption comme dépendance pour déclencher l'appel de l'API lorsque l'option est sélectionnée

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    change(true);

    if (option === 'Inbox') {
      axios
        .get('http://localhost:4100/client/inbox')
        .then((response) => {
          setApiResponse(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (option === 'Sent') {
      axios
        .get('http://localhost:4100/client/sent')
        .then((response) => {
          setApiResponse(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (option === 'Corbeille') {
      axios
        .get('http://localhost:4100/client/deleted')
        .then((response) => {
          setApiResponse(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div className="drop-down">
      <div className="drop-down-btn" onClick={() => setIsActive(!isActive)}>
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAi0lEQVR4nO3UsQ3CQAxG4W8IDioYBiRaGsI0yUBcxSIwBUgIhiCKlCK6+lxE4Ulu/WSf/+NPJXZ44IWDAFr8xvog1RYcJ4KhsgCuhaSpLVjhPRF8saktORVT3ASQo1eVxksKvaqmmKKblSBFryhHPvKlaD6ELzRo68jVnGf12bXRwdrijif2tZtbNj1VWEJkNUOldAAAAABJRU5ErkJggg=="
          className={`drop-down-icon ${isActive ? 'active' : 'inactive'}`}
        />
        Choose On
      </div>
      {isActive && (
        <div className="drop-down-content">
          {options.map((option) => (
            <div
              key={option}
              className={`drop-down-item ${
                selectedOption === option ? 'active' : 'inactive'
              }`}
              onClick={() => handleOptionClick(option)}
            >
              <div className="num">{option === 'Inbox' ? unreadMessage : null}</div>
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Drop;