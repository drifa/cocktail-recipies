import React from 'react'
import axios from 'axios';

export const AppContext = React.createContext();
const authAxios = axios.create();

authAxios.interceptors.request.use((config)=>{
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
})

const url = 'http://localhost:5000/signup';
const urlLogin = 'http://localhost:5000/login';

export default class ContextProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: localStorage.getItem('username') || '',
      email: localStorage.getItem('email') || '',
      token: localStorage.getItem('token') || ''
    };
  }

  signup = (userInfo) => {
    return authAxios.post(url, userInfo);
  }

  login = (credentials) => {
    return authAxios.post(urlLogin, credentials)
      .then(response => {
        const { token } = response.data;
        const { username, email } = response.data.user;
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        localStorage.setItem('email', email);
        this.setState({
            username,
            email,
            token
        });
        // TODO: this.getCocktails();
        return response;
      });
  }

  logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    this.setState(state => ({
        ...state,
        username: '',
        email: '',
        token: '',
    }));
    return Promise.resolve();
  }

  render() {
    return (
        <AppContext.Provider
            value={{
                signup: this.signup,  // add this to the value object
                login: this.login,
                logout: this.logout,
                token: this.state.token,
            }}
        >
            {this.props.children}
        </AppContext.Provider>
    )
  }
}
