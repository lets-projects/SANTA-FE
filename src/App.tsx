import { useState } from 'react';
import { Input, SearchInput } from './components/common/Input';

function App() {
  const [inputValue, setInputValue] = useState('');
  return (
    <div style={{ width: '300px' }}>
      <div>인풋 테스트</div>
      <Input variant="outline-gray"></Input>
      <h1></h1>
      <Input variant="outline-green3" placeholder="입력하세요"></Input>
      <h1></h1>
      <Input
        variant="underline"
        placeholder="입력하세요"
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      ></Input>
      <div>input Value : {inputValue}</div>
      <h1></h1>
      <SearchInput placeholder="검색하세요"></SearchInput>
    </div>
  );
}

export default App;
