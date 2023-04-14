import faceitLevel_1 from '../images/faceit-levels/faceit1.svg'
import faceitLevel_2 from '../images/faceit-levels/faceit2.svg'
import faceitLevel_3 from '../images/faceit-levels/faceit3.svg'
import faceitLevel_4 from '../images/faceit-levels/faceit4.svg'
import faceitLevel_5 from '../images/faceit-levels/faceit5.svg'
import faceitLevel_6 from '../images/faceit-levels/faceit6.svg'
import faceitLevel_7 from '../images/faceit-levels/faceit7.svg'
import faceitLevel_8 from '../images/faceit-levels/faceit8.svg'
import faceitLevel_9 from '../images/faceit-levels/faceit9.svg'
import faceitLevel_10 from '../images/faceit-levels/faceit10.svg'
import {NavLink} from 'react-router-dom'

const levelBadges = {
  1: faceitLevel_1,
  2: faceitLevel_2,
  3: faceitLevel_3,
  4: faceitLevel_4,
  5: faceitLevel_5,
  6: faceitLevel_6,
  7: faceitLevel_7,
  8: faceitLevel_8,
  9: faceitLevel_9,
  10: faceitLevel_10,
}
const getLevelBadge = (level) => levelBadges[level]

function getNavigateItem(key, label, navigateTo, icon) {
  return {
    label: <NavLink to={navigateTo}>{label}</NavLink>,
    key,
    icon,
  }
}

export {getLevelBadge, getNavigateItem}
