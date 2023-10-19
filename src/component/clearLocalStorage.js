

function clearSessionStorage () {

    const clearDataFromSessionStorage = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('saveTicketinfo');
        sessionStorage.removeItem('userId');
        // 기타 필요한 데이터 삭제 작업 추가 가능
      };
      return clearDataFromSessionStorage;
}

export default clearSessionStorage;