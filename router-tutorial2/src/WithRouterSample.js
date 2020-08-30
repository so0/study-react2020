import React from 'react';
import { withRouter } from 'react-router-dom';

// withRouter HoC 는 라우트 컴포넌트가 아닌곳에서 match / location / history 를 사용해야 할 때
const WithRouterSample = ({ location, match, history }) => {
  // withRouter 를 사용하면, 자신의 부모 컴포넌트 기준의 match 값이 전달
  return (
    <div>
      <h4>location</h4>
      <textarea value={JSON.stringify(location, null, 2)} readOnly />
      <h4>match</h4>
      <textarea value={JSON.stringify(match, null, 2)} readOnly />
      <button onClick={() => history.push('/')}>홈으로</button>
    </div>
  );
};

export default withRouter(WithRouterSample);
