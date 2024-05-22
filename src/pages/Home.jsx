import React from 'react';

const Home = () => {
  const usernameSurname = sessionStorage.getItem('usernameSurname');

  return (
    <div>Hoşgeldiniz, {usernameSurname}</div>
  );
};

export default Home;
