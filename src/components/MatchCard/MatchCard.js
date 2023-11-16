import './MatchCard.css'
import { Button, List } from 'antd'
import { reformatDate } from '../../utils/utils'

function MatchCard({ cardData, cardIndex, currentPlayersId }) {
  const matchDate = reformatDate(cardData.finished_at)
  const matchUrl = cardData.faceit_url.replace('{lang}', 'en')
  const matchTitle = `Матч ${cardIndex + 1} -  ${checkPlayersRelation()} `

  function checkPlayersRelation() {
    const { playerOne, playerTwo } = currentPlayersId
    const { playing_players } = cardData

    const index1 = playing_players.findIndex((item) => item === playerOne.id)
    const index2 = playing_players.findIndex((item) => item === playerTwo.id)

    if (
      (index1 >= 0 && index1 <= 4 && index2 >= 0 && index2 <= 4) ||
      (index1 >= 5 && index1 <= 9 && index2 >= 5 && index2 <= 9)
    ) {
      return 'Тиммейты'
    } else {
      return 'Противники'
    }
  }

  return (
    <List.Item
      actions={[
        <a href={matchUrl} target='_blank' rel='noreferrer'>
          <Button>Комната матча</Button>
        </a>,
      ]}>
      <List.Item.Meta
        title={
          <a href={matchUrl} target='_blank' rel='noreferrer'>
            {matchTitle}
          </a>
        }
        description={matchDate}
      />

      <List.Item.Meta style={{ alignItems: 'center' }} />
    </List.Item>
  )
}

export default MatchCard
