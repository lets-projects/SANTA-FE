import { Card } from './components/common/Card';
import './styles/_global.scss';
import './styles/_reset.scss';

function App() {
  return (
    <div className='app'>
      <Card variant='green1'>
        <div>여긴 타이틀</div>
        <div>여긴 서브타이틀</div>
        <div>
          <div>스타일 적용 안함</div>
          <div>하이</div>
        </div>
      </Card>
      <br></br>
      <Card variant='green2'>이것은 카드</Card>
      <br></br>
      <Card variant='green3'>크기는 고정입니다</Card>
      <br></br>
      <Card variant='yellow'>이것은 카드</Card>
    </div>
  );
}

export default App;
