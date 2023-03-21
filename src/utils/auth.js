export const BASE_URL = 'https://api.nomoreparties.co';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    return res;
  })
  .catch((err) => console.log(err));
};

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
