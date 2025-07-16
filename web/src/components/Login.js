import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const { username, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    const user = {
      username,
      password
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }

      const body = JSON.stringify(user);

      const res = await axios.post('http://localhost:5000/users/login', body, config);
      console.log(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={e => onSubmit(e)}>
      <div>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={username}
          onChange={e => onChange(e)}
          required
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={e => onChange(e)}
          minLength="6"
          required
        />
      </div>
      <input type="submit" value="Login" />
    </form>
  );
};

export default Login;
