import './Profile.css'

import { Avatar, Button, Col, Image, Row, Typography } from 'antd'
import { findFlagUrlByIso2Code } from 'country-flags-svg'

import { getLevelBadge } from '../../utils/utils'
import defaultBanner from '../../images/banner-default.jpg'
import defaultAvatar from '../../images/avatar-default.jpeg'

function Profile({ setIsAuth, userInfo }) {
  const { Title, Paragraph } = Typography

  const handleLogOut = () => {
    setIsAuth(false)
    localStorage.removeItem('userInfo')
    localStorage.removeItem('isAuth')
    localStorage.removeItem('faceitToken')
  }

  return (
    <div className='profile'>
      <Row>
        <Col flex={1}>
          <Image
            src={userInfo.cover_image || defaultBanner}
            preview={false}
            className='profile__coverImg'
          />
          <div className='profile__info'>
            <Row gutter={48}>
              <Col flex={1}>
                <Image
                  src={userInfo.avatar || defaultAvatar}
                  preview={false}
                  className='profile__avatarImg'
                  width={100}
                />
              </Col>
              <Col flex={1} className='profile__player-info'>
                <Title level={3} className='profile__player-nickname'>
                  {userInfo.nickname}
                  <Image
                    src={findFlagUrlByIso2Code(userInfo.country)}
                    width={24}
                    preview={false}
                    style={{ marginLeft: 10 }}
                  />
                </Title>
                <Paragraph className='profile__player-level'>
                  {userInfo.games.csgo.faceit_elo} ELO
                  <Avatar
                    src={getLevelBadge(userInfo.games.csgo.skill_level)}
                    className='authorization__modal-avatar'
                  />
                </Paragraph>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <Button
        type='primary'
        className='profile__logout-button'
        onClick={handleLogOut}>
        Выйти
      </Button>
    </div>
  )
}

export default Profile
