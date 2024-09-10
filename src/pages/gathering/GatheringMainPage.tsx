import { GatheringList } from './components/GatheringList';
import SectionTitle from '../../components/SectionTitle';
import { UserProfile_small } from '../../components/common/UserProfile_small';
import { IoSearch } from 'react-icons/io5';
import { Button } from '../../components/common/Button';
import styles from '../../styles/gathering/gatheringMain.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { GatheringCategory } from './components/GatheringCategory';
import { getGatheringListByCategory } from '/src/services/gatheringApi';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useCategoryStore } from '/src/store/store';
import { MyGatherings } from './components/MyGatherings';
import { Top3Gatherings } from './components/Top3Gatherings';
import { useUserInfo } from '/src/utils/useUserInfo';
import { GatheringListByCategory } from '/src/types/gatheringTypes';

const PAGE_SIZE = 2;

function GatheringMainPage() {
  const { category } = useCategoryStore();
  const navigate = useNavigate();
  const currentUserInfo = useUserInfo((data) => data);

  const fetchGatheringList = async (pageParam: number) => {
    const res = await getGatheringListByCategory(category.name, pageParam, PAGE_SIZE);
    return {
      content: res.data.content,
      nextCursor: res.data.pageable.pageNumber + 1,
      hasNextPage: res.data.pageable.pageNumber < res.data.totalPages - 1,
      pageParams: {
        pageNumber: res.data.pageable.pageNumber,
        pageSize: res.data.pageable.pageSize,
      },
    };
  };

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ['gatheringListByCategory', category.name],
    queryFn: ({ pageParam }) => fetchGatheringList(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.nextCursor : undefined;
    },
    select: (data) => ({
      gatheringList: data.pages,
      pages: data?.pages.flatMap((page) => page.content) || [],
      pageParams: data?.pages.map((page) => page.pageParams).filter(Boolean) || [],
    }),
  });

  const gatheringList: GatheringListByCategory[] = data?.pages || [];

  return (
    <div className={styles.gatheringContainer}>
      <div className={styles.container}>
        <div className={styles.profileContainer}>
          <UserProfile_small name={currentUserInfo?.nickname} imageUrl={currentUserInfo?.image} />
          <Link to={'/gathering/search'}>
            <div className={styles.searchBtn}>
              <IoSearch color="#498428" />
              <div>모임을 검색해보세요</div>
            </div>
          </Link>
        </div>
        <Link to={'/gathering/post'} className={styles.width100}>
          <Button variant="green3">모임 만들기</Button>
        </Link>
      </div>
      <MyGatherings />
      <Top3Gatherings />
      <div className={`${styles.container} ${styles.gap}`}>
        <SectionTitle title="모임 둘러보기" subtitle="산타의 모임을 둘러보세요!" />
        <GatheringCategory />
        <div className={styles.gatheringList}>
          {gatheringList?.map((item: GatheringListByCategory, index) => (
            <div key={`${item.meetingId}-${item.leaderId}-${index}`}>
              <GatheringList
                gatheringInfo={{
                  title: item.meetingName,
                  content: item.description,
                  tag: item.categoryName,
                  mountain: item.mountainName,
                  imageUrl: item.image,
                  capacity: item.headcount,
                  attendance: item.participants.length,
                  date: item.date,
                }}
                isLast={hasNextPage && gatheringList.length === index + 1 && !isFetching}
                setPage={fetchNextPage}
                onClick={() => navigate(`/gathering/detail?meetingid=${item.meetingId}`)}
              />
            </div>
          ))}
          {!gatheringList.length && !isFetching && <div>데이터가 없습니다.</div>}
          {isFetching && <div>Loading more...</div>}
        </div>
      </div>
    </div>
  );
}

export default GatheringMainPage;
