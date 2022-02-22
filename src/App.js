/**
 * 참고
 * https://developer.apple.com/documentation/sign_in_with_apple/sign_in_with_apple_js/configuring_your_webpage_for_sign_in_with_apple
 * https://developer.apple.com/documentation/sign_in_with_apple/sign_in_with_apple_js/incorporating_sign_in_with_apple_into_other_platforms
 */
import AppleSignin from 'react-apple-signin-auth';
import { v4 as createUUID } from 'uuid';

import './App.css';
function App() {
  /** 
   * [필수] client_id : identifier(App ID or Services ID)
   * [필수] redirect_uri : service ID와 함께 등록한 Website URLs의 Return URLs
   * [필수] response_type : 요청 된 응답 유형. id_token 응답 유형을 요청할 때 response_mode는 fragment 또는 form_post 여야 한다.
                            code - 5분 후에 만료되는 일회용 인증 코드
                            id_token - 사용자의 식별 정보가 포함된 JSON 웹 토큰
   * state : 선택사항 - 요청 상태값, 유니크한 값 설정 추천
   * scope : 애플로부터 받아올 이름과 이메일 정보, 둘다 받아올땐 name과 email 사이에 공백 넣음 -> 공백은 %20로 표시됨
   * response_mode : 예상되는 응답 모드 유형. 값은 query, fragment 및 form_post이고, scope를 요청한 경우 값은 form_post 여야 한다.
   */

  const appleLoginUrl = `https://appleid.apple.com/auth/authorize?client_id=com.dok6n.appleauthnode-web&redirect_uri=https://dok6nlogindemo.cf&response_type=code id_token&state=signin&scope=email name&nonce=nonce&response_mode=web_message&m=11&v=1.5.4`;

  const clientId = process.env.REACT_APP_APPLE_CLIENT_ID;
  const redirectURI = process.env.REACT_APP_APPLE_REDIRECT_URI;

  return (
    <div className='App'>
      <header className='App-header'>
        <AppleSignin
          /** Auth options passed to AppleID.auth.init() */
          authOptions={{
            clientId: clientId,
            scope: 'email name',
            redirectURI: redirectURI,
            state: createUUID(),
            nonce: 'nonce',
            usePopup: true
          }}
          /** General props */
          uiType='dark'
          /** className */
          className='apple-auth-btn'
          /** Allows to change the button's children, eg: for changing the button text */
          buttonExtraChildren='continue with Apple'
          //onSuccess response object will contain the user object on the first time attempt only
          onSuccess={({ authorization }) => {
            const { code, id_token, state } = authorization;
            fetch('http://localhost:3333/auth', {
              method: 'post',
              body: JSON.stringify({
                code,
                id_token,
                state
              })
            })
              .then(res => res.json())
              .then(res => {
                if (res.success) {
                  alert('저장 완료');
                }
              });
            console.log(`code: ${code}`);
            console.log(`id_token: ${id_token}`);
            console.log(`state: ${state}`);
          }}
          onError={error => console.log(error)}
          /** Spread rest props if needed */
          // {...rest}
        />
        <br />
        <div className='urlBox'>
          <p className='App-url'>URL : {appleLoginUrl.split('?')[0]}?</p>
          {appleLoginUrl
            .split('?')[1]
            .split('&')
            .map((v, index) => (
              <p key={index} className='App-qs'>
                &{v}
              </p>
            ))}
        </div>
      </header>
    </div>
  );
}

export default App;
