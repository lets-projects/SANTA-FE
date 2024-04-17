import { Button } from './components/common/Button';
import './styles/_global.scss';
function App() {
  return (
    <div className='app'>
      <div>버튼 테스트</div>
      <div>props : variant, onClick / 택스트는 children으로 넣으세요</div>
      <Button variant='green1'>green1 버튼입니다</Button>
      <Button variant='gray' onClick={() => {
        alert('버튼 클릭 동작');
      }}>gray 버튼입니다.</Button>
      <Button variant='green3'>green3 버튼입니다.</Button>
      <Button variant='yellow'>yellow 버튼입니다.</Button>
      <Button variant='rounded-outline'>rounded outline</Button>
      <Button variant='rounded-color'>rounded color</Button>
    </div>
  );
}

export default App;
