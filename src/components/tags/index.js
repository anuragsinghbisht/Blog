import React, { Fragment } from 'react'
import { Link } from 'gatsby'

const Tags = ({ tags, selected }) => (
  <Fragment>
    {tags.map((tag, index) => {
      const badge = selected === tag ? 'badge-primary' : 'badge-dark'
      return (
        <span key={index}>
          <Link to={`/tags/${tag}`} className={`badge ${badge}`}>
            {tag}
          </Link>
        </span>
      )
    })}
  </Fragment>
)

export default Tags
