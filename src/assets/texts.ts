export const addOrRemoveBtnText = (isInFavs: boolean): string[] => {
  return isInFavs ? ['즐겨찾기에서 제거하시겠습니까?', '제거'] : ['즐겨찾기에 추가하시겠습니까?', '추가']
}

export const NO_RESULTS = '검색 결과가 없습니다.'

export const NOT_FOUND = '페이지를 찾을 수 없습니다.'
