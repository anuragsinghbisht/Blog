import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const BrandLogo = ({ url, brand }) => (
  <a href={url}>
    <span className="fa-stack fa-lg">
      <FontAwesomeIcon icon={['fas', 'circle']} className="fa-stack-2x" />
      <FontAwesomeIcon icon={['fab', brand]} inverse className="fa-stack-1x" />
    </span>
  </a>
)

export default BrandLogo
