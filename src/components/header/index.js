import React, { Fragment } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import TitleAndDescription from '../common/TitleAndDescription'
import './Header.css'

const Header = () => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `}
    render={data => (
      <TitleAndDescription
        title={data.site.siteMetadata.title}
        description={data.site.siteMetadata.description}
      />
    )}
  />
)

export default Header
