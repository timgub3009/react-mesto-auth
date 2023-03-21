export const BASE_URL = 'https://api.nomoreparties.co';

function checkStatus(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export function register(password, email) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then((response) => {
    return response.json();
  })
  .then((res) => {
    return res;
  })
.then(checkStatus);
}

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.user){
            localStorage.setItem('jwt', data.jwt);
            return data;
        }
      })
      .catch((err) => console.log(err));
    };

    export const getContent = (token) => {
        return fetch(`${BASE_URL}/users/me`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        })
        .then(res => res.json())
        .then(data => data)
      }

