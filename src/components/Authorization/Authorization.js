import './Authorization.css'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Avatar, Button, Form, Input, Modal, Typography, message } from 'antd'

import { Api } from '../../utils/Api'

import { getLevelBadge, preventInvalidInput } from '../../utils/utils'
import defaultAvatar from '../../images/avatar-default.jpeg'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { setUserInfoDispatch } from '../../reduxStore/store'

function Authorization({ setIsAuth }) {
  const { Title, Text } = Typography
  const navigate = useNavigate()
  const userInfo = useSelector((store) => store.userInfo)
  const [authForm] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()

  const [isPreloaderActive, setIsPreloaderActive] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)

  const onCancelModal = () => {
    setIsConfirmModalOpen(false)
    authForm.setFieldsValue({
      nickname: '',
    })
  }

  const onConfirmModal = () => {
    setIsAuth(true)
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
    localStorage.setItem('isAuth', 'true')
    navigate(0)
    navigate('/profile')
  }

  const onLogin = ({ nickname, token }) => {
    setIsPreloaderActive(true)
    const api = new Api(token)
    localStorage.setItem('faceitToken', token)
    api
      .getUserInfo(nickname)
      .then((data) => {
        setUserInfoDispatch(data)
        setIsPreloaderActive(false)
        setIsConfirmModalOpen(true)
      })
      .catch((err) => {
        if (err.status === 404) {
          messageApi.error('Пользователь не найден!')
          setIsPreloaderActive(false)
        } else if (err.status === 401) {
          messageApi.error('Токен не верный!')
          localStorage.removeItem('faceitToken')
          setIsPreloaderActive(false)
        } else {
          messageApi.error('Что-то пошло не так. Повторите попытку позже')
          setIsPreloaderActive(false)
        }
      })
  }

  return (
    <div className='authorization'>
      {contextHolder}
      <Title className='authorization__title'>Авторизация</Title>
      <Form
        form={authForm}
        layout='vertical'
        name='auth-form'
        requiredMark={false}
        onFinish={onLogin}
        className='authorization__form'
        labelCol={{ span: 8 }}
        initialValues={{ remember: true }}>
        <Form.Item
          label='Faceit nickname'
          name='nickname'
          rules={[{ required: true, min: 3, message: 'Введите никнейм!' }]}>
          <Input prefix={<UserOutlined />} onKeyPress={preventInvalidInput} />
        </Form.Item>

        <Form.Item
          label='Api token'
          name='token'
          rules={[
            { required: true, message: 'Введите токен!' },
            { min: 24, max: 48, message: 'Проверьте правильность токена!' },
          ]}>
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>

        <Form.Item className='authorization__button-container'>
          <Button type='primary' htmlType='submit' loading={isPreloaderActive}>
            Авторизация
          </Button>
        </Form.Item>
      </Form>
      <Modal
        open={isConfirmModalOpen}
        className='authorization__modal'
        closable={false}
        keyboard={false}
        maskClosable={false}
        okText='Это я'
        cancelText='Это не мой профиль'
        onOk={onConfirmModal}
        onCancel={onCancelModal}>
        <Title level={4} className='authorization__modal-title'>
          Это вы?
        </Title>
        <div className='authorization__modal-container'>
          <Avatar
            src={userInfo?.avatar || defaultAvatar}
            size='large'
            className='authorization__modal-avatar'
          />
          <Text>{userInfo?.nickname}</Text>
          <Avatar
            src={getLevelBadge(userInfo?.games.csgo.skill_level)}
            className='authorization__modal-avatar'
          />
          <Text>{`${userInfo?.games.csgo.faceit_elo} ELO`}</Text>
        </div>
      </Modal>
    </div>
  )
}

export default Authorization
