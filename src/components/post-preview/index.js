import React from 'react'
import { Link } from 'gatsby'
import './PostPreview.css'

const PostPreviewList = ({ edges }) => (
  <React.Fragment>
    {edges.map(edge => {
      const { frontmatter } = edge.node || edge
      return (
        <article key={frontmatter.path} className="post-preview">
          <Link to={frontmatter.path}>
            <h2 className="post-title">{frontmatter.title}</h2>
            <h3 className="post-subtitle">Subtitle for post</h3>
          </Link>
        </article>
      )
    })}
  </React.Fragment>
)

export default PostPreviewList
