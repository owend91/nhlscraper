import http from "../http-common"


class PlayerDataService {
    getAll(){
        return http.get('players?');
    }

    find(query){
        console.log('q: ' +query);
        return http.get(`players?${query}`);
    }
}

export default new PlayerDataService();