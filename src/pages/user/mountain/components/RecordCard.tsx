import styles from './RecordCard.module.scss';
import { Card } from '/src/components/common/Card';
import { VertifyMountain } from '/src/services/challengeApi';

export default function RecordCarde({ recordData }: { recordData: VertifyMountain }) {
  console.log('나 받은 데이터임', recordData);
  return (
    <Card variant="green2">
      <div className={styles.title}>{recordData.mountain.name}</div>
    </Card>
  );
}
