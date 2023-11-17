import './CommonMatches.css'
import { Button, Form, Input, List, Typography, message } from 'antd'
import { useEffect } from 'react'
import { preventInvalidInput } from '../../utils/utils'
import MatchCard from '../MatchCard/MatchCard'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserInfo } from '../../redux/authorization/authorization.selectors'
import { setCommonMatchesAsync } from '../../redux/commonMatches/commonMatches.thunks'
import {
  selectCommonMatches,
  selectCurrentPlayersId,
  selectIsCommonMatchesPreloaderActive,
  selectNicknameOneError,
  selectNicknameTwoError,
  selectNoCommonMatches,
} from '../../redux/commonMatches/commonMatches.selectors'
import {
  setCommonMatches,
  setIsCommonMatchesPreloaderActive,
  setNicknameOneError,
  setNicknameTwoError,
  setNoCommonMatches,
} from '../../redux/commonMatches/commonMatches.slice'

function CommonMatches() {
  const { Title } = Typography
  const [messageApi, contextHolder] = message.useMessage()
  const [commonMatchesForm] = Form.useForm()

  const dispatch = useDispatch()
  const userInfo = useSelector(selectUserInfo)
  const commonMatches = useSelector(selectCommonMatches)
  const currentPlayersId = useSelector(selectCurrentPlayersId)
  const nicknameOneError = useSelector(selectNicknameOneError)
  const nicknameTwoError = useSelector(selectNicknameTwoError)
  const noCommonMatches = useSelector(selectNoCommonMatches)
  const isAuthorizationPreloaderActive = useSelector(
    selectIsCommonMatchesPreloaderActive
  )

  useEffect(() => {
    commonMatchesForm.setFieldsValue({
      nicknameOne: userInfo.nickname,
    })
  }, [])

  const nicknameValidation = {
    nicknameOne: nicknameOneError && {
      help: nicknameOneError,
      validateStatus: 'error',
    },
    nicknameTwo: nicknameTwoError && {
      help: nicknameTwoError,
      validateStatus: 'error',
    },
  }

  const onFinish = ({ nicknameOne, nicknameTwo }) => {
    dispatch(setIsCommonMatchesPreloaderActive(true))
    dispatch(setNoCommonMatches(false))
    dispatch(setCommonMatches([]))
    if (nicknameOne === nicknameTwo) {
      messageApi.error('Введены одинаковые ники')
      dispatch(setIsCommonMatchesPreloaderActive(false))
    } else {
      dispatch(setCommonMatchesAsync({ nicknameOne, nicknameTwo }))
    }
  }

  return (
    <div className='common-matches'>
      {contextHolder}
      <Title className='common-matches__title'>Поиск совместных матчей</Title>
      <Form
        className='common-matches__form'
        form={commonMatchesForm}
        name='common-matches-form'
        labelCol={{ span: 8 }}
        initialValues={{ remember: true }}
        layout='vertical'
        requiredMark={false}
        onFinish={onFinish}>
        <Form.Item
          name='nicknameOne'
          label='Ник первого игрока'
          rules={[{ required: true, min: 3, message: 'Введите никнейм!' }]}
          {...nicknameValidation.nicknameOne}>
          <Input
            allowClear
            onChange={() => dispatch(setNicknameOneError(null))}
            onKeyPress={preventInvalidInput}
          />
        </Form.Item>

        <Form.Item
          name='nicknameTwo'
          label='Ник второго игрока'
          rules={[{ required: true, min: 3, message: 'Введите никнейм!' }]}
          {...nicknameValidation.nicknameTwo}>
          <Input
            allowClear
            onChange={() => dispatch(setNicknameTwoError(null))}
            onKeyPress={preventInvalidInput}
          />
        </Form.Item>
        <Form.Item className='common-matches__submit-button'>
          <Button
            type={'primary'}
            htmlType='submit'
            disabled={!!nicknameTwoError || !!nicknameOneError}
            loading={isAuthorizationPreloaderActive}>
            Найти
          </Button>
        </Form.Item>
      </Form>
      {noCommonMatches && (
        <Title level={2} className='common-matches__no-common'>
          Нет совместных матчей
        </Title>
      )}

      {!!commonMatches?.length && (
        <>
          <Title level={4} style={{ textAlign: 'center' }}>
            Найдено общих матчей - {commonMatches.length}
          </Title>
          <List
            className='common-matches__list'
            itemLayout='horizontal'
            dataSource={commonMatches}
            renderItem={(data, i) => (
              <MatchCard
                cardData={data}
                cardIndex={i}
                currentPlayersId={currentPlayersId}
              />
            )}
          />
        </>
      )}
    </div>
  )
}

export default CommonMatches
