import styles from '../mainPage.module.scss';
import IssueChip from '../../../components/IssueChip';
import { Meeting } from '../../../services/meeting';
import { useNavigate } from 'react-router-dom';

interface Meetings {
  meetings: Meeting[];
}

export default function MainMeetingList({ meetings }: Meetings) {
  const navigation = useNavigate();

  return (
    <div>
      {meetings.map((meeting: Meeting) => (
        <div
          className={styles.clublistItemBox}
          key={meeting.meetingId}
          onClick={() => {
            navigation(`/gathering/detail?meetingid=${meeting.meetingId}`);
          }}
        >
          <div className={styles.chipPlace}>
            <IssueChip />
          </div>
          <p className={styles.clubTitle}>{meeting.meetingName}</p>
        </div>
      ))}
    </div>
  );
}
