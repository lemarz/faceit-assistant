import './Main.css'

import { useNavigate } from 'react-router-dom'
import { Button, Typography } from 'antd'

function Main() {
  const { Title, Paragraph } = Typography
  const navigate = useNavigate()

  const handleButtonClick = () => {
    navigate('/authorization')
  }

  return (
    <div className='main'>
      <Title className='main__title'>Faceit Assistant</Title>
      <Paragraph className='main__text'>
        Faceit Assistant - приложение для расширенной статистики Faceit. Узнайте
        подробную статистику своего профиля, ищите общие матчи, проверьте свои
        лучшие и худшие карты.
      </Paragraph>
      <Paragraph className='main__text'>
        Для входа в приложение необходимо авторизироваться и ввести свой API
        ключ, чтобы получить доступ к данным своего профиля и матчей.
      </Paragraph>
      <div className='main__button-container'>
        <Button type='primary' size='large' onClick={handleButtonClick}>
          Перейти к авторизации
        </Button>
      </div>
    </div>
  )
}

export default Main
