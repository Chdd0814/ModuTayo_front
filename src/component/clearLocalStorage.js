

function clearLocalStorage () {

    const clearDataFromLocalStorage = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('saveTicketinfo');
        // 기타 필요한 데이터 삭제 작업 추가 가능
      };
      return clearDataFromLocalStorage;
}

export default clearLocalStorage;