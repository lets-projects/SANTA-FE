import { useQuery } from '@tanstack/react-query';
import styles from '../../styles/admin/adminMain.module.scss';
import { TitleContainer } from '../gathering/components/TitleContainer';
import { ListComponent } from './components/ListComponent';
import SectionTitle from '/src/components/SectionTitle';
import { SearchInput } from '/src/components/common/Input';
import { getCategoryList } from '/src/services/adminApi';
import { useEffect } from 'react';

type category = {

    id: number,
    name: string,
}
export function AdminCategoryPage() {
    function handleDeleteBtnClick(id: any): void {
        throw new Error('Function not implemented.');
    }

    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategoryList,
        select: (data) => data.data

    })

    useEffect(() => {
        console.log('카테고리', categories);
    }, [categories])

    return (
        <div className={styles.adminPageContainer}>
            <TitleContainer title='회원관리' />
            <div className={styles.searchContainer}>
                <SectionTitle title='회원정보 및 검색 조회' subtitle='이름 또는 닉네임으로 회원을 검색합니다' />
                {/* <SearchInput onClick={handleSearchBtnClick} placeholder='회원 이름 또는 닉네임을 검색하세요' onChange={handleInputChange} value={inputValue} /> */}
            </div>
            {categories && categories.map((categoryList: category, index: number) => (
                <ListComponent key={index} title={categoryList.name}
                    onClickDelete={() => handleDeleteBtnClick(categoryList.id)} />
            ))}
        </div>
    )
}