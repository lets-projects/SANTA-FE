/* eslint-disable @typescript-eslint/no-unused-vars */
import { TitleContainer } from './components/TitleContainer';
import styles from '../../styles/gathering/gatheringPostPage.module.scss';
import { IoPersonOutline } from 'react-icons/io5';
import { IoCalendarClearOutline } from 'react-icons/io5';
import { Button } from '../../components/common/Button';
import { IoImageOutline } from 'react-icons/io5';
import { DatePickerComponent } from '../../components/common/DatePickerComponent';
import { ChangeEvent, useEffect, useState } from 'react'; // ChangeEvent 추가
import { IoCloseOutline } from 'react-icons/io5';
import { useMutation } from '@tanstack/react-query';
import { postGathering } from '/src/services/gatheringApi';
import { GatheringCategorySelectBox } from './components/GatheringCategorySelectBox';
import { useNavigate } from 'react-router-dom';
import { formattingDate } from '/src/utils/formattingDate';
import { Alert } from '/src/components/common/Alert';
import { PostType } from '/src/types/gatheringTypes';

export function PostPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tag, setTag] = useState<string[]>([]);
  const [tagValue, setTagValue] = useState<string>();
  const [imgFileUrl, setImgFileUrl] = useState<string>('');
  const [imgFile, setImgFile] = useState<File | null>(null);
  const navigate = useNavigate();
  let gatheringFormData = new FormData();
  type AlertVariant = 'error' | 'info' | 'success';

  interface AlertStatus {
    variant: AlertVariant;
    text: string;
  }
  const [alertStatus, setAlertStatus] = useState<AlertStatus>({
    variant: 'error',
    text: '다시 시도해주세요',
  });
  const [isOpen, setIsOpen] = useState(false);
  const [postData, setPostData] = useState<PostType>({
    meetingName: '',
    categoryName: '등산',
    mountainName: '',
    description: '',
    headcount: '',
    date: formattingDate(new Date()),
    tags: [''],
    image: null,
  });

  const showAlert = () => {
    setIsOpen(true);
  };
  function handleInput(key: string, e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setPostData((prevData) => ({ ...prevData, [key]: e.target.value }));
  }

  useEffect(() => {
    setPostData((prevData) => ({ ...prevData, tags: tag }));
  }, [tag]);

  const handleDateChange = (date: Date) => {
    if (date) {
      setSelectedDate(date);
      setPostData((prevData) => ({ ...prevData, date: formattingDate(date) }));
    }
  };

  function handleInputTag(e: ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;
    if (inputValue[inputValue.length - 1] === ' ') {
      setTag((prevTag) => {
        const newTag = [...prevTag, inputValue];
        return newTag;
      });
      setTagValue('');
    } else {
      setTagValue(inputValue);
    }
  }

  function deleteTag(index: number) {
    const newArr = [...tag.slice(0, index), ...tag.slice(index + 1)];
    setTag(newArr);
  }

  function handleImageUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setImgFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        if (reader.result !== null && typeof reader.result === 'string') {
          setImgFileUrl(reader.result);
        }
      };
    }
  }

  const { mutate } = useMutation({
    mutationFn: postGathering,
    onSuccess: () => {
      navigate(-1);
    },
    onError: (error) => {
      console.log(error);
      if (error.message.includes('400')) {
        setAlertStatus({ variant: 'error', text: '내용을 입력해주세요' });
        showAlert();
      } else if (error.message.includes('413')) {
        setAlertStatus({ variant: 'error', text: '이미지 용량이 너무 큽니다' });
        showAlert();
      } else if (error.message.includes('409')) {
        setAlertStatus({ variant: 'error', text: '해당 날짜에 이미 참여중인 모임이 있습니다.' });
        showAlert();
      }
    },
  });

  function validatePostData(postData: PostType) {
    if (!postData.categoryName.trim()) {
      setAlertStatus({ variant: 'error', text: '카테고리를 입력해주세요' });
      showAlert();
      return false;
    }
    if (!postData.mountainName.trim()) {
      setAlertStatus({ variant: 'error', text: '산 이름을 입력해주세요' });
      showAlert();
      return false;
    }
    if (!postData.meetingName.trim()) {
      setAlertStatus({ variant: 'error', text: '모임 이름을 입력해주세요' });
      showAlert();
      return false;
    }
    if (!postData.headcount.trim()) {
      setAlertStatus({ variant: 'error', text: '인원수를 입력해주세요' });
      showAlert();
      return false;
    }
    if (!postData.description.trim()) {
      setAlertStatus({ variant: 'error', text: '설명을 입력해주세요' });
      showAlert();
      return false;
    }
    if (!postData.date.trim()) {
      setAlertStatus({ variant: 'error', text: '날짜를 선택해주세요' });
      showAlert();
      return false;
    }
    if (!postData.tags.length) {
      setAlertStatus({ variant: 'error', text: '태그를 하나 이상 입력해주세요' });
      showAlert();
      return false;
    }
    return true;
  }

  function handleCreateBtn() {
    if (!validatePostData(postData)) return;

    gatheringFormData.append('categoryName', postData.categoryName);
    gatheringFormData.append('mountainName', postData.mountainName);
    gatheringFormData.append('meetingName', postData.meetingName);
    gatheringFormData.append('headcount', postData.headcount);
    gatheringFormData.append('description', postData.description);
    postData.tags.forEach((tagItem, index) => {
      gatheringFormData.append(`tags[${index}]`, tagItem.trim());
    });
    gatheringFormData.append('date', postData.date);

    if (imgFile) {
      gatheringFormData.append('imageFile', imgFile); // 이미지 파일 추가
    }
    mutate(gatheringFormData);
  }
  return (
    <div className={styles.mainContainer}>
      <Alert variant={alertStatus.variant} isOpen={isOpen} setIsOpen={setIsOpen}>
        {alertStatus.text}
      </Alert>
      <TitleContainer title="모임 만들기" />
      <form className={styles.inputContainer}>
        <div className={styles.containerRow}>
          <div className={`${styles.containerCol} ${styles.width60}`}>
            <GatheringCategorySelectBox onChange={(e) => handleInput('categoryName', e)} />
            <input placeholder="산" className={styles.inputBox} onChange={(e) => handleInput('mountainName', e)} />
          </div>
          <div className={styles.imageContainer}>
            <input
              id="image"
              type="file"
              placeholder="사진"
              className={`${styles.inputBox} ${styles.imageInput}`}
              onChange={handleImageUpload}
            />
            <label htmlFor="image" className={styles.center}>
              {imgFileUrl ? (
                <img src={imgFileUrl} className={styles.image}></img>
              ) : (
                <IoImageOutline size="2rem" color="#7f7f7f" />
              )}
            </label>
          </div>
        </div>
        <input
          name="meetingName"
          type="text"
          placeholder="모임이름"
          className={styles.inputBox}
          onChange={(e) => handleInput('meetingName', e)}
        />
        <textarea
          name="description"
          rows={10}
          cols={33}
          className={styles.textarea}
          placeholder="모임 목적을 설명하세요"
          onChange={(e) => handleInput('description', e)}
        />
        <div>
          <div className={styles.containerCol}>
            <div className={styles.containerRow}>
              <div className={styles.containerRow}>
                <IoPersonOutline />
                <div>정원</div>
              </div>
              <div className={`${styles.inputSettingWidth} ${styles.containerRow} ${styles.grayBack}`}>
                <input
                  name="headcount"
                  type="text"
                  className={styles.inputBox}
                  onChange={(e) => handleInput('headcount', e)}
                />
                <div>명</div>
              </div>
            </div>
            <div className={styles.containerRow}>
              <div className={styles.containerRow}>
                <IoCalendarClearOutline />
                <div>날짜</div>
              </div>
              <div className={` ${styles.containerRow} ${styles.grayBack} ${styles.inputSettingWidth}`}>
                <div className={`${styles.inputBox}`}>
                  <DatePickerComponent
                    selected={selectedDate}
                    onChange={handleDateChange}
                    setSelectedDate={setSelectedDate}
                  />
                </div>
              </div>
            </div>
            <div className={`${styles.outlineContainer} ${styles.containerRow}`}>
              <div>태그</div>
              <div className={`${styles.containerCol} ${styles.inputSettingWidth}`}>
                <input
                  type="text"
                  value={tagValue}
                  onChange={handleInputTag}
                  className={styles.tagInput}
                  placeholder="태그 입력 후 spacebar"
                />
                <div className={styles.tagContainer}>
                  {tag &&
                    tag.map((item, index) => (
                      <div key={index} className={`${styles.containerRow} ${styles.tagItem}`}>
                        <div>{item}</div>
                        <IoCloseOutline className={styles.closeBtn} onClick={() => deleteTag(index)} />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <Button type="submit" variant="rectangular" size='large' color='secondary' onClick={handleCreateBtn}>
        모임 만들기
      </Button>
    </div>
  );
}
