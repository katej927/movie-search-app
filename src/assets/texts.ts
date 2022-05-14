export const addOrRemoveBtnText = (isInFavs: boolean): string[] => {
  return isInFavs ? ['즐겨찾기에서 제거하시겠습니까?', '제거'] : ['즐겨찾기에 추가 하시겠습니까?', '추가']
}

export const NO_RESULTS = '검색 결과가 없습니다.'
