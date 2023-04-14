import './Authorization.css'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {
  Avatar,
  Button,
  Form,
  Input,
  Modal,
  Spin,
  Typography,
  message,
} from 'antd'
import {UserOutlined} from '@ant-design/icons'
import {Api} from '../../utils/Api'
import {getLevelBadge} from '../../utils/utils'
const {Title, Text} = Typography

function Authorization({setIsAuth, userInfo, setUserInfo}) {
  const navigate = useNavigate()
  const [authForm] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()
  const [isSearchPreloaderActive, setIsSearchPreloaderActive] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)

  const showErrorMessage = (message) => {
    messageApi.open({
      type: 'error',
      content: message,
    })
  }

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

  const onLogin = ({nickname, token}) => {
    setIsSearchPreloaderActive(true)
    const api = new Api(token)
    localStorage.setItem('faceitToken', token)
    api
      .getUserInfo(nickname)
      .then((data) => {
        setUserInfo(data)
        setIsSearchPreloaderActive(false)
        setIsConfirmModalOpen(true)
      })
      .catch((err) => {
        if (err.status === 404) {
          showErrorMessage('Пользователь не найден!')
          setIsSearchPreloaderActive(false)
        }
        if (err.status === 401) {
          showErrorMessage('Токен не верный!')
          localStorage.removeItem('faceitToken')
          setIsSearchPreloaderActive(false)
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
        name='basic'
        onFinish={onLogin}
        className='authorization__form'
        labelCol={{span: 8}}
        initialValues={{remember: true}}>
        <Form.Item
          label='Faceit nickname'
          name='nickname'
          rules={[{required: true, min: 3, message: 'Введите никнейм!'}]}>
          <Input />
        </Form.Item>

        <Form.Item
          label='Api token'
          name='token'
          rules={[
            {required: true, message: 'Введите токен!'},
            {min: 24, max: 48, message: 'Проверьте правильность токена!'},
          ]}>
          <Input.Password />
        </Form.Item>

        <Form.Item className='authorization__button-container'>
          {isSearchPreloaderActive ? (
            <Spin />
          ) : (
            <Button type='primary' htmlType='submit'>
              Авторизация
            </Button>
          )}
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
            src={userInfo.avatar || <UserOutlined />}
            size='large'
            className='authorization__modal-avatar'
          />
          <Text>{userInfo.nickname}</Text>
          <Avatar
            src={getLevelBadge(userInfo.games?.csgo?.skill_level)}
            className='authorization__modal-avatar'
          />
          <Text>{`${userInfo.games?.csgo?.faceit_elo} elo`}</Text>
        </div>
      </Modal>
    </div>
  )
}

export default Authorization
