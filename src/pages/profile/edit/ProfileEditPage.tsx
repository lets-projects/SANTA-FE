import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';

import { EditData, patchUserInfo } from '/src/services/userApi';
import styles from './ProfileEditPage.module.scss';
import { Button } from '/src/components/common/Button';
import { profileEditSchema } from './profileEditSchema';
import useUserInfo from '/src/hooks/useUserInfo';

export default function ProfileEditPage() {
  const [imgPreview, setImgPreview] = useState('');
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(profileEditSchema),
    mode: 'onChange',
  });

  const userInfo = useUserInfo();

  useEffect(() => {
    if (userInfo?.nickname) setValue('nickname', userInfo.nickname);
    if (userInfo?.phoneNumber) setValue('phoneNumber', userInfo.phoneNumber);
    if (userInfo?.image) setValue('image', userInfo.image);
  }, [setValue, userInfo]);

  const { mutate } = useMutation<Response, Error, EditData>({
    mutationKey: ['duplicateNickName'],
    mutationFn: (editData) => patchUserInfo(editData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
    },
  });

  //유저가 새로 등록한 이미지 파일
  const newImg = watch('imageFile');
  useEffect(() => {
    if (newImg && newImg.length > 0) {
      const file = newImg[0];
      //@ts-expect-error 김경혜...
      setImgPreview(URL.createObjectURL(file));
    }
  }, [newImg]);

  const onSubmit = (editData: EditData) => {
    console.log('나 이 데이터로 변경할거임', editData);
    mutate(editData);
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.title}>프로필 수정</div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.userInfo}>
          <img className={styles.userImg} src={imgPreview !== '' ? imgPreview : userInfo?.image} />
          <div className={styles.label}>
            <label className={styles.inputImgLabel}>
              이미지 변경
              <input
                type="file"
                accept="image/*"
                placeholder="이미지"
                {...register('imageFile')}
                className={styles.inputFile}
              />
            </label>
          </div>
        </div>
        <div className={styles.defaultContainer}>
          <div className={styles.label}>이름</div>
          <div className={styles.defaultinput}>{userInfo?.name}</div>
          <div className={styles.label}>이메일</div>
          <div className={styles.defaultinput}>{userInfo?.email}</div>
        </div>

        <div className={styles.inputContainer}>
          <div className={styles.label}>닉네임</div>
          <input type="text" {...register('nickname')} />
          {errors.nickname && <p className={styles.errorMessage}>{errors.nickname?.message}</p>}
        </div>

        <div className={styles.inputContainer}>
          <div className={styles.label}>핸드폰 번호</div>
          <input type="text" {...register('phoneNumber')} />
          {errors.phoneNumber && <p className={styles.errorMessage}>{errors.phoneNumber?.message}</p>}
        </div>
        <div className={styles.submitBtn}>
          <Button variant="green3" children={'수정 완료'} />
        </div>
      </form>
    </div>
  );
}
