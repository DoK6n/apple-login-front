import './App.css';

function App() {
  const config = {
    client_id: process.env.REACT_APP_APPLE_CLIENT_ID, // service ID
    redirect_uri: process.env.REACT_APP_APPLE_REDIRECT_URI, // service ID와 함께 등록한 Website URLs의 Return URLs
    response_type: 'code id_token',
    state: 'origin:web', // 선택사항
    scope: 'name email', // 이름과 이메일을 apple에게
    response_mode: 'form_post',
    m: 11,
    v: '1.5.4'
  };
  const queryString = Object.entries(config)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');
  const appleLoginUrl = `https://appleid.apple.com/auth/authorize?${queryString}`;
  return (
    <div className='App'>
      <header className='App-header'>
        <a href={appleLoginUrl}>login</a>
      </header>
    </div>
  );
}

export default App;
