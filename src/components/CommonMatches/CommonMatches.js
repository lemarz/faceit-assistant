import './CommonMatches.css'
import { Button, Form, Input, List, Typography, message } from 'antd'
import { api } from '../../utils/Api'
import { useEffect, useState } from 'react'
import { preventInvalidInput } from '../../utils/utils'
import MatchCard from '../MatchCard/MatchCard'
import { useSelector } from 'react-redux'

function CommonMatches() {
  const { Title } = Typography
  const userInfo = useSelector((store) => store.userInfo)

  const [currentPlayersId, setCurrentPlayersId] = useState({})

  const [nicknameOneError, setNicknameOneError] = useState(null)
  const [nicknameTwoError, setNicknameTwoError] = useState(null)
  const [isPreloaderActive, setIsPreloaderActive] = useState(false)

  const [commonMatches, setCommonMatches] = useState([])
  const [noCommonMatches, setNoCommonMatches] = useState(false)

  const [messageApi, contextHolder] = message.useMessage()
  const [commonMatchesForm] = Form.useForm()

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

  const getCrossings = (matchesArr, targetId) =>
    matchesArr.filter((match) =>
      match.playing_players.some((id) => id === targetId)
    )

  const onFinish = ({ nicknameOne, nicknameTwo }) => {
    setIsPreloaderActive(true)
    setNoCommonMatches(false)
    setCommonMatches([])
    if (nicknameOne === nicknameTwo) {
      messageApi.error('Введены одинаковые ники')
      setIsPreloaderActive(false)
    } else {
      getCommonMatches(nicknameOne, nicknameTwo)
    }
  }

  const getCommonMatches = (nicknameOne, nicknameTwo) => {
    Promise.all([
      api.getPlayerId(nicknameOne).catch((err) => {
        setNicknameOneError('Игрок не найден. Проверьте ник.')
        console.error(err)
        throw new Error()
      }),
      api.getPlayerId(nicknameTwo).catch((err) => {
        setNicknameTwoError('Игрок не найден. Проверьте ник.')
        console.error(err)
        throw new Error()
      }),
    ])
      .then(([id1, id2]) => {
        setCurrentPlayersId({
          playerOne: { nickname: nicknameOne, id: id1 },
          playerTwo: { nickname: nicknameTwo, id: id2 },
        })
        Promise.all([
          api.getAllPlayerMatches(id1),
          api.getAllPlayerMatches(id2),
        ])
          .then(([arr1, arr2]) => {
            const crossingArr1 = getCrossings(arr1, id2)
            const crossingArr2 = getCrossings(arr2, id1)
            const allMatchesArr = [...crossingArr1, ...crossingArr2]
            const uniqueCommonMatches = allMatchesArr.filter(
              (match, index, arr) =>
                arr.findIndex((item) => item.match_id === match.match_id) ===
                index
            )
            if (!uniqueCommonMatches.length) {
              setNoCommonMatches(true)
            } else {
              setCommonMatches(uniqueCommonMatches)
            }
            setIsPreloaderActive(false)
          })
          .catch((err) => {
            throw new Error(err)
          })
      })
      .catch((err) => {
        messageApi.error('Что-то пошло не так')
        setIsPreloaderActive(false)
        console.error(err)
      })
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
            onChange={() => setNicknameOneError(null)}
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
            onChange={() => setNicknameTwoError(null)}
            onKeyPress={preventInvalidInput}
          />
        </Form.Item>
        <Form.Item className='common-matches__submit-button'>
          <Button
            type={'primary'}
            htmlType='submit'
            disabled={!!nicknameTwoError || !!nicknameOneError}
            loading={isPreloaderActive}>
            Найти
          </Button>
        </Form.Item>
      </Form>
      {noCommonMatches && (
        <Title level={2} className='common-matches__no-common'>
          Нет совместных матчей
        </Title>
      )}

      {!!commonMatches.length && (
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
