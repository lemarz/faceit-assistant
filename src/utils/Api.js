class Api {
  constructor(token) {
    this._baseUrl = 'https://open.faceit.com/data/v4'
    this._headers = {
      authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    }
    this.offsetArr = Array.from({ length: 11 }, (_, i) => i * 100)
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(res)
  }

  getPlayerId(nickName) {
    return fetch(`${this._baseUrl}/players?nickname=${nickName}&game=csgo`, {
      headers: this._headers,
    })
      .then(this._handleResponse)
      .then(({ player_id }) => player_id)
  }

  getPlayerMatches(playerId, offset, limit = 100) {
    return fetch(
      `${this._baseUrl}/players/${playerId}/history?game=csgo&offset=${offset}&limit=${limit}`,
      { headers: this._headers }
    )
      .then(this._handleResponse)
      .then((res) => res.items)
  }

  getAllPlayerMatches(playerId) {
    return Promise.all(
      this.offsetArr.map((offset) => this.getPlayerMatches(playerId, offset))
    ).then((matchesArr) => matchesArr.flat())
  }

  playerStatistic(playerId) {
    return fetch(`${this._baseUrl}/players/${playerId}/stats/csgo`, {
      headers: this._headers,
    }).then(this._handleResponse)
  }

  getUserInfo(nickname) {
    return fetch(`${this._baseUrl}/players?nickname=${nickname}&game=csgo`, {
      headers: this._headers,
    }).then(this._handleResponse)
  }

  getMatchDetails(matchId) {
    return fetch(`${this._baseUrl}/matches/${matchId}`, {
      headers: this._headers,
    }).then(this._handleResponse)
  }

  getMatchStatistics(matchId) {
    return fetch(`${this._baseUrl}/matches/${matchId}/stats`, {
      headers: this._headers,
    }).then(this._handleResponse)
  }
}

const api = new Api(localStorage.getItem('faceitToken'))

export { api, Api }
